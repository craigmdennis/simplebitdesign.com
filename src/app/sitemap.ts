import type { MetadataRoute } from "next";
import { allPages, allCaseStudies } from "content-collections";

export const dynamic = "force-static";

const base =
  process.env.NEXT_PUBLIC_SITE_URL || "https://simplebitdesign.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const audiencePages = allPages
    .filter((p) => p.slug !== "home")
    .map((p) => ({ url: `${base}/${p.slug}` }));

  const caseStudyPages = allCaseStudies.map((cs) => ({
    url: `${base}/work/${cs.slug}`,
  }));

  return [
    { url: base },
    ...audiencePages,
    { url: `${base}/work` },
    ...caseStudyPages,
  ];
}
