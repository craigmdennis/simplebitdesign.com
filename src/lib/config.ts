export const site = {
  name: "Simple Bit Design",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/craigmdennis/teardown",
  nav: [
    { href: "/built-with-ai", label: "Built with AI" },
    { href: "/adding-ai", label: "Adding AI" },
    { href: "/work", label: "Work" },
  ],
};
