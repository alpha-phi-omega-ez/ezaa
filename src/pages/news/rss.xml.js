import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const news = (await getCollection("news")).sort((a, b) => {
    let da = new Date(a.data.date);
    let db = new Date(b.data.date);
    return db.valueOf() - da.valueOf();
  });
  return rss({
    title: "EZAA News",
    description:
      "We post all meeting minutes from EZAA general, ECOM, and committee meetings",
    site: context.site,
    items: news.map((article) => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: article.data.summary,
      link: `/news/${article.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
