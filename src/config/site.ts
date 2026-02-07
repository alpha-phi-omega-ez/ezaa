export const SITE = {
  name: "Epsilon Zeta Alumni Association",
  url: "https://apoezaa.org",
  description: "The Epsilon Zeta Alumni Association hosts events and anniversaries for alumni of Epsilon Zeta Chapter of Alpha Phi Omega",
  defaultImage: "/favicon.png",
} as const;

/** Full page title for <title> and OG/Twitter meta; adds site name when not present. */
export function getFullTitle(title: string): string {
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
}

