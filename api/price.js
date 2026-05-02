export default async function handler(req, res) {
  const { type = 'spot', interval = '1min', outputsize = '100' } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    if (type === 'spot') {
      const r = await fetch('https://api.gold-api.com/price/XAG');
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (type === 'candles') {
      const apiKey = process.env.TWELVE_API_KEY;
      const url = `https://api.twelvedata.com/time_series?symbol=XAG/USD&interval=${interval}&outputsize=${outputsize}&apikey=${apiKey}`;
      const r = await fetch(url);
      const data = await r.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'bad type' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
