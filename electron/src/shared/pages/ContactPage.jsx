import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Bug, Lightbulb, ShieldAlert, Globe } from 'lucide-react';
import { Button } from '../ui';
import { Card } from '@/components/ui/card';
import { openExternal } from '../api/external';
import ReportBugButton from '../components/ReportBugButton';
import { ISSUES_URL, SECURITY_URL, REPO_URL } from '../utils/contactLinks';

/**
 * Fork-owned channels only. No inherited Discord, social, email or sales links.
 */
export function ContactSections({ onSupport }) {
  const { t } = useTranslation();
  const goSupport = () => {
    if (onSupport) onSupport();
    else document.getElementById('support-give')?.scrollIntoView({ block: 'start' });
  };
  const destinations = [
    { id: 'bug', icon: Bug, title: 'Report a bug', action: <ReportBugButton label="Open bug reporter" /> },
    { id: 'feature', icon: Lightbulb, title: 'Request a feature or ask', url: ISSUES_URL, label: 'Open GitHub Issues' },
    { id: 'security', icon: ShieldAlert, title: 'Report a security issue', url: SECURITY_URL, label: 'Report privately' },
    { id: 'project', icon: Globe, title: 'VoiceBlueprint Pro project', url: REPO_URL, label: 'Project repository' },
    { id: 'support', icon: ArrowRight, title: 'Support the project', action: (
      <Button variant="subtle" size="sm" onClick={goSupport}>See ways to support</Button>
    ) },
  ];
  return (
    <section
      className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2.5"
      aria-label={t('contact.channels_label', { defaultValue: 'Ways to get in touch' })}
    >
      {destinations.map(({ id, icon: Icon, title, action, url, label }) => (
        <Card key={id} className="h-full flex-row flex-wrap items-center gap-2.5 rounded-md border-border bg-transparent p-3 shadow-none">
          <Icon size={17} aria-hidden="true" />
          <h3 className="min-w-[120px] flex-1 font-serif text-[1rem] font-medium">{title}</h3>
          {action || (
            <a href={url} target="_blank" rel="noreferrer" onClick={(e) => {
              e.preventDefault();
              openExternal(url);
            }}>{label}</a>
          )}
        </Card>
      ))}
    </section>
  );
}

export default ContactSections;
