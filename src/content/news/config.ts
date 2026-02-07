import { z } from 'astro:content';
import { glob } from 'astro/loaders';

const loader = glob({
  pattern: "**/*.md",
  base: "./src/content/news",
});

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.string(),
  tags: z.array(z.string()),
  summary: z.string().optional(),
  image: z.string().optional(),
});

const config = { loader, schema };
export {
  config as default,
  loader,
  schema,
};
