export default async function handler(req) {
  const apiKey = process.env.TWELVE_API_KEY;
  return new Response(JSON.stringify({
    hasKey: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0,
    firstChars: apiKey ? apiKey.substring(0, 4) : 'none',
    allEnvKeys: Object.keys(process.env)
  }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export const config = { runtime: 'edge' };
