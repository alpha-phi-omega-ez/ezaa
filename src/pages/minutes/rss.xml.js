import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const minutes = (await getCollection("minutes")).sort((a, b) => {
    let da = new Date(a.data.date);
    let db = new Date(b.data.date);
    return db.valueOf() - da.valueOf();
  });
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
