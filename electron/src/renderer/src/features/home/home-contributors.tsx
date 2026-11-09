import { useTranslation } from 'react-i18next';
import { REPO_URL } from '@shared/utils/contactLinks';
import { getBridge } from '@/components/bridge';
import { runRendererTask } from '@/lib/global-error-recovery';

/**
 * Product ownership belongs to DevTunaSoft. Historical source contributors
 * remain credited in the legal notices, not as the fork's current core team.
 */
export function HomeContributors() {
  const { t } = useTranslation();
  const links = [
    { label: 'Project', url: REPO_URL },
    { label: 'Open-source credits', url: `${REPO_URL}/blob/main/LICENSE-NOTICE.md` },
  ];
  return (
    <div className="home-contributors flex flex-col items-end gap-1 text-xs">
      <span className="text-muted-foreground">Developed by DevTunaSoft</span>
      <div className="flex flex-wrap justify-end gap-2">
        {links.map(({ label, url }) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer"
            aria-label={label}
            onClick={(event) => {
              const bridge = getBridge();
              if (!bridge) return;
              event.preventDefault();
              runRendererTask('Open project link', () => bridge.files.openExternal(url));
            }}
          >{label}</a>
        ))}
      </div>
      <span className="sr-only">{t('homeUi.allContributors')}</span>
    </div>
  );
}
