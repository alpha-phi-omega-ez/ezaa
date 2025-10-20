import { defineCollection } from 'astro:content';
import { minutesConfig, newsConfig } from '@content/index';

const collections = {
  minutes: defineCollection({...minutesConfig}),
  news: defineCollection({...newsConfig}),
};

export { collections };
