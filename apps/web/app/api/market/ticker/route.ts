import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface MarketTicker {
  symbol: string;
  name: string;
  ask: string;
  bid: string;
  price: number;
  change: string;
  up: boolean;
  spread: string;
  updatedAt: string;
}

export async function GET() {
  const timestamp = new Date().toISOString();

  // Default fallback baseline prices if external APIs fail
  let goldPrice = 4294.50;
  let goldChange = '+1.45%';
  let goldUp = true;

  let btcPrice = 96450.00;
  let btcChange = '+2.30%';
  let btcUp = true;

  let ethPrice = 3480.20;
  let ethChange = '+1.80%';
  let ethUp = true;

  let eurusdPrice = 1.0845;
  let gbpusdPrice = 1.2960;
  let usdjpyPrice = 154.20;

  // 1. Fetch Real Live Gold Price
  try {
    const goldRes = await fetch('https://api.gold-api.com/price/XAU', {
      headers: { 'User-Agent': 'VT-Markets-Rewards-Hub/1.0' },
      next: { revalidate: 5 },
      signal: AbortSignal.timeout(3500),
    });
    if (goldRes.ok) {
      const goldData = await goldRes.json();
      if (goldData && typeof goldData.price === 'number' && goldData.price > 1000) {
        goldPrice = goldData.price;
      }
    } else {
      // Fallback to Binance PAXG (Paxos Gold token 1:1 with 1 troy oz of physical gold)
      const paxgRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=PAXGUSDT', {
        signal: AbortSignal.timeout(3500),
      });
      if (paxgRes.ok) {
        const paxgData = await paxgRes.json();
        const p = parseFloat(paxgData.lastPrice);
        if (!isNaN(p) && p > 1000) {
          goldPrice = p;
          const chg = parseFloat(paxgData.priceChangePercent);
          goldUp = chg >= 0;
          goldChange = `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`;
        }
      }
    }
  } catch (err) {
    // If external gold API fails, try Binance PAXG
    try {
      const paxgRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=PAXGUSDT', {
        signal: AbortSignal.timeout(3000),
      });
      if (paxgRes.ok) {
        const paxgData = await paxgRes.json();
        const p = parseFloat(paxgData.lastPrice);
        if (!isNaN(p) && p > 1000) {
          goldPrice = p;
          const chg = parseFloat(paxgData.priceChangePercent);
          goldUp = chg >= 0;
          goldChange = `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`;
        }
      }
    } catch {
      // Keep baseline
    }
  }

  // 2. Fetch Real Live Crypto (BTC & ETH)
  try {
    const [btcRes, ethRes] = await Promise.allSettled([
      fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', {
        signal: AbortSignal.timeout(3000),
      }),
      fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT', {
        signal: AbortSignal.timeout(3000),
      }),
    ]);

    if (btcRes.status === 'fulfilled' && btcRes.value.ok) {
      const bData = await btcRes.value.json();
      const p = parseFloat(bData.lastPrice);
      const chg = parseFloat(bData.priceChangePercent);
      if (!isNaN(p)) {
        btcPrice = p;
        btcUp = chg >= 0;
        btcChange = `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`;
      }
    }

    if (ethRes.status === 'fulfilled' && ethRes.value.ok) {
      const eData = await ethRes.value.json();
      const p = parseFloat(eData.lastPrice);
      const chg = parseFloat(eData.priceChangePercent);
      if (!isNaN(p)) {
        ethPrice = p;
        ethUp = chg >= 0;
        ethChange = `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`;
      }
    }
  } catch {
    // Keep fallback crypto
  }

  // 3. Fetch Real Forex Rates
  try {
    const fxRes = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: AbortSignal.timeout(3000),
    });
    if (fxRes.ok) {
      const fxData = await fxRes.json();
      if (fxData && fxData.rates) {
        if (fxData.rates.EUR) eurusdPrice = 1 / fxData.rates.EUR;
        if (fxData.rates.GBP) gbpusdPrice = 1 / fxData.rates.GBP;
        if (fxData.rates.JPY) usdjpyPrice = fxData.rates.JPY;
      }
    }
  } catch {
    // Keep fallback fx
  }

  // Format helper
  const fmt = (num: number, decimals = 2) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  // Calculate live ask/bid spreads (VT Markets raw tight spread)
  const tickers: MarketTicker[] = [
    {
      symbol: 'XAUUSD',
      name: 'Gold Spot',
      price: goldPrice,
      bid: fmt(goldPrice - 0.25, 2),
      ask: fmt(goldPrice + 0.25, 2),
      change: goldChange,
      up: goldUp,
      spread: '0.50',
      updatedAt: timestamp,
    },
    {
      symbol: 'EURUSD',
      name: 'Euro / US Dollar',
      price: eurusdPrice,
      bid: fmt(eurusdPrice - 0.00008, 4),
      ask: fmt(eurusdPrice + 0.00008, 4),
      change: '+0.15%',
      up: true,
      spread: '0.16',
      updatedAt: timestamp,
    },
    {
      symbol: 'BTCUSD',
      name: 'Bitcoin',
      price: btcPrice,
      bid: fmt(btcPrice - 2.5, 2),
      ask: fmt(btcPrice + 2.5, 2),
      change: btcChange,
      up: btcUp,
      spread: '5.00',
      updatedAt: timestamp,
    },
    {
      symbol: 'GBPUSD',
      name: 'British Pound',
      price: gbpusdPrice,
      bid: fmt(gbpusdPrice - 0.0001, 4),
      ask: fmt(gbpusdPrice + 0.0001, 4),
      change: '-0.12%',
      up: false,
      spread: '0.20',
      updatedAt: timestamp,
    },
    {
      symbol: 'US30',
      name: 'Wall Street 30',
      price: 43920.50,
      bid: fmt(43919.0, 1),
      ask: fmt(43922.0, 1),
      change: '+0.42%',
      up: true,
      spread: '3.0',
      updatedAt: timestamp,
    },
    {
      symbol: 'ETHUSD',
      name: 'Ethereum',
      price: ethPrice,
      bid: fmt(ethPrice - 0.5, 2),
      ask: fmt(ethPrice + 0.5, 2),
      change: ethChange,
      up: ethUp,
      spread: '1.00',
      updatedAt: timestamp,
    },
    {
      symbol: 'US500',
      name: 'US SPX 500',
      price: 5988.40,
      bid: fmt(5988.1, 2),
      ask: fmt(5988.7, 2),
      change: '+0.58%',
      up: true,
      spread: '0.6',
      updatedAt: timestamp,
    },
    {
      symbol: 'USDJPY',
      name: 'US Dollar / Yen',
      price: usdjpyPrice,
      bid: fmt(usdjpyPrice - 0.015, 3),
      ask: fmt(usdjpyPrice + 0.015, 3),
      change: '+0.22%',
      up: true,
      spread: '0.03',
      updatedAt: timestamp,
    },
  ];

  return NextResponse.json(
    {
      success: true,
      timestamp,
      goldSpotUSD: goldPrice,
      tickers,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
      },
    }
  );
}
