import type { ComponentType } from "react";
import type { Section } from "./schema";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { PointOfView } from "@/components/sections/PointOfView";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Offer } from "@/components/sections/Offer";
import { CTA } from "@/components/sections/CTA";

type AnySection = ComponentType<any>;
export const registry: Record<Section["type"], AnySection> = {
  hero: Hero,
  problem: Problem,
  pointOfView: PointOfView,
  process: Process,
  work: Work,
  about: About,
  offer: Offer,
  cta: CTA,
};
