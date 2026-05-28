import rss from "@astrojs/rss";
import { getMinutes } from "@scripts/content";

export async function GET(context) {
  const minutes = await getMinutes();
  return rss({
    title: "EZAA Minutes",
    description:
      "We post all meeting minutes from EZAA general, ECOM, and committee meetings",
    site: context.site,
    items: minutes.map((minute) => ({
      title: minute.data.title,
      pubDate: minute.data.date,
      description: minute.data.summary,
      link: `/minutes/${minute.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
