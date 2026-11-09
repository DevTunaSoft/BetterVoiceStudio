import { GithubStar } from './github-star';

// No paid Pro button until VoiceBlueprint Pro has an independent, verified
// commercial offering. Keep the useful fork-owned repository shortcut.
export function SupportShortcut() {
  return <div className="flex shrink-0 items-center gap-0.5"><GithubStar /></div>;
}
