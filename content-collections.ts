import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { sectionSchema } from "./src/lib/sections/schema";

const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    sections: z.array(sectionSchema),
    content: z.string(),
  }),
});

const caseStudies = defineCollection({
  name: "caseStudies",
  directory: "content/case-studies",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    client: z.string(),
    summary: z.string(),
    outcome: z.string(),
    cover: z.string().optional(),
    order: z.number(),
    content: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    body: await compileMDX(context, document),
  }),
});

export default defineConfig({ content: [pages, caseStudies] });
