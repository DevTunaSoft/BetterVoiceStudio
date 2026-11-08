import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import test from 'node:test';

// Source-level regression contract. It complements, but does not replace,
// runtime IPC tests with real Electron WebContents and untrusted frames.
const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(resolve(here, '../src/main/ipc.ts'), 'utf8');

for (const [channel, result] of [
  ['backendGetStatus', 'supervisor.status'],
  ['backendGetConnection', 'supervisor.connection'],
]) {
  test(`${channel} requires trusted top-level caller before returning data`, () => {
    const pattern = new RegExp(
      String.raw`ipcMain\.handle\(CHANNELS\.${channel},\s*\(event\)(?::\s*BackendStatus)?\s*=>\s*\{([\s\S]*?)\n\s*\}\);`,
    );
    const match = source.match(pattern);
    assert.ok(match, `Expected explicit handler for ${channel}`);
    const guard = match[1].indexOf('assertTrustedTopLevelFrame(event);');
    const returnValue = match[1].indexOf(`return ${result};`);
    assert.ok(guard >= 0, `${channel} must authorize the caller`);
    assert.ok(returnValue > guard, `${channel} must authorize before returning data`);
  });
}
