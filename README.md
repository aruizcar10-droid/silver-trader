# Silver Trader - XAG/USD Intraday Simulator

Simulador de trading intradía de plata con precio real cada 2 segundos. 

## Desplegar en Vercel (gratis, 5 minutos)

### 1. Sube a GitHub

```bash
git init
git add .
git commit -m "silver trader"
```

Sube el repo a GitHub (puedes usar `gh repo create` o hacerlo desde github.com).

### 2. Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com) → Sign up con tu cuenta de GitHub
2. Click "Add New Project"
3. Importa tu repo de GitHub
4. Click "Deploy"
5. Listo. Te da una URL tipo `silver-trader-xxx.vercel.app`

### Estructura

```
silver-trader/
├── api/
│   └── price.js       ← Serverless function (proxy a gold-api.com)
├── public/
│   └── index.html     ← Frontend del simulador
├── package.json
├── vercel.json
└── README.md
```

### Cómo funciona

- El frontend llama a `/api/price` cada 2 segundos
- La función serverless llama a `api.gold-api.com/price/XAG` desde el servidor (sin CORS)
- Devuelve el precio al frontend
- Sin API key, sin registro, gratis

### Mercado cerrado

El mercado spot de plata cierra los fines de semana. El precio estará congelado de viernes noche a domingo noche.
