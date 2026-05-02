export default async function handler(req, res) {
  try {
    const r = await fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
