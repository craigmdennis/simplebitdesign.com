/**
 * Static-asset Worker for the legacy simplebitdesign.com site.
 *
 * Exists for one reason: HTTP Range support. Cloudflare's ASSETS binding
 * returns a full 200 even when the client sends a Range header, and iOS
 * WebKit refuses to play a <video> whose server won't honour ranges — it
 * probes with `bytes=0-1` and abandons playback if it doesn't get a 206.
 * The header video therefore never plays on iPhone or iPad without this.
 *
 * Ported from the same fix on craigmdennis.com (src/lib/httpRange.ts +
 * src/worker.ts), reduced to just the range concern.
 *
 * Requests with no Range header stream straight through untouched, so
 * nothing else pays the cost of buffering.
 */

/**
 * Parse a single HTTP `Range` header against a known resource size.
 *
 * Returns:
 * - `{ start, end }` (inclusive) when a 206 slice should be served,
 * - `"unsatisfiable"` when a 416 should be sent,
 * - `null` when the header should be ignored and the full 200 served
 *   (absent header, unsupported unit, or a multi-range request).
 *
 * Only single `bytes=` ranges are handled — that is all browsers actually
 * send for progressive media playback.
 */
export function parseRange(rangeHeader, size) {
  if (!rangeHeader) return null;
  const match = rangeHeader.trim().match(/^bytes=(\d*)-(\d*)$/);
  if (!match) return null; // unsupported unit, or comma-separated multi-range

  const rawStart = match[1];
  const rawEnd = match[2];
  if (rawStart === "" && rawEnd === "") return null; // "bytes=-" is malformed

  let start;
  let end;

  if (rawStart === "") {
    // Suffix range: "bytes=-N" means the final N bytes.
    const suffix = parseInt(rawEnd, 10);
    if (Number.isNaN(suffix) || suffix <= 0) return "unsatisfiable";
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = parseInt(rawStart, 10);
    end = rawEnd === "" ? size - 1 : parseInt(rawEnd, 10);
  }

  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (start > end || start >= size) return "unsatisfiable";
  if (end >= size) end = size - 1; // clamp an over-long end to the last byte

  return { start, end };
}

export default {
  async fetch(request, env) {
    const res = await env.ASSETS.fetch(request);

    const rangeHeader = request.headers.get("Range");

    // Nothing to slice: no range asked for, or the asset layer already
    // returned a partial/redirect/error, or there is no body.
    if (!rangeHeader || res.status !== 200 || !res.body) return res;

    const buf = await res.arrayBuffer();
    const parsed = parseRange(rangeHeader, buf.byteLength);

    if (parsed === null) {
      // A range we don't handle: serve the full body but advertise support.
      const headers = new Headers(res.headers);
      headers.set("Accept-Ranges", "bytes");
      return new Response(buf, { status: 200, headers });
    }

    if (parsed === "unsatisfiable") {
      return new Response(null, {
        status: 416,
        headers: {
          "Content-Range": `bytes */${buf.byteLength}`,
          "Accept-Ranges": "bytes",
        },
      });
    }

    const { start, end } = parsed;
    const headers = new Headers(res.headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Range", `bytes ${start}-${end}/${buf.byteLength}`);
    headers.set("Content-Length", String(end - start + 1));
    headers.delete("Content-Encoding"); // body is raw decoded bytes now
    return new Response(buf.slice(start, end + 1), {
      status: 206,
      statusText: "Partial Content",
      headers,
    });
  },
};
