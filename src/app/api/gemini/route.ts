export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

