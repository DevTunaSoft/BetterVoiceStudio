"""Tests for core.job_queue — serial execution, cancel, position, failure isolation."""

import asyncio

import pytest
import pytest_asyncio

from core.job_queue import Job, JobQueue, JobState


@pytest_asyncio.fixture
async def queue():
    q = JobQueue(name="test", concurrency=1)
    await q.start()
    try:
        yield q
    finally:
        await q.stop()


@pytest.mark.asyncio
async def test_single_job_runs_and_completes(queue):
    async def work(job: Job):
        return 42
    j = await queue.submit("one", work)
    done = await queue.wait(j.id, timeout=2.0)
    assert done.state == JobState.DONE
    assert done.result == 42


@pytest.mark.asyncio
async def test_jobs_run_serially_not_in_parallel(queue):
    """Two submits must not overlap — concurrency=1."""
    events = []
    start_a = asyncio.Event()
    release_a = asyncio.Event()

    async def slow_a(job):
        events.append("a-start")
        start_a.set()
        await release_a.wait()
        events.append("a-end")

    async def quick_b(job):
        events.append("b-start")
        events.append("b-end")

    ja = await queue.submit("a", slow_a)
    jb = await queue.submit("b", quick_b)
    await start_a.wait()
    # While A runs, B must still be queued.
    assert queue.get(jb.id).state == JobState.QUEUED
    release_a.set()
    await queue.wait(jb.id, timeout=2.0)
    assert events == ["a-start", "a-end", "b-start", "b-end"]


@pytest.mark.asyncio
async def test_cancel_while_queued_skips_execution(queue):
    ran = asyncio.Event()
    block = asyncio.Event()

    async def blocker(job):
        await block.wait()

    async def never(job):
        ran.set()

    ja = await queue.submit("blocker", blocker)
    jb = await queue.submit("skipped", never)
    cancelled = await queue.cancel(jb.id)
    assert cancelled is True
    assert queue.get(jb.id).state == JobState.CANCELLED
    block.set()
    await queue.wait(ja.id, timeout=2.0)
    # Give worker a tick to process the cancelled entry.
    await asyncio.sleep(0.05)
    assert not ran.is_set()


@pytest.mark.asyncio
async def test_cancel_while_running_sets_flag_for_cooperative_exit(queue):
    async def cooperative(job):
        for _ in range(20):
            if job.is_cancelled:
                return "stopped-early"
            await asyncio.sleep(0.02)
        return "finished-normally"

    j = await queue.submit("coop", cooperative)
    await asyncio.sleep(0.05)  # let it start
    await queue.cancel(j.id)
    done = await queue.wait(j.id, timeout=2.0)
    # Worker marks cancelled when is_cancelled was true at return.
    assert done.state == JobState.CANCELLED
    assert done.result == "stopped-early" or done.result is None


@pytest.mark.asyncio
async def test_failure_isolated_next_job_still_runs(queue):
    async def boom(job):
        raise RuntimeError("kaboom")

    async def ok(job):
        return "ok"

    ja = await queue.submit("fail", boom)
    jb = await queue.submit("ok", ok)
    await queue.wait(ja.id, timeout=2.0)
    await queue.wait(jb.id, timeout=2.0)
    assert queue.get(ja.id).state == JobState.FAILED
    assert queue.get(ja.id).error == "kaboom"
    assert queue.get(jb.id).state == JobState.DONE


@pytest.mark.asyncio
async def test_position_reports_zero_for_next_up(queue):
    block = asyncio.Event()

    async def wait_a(job):
        await block.wait()

    async def wait_b(job):
        await block.wait()

    ja = await queue.submit("a", wait_a)
    jb = await queue.submit("b", wait_b)
    jc = await queue.submit("c", wait_b)
    await asyncio.sleep(0.02)  # let worker pick a
    assert queue.get(ja.id).state == JobState.RUNNING
    # positions among QUEUED jobs
    assert queue.position(jb.id) == 0
    assert queue.position(jc.id) == 1
    assert queue.position(ja.id) == -1
    block.set()
    await queue.wait(jc.id, timeout=2.0)


@pytest.mark.asyncio
async def test_submit_idempotent_on_job_id(queue):
    async def work(job):
        return 1

    j1 = await queue.submit("x", work, job_id="fixed")
    j2 = await queue.submit("x", work, job_id="fixed")
    assert j1 is j2
    await queue.wait("fixed", timeout=2.0)


@pytest.mark.asyncio
async def test_cancel_unknown_returns_false(queue):
    assert await queue.cancel("does-not-exist") is False


@pytest.mark.asyncio
async def test_purge_finished_drops_old_rows(queue):
    async def work(job):
        return 1

    j = await queue.submit("x", work)
    await queue.wait(j.id, timeout=2.0)
    # Force finished_at into the past.
    queue.get(j.id).finished_at = 0.0
    dropped = queue.purge_finished(older_than_seconds=1.0)
    assert dropped == 1
    assert queue.get(j.id) is None


@pytest.mark.asyncio
async def test_list_jobs_live_only_by_default(queue):
    finished_evt = asyncio.Event()
    block = asyncio.Event()

    async def finish_fast(job):
        finished_evt.set()

    async def wait_forever(job):
        await block.wait()

    j1 = await queue.submit("done", finish_fast)
    await finished_evt.wait()
    await queue.wait(j1.id, timeout=1.0)
    j2 = await queue.submit("live", wait_forever)
    await asyncio.sleep(0.02)
    live = queue.list_jobs()
    all_jobs = queue.list_jobs(include_finished=True)
    assert j2.id in [j.id for j in live]
    assert j1.id not in [j.id for j in live]
    assert j1.id in [j.id for j in all_jobs]
    block.set()
    await queue.wait(j2.id, timeout=1.0)


@pytest.mark.asyncio
async def test_stop_settles_running_and_queued_waiters():
    q = JobQueue(name="shutdown-regression")
    await q.start()
    entered = asyncio.Event()
    ran_queued = False

    async def blocking(job):
        entered.set()
        await asyncio.Event().wait()

    async def queued(job):
        nonlocal ran_queued
        ran_queued = True

    running = await q.submit("running", blocking)
    pending = await q.submit("pending", queued)
    await asyncio.wait_for(entered.wait(), 2)
    await asyncio.wait_for(q.stop(), 2)
    assert (await q.wait(running.id, timeout=0.2)).state == JobState.CANCELLED
    assert (await q.wait(pending.id, timeout=0.2)).state == JobState.CANCELLED
    assert not ran_queued
    assert not q.list_jobs()


@pytest.mark.asyncio
async def test_restart_does_not_run_cancelled_backlog():
    q = JobQueue(name="restart-regression")
    await q.start()
    entered = asyncio.Event()
    executions = []

    async def blocking(job):
        entered.set()
        await asyncio.Event().wait()

    async def queued(job):
        executions.append(job.id)

    await q.submit("running", blocking)
    pending = await q.submit("pending", queued)
    await asyncio.wait_for(entered.wait(), 2)
    await q.stop()
    await q.start()
    fresh = await q.submit("fresh", queued)
    await q.wait(fresh.id, timeout=2)
    assert executions == [fresh.id]
    assert (await q.wait(pending.id, timeout=0.2)).state == JobState.CANCELLED
    await q.stop()


@pytest.mark.asyncio
async def test_stop_allows_worker_cleanup_to_submit_without_deadlocking():
    """Cancellation finalizers may need the queue lock to record follow-up work."""
    q = JobQueue(name="cleanup-lock-regression")
    await q.start()
    started = asyncio.Event()
    followups = []

    async def never_started(job):
        raise AssertionError("cleanup follow-up must be settled, not run")

    async def worker(job):
        try:
            started.set()
            await asyncio.Event().wait()
        finally:
            followups.append(await q.submit("cleanup-follow-up", never_started))

    running = await q.submit("running", worker)
    await asyncio.wait_for(started.wait(), 2)
    await asyncio.wait_for(q.stop(), 3)
    assert (await q.wait(running.id, timeout=0.2)).state == JobState.CANCELLED
    assert len(followups) == 1
    assert (await q.wait(followups[0].id, timeout=0.2)).state == JobState.CANCELLED

    # The next generation may start without executing the old cancelled work.
    await q.start()

    async def healthy(job):
        return "healthy"

    fresh = await q.submit("fresh", healthy)
    assert (await q.wait(fresh.id, timeout=2)).result == "healthy"
    await q.stop()


@pytest.mark.asyncio
async def test_concurrent_stoppers_join_and_restart_cannot_race_shutdown():
    q = JobQueue(name="concurrent-stop-regression")
    await q.start()
    started = asyncio.Event()
    cleaning = asyncio.Event()
    release_cleanup = asyncio.Event()

    async def worker(job):
        try:
            started.set()
            await asyncio.Event().wait()
        finally:
            cleaning.set()
            await release_cleanup.wait()

    running = await q.submit("running", worker)
    await asyncio.wait_for(started.wait(), 2)
    first = asyncio.create_task(q.stop())
    try:
        await asyncio.wait_for(cleaning.wait(), 2)
        second = asyncio.create_task(q.stop())
        with pytest.raises(RuntimeError, match="cannot start while stopping"):
            await q.start()
        assert not second.done()
        release_cleanup.set()
        await asyncio.wait_for(asyncio.gather(first, second), 3)
        assert (await q.wait(running.id, timeout=0.2)).state == JobState.CANCELLED
        await q.start()
        assert q._workers
    finally:
        release_cleanup.set()
        await q.stop()


@pytest.mark.asyncio
async def test_worker_cannot_await_its_own_queue_shutdown():
    q = JobQueue(name="self-stop-regression")
    await q.start()

    async def worker(job):
        with pytest.raises(RuntimeError, match="worker cannot stop its own queue"):
            await q.stop()
        return 1

    current = await q.submit("self-stop-attempt", worker)
    assert (await q.wait(current.id, timeout=2)).result == 1
    await q.stop()


@pytest.mark.asyncio
async def test_cancelled_stop_caller_does_not_abandon_inflight_shutdown():
    """Aborting an API request must not allow new workers while old ones clean up."""
    q = JobQueue(name="stop-caller-cancel-regression")
    await q.start()
    started = asyncio.Event()
    cleanup_started = asyncio.Event()
    release_cleanup = asyncio.Event()

    async def worker(job):
        try:
            started.set()
            await asyncio.Event().wait()
        finally:
            cleanup_started.set()
            await release_cleanup.wait()

    running = await q.submit("running", worker)
    await asyncio.wait_for(started.wait(), 2)
    stopper = asyncio.create_task(q.stop())
    try:
        await asyncio.wait_for(cleanup_started.wait(), 2)
        stopper.cancel()
        with pytest.raises(asyncio.CancelledError):
            await stopper
        # The underlying shutdown still owns the worker join, even though its
        # first caller has gone away.
        with pytest.raises(RuntimeError, match="cannot start while stopping"):
            await q.start()
        assert running.state == JobState.RUNNING
        release_cleanup.set()
        await asyncio.wait_for(q.stop(), 3)
        assert (await q.wait(running.id, timeout=0.2)).state == JobState.CANCELLED
        await q.start()
        assert q._workers
    finally:
        release_cleanup.set()
        await q.stop()


@pytest.mark.asyncio
async def test_seeded_shutdown_stress_settles_every_waiter_and_keeps_new_generation_clean():
    """Fault-inject cancellation during multi-worker shutdown without relying on wall time."""
    import random

    for seed in range(12):
        rng = random.Random(seed)
        q = JobQueue(name=f"shutdown-stress-{seed}", concurrency=2)
        await q.start()
        entered = asyncio.Event()
        never_release = asyncio.Event()
        executed = []

        async def blocking(job):
            executed.append(job.id)
            entered.set()
            await never_release.wait()
            return job.id

        jobs = await asyncio.wait_for(
            asyncio.gather(
                *(q.submit(f"work-{n}", blocking, job_id=f"{seed}-{n}") for n in range(30))
            ),
            timeout=3,
        )
        try:
            await asyncio.wait_for(entered.wait(), 2)
            for job in jobs:
                if rng.randrange(4) == 0:
                    await q.cancel(job.id)
            await asyncio.wait_for(
                asyncio.gather(q.stop(), q.stop(), q.stop()),
                timeout=3,
            )
            for job in jobs:
                assert (await q.wait(job.id, timeout=0.2)).state == JobState.CANCELLED
                assert job.done_event.is_set()
            assert not q._workers
            assert q._queue.empty()

            # Fresh work must run exactly once; no stale canceled work leaks.
            await q.start()
            marker = []

            async def fresh(job):
                marker.append(job.id)
                return "recovered"

            new = await q.submit("fresh", fresh, job_id=f"{seed}-fresh")
            assert (await q.wait(new.id, timeout=2)).result == "recovered"
            assert marker == [new.id]
        finally:
            never_release.set()
            await asyncio.wait_for(q.stop(), 3)
