// Independent VoiceBlueprint Pro sponsor registry. The original project's
// sponsors are not automatically sponsors of this fork.
import { REPO_URL } from '../utils/contactLinks';

// Populate only after receiving a verified, explicit sponsorship agreement.
export const SPONSORS = [];
export const SPONSOR_TIERS = ['strategic', 'company', 'development', 'community', 'supporter'];

// Sponsor onboarding is intentionally unavailable until a fork-owned channel
// and accurate sponsor policy are published.
export const SPONSOR_CONTACT = {
  githubIssue: '',
  githubSponsors: '',
  kofi: '',
  docsUrl: `${REPO_URL}/blob/main/SPONSORS.md`,
};
