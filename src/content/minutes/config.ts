import { z } from 'astro:content';
import { glob } from 'astro/loaders';

const loader = glob({
  pattern: "**/*.md",
  base: "./src/content/minutes",
});

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  participants: z.array(z.string()),
  tags: z.array(z.string()).optional(),
});

const config = { loader, schema };
export {
  config as default,
  loader,
  schema,
};
