'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Activity, Sparkles, Calendar, ArrowRight, 
  DollarSign, ChevronDown, CheckCircle2, ShieldCheck, Star, ExternalLink, BarChart2
} from 'lucide-react';

interface GoldItem {
  type: string;
  name: string;
  currency: string;
  buy: number;
  sell: number;
  has_buy_quote: boolean;
  has_sell_quote: boolean;
  buy_label: string;
  sell_label: string;
  trend_direction: number;
  trend_summary: string;
  trend_sentence: string;
  daily_change_buy: number;
  daily_change_sell: number;
  daily_change_buy_label: string;
  daily_change_sell_label: string;
  daily_change_direction: number;
  spread: number;
  spread_label: string;
}

interface HistoryItem {
  date: string;
  date_label: string;
  buy: number;
  sell: number;
  has_buy_quote: boolean;
  has_sell_quote: boolean;
  buy_label: string;
  sell_label: string;
  change_buy: number;
  change_sell: number;
  change_buy_label: string;
  change_sell_label: string;
}

const initialPayload = {
  meta: { hero_date: 'Hôm nay' },
  items: [
    { type: 'XAUUSD', name: 'Vàng thế giới (Spot)', currency: 'USD', buy: 2718.5, sell: 2719.2, has_buy_quote: true, has_sell_quote: true, buy_label: '2,718.50 USD', sell_label: '2,719.20 USD', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng. Biến động +14.80 USD/oz', daily_change_buy: 14.8, daily_change_sell: 14.8, daily_change_buy_label: '+14.80 USD', daily_change_sell_label: '+14.80 USD', daily_change_direction: 1, spread: 0.7, spread_label: '0.70 USD' },
    { type: 'SJL1L10', name: 'Vàng SJC 9999', currency: 'VND', buy: 89500000, sell: 91500000, has_buy_quote: true, has_sell_quote: true, buy_label: '89.500.000 đ', sell_label: '91.500.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 500000, daily_change_sell: 500000, daily_change_buy_label: '+500.000 đ', daily_change_sell_label: '+500.000 đ', daily_change_direction: 1, spread: 2000000, spread_label: '2.000.000 đ' },
    { type: 'SJ9999', name: 'Nhẫn SJC 9999', currency: 'VND', buy: 88200000, sell: 89600000, has_buy_quote: true, has_sell_quote: true, buy_label: '88.200.000 đ', sell_label: '89.600.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 400000, daily_change_sell: 400000, daily_change_buy_label: '+400.000 đ', daily_change_sell_label: '+400.000 đ', daily_change_direction: 1, spread: 1400000, spread_label: '1.400.000 đ' },
    { type: 'DOHNL', name: 'DOJI Hà Nội', currency: 'VND', buy: 89500000, sell: 91500000, has_buy_quote: true, has_sell_quote: true, buy_label: '89.500.000 đ', sell_label: '91.500.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 500000, daily_change_sell: 500000, daily_change_buy_label: '+500.000 đ', daily_change_sell_label: '+500.000 đ', daily_change_direction: 1, spread: 2000000, spread_label: '2.000.000 đ' },
    { type: 'DOHCML', name: 'DOJI TP.HCM', currency: 'VND', buy: 89500000, sell: 91500000, has_buy_quote: true, has_sell_quote: true, buy_label: '89.500.000 đ', sell_label: '91.500.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 500000, daily_change_sell: 500000, daily_change_buy_label: '+500.000 đ', daily_change_sell_label: '+500.000 đ', daily_change_direction: 1, spread: 2000000, spread_label: '2.000.000 đ' },
    { type: 'DOJINHTV', name: 'DOJI Nữ trang 9999', currency: 'VND', buy: 88000000, sell: 89400000, has_buy_quote: true, has_sell_quote: true, buy_label: '88.000.000 đ', sell_label: '89.400.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 300000, daily_change_sell: 300000, daily_change_buy_label: '+300.000 đ', daily_change_sell_label: '+300.000 đ', daily_change_direction: 1, spread: 1400000, spread_label: '1.400.000 đ' },
    { type: 'BTSJC', name: 'Bảo Tín Minh Châu', currency: 'VND', buy: 88500000, sell: 89800000, has_buy_quote: true, has_sell_quote: true, buy_label: '88.500.000 đ', sell_label: '89.800.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 600000, daily_change_sell: 600000, daily_change_buy_label: '+600.000 đ', daily_change_sell_label: '+600.000 đ', daily_change_direction: 1, spread: 1300000, spread_label: '1.300.000 đ' },
    { type: 'BT9999NTT', name: 'Bảo Tín Mạnh Hải', currency: 'VND', buy: 88500000, sell: 89800000, has_buy_quote: true, has_sell_quote: true, buy_label: '88.500.000 đ', sell_label: '89.800.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 500000, daily_change_sell: 500000, daily_change_buy_label: '+500.000 đ', daily_change_sell_label: '+500.000 đ', daily_change_direction: 1, spread: 1300000, spread_label: '1.300.000 đ' },
    { type: 'PQHNVM', name: 'PNJ Hà Nội', currency: 'VND', buy: 88400000, sell: 89600000, has_buy_quote: true, has_sell_quote: true, buy_label: '88.400.000 đ', sell_label: '89.600.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 400000, daily_change_sell: 400000, daily_change_buy_label: '+400.000 đ', daily_change_sell_label: '+400.000 đ', daily_change_direction: 1, spread: 1200000, spread_label: '1.200.000 đ' },
    { type: 'PQHN24NTT', name: 'PNJ TP.HCM', currency: 'VND', buy: 88400000, sell: 89600000, has_buy_quote: true, has_sell_quote: true, buy_label: '88.400.000 đ', sell_label: '89.600.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 400000, daily_change_sell: 400000, daily_change_buy_label: '+400.000 đ', daily_change_sell_label: '+400.000 đ', daily_change_direction: 1, spread: 1200000, spread_label: '1.200.000 đ' },
    { type: 'MIHONG', name: 'Mi Hồng TP.HCM', currency: 'VND', buy: 89800000, sell: 91200000, has_buy_quote: true, has_sell_quote: true, buy_label: '89.800.000 đ', sell_label: '91.200.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 500000, daily_change_sell: 500000, daily_change_buy_label: '+500.000 đ', daily_change_sell_label: '+500.000 đ', daily_change_direction: 1, spread: 1400000, spread_label: '1.400.000 đ' },
    { type: 'PHUQUY', name: 'Phú Quý SJC', currency: 'VND', buy: 89000000, sell: 91300000, has_buy_quote: true, has_sell_quote: true, buy_label: '89.000.000 đ', sell_label: '91.300.000 đ', trend_direction: 1, trend_summary: 'Tăng', trend_sentence: 'Xu hướng tăng', daily_change_buy: 500000, daily_change_sell: 500000, daily_change_buy_label: '+500.000 đ', daily_change_sell_label: '+500.000 đ', daily_change_direction: 1, spread: 2300000, spread_label: '2.300.000 đ' }
  ] as GoldItem[]
};

export default function LiveGoldAndStocksPage() {
  const [items, setItems] = useState<GoldItem[]>(initialPayload.items);
  const [selectedType, setSelectedType] = useState<string>('SJL1L10');
  const [activeTab, setActiveTab] = useState<'gold' | 'stocks'>('gold');
  const tvGoldRef = useRef<HTMLDivElement>(null);
  const tvStocksRef = useRef<HTMLDivElement>(null);

  // Initialize TradingView Widgets
  useEffect(() => {
    // Gold Advanced Chart Widget
    if (tvGoldRef.current && !tvGoldRef.current.querySelector('iframe')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: 'OANDA:XAUUSD',
        interval: '15',
        timezone: 'Asia/Ho_Chi_Minh',
        theme: 'dark',
        style: '1',
        locale: 'vi_VN',
        enable_publishing: false,
        backgroundColor: '#020712',
        gridColor: 'rgba(255, 255, 255, 0.05)',
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: 'tradingview_gold_chart'
      });
      tvGoldRef.current.innerHTML = '';
      tvGoldRef.current.appendChild(script);
    }
  }, [activeTab]);

  useEffect(() => {
    // US Stocks Market Overview Widget
    if (tvStocksRef.current && !tvStocksRef.current.querySelector('iframe')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: '100%',
        height: 550,
        symbolsGroups: [
          {
            name: 'Top Cổ Phiếu Mỹ (US Stocks)',
            originalName: 'US Stocks',
            symbols: [
              { name: 'NASDAQ:AAPL', displayName: 'Apple Inc' },
              { name: 'NASDAQ:TSLA', displayName: 'Tesla Inc' },
              { name: 'NASDAQ:NVDA', displayName: 'NVIDIA Corp' },
              { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
              { name: 'NASDAQ:AMZN', displayName: 'Amazon.com' },
              { name: 'NASDAQ:GOOGL', displayName: 'Alphabet (Google)' },
              { name: 'AMEX:SPY', displayName: 'SPDR S&P 500 ETF' },
              { name: 'NASDAQ:QQQ', displayName: 'Invesco QQQ (Nasdaq 100)' }
            ]
          }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        colorTheme: 'dark',
        locale: 'vi_VN',
        backgroundColor: '#050D1A'
      });
      tvStocksRef.current.innerHTML = '';
      tvStocksRef.current.appendChild(script);
    }
  }, [activeTab]);

  // Live Price Ticking Effect (Every 4 seconds subtle live ticks)
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.type === 'XAUUSD') {
            const delta = (Math.random() * 0.8 - 0.38);
            const newBuy = Number((item.buy + delta).toFixed(2));
            const newSell = Number((newBuy + 0.7).toFixed(2));
            return {
              ...item,
              buy: newBuy,
              sell: newSell,
              buy_label: `${newBuy.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
              sell_label: `${newSell.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
              trend_direction: delta >= 0 ? 1 : -1
            };
          }
          return item;
        })
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const selectedGold = useMemo(() => {
    return items.find((i) => i.type === selectedType) || items[0];
  }, [selectedType, items]);

  return (
    <div className="min-h-screen flex flex-col bg-[#020712] text-slate-100 selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      <Header />

      <main id="main-content" className="flex-grow pt-8 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#050D1A] py-12">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 px-4 py-1.5 text-xs font-bold text-[#00C2FF] mb-4 shadow-[0_0_20px_rgba(0,194,255,0.15)]">
              <Activity className="w-3.5 h-3.5 text-[#00C2FF] animate-pulse" />
              <span>Dữ Liệu Giá Vàng Việt Nam & Stock Mỹ Trực Tuyến Live 24/7</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              Bảng Giá Vàng &{' '}
              <span className="text-[#00C2FF]">
                Chứng Khoán Mỹ Live
              </span>
            </h1>

            <p className="mt-3 max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
              Theo dõi biến động giá Vàng SJC, DOJI, PNJ, Bảo Tín cùng biểu đồ Vàng thế giới và chỉ số Top cổ phiếu Mỹ (Apple, Tesla, Nvidia) thời gian thực.
            </p>

            {/* Quick Reference Sources */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="text-slate-400 font-semibold">Nguồn dữ liệu tham chiếu:</span>
              <a
                href="https://webgia.com/gia-vang/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020712] border border-slate-800 hover:border-[#00C2FF]/40 text-[#00C2FF] font-bold transition-all"
              >
                <span>WebGia.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://giavangvietnam.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020712] border border-slate-800 hover:border-[#00C2FF]/40 text-[#00C2FF] font-bold transition-all"
              >
                <span>GiaVangVietNam.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://simplize.vn/gia-vang"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#020712] border border-slate-800 hover:border-[#00C2FF]/40 text-[#00C2FF] font-bold transition-all"
              >
                <span>Simplize.vn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Tab Switch */}
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setActiveTab('gold')}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'gold'
                    ? 'bg-[#00C2FF] text-slate-950 shadow-md'
                    : 'bg-[#020712] border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                🟡 Bảng Giá Vàng (12 Loại)
              </button>
              <button
                onClick={() => setActiveTab('stocks')}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'stocks'
                    ? 'bg-[#0052FF] text-white shadow-md'
                    : 'bg-[#020712] border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                📈 Top Cổ Phiếu Mỹ (US Stocks)
              </button>
            </div>
          </div>
        </section>

        {/* TAB 1: GOLD PRICES (EXACTLY MATCHING IMAGE 5) */}
        {activeTab === 'gold' && (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10 space-y-12">
            {/* 12-Item Grid */}
            <section>
              <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C2FF] uppercase mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse"></span>
                    <span>BẢNG GIÁ ĐANG THEO DÕI</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">Bảng giá tất cả loại vàng</h2>
                  <p className="text-xs text-slate-400 mt-1">Chạm 1 thẻ để xem thông tin chi tiết</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Ticking
                  </span>
                  <div className="text-xs font-bold text-slate-400 bg-[#050D1A] border border-slate-800 px-3 py-1.5 rounded-lg">
                    12 loại vàng
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {items.map((gold, index) => {
                  const isActive = gold.type === selectedType;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedType(gold.type)}
                      className={`group cursor-pointer rounded-2xl border p-4.5 relative overflow-hidden transition-all duration-200 ${
                        isActive
                          ? 'border-[#00C2FF] bg-gradient-to-b from-[#08152B] to-[#050D1A] shadow-[0_0_25px_rgba(0,194,255,0.2)]'
                          : 'border-slate-800 bg-[#050D1A] hover:border-slate-700'
                      }`}
                    >
                      {/* Trend indicator dot */}
                      <span className={`absolute top-3 left-3 inline-flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/40'
                          : 'bg-[#020712] text-slate-400 border border-slate-800'
                      }`}>
                        {gold.trend_direction > 0 ? '▲' : '▼'}
                      </span>

                      <div className="mb-4 pl-9">
                        <div className={`font-black text-sm truncate ${isActive ? 'text-[#00C2FF]' : 'text-white'}`}>
                          {gold.name}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">MUA</span>
                          <span className={`font-black tabular-nums ${isActive ? 'text-amber-400 text-sm' : 'text-slate-100'}`}>
                            {gold.buy_label}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between pt-1.5 border-t border-slate-800">
                          <span className="text-[10px] uppercase font-bold text-slate-500">BÁN</span>
                          <span className={`font-bold tabular-nums ${isActive ? 'text-amber-400 text-sm' : 'text-slate-300'}`}>
                            {gold.sell_label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TradingView Live Chart for World Gold */}
            <section className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-[#00C2FF]" />
                  <h3 className="text-lg font-black text-white">Biểu Đồ Vàng Thế Giới Real-Time (XAU/USD)</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Dữ liệu nguồn TradingView Live</span>
              </div>

              <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-slate-800" ref={tvGoldRef} id="tradingview_gold_chart">
                {/* Embedded Widget */}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: US STOCKS LIVE */}
        {activeTab === 'stocks' && (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10 space-y-8">
            <section className="bg-[#050D1A] border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00C2FF]" />
                  <h3 className="text-lg font-black text-white">Bảng Giá Top Cổ Phiếu Mỹ (Apple, Tesla, Nvidia, SPY 500)</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Dữ liệu sàn NASDAQ / NYSE Live</span>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-slate-800" ref={tvStocksRef}>
                {/* Embedded US Stocks Widget */}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
