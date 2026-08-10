import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#1a4a48",
          padding: "80px 96px",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: 64,
            height: 4,
            background: "#ff5722",
            marginBottom: 48,
          }}
        />

        {/* Studio name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#fff9f5",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Simple Bit Design
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#f9ece4",
            lineHeight: 1.4,
            maxWidth: 800,
            opacity: 0.9,
          }}
        >
          AI got you to 70%. I bring the 30% it can&apos;t.
        </div>
      </div>
    ),
    { ...size }
  );
}
