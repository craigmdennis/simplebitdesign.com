import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/config";
import { cn } from "@/lib/utils";

interface BookingCTAProps {
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
}

export function BookingCTA({
  label = "Start with a teardown",
  variant = "default",
}: BookingCTAProps) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant }), "cta-orange")}
    >
      {label}
    </a>
  );
}
