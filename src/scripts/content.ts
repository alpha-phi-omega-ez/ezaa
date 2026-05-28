import { getCollection, type CollectionEntry } from "astro:content";

type DatedEntry = { data: { date: Date } };

const sortByDateDesc = <T extends DatedEntry>(items: T[]) =>
  [...items].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

function hasAnyTag(
  entry: { data: { tags?: readonly string[] } },
  tags: readonly string[],
): boolean {
  return tags.some((tag) => entry.data.tags?.includes(tag));
}

/** Tag sets and predicates for each collection — single source for filtering rules. */
const contentFilters = {
  news: {
    /** Every news post (feed, RSS, detail pages). */
    all: () => true,
  },
  minutes: {
    /** Every minute (RSS, detail pages). */
    all: () => true,
    /** General / ECOM meetings listed on the docs page. */
    docs: (entry: CollectionEntry<"minutes">) =>
      hasAnyTag(entry, ["business meeting", "ecom meeting"]),
  },
} as const;

type NewsFilter = keyof typeof contentFilters.news;
type MinutesFilter = keyof typeof contentFilters.minutes;

async function loadCollection(
  collection: "news",
  filter: NewsFilter,
): Promise<CollectionEntry<"news">[]>;
async function loadCollection(
  collection: "minutes",
  filter: MinutesFilter,
): Promise<CollectionEntry<"minutes">[]>;
async function loadCollection(
  collection: "news" | "minutes",
  filter: NewsFilter | MinutesFilter,
) {
  if (collection === "news") {
    const predicate = contentFilters.news[filter as NewsFilter] as (
      entry: CollectionEntry<"news">,
    ) => boolean;
    const items = await getCollection("news");
    return sortByDateDesc(items.filter(predicate));
  }

  const predicate = contentFilters.minutes[filter as MinutesFilter] as (
    entry: CollectionEntry<"minutes">,
  ) => boolean;
  const items = await getCollection("minutes");
  return sortByDateDesc(items.filter(predicate));
}

export async function getNews(filter: NewsFilter = "all") {
  return loadCollection("news", filter);
}

export async function getMinutes(filter: MinutesFilter = "all") {
  return loadCollection("minutes", filter);
}
