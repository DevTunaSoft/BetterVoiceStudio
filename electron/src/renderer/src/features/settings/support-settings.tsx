import { ExternalLink } from '@/components/external-link';
import { brandIcon } from '@/lib/brand';
import { ISSUES_URL, REPO_URL, SECURITY_URL } from '@shared/utils/contactLinks';
import './support-settings.css';

/**
 * Official support destinations for this independent fork.
 * Do not expose upstream donations, subscriptions, sponsors or social accounts.
 */
export function SupportSettings() {
  return (
    <div className="support-studio">
      <header className="support-intro">
        <div className="support-emblem" aria-hidden="true">
          <img src={brandIcon} alt="" width={100} height={100} />
        </div>
        <h1>VoiceBlueprint Pro</h1>
        <p>Design. Clone. Create.</p>
        <p>Developed independently by DevTunaSoft contributors.</p>
      </header>
      <section className="support-contact" aria-labelledby="support-contact-heading">
        <div className="support-contact-heading">
          <h2 id="support-contact-heading">Project and support</h2>
        </div>
        <p>
          VoiceBlueprint Pro is an independent open-source project. Please use the
          project repository for updates, documentation, and contribution guidance.
        </p>
        <div className="support-channel-grid">
          <ExternalLink href={REPO_URL}>VoiceBlueprint Pro on GitHub</ExternalLink>
          <ExternalLink href={ISSUES_URL}>Issues and feature requests</ExternalLink>
          <ExternalLink href={SECURITY_URL}>Private security reporting</ExternalLink>
        </div>
        <p>
          There is currently no verified VoiceBlueprint Pro donation account,
          paid subscription, sponsor program, Discord server, or direct support email.
          Do not pay or contact the original project's accounts on behalf of this fork.
        </p>
      </section>
    </div>
  );
}
