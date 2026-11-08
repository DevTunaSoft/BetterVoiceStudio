import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Heart, Building2, MessageCircle } from 'lucide-react';
import { Button, Tabs } from '../ui';
import { openExternal } from '../api/external';
import { REPO_URL } from '../utils/contactLinks';
import { ContactSections } from './ContactPage';

const VIEWS = ['support', 'license', 'contact'];
const viewFromRoute = (view) => (VIEWS.includes(view) ? view : 'support');

/**
 * Legacy-route-compatible support hub for the independent VoiceBlueprint Pro fork.
 * No upstream donation, commercial licence, Discord or sponsor checkout links.
 */
export default function SupportPage({ onBack, initialView = 'support' }) {
  const { t } = useTranslation();
  const [view, setView] = useState(() => viewFromRoute(initialView));
  useEffect(() => setView(viewFromRoute(initialView)), [initialView]);
  const tabs = [
    { id: 'support', label: 'Project', icon: Heart },
    { id: 'license', label: 'Licensing', icon: Building2 },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];
  return (
    <div className="relative isolate flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--chrome-bg)]">
      <div className="relative z-[2] flex shrink-0 items-center justify-between gap-3 px-8 pt-3">
        <Button variant="subtle" size="sm" onClick={onBack} leading={<ArrowLeft size={14} />}>
          {t('donate.back', { defaultValue: 'Back' })}
        </Button>
        <Tabs items={tabs} value={view} onChange={setView} size="sm" aria-label="Project information" />
        <span className="w-24 shrink-0" aria-hidden="true" />
      </div>
      <main
        id={`support-${view === 'license' ? 'license' : view === 'contact' ? 'contact' : 'give'}`}
        role="tabpanel"
        aria-label={tabs.find((tab) => tab.id === view)?.label}
        className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[900px] flex-1 flex-col gap-4 overflow-y-auto px-6 py-8"
      >
        {view === 'support' && (
          <>
            <h2 className="font-serif text-2xl">VoiceBlueprint Pro — Design. Clone. Create.</h2>
            <p>Independent, open-source AI voice production software developed by DevTunaSoft contributors.</p>
            <p>Support the project by reviewing documentation, reporting reproducible issues, or contributing code.</p>
            <Button variant="subtle" onClick={() => openExternal(REPO_URL)}>View project on GitHub</Button>
            <p>No official donations, sponsors, paid plans, or direct support accounts are offered by this fork at present.</p>
          </>
        )}
        {view === 'license' && (
          <>
            <h2 className="font-serif text-2xl">VoiceBlueprint Pro licensing</h2>
            <p>The application is distributed under its applicable open-source licences.
              Individual engines, models and assets may have separate terms.</p>
            <p>The original project's commercial licence offerings are not sold or supported by VoiceBlueprint Pro.</p>
            <Button variant="subtle" onClick={() => openExternal(REPO_URL)}>View licence notices</Button>
          </>
        )}
        {view === 'contact' && (
          <>
            <h2 className="font-serif text-2xl">Contact the VoiceBlueprint Pro project</h2>
            <ContactSections onSupport={() => setView('support')} />
          </>
        )}
      </main>
    </div>
  );
}
