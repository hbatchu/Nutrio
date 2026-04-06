export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { fetchCurrentMatches } from "@/lib/cricapi/matches";

export async function GET(request: Request) {
  const { signal } = request;
  const encoder = new TextEncoder();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const send = async (data: unknown) => {
    try {
      await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    } catch {
      // client disconnected
    }
  };

  // Run polling loop in background
  (async () => {
    try {
      // Initial data
      const matches = await fetchCurrentMatches();
      await send(matches);

      // Poll every 30s
      while (!signal.aborted) {
        await new Promise((resolve) => setTimeout(resolve, 30_000));
        if (signal.aborted) break;
        try {
          const updated = await fetchCurrentMatches();
          await send(updated);
        } catch {
          // keep trying
        }
      }
    } catch {
      // initial fetch failed — send empty
      await send([]);
    } finally {
      try { await writer.close(); } catch { /* ignore */ }
    }
  })();

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
