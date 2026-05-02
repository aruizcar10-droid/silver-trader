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

    if (type === 'ohlc') {
      // Test what gold-api.com returns for OHLC
      const r = await fetch('https://api.gold-api.com/price/XAG/ohlc');
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (type === 'history') {
      const r = await fetch('https://api.gold-api.com/price/XAG/history');
      const data = await r.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'bad type' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
