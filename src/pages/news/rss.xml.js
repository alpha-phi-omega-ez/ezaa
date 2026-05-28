import rss from "@astrojs/rss";
import { getNews } from "@scripts/content";

export async function GET(context) {
  const news = await getNews();
  return rss({
    title: "EZAA News",
    description:
      "We post ezaa news and announcements",
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
