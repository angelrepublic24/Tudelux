// app/api/quotes/route.ts
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("TUDELU_TOKEN")?.value;

  const url = new URL(req.url);
  const search = url.search;

  const res = await fetch(`${process.env.API_URL}/quotes${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}
