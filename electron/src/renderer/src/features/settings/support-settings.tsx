import { LightbulbIcon, ShieldCheckIcon, BookOpenIcon, Github } from 'lucide-react';
import { brandIcon } from '@/lib/brand';
import { ReportBug } from '@/components/report-bug';
import { ExternalLink } from '@/components/external-link';
import { ISSUES_URL, REPO_URL, SECURITY_URL } from '@shared/utils/contactLinks';
import './support-settings.css';

/** Fork-owned support and upstream credit; no inherited payment or Pro offerings. */
export function SupportSettings() {
  return (
    <div className="support-studio">
      <header className="support-intro">
        <div className="support-emblem" aria-hidden="true">
          <img src={brandIcon} alt="" width={100} height={100} />
        </div>
        <h1>BetterVoiceStudio</h1>
        <p>An independent open-source modernization fork of VoiceStudio.</p>
      </header>
      <section className="support-contact" aria-labelledby="support-contact-heading">
        <div className="support-contact-heading">
          <h2 id="support-contact-heading">Help and contribute</h2>
          <ReportBug />
        </div>
        <div className="support-channel-grid">
          <ExternalLink href={ISSUES_URL}><LightbulbIcon aria-hidden="true" /><span>Report an issue or suggest a feature</span></ExternalLink>
          <ExternalLink href={REPO_URL}><Github aria-hidden="true" /><span>BetterVoiceStudio source</span></ExternalLink>
          <ExternalLink href={SECURITY_URL}><ShieldCheckIcon aria-hidden="true" /><span>Report a security vulnerability privately</span></ExternalLink>
          <ExternalLink href={REPO_URL + '/blob/engineering/modernization-foundation/docs/FORK_AND_ATTRIBUTION.md'}><BookOpenIcon aria-hidden="true" /><span>Open-source credits and licenses</span></ExternalLink>
        </div>
      </section>
    </div>
  );
}
