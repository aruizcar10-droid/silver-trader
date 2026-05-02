export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type') || 'spot';

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  };

  try {
    if (type === 'spot') {
      const r = await fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' });
      const data = await r.json();
      return new Response(JSON.stringify(data), { headers });
    }

    if (type === 'candles') {
      const interval = url.searchParams.get('interval') || '1min';
      const outputsize = url.searchParams.get('outputsize') || '100';
      const apiKey = process.env.TWELVE_API_KEY;

      const tdUrl = `https://api.twelvedata.com/time_series?symbol=XAG/USD&interval=${interval}&outputsize=${outputsize}&apikey=${apiKey}`;
      const r = await fetch(tdUrl, { cache: 'no-store' });
      const data = await r.json();
      return new Response(JSON.stringify(data), { headers });
    }

    return new Response(JSON.stringify({ error: 'type must be spot or candles' }), { status: 400, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
}
