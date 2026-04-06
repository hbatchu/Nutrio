const BASE_URL = "https://api.cricapi.com/v1";

export async function cricapiGet<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const apiKey = process.env.CRICAPI_KEY;
  if (!apiKey) throw new Error("CRICAPI_KEY environment variable is not set");

  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("apikey", apiKey);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 0 }, // always fresh — we cache manually
  });

  if (!res.ok) {
    throw new Error(`CricAPI error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.status !== "success") {
    throw new Error(`CricAPI returned status: ${json.status}`);
  }

  return json.data as T;
}
