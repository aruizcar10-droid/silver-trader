export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const r = await fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' });
    const data = await r.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
