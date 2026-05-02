export default async function handler(req, res) {
  const { type = 'spot', range = '30d' } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    if (type === 'spot') {
      const r = await fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (type === 'candles') {
      // Yahoo Finance - Silver futures SI=F, free, no key needed
      const validRanges = ['1d','5d','1mo','3mo','6mo','1y','2y','5y'];
      const r = range && validRanges.includes(range) ? range : '1mo';
      
      // interval: for short ranges use 1d, for long ranges use 1wk
      const interval = (r === '5d' || r === '1d') ? '1d' : '1d';
      
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/SI=F?interval=${interval}&range=${r}`;
      const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data = await resp.json();

      // Parse into simple OHLC array
      const result = data?.chart?.result?.[0];
      if (!result) return res.status(200).json({ candles: [] });

      const timestamps = result.timestamp || [];
      const quote = result.indicators?.quote?.[0] || {};
      
      const candles = timestamps.map((t, i) => ({
        t: t * 1000,
        o: quote.open?.[i],
        h: quote.high?.[i],
        l: quote.low?.[i],
        c: quote.close?.[i],
      })).filter(c => c.o && c.h && c.l && c.c);

      return res.status(200).json({ candles });
    }

    return res.status(400).json({ error: 'bad type' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
