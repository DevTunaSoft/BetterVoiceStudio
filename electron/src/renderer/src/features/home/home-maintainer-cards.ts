/**
 * Current product maintainer cards. Historical upstream contributor profiles
 * are retained in legal credits, never shown as VoiceBlueprint Pro maintainers.
 * Keep this object aligned with mobile/contract/maintainer-cards.json.
 */
export const homeMaintainerCards: Record<string, {
  name: string;
  role: string;
  links: CardLink[];
}> = {};

export type CardLink = {
  kind: 'website' | 'github' | 'x';
  handle: string;
  href: string;
};
