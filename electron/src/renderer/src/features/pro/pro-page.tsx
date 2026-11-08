import { WorkspaceHeader } from '@/components/app-shell/workspace-header';
import { ExternalLink } from '@/components/external-link';
import { REPO_URL } from '@shared/utils/contactLinks';
import './pro-page.css';

/**
 * The upstream project's paid Pro plans and commercial checkout do not belong
 * to VoiceBlueprint Pro. Keep the existing route as a safe explanatory page
 * until this fork has its own verified licensing and billing infrastructure.
 */
export function ProPage() {
  return (
    <div className="pro-page">
      <WorkspaceHeader>
        <h1 className="text-sm font-medium">VoiceBlueprint Pro</h1>
      </WorkspaceHeader>
      <div className="pro-page-scroll">
        <main className="pro-page-content">
          <section className="pro-pricing" aria-labelledby="pro-independent-title">
            <div className="pro-section-head">
              <h2 id="pro-independent-title">Independent open-source software</h2>
              <p>
                VoiceBlueprint Pro is developed independently by DevTunaSoft contributors.
                It does not sell the original project's Pro plans or enterprise licences.
              </p>
            </div>
            <p>
              There is no official paid VoiceBlueprint Pro plan, checkout, or commercial
              licence offering at this time. Model and component licence terms still apply.
            </p>
            <ExternalLink href={REPO_URL}>View the project and its licence notices</ExternalLink>
          </section>
        </main>
      </div>
    </div>
  );
}
