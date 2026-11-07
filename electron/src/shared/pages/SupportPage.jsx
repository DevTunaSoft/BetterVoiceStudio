import React from 'react';
import { ArrowLeft, BookOpen, Github, ShieldAlert } from 'lucide-react';
import { Button } from '../ui';
import { openExternal } from '../api/external';
import { ContactSections } from './ContactPage';
import { REPO_URL, SECURITY_URL } from '../utils/contactLinks';

/**
 * Preserve the inherited support/enterprise/contact route contract without
 * promoting upstream donations, sponsorships, or commercial licensing.
 */
export default function SupportPage({ onBack, initialView = 'support' }) {
  return (
    <div className="relative isolate flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--chrome-bg)]">
      <div className="relative z-[2] flex shrink-0 items-center gap-3 px-8 pt-3">
        <Button variant="subtle" size="sm" onClick={onBack} leading={<ArrowLeft size={14} />}>
          Back
        </Button>
      </div>
      <main className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[900px] flex-1 flex-col gap-6 overflow-y-auto px-6 py-8">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="font-serif text-3xl">BetterVoiceStudio</h1>
          <p className="text-sm text-[var(--chrome-fg-muted)]">
            An independent open-source modernization fork of VoiceStudio.
            The original project and third-party authors retain credit for their work.
          </p>
          {initialView === 'license' && (
            <p className="text-sm text-[var(--chrome-fg-muted)]">
              BetterVoiceStudio does not offer the original project's commercial licenses or Pro subscriptions.
              Consult the applicable open-source and model licenses for your intended use.
            </p>
          )}
        </header>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="subtle" leading={<Github size={15} />} onClick={() => openExternal(REPO_URL)}>
            Fork source
          </Button>
          <Button variant="subtle" leading={<BookOpen size={15} />} onClick={() => openExternal(REPO_URL + '/blob/main/docs/FORK_AND_ATTRIBUTION.md')}>
            Credits and licenses
          </Button>
          <Button variant="subtle" leading={<ShieldAlert size={15} />} onClick={() => openExternal(SECURITY_URL)}>
            Security reporting
          </Button>
        </div>
        <ContactSections />
      </main>
    </div>
  );
}
