import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/config";
import { cn } from "@/lib/utils";

interface BookingCTAProps {
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg";
}

export function BookingCTA({
  label = "Start with a teardown",
  variant = "default",
  size = "default",
}: BookingCTAProps) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), "cta-orange")}
    >
      {label}
    </a>
  );
}
