import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

export default defineConfig({ content: [pages] });
