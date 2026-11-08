import { GithubStar } from './github-star';

/** Fork navigation only: do not advertise the original project's Pro checkout. */
export function SupportShortcut() {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <GithubStar />
    </div>
  );
}
