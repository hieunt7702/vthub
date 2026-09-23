"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

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
  meta: { hero_date: "30/05/2026" },
  items: [
    { type: "XAUUSD", name: "Vàng thế giới", currency: "USD", buy: 4560, sell: 0, has_buy_quote: true, has_sell_quote: false, buy_label: "4,560.00 USD", sell_label: "-", trend_direction: 1, trend_summary: "Tăng", trend_sentence: "Xu hướng tăng. Biến động +5.50 USD", daily_change_buy: 5.5, daily_change_sell: 0, daily_change_buy_label: "+5.50 USD", daily_change_sell_label: "-", daily_change_direction: 1, spread: 0, spread_label: "-" },
    { type: "SJL1L10", name: "Vàng SJC 9999", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "SJ9999", name: "Nhẫn SJC 9999", currency: "VND", buy: 155300000, sell: 158300000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.300.000 đ", sell_label: "158.300.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "DOHNL", name: "DOJI Hà Nội", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "DOHCML", name: "DOJI HCM", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "DOJINHTV", name: "DOJI Nữ trang", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "BTSJC", name: "Bảo Tín SJC", currency: "VND", buy: 155000000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.000.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3500000, spread_label: "3.500.000 đ" },
    { type: "BT9999NTT", name: "Bảo Tín 9999", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "PQHNVM", name: "PNJ Hà Nội", currency: "VND", buy: 155000000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.000.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3500000, spread_label: "3.500.000 đ" },
    { type: "PQHN24NTT", name: "PNJ 24K", currency: "VND", buy: 155000000, sell: 158000000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.000.000 đ", sell_label: "158.000.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "VNGSJC", name: "VN Gold SJC", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" },
    { type: "VIETTINMSJC", name: "Vietin SJC", currency: "VND", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", trend_direction: 0, trend_summary: "Ổn định", trend_sentence: "Xu hướng ổn định. Biến động 0 đ", daily_change_buy: 0, daily_change_sell: 0, daily_change_buy_label: "0 đ", daily_change_sell_label: "0 đ", daily_change_direction: 0, spread: 3000000, spread_label: "3.000.000 đ" }
  ] as GoldItem[],
  history: [
    { date: "2026-05-24", date_label: "24/05/2026", buy: 158500000, sell: 161500000, has_buy_quote: true, has_sell_quote: true, buy_label: "158.500.000 đ", sell_label: "161.500.000 đ", change_buy: 0, change_sell: 0, change_buy_label: "0 đ", change_sell_label: "0 đ" },
    { date: "2026-05-25", date_label: "25/05/2026", buy: 159000000, sell: 162000000, has_buy_quote: true, has_sell_quote: true, buy_label: "159.000.000 đ", sell_label: "162.000.000 đ", change_buy: 500000, change_sell: 500000, change_buy_label: "+500.000 đ", change_sell_label: "+500.000 đ" },
    { date: "2026-05-26", date_label: "26/05/2026", buy: 158500000, sell: 161500000, has_buy_quote: true, has_sell_quote: true, buy_label: "158.500.000 đ", sell_label: "161.500.000 đ", change_buy: -500000, change_sell: -500000, change_buy_label: "-500.000 đ", change_sell_label: "-500.000 đ" },
    { date: "2026-05-27", date_label: "27/05/2026", buy: 157700000, sell: 160700000, has_buy_quote: true, has_sell_quote: true, buy_label: "157.700.000 đ", sell_label: "160.700.000 đ", change_buy: -800000, change_sell: -800000, change_buy_label: "-800.000 đ", change_sell_label: "-800.000 đ" },
    { date: "2026-05-28", date_label: "28/05/2026", buy: 154500000, sell: 157500000, has_buy_quote: true, has_sell_quote: true, buy_label: "154.500.000 đ", sell_label: "157.500.000 đ", change_buy: -3200000, change_sell: -3200000, change_buy_label: "-3.200.000 đ", change_sell_label: "-3.200.000 đ" },
    { date: "2026-05-29", date_label: "29/05/2026", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", change_buy: 1000000, change_sell: 1000000, change_buy_label: "+1.000.000 đ", change_sell_label: "+1.000.000 đ" },
    { date: "2026-05-30", date_label: "30/05/2026", buy: 155500000, sell: 158500000, has_buy_quote: true, has_sell_quote: true, buy_label: "155.500.000 đ", sell_label: "158.500.000 đ", change_buy: 0, change_sell: 0, change_buy_label: "0 đ", change_sell_label: "0 đ" }
  ] as HistoryItem[]
};

const mapApiItem = (type: string, name: string, apiItem: any): GoldItem => {
  const buy = apiItem.buy || 0;
  const sell = apiItem.sell || 0;
  const currency = apiItem.currency || "VND";
  const daily_change_buy = apiItem.change_buy || 0;
  const daily_change_sell = apiItem.change_sell || 0;

  const has_buy_quote = buy > 0;
  const has_sell_quote = sell > 0;

  const buy_label = has_buy_quote
    ? (currency === "USD" ? `${buy.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` : `${buy.toLocaleString("vi-VN")} đ`)
    : "-";

  const sell_label = has_sell_quote
    ? (currency === "USD" ? `${sell.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` : `${sell.toLocaleString("vi-VN")} đ`)
    : "-";

  const spread = (has_buy_quote && has_sell_quote) ? Math.max(0, sell - buy) : 0;
  const spread_label = spread > 0
    ? (currency === "USD" ? `${spread.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` : `${spread.toLocaleString("vi-VN")} đ`)
    : "-";

  const trend_direction = daily_change_buy > 0 ? 1 : daily_change_buy < 0 ? -1 : 0;
  const trend_summary = trend_direction === 1 ? "Tăng" : trend_direction === -1 ? "Giảm" : "Ổn định";

  const daily_change_buy_label = daily_change_buy !== 0
    ? `${daily_change_buy > 0 ? "+" : ""}${currency === "USD" ? daily_change_buy.toLocaleString("en-US", { minimumFractionDigits: 2 }) : daily_change_buy.toLocaleString("vi-VN")} ${currency === "USD" ? "USD" : "đ"}`
    : `0 ${currency === "USD" ? "USD" : "đ"}`;

  const daily_change_sell_label = daily_change_sell !== 0
    ? `${daily_change_sell > 0 ? "+" : ""}${currency === "USD" ? daily_change_sell.toLocaleString("en-US", { minimumFractionDigits: 2 }) : daily_change_sell.toLocaleString("vi-VN")} ${currency === "USD" ? "USD" : "đ"}`
    : `0 ${currency === "USD" ? "USD" : "đ"}`;

  const trend_sentence = trend_direction === 1
    ? `Xu hướng tăng. Biến động ${daily_change_buy_label}`
    : trend_direction === -1
    ? `Xu hướng giảm. Biến động ${daily_change_buy_label}`
    : "Xu hướng ổn định. Biến động 0 đ";

  return {
    type,
    name,
    currency,
    buy,
    sell,
    has_buy_quote,
    has_sell_quote,
    buy_label,
    sell_label,
    trend_direction,
    trend_summary,
    trend_sentence,
    daily_change_buy,
    daily_change_sell,
    daily_change_buy_label,
    daily_change_sell_label,
    daily_change_direction: trend_direction,
    spread,
    spread_label
  };
};

export default function GoldPricesPage() {
  const [selectedType, setSelectedType] = useState<string>("SJL1L10");
  const [timePeriod, setTimePeriod] = useState<number>(7);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [items, setItems] = useState<GoldItem[]>(initialPayload.items);
  const [metaDate, setMetaDate] = useState<string>(initialPayload.meta.hero_date);
  const [apiHistory, setApiHistory] = useState<HistoryItem[]>(initialPayload.history);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLivePrices = async () => {
    try {
      const res = await fetch("https://giavang.now/api/prices");
      if (!res.ok) throw new Error("Failed to fetch prices");
      const data = await res.json();
      if (data.success && data.prices) {
        const mappedItems = initialPayload.items.map(item => {
          const apiItem = data.prices[item.type];
          if (apiItem) {
            return mapApiItem(item.type, item.name, apiItem);
          }
          return item;
        });
        setItems(mappedItems);

        if (data.date) {
          const parts = data.date.split("-");
          if (parts.length === 3) {
            setMetaDate(`${parts[2]}/${parts[1]}/${parts[0]}`);
          } else {
            setMetaDate(data.date);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching live prices:", err);
    }
  };

  const fetchHistory = async (type: string) => {
    try {
      const res = await fetch(`https://giavang.now/api/prices?type=${type}&days=30`);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      if (data.success && Array.isArray(data.history)) {
        const currentItem = items.find(item => item.type === type) || initialPayload.items.find(item => item.type === type)!;
        const currency = currentItem.currency || "VND";

        const mappedHistory = data.history.map((h: any) => {
          const date = h.date;
          const parts = date.split("-");
          const date_label = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : date;

          const p = h.prices[type] || {};
          const buy = p.buy || 0;
          const sell = p.sell || 0;
          const change_buy = p.day_change_buy || 0;
          const change_sell = p.day_change_sell || 0;

          const buy_label = buy > 0
            ? (currency === "USD" ? `${buy.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` : `${buy.toLocaleString("vi-VN")} đ`)
            : "-";
          const sell_label = sell > 0
            ? (currency === "USD" ? `${sell.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD` : `${sell.toLocaleString("vi-VN")} đ`)
            : "-";

          const change_buy_label = change_buy !== 0
            ? `${change_buy > 0 ? "+" : ""}${currency === "USD" ? change_buy.toLocaleString("en-US", { minimumFractionDigits: 2 }) : change_buy.toLocaleString("vi-VN")} ${currency === "USD" ? "USD" : "đ"}`
            : `0 ${currency === "USD" ? "USD" : "đ"}`;

          const change_sell_label = change_sell !== 0
            ? `${change_sell > 0 ? "+" : ""}${currency === "USD" ? change_sell.toLocaleString("en-US", { minimumFractionDigits: 2 }) : change_sell.toLocaleString("vi-VN")} ${currency === "USD" ? "USD" : "đ"}`
            : `0 ${currency === "USD" ? "USD" : "đ"}`;

          return {
            date,
            date_label,
            buy,
            sell,
            has_buy_quote: buy > 0,
            has_sell_quote: sell > 0,
            buy_label,
            sell_label,
            change_buy,
            change_sell,
            change_buy_label,
            change_sell_label
          };
        });

        setApiHistory([...mappedHistory].reverse());
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await fetchLivePrices();
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    fetchHistory(selectedType);
  }, [selectedType]);

  const selectedItem = useMemo<GoldItem>(() => {
    return items.find(item => item.type === selectedType) || items[1]!;
  }, [selectedType, items]);

  const historyData = useMemo(() => {
    return apiHistory.slice(-timePeriod);
  }, [apiHistory, timePeriod]);

  const stats = useMemo(() => {
    const buys = historyData.map(h => h.buy).filter(b => b > 0);
    if (buys.length === 0) {
      return {
        highLabel: "-",
        lowLabel: "-",
        volatility: "0.00%",
        changePct: "0.00%",
        changeDirection: 0
      };
    }
    const high = Math.max(...buys);
    const low = Math.min(...buys);
    const lastBuy = buys[buys.length - 1]!;
    const firstBuy = buys[0]!;
    const change = lastBuy - firstBuy;
    const changePct = firstBuy !== 0 ? ((change / firstBuy) * 100).toFixed(2) : "0.00";

    const highLabel = selectedItem.currency === "USD"
      ? `${high.toLocaleString("en-US")} USD`
      : `${high.toLocaleString("vi-VN")} đ`;

    const lowLabel = selectedItem.currency === "USD"
      ? `${low.toLocaleString("en-US")} USD`
      : `${low.toLocaleString("vi-VN")} đ`;

    return {
      highLabel,
      lowLabel,
      volatility: "2.91%",
      changePct: `${change >= 0 ? "+" : ""}${changePct}%`,
      changeDirection: change >= 0 ? 1 : -1
    };
  }, [historyData, selectedItem]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLivePrices();
    await fetchHistory(selectedType);
    setIsRefreshing(false);
  };

  // Compute SVG Polyline Points beautifully
  const chartSvgData = useMemo(() => {
    if (!historyData || historyData.length === 0) return { buyPoints: "", sellPoints: "", buyDots: [] as { cx: number; cy: number }[], yTicks: [] as { y: number; val: string }[] };
    const width = 560;
    const height = 280;
    const paddingX = 60;
    const paddingY = 30;

    const buys = historyData.map(h => h.buy);
    const sells = historyData.map(h => h.sell).filter(s => s > 0);

    const maxVal = Math.max(...buys, ...sells);
    const minVal = Math.min(...buys, ...sells);
    const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    const getX = (index: number) => {
      if (historyData.length <= 1) return width / 2;
      return paddingX + (index * (width - 2 * paddingX)) / (historyData.length - 1);
    };

    const getY = (val: number) => {
      return paddingY + ((width - 280) - ((val - minVal) / range) * (height - 2 * paddingY));
    };

    const buyPoints = historyData.map((h, i) => `${getX(i)},${getY(h.buy)}`).join(" ");
    const buyDots = historyData.map((h, i) => ({ cx: getX(i), cy: getY(h.buy), val: h.buy_label }));

    let sellPoints = "";
    if (selectedItem.has_sell_quote) {
      sellPoints = historyData.map((h, i) => `${getX(i)},${getY(h.sell)}`).join(" ");
    }

    const formatTick = (val: number) => {
      if (selectedItem.currency === "USD") {
        return `${Math.round(val).toLocaleString("en-US")}`;
      }
      return `${(val / 1000000).toFixed(1)}M`;
    };

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(pct => {
      const val = minVal + pct * range;
      return {
        y: paddingY + (1 - pct) * (height - 2 * paddingY),
        val: formatTick(val)
      };
    });

    // Area path points
    const areaPoints = historyData.length > 0
      ? `M ${getX(0)} 280 ` + historyData.map((h, i) => `L ${getX(i)} ${getY(h.buy)}`).join(" ") + ` L ${getX(historyData.length - 1)} 280 Z`
      : "";

    return { buyPoints, sellPoints, buyDots, yTicks, areaPoints };
  }, [historyData, selectedItem]);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow  bg-[#090A0C]">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 hh-hero-bg opacity-25"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5"></div>
          <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
            <div className="grid lg:grid-cols-2 gap-10 items-start">

              {/* Left Column: Live Gold Data Display */}
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    LIVE
                  </div>
                  <span className="text-xs text-zinc-500">{metaDate}</span>

                  <button
                    type="button"
                    onClick={handleRefresh}
                    className={`ml-auto rounded border border-white/10 bg-white/5 p-2 text-zinc-400 hover:border-amber-400/40 hover:text-amber-300 transition ${isRefreshing ? "animate-spin text-amber-400" : ""}`}
                    aria-label="Làm mới"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                </div>

                <div className="text-xs uppercase tracking-[0.15em] text-amber-300/70 mb-2">Bảng giá trực tuyến</div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{selectedItem.name}</h1>

                <div className="mt-6 flex items-baseline gap-3 flex-wrap">
                  <div className="text-5xl md:text-7xl font-extrabold leading-none bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 bg-clip-text text-transparent tabular-nums">
                    {selectedItem.buy_label}
                  </div>
                  <div className={`rounded-full px-3 py-1 text-sm font-bold inline-flex items-center gap-1.5 border border-white/10 ${selectedItem.trend_direction === 1 ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-zinc-300"}`}>
                    <span>{selectedItem.trend_summary}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded border border-white/10 bg-white/[0.03] p-4 text-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Bán</span>
                    <span className="block mt-1 font-bold text-white text-sm tabular-nums">{selectedItem.sell_label}</span>
                  </div>
                  <div className="rounded border border-white/10 bg-white/[0.03] p-4 text-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Chênh lệch</span>
                    <span className="block mt-1 font-bold text-white text-sm tabular-nums">{selectedItem.spread_label}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic SVG Chart */}
              <div className="rounded border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-5 lg:p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-amber-300/80 font-bold mb-1">📈 Lịch sử gần đây</div>
                    <div className="text-sm text-zinc-400">{selectedItem.name}</div>
                  </div>
                  <div className="flex gap-1" role="tablist">
                    {[1, 3, 7, 14, 30].map((days) => (
                      <button
                        key={days}
                        type="button"
                        role="tab"
                        onClick={() => setTimePeriod(days)}
                        className={`rounded px-2.5 py-1 text-[11px] font-bold transition ${timePeriod === days ? "bg-amber-500 text-zinc-950" : "text-zinc-400 hover:text-amber-300"
                          }`}
                      >
                        {days}D
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 text-xs mb-2">
                  <span className="text-orange-400 font-bold">● Mua</span>
                  {selectedItem.has_sell_quote && (
                    <span className="text-slate-400 font-bold">-- Bán</span>
                  )}
                </div>

                <div className="gp-chart h-[260px] lg:h-[280px] w-full">
                  <svg viewBox="0 0 560 320" className="w-full h-full" role="img" aria-label="Lịch sử gần đây">
                    <defs>
                      <linearGradient id="gpBuyArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(244, 109, 0, 0.22)"></stop>
                        <stop offset="100%" stopColor="rgba(244, 109, 0, 0.02)"></stop>
                      </linearGradient>
                    </defs>

                    {/* Y-axis Ticks and Grid lines */}
                    {chartSvgData.yTicks.map((tick, i) => (
                      <g key={i}>
                        <line x1="56" y1={tick.y} x2="546" y2={tick.y} stroke="rgba(148, 163, 184, 0.18)" strokeWidth="1" strokeDasharray={i === chartSvgData.yTicks.length - 1 ? "0" : "5 7"}></line>
                        <text x="14" y={tick.y + 4} fill="#667085" fontSize="11" fontWeight="700">{tick.val}</text>
                      </g>
                    ))}

                    {/* Gradient Area under Buy line */}
                    {chartSvgData.areaPoints && (
                      <path d={chartSvgData.areaPoints} fill="url(#gpBuyArea)" stroke="none"></path>
                    )}

                    {/* Polyline for Buy Price */}
                    {chartSvgData.buyPoints && (
                      <polyline fill="none" stroke="#F46D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={chartSvgData.buyPoints}></polyline>
                    )}

                    {/* Polyline for Sell Price (dashed if active) */}
                    {selectedItem.has_sell_quote && chartSvgData.sellPoints && (
                      <polyline fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" points={chartSvgData.sellPoints}></polyline>
                    )}

                    {/* Circular points for Buy */}
                    {chartSvgData.buyDots.map((dot, i) => (
                      <circle key={i} cx={dot.cx} cy={dot.cy} r="4" fill="#F46D00" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5"></circle>
                    ))}

                    {/* Bottom X-axis Dates */}
                    {historyData.length > 0 && (
                      <>
                        <text x="56" y="312" fill="#667085" fontSize="11" fontWeight="600" textAnchor="start">{historyData[0]!.date_label}</text>
                        {historyData.length > 2 && (
                          <text x="301" y="312" fill="#667085" fontSize="11" fontWeight="600" textAnchor="middle">{historyData[Math.floor(historyData.length / 2)]!.date_label}</text>
                        )}
                        <text x="546" y="312" fill="#667085" fontSize="11" fontWeight="600" textAnchor="end">{historyData[historyData.length - 1]!.date_label}</text>
                      </>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Metrics Table */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16 space-y-14">

          {/* Market Stats */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold mb-4">📊 Tổng quan thị trường</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Cao nhất</span>
                </div>
                <div className="text-xl md:text-2xl font-extrabold text-emerald-200 tabular-nums">{stats.highLabel}</div>
              </div>

              <div className="rounded border border-rose-400/20 bg-gradient-to-br from-rose-500/10 to-rose-500/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-wider text-rose-300 font-bold">Thấp nhất</span>
                </div>
                <div className="text-xl md:text-2xl font-extrabold text-rose-200 tabular-nums">{stats.lowLabel}</div>
              </div>

              <div className="rounded border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13l4-4L17 19M21 5l-4 4" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Biến động</span>
                </div>
                <div className="text-xl md:text-2xl font-extrabold text-white tabular-nums">{stats.volatility}</div>
              </div>

              <div className={`rounded border p-5 ${stats.changeDirection >= 0 ? "border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/[0.02]" : "border-rose-400/20 bg-gradient-to-br from-rose-500/10 to-rose-500/[0.02]"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${stats.changeDirection >= 0 ? "text-emerald-300" : "text-rose-300"}`}>Δ giai đoạn</span>
                </div>
                <div className={`text-xl md:text-2xl font-extrabold tabular-nums ${stats.changeDirection >= 0 ? "text-emerald-200" : "text-rose-200"}`}>{stats.changePct}</div>
              </div>
            </div>
          </section>

          {/* Gold prices card-based table list */}
          <section>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 mb-2">
                  🏷️ Bảng giá đang theo dõi
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Bảng giá tất cả loại vàng</h2>
                <p className="text-sm text-zinc-400 mt-1">Click 1 thẻ để xem biểu đồ loại đó</p>
              </div>
              <div className="text-xs text-zinc-500">12 loại</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((gold, index) => {
                const isActive = gold.type === selectedType;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedType(gold.type)}
                    className={`group cursor-pointer rounded border p-5 relative overflow-hidden transition-all duration-200 hover:border-amber-400/40 hover:shadow-xl hover:shadow-orange-500/10 ${isActive
                        ? "border-amber-400/50 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent shadow-lg shadow-amber-500/20"
                        : "border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01]"
                      }`}
                  >
                    <span className={`absolute top-3 left-3 inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${gold.trend_direction === 1
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/5 text-zinc-500 border border-white/10"
                      }`}>
                      {gold.trend_direction === 1 ? "▲" : "─"}
                    </span>

                    <div className="mb-4 pl-11">
                      <div className={`font-extrabold text-base transition truncate ${isActive ? "text-amber-200" : "text-white"}`}>
                        {gold.name}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-[10px] uppercase tracking-wider text-amber-300/70 font-bold">Mua</span>
                        <span className="font-extrabold tabular-nums text-white">{gold.buy_label}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm pt-2 border-t border-white/5">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Bán</span>
                        <span className="font-bold tabular-nums text-zinc-300">{gold.sell_label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* History Collapsible Table */}
          <details className="rounded border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] group overflow-hidden">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-6 py-5 hover:bg-white/[0.03] transition select-none">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-lg">📅</span>
                <div>
                  <div className="font-semibold text-white">Bảng lịch sử</div>
                  <div className="text-xs text-zinc-500">Mở để xem dữ liệu lịch sử chi tiết</div>
                </div>
              </div>
              <svg className="h-5 w-5 text-zinc-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="border-t border-white/10">
              <div>
                <div className="grid gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-3 text-[11px] uppercase tracking-wider text-zinc-500 font-bold" style={{ gridTemplateColumns: "minmax(140px, 1fr) 1fr 1fr" }}>
                  <div>Ngày</div>
                  <div className="text-right">Mua</div>
                  <div className="text-right">Bán</div>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {historyData.map((history, idx) => (
                  <div key={idx} className="grid gap-4 px-6 py-3 hover:bg-white/[0.02] transition text-sm" style={{ gridTemplateColumns: "minmax(140px, 1fr) 1fr 1fr" }}>
                    <div className="text-zinc-300">{history.date_label}</div>
                    <div className="text-right text-zinc-100 tabular-nums">{history.buy_label}</div>
                    <div className="text-right text-zinc-100 tabular-nums">{history.sell_label}</div>
                  </div>
                ))}
              </div>
            </div>
          </details>

          {/* Top Gold Broker Section */}
          <section className="pt-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300 mb-3">
                  🥇 TOP BROKER GIAO DỊCH VÀNG
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Giao dịch{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">XAU/USD</span>{" "}
                  với spread tốt nhất
                </h2>
                <p className="text-sm text-zinc-400 mt-2 max-w-xl">Broker có spread XAU/USD tốt nhất đang được HieuNTHUB đàm phán rebate.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* VT Markets Card */}
              <article className="group relative overflow-hidden rounded border border-orange-400/30 bg-gradient-to-b from-orange-500/10 to-amber-500/[0.02] hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/20 p-6 transition">
                <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 px-2.5 py-1 text-[10px] font-bold">TOP</div>
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://hieunthub.co/uploads/brokers/logos/vt-markets-logo-v3.png" alt="VT Markets" className="h-14 w-14 rounded object-cover" loading="lazy" decoding="async" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-orange-300 transition truncate">VT Markets</h3>
                    <div className="text-xs text-amber-400 mt-0.5">★ 4.8/5</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                  <div className="rounded bg-white/5 border border-white/10 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">Spread XAU/USD</div>
                    <div className="font-bold text-white tabular-nums">15-20</div>
                  </div>
                  <div className="rounded bg-emerald-500/10 border border-emerald-400/20 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-300 mb-0.5">Rebate</div>
                    <div className="font-bold text-emerald-200 tabular-nums">12</div>
                  </div>
                </div>
                <Link className="flex items-center justify-center gap-2 w-full rounded bg-gradient-to-r from-orange-400 to-amber-600 px-4 py-3 text-sm font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/20" href="/brokers/danh-gia-vt-markets">
                  Xem chi tiết
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </article>

              {/* ETO Markets Card */}
              <article className="group relative overflow-hidden rounded border border-orange-400/30 bg-gradient-to-b from-orange-500/10 to-amber-500/[0.02] hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/20 p-6 transition">
                <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-zinc-950 px-2.5 py-1 text-[10px] font-bold">TOP</div>
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://hieunthub.co/uploads/brokers/logos/01KJ4T0M44H5R139ZV71CV1W24.webp" alt="ETO Markets" className="h-14 w-14 rounded object-cover" loading="lazy" decoding="async" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-orange-300 transition truncate">ETO Markets</h3>
                    <div className="text-xs text-amber-400 mt-0.5">★ 4.2/5</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                  <div className="rounded bg-white/5 border border-white/10 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">Spread XAU/USD</div>
                    <div className="font-bold text-white tabular-nums">27-52</div>
                  </div>
                  <div className="rounded bg-emerald-500/10 border border-emerald-400/20 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-300 mb-0.5">Rebate</div>
                    <div className="font-bold text-emerald-200 tabular-nums">$13-$37</div>
                  </div>
                </div>
                <Link className="flex items-center justify-center gap-2 w-full rounded bg-gradient-to-r from-orange-400 to-amber-600 px-4 py-3 text-sm font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/20" href="/brokers/danh-gia-eto-markets">
                  Xem chi tiết
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </article>

              {/* XM Card */}
              <article className="group relative overflow-hidden rounded border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10 p-6 transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://hieunthub.co/uploads/brokers/logos/01KJ48JWVDN98XB13Z5EW066SX.webp" alt="XM" className="h-14 w-14 rounded object-cover" loading="lazy" decoding="async" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-orange-300 transition truncate">XM</h3>
                    <div className="text-xs text-amber-400 mt-0.5">★ 4.7/5</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                  <div className="rounded bg-white/5 border border-white/10 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">Spread XAU/USD</div>
                    <div className="font-bold text-white tabular-nums">40-45</div>
                  </div>
                  <div className="rounded bg-emerald-500/10 border border-emerald-400/20 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-300 mb-0.5">Rebate</div>
                    <div className="font-bold text-emerald-200 tabular-nums">$17</div>
                  </div>
                </div>
                <Link className="flex items-center justify-center gap-2 w-full rounded bg-gradient-to-r from-orange-400 to-amber-600 px-4 py-3 text-sm font-bold text-zinc-950 hover:from-orange-300 hover:to-amber-500 transition shadow-lg shadow-orange-500/20" href="/brokers/danh-gia-xm">
                  Xem chi tiết
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </article>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
