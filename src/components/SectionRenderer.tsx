import { registry } from "@/lib/sections/registry";
import type { Section } from "@/lib/sections/schema";

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const C = registry[s.type];
        return <C key={`${s.type}-${i}`} {...s} />;
      })}
    </>
  );
}
