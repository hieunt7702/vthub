'use client';

import React from 'react';
import { Node } from '@xyflow/react';
import { 
  X, 
  Settings2, 
  Sliders, 
  ShieldAlert, 
  TrendingUp, 
  Layers, 
  Clock, 
  Hash, 
  DollarSign,
  Zap,
  Activity
} from 'lucide-react';

interface NodePropertyDrawerProps {
  selectedNode: Node | null;
  onUpdateNodeData: (id: string, newData: any) => void;
  onClose: () => void;
}

export const NodePropertyDrawer: React.FC<NodePropertyDrawerProps> = ({
  selectedNode,
  onUpdateNodeData,
  onClose,
}) => {
  if (!selectedNode) return null;

  const id = selectedNode.id;
  const type = selectedNode.type;
  const data = (selectedNode.data || {}) as Record<string, any>;

  const handleChange = (field: string, value: any) => {
    onUpdateNodeData(id, {
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="absolute right-4 top-4 bottom-4 w-80 rounded-2xl border border-teal-500/30 bg-[#07131a]/95 backdrop-blur-2xl shadow-2xl p-4 flex flex-col z-40 animate-in slide-in-from-right-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-teal-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Settings2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">Cấu Hình Thuộc Tính</h3>
            <p className="text-[10px] text-teal-400 font-mono">Node ID: #{id.slice(0, 8)}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
        {/* START NODE PROPERTIES */}
        {type === 'start' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tên Bot / EA</label>
              <input
                type="text"
                value={data.botName || ''}
                onChange={(e) => handleChange('botName', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-white focus:border-teal-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Cặp Giao Dịch (Symbol)</label>
              <select
                value={data.symbol || 'XAUUSD'}
                onChange={(e) => handleChange('symbol', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-teal-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="XAUUSD">XAUUSD (Vàng Gold)</option>
                <option value="EURUSD">EURUSD</option>
                <option value="GBPUSD">GBPUSD</option>
                <option value="USDJPY">USDJPY</option>
                <option value="BTCUSD">BTCUSD (Crypto)</option>
                <option value="US30">US30 (Dow Jones)</option>
                <option value="NAS100">NAS100 (Nasdaq)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Khung Thời Gian (Timeframe)</label>
              <select
                value={data.timeframe || 'M5'}
                onChange={(e) => handleChange('timeframe', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-emerald-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="M1">M1 (1 Phút - Siêu Scalp)</option>
                <option value="M5">M5 (5 Phút - Khuyên dùng)</option>
                <option value="M15">M15 (15 Phút)</option>
                <option value="M30">M30 (30 Phút)</option>
                <option value="H1">H1 (1 Giờ - Day Trading)</option>
                <option value="H4">H4 (4 Giờ - Swing)</option>
                <option value="D1">D1 (1 Ngày)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Magic Number (ID Quản Lý)</label>
              <input
                type="number"
                value={data.magicNumber || 778899}
                onChange={(e) => handleChange('magicNumber', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-amber-300 focus:border-teal-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* INDICATOR NODE PROPERTIES */}
        {type === 'indicator' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Loại Chỉ Báo</label>
              <select
                value={data.indicator || 'RSI'}
                onChange={(e) => handleChange('indicator', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-cyan-300 focus:border-teal-400 focus:outline-none"
              >
                <optgroup label="── Dao Động (Oscillator) ──">
                  <option value="RSI">RSI (Relative Strength Index)</option>
                  <option value="Stochastic">Stochastic Oscillator</option>
                  <option value="MACD">MACD Oscillator</option>
                  <option value="CCI">CCI (Commodity Channel Index)</option>
                  <option value="WPR">WPR (Williams %Range)</option>
                  <option value="MFI">MFI (Money Flow Index)</option>
                </optgroup>
                <optgroup label="── Xu Hướng (Trend) ──">
                  <option value="EMA">EMA (Exponential Moving Average)</option>
                  <option value="SMA">SMA (Simple Moving Average)</option>
                  <option value="SuperTrend">SuperTrend Trend Filter</option>
                  <option value="ADX">ADX (Average Directional Index)</option>
                  <option value="ParabolicSAR">Parabolic SAR</option>
                  <option value="Ichimoku">Ichimoku Kinko Hyo</option>
                </optgroup>
                <optgroup label="── Biên Độ & Kênh (Channel) ──">
                  <option value="Bollinger">Bollinger Bands</option>
                  <option value="Envelopes">Envelopes (MA Envelope)</option>
                  <option value="ATR">ATR (Average True Range)</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Chu kỳ (Period)</label>
              <input
                type="number"
                value={data.period || 14}
                onChange={(e) => handleChange('period', parseInt(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-white focus:border-teal-400 focus:outline-none"
              />
            </div>

            {data.indicator === 'MACD' && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Fast EMA</label>
                  <input type="number" value={data.periodFast || 12} onChange={(e) => handleChange('periodFast', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-cyan-300 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Slow EMA</label>
                  <input type="number" value={data.periodSlow || 26} onChange={(e) => handleChange('periodSlow', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-purple-300 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Signal SMA</label>
                  <input type="number" value={data.periodSignal || 9} onChange={(e) => handleChange('periodSignal', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-amber-300 font-mono" />
                </div>
              </div>
            )}

            {data.indicator === 'Stochastic' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">%K Period</label>
                  <input type="number" value={data.periodK || 5} onChange={(e) => handleChange('periodK', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-indigo-300 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">%D Smoothing</label>
                  <input type="number" value={data.periodD || 3} onChange={(e) => handleChange('periodD', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-indigo-300 font-mono" />
                </div>
              </div>
            )}

            {data.indicator === 'Ichimoku' && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Tenkan</label>
                  <input type="number" value={data.tenkanPeriod || 9} onChange={(e) => handleChange('tenkanPeriod', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-indigo-300 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Kijun</label>
                  <input type="number" value={data.kijunPeriod || 26} onChange={(e) => handleChange('kijunPeriod', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-indigo-300 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Senkou B</label>
                  <input type="number" value={data.senkouPeriod || 52} onChange={(e) => handleChange('senkouPeriod', parseInt(e.target.value) || 1)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-indigo-300 font-mono" />
                </div>
              </div>
            )}

            {data.indicator === 'SuperTrend' && (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Hệ Số Nhân ATR (Multiplier)</label>
                <input type="number" step="0.1" value={data.multiplier || 3.0} onChange={(e) => handleChange('multiplier', parseFloat(e.target.value) || 1)} className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-rose-300 focus:border-teal-400 focus:outline-none" />
              </div>
            )}

            {(data.indicator === 'Bollinger' || data.indicator === 'Envelopes') && (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">{data.indicator === 'Bollinger' ? 'Độ Lệch Chuẩn (Deviation)' : 'Biên Phần Trăm (%)'}</label>
                <input type="number" step="0.1" value={data.deviation || (data.indicator === 'Bollinger' ? 2.0 : 0.1)} onChange={(e) => handleChange('deviation', parseFloat(e.target.value) || 0.1)} className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-emerald-300 focus:border-teal-400 focus:outline-none" />
              </div>
            )}

            {data.indicator === 'ParabolicSAR' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Step (Bước)</label>
                  <input type="number" step="0.01" value={data.sarStep || 0.02} onChange={(e) => handleChange('sarStep', parseFloat(e.target.value) || 0.02)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-rose-300 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Maximum</label>
                  <input type="number" step="0.01" value={data.sarMaximum || 0.2} onChange={(e) => handleChange('sarMaximum', parseFloat(e.target.value) || 0.2)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-rose-300 font-mono" />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Giá Áp Dụng (Applied Price)</label>
              <select
                value={data.appliedPrice || 'PRICE_CLOSE'}
                onChange={(e) => handleChange('appliedPrice', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
              >
                <option value="PRICE_CLOSE">PRICE_CLOSE (Giá Đóng Cửa)</option>
                <option value="PRICE_OPEN">PRICE_OPEN (Giá Mở Cửa)</option>
                <option value="PRICE_HIGH">PRICE_HIGH (Giá Cao Nhất)</option>
                <option value="PRICE_LOW">PRICE_LOW (Giá Thấp Nhất)</option>
                <option value="PRICE_TYPICAL">PRICE_TYPICAL ((H+L+C)/3)</option>
              </select>
            </div>
          </div>
        )}

        {/* SMC SMART ANALYSIS PROPERTIES */}
        {type === 'smc' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Cơ Chế SMC / Price Action</label>
              <select
                value={data.smcType || 'ORDER_BLOCK'}
                onChange={(e) => handleChange('smcType', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-indigo-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="ORDER_BLOCK">Order Block (OB Vi mô & Vĩ mô)</option>
                <option value="FAIR_VALUE_GAP">Fair Value Gap (FVG Mất Cân Bằng)</option>
                <option value="LIQUIDITY_SWEEP">Liquidity Sweep (Quét Thanh Khoản)</option>
                <option value="BOS_CHOCH">BOS & CHoCH (Đảo Chiều Cấu Trúc)</option>
                <option value="ENGULFING_CANDLE">Nến Nhấn Chìm (Engulfing)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Zone Timeframe</label>
              <select value={data.zoneTimeframe || 'H1'} onChange={(e) => handleChange('zoneTimeframe', e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-indigo-300 font-bold">
                <option value="M15">M15</option>
                <option value="H1">H1 (Khuyên dùng)</option>
                <option value="H4">H4</option>
                <option value="D1">D1</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="mitigationReq" checked={data.mitigationRequired ?? true} onChange={(e) => handleChange('mitigationRequired', e.target.checked)} className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-teal-400 focus:ring-teal-400" />
              <label htmlFor="mitigationReq" className="text-xs text-slate-300 cursor-pointer">Yêu cầu chạm Mitigation trước khi kích hoạt</label>
            </div>
          </div>
        )}

        {/* CONDITION PROPERTIES */}
        {type === 'condition' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Toán Tử Logic</label>
              <select value={data.logicType || 'LESS_THAN'} onChange={(e) => handleChange('logicType', e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-emerald-300 focus:border-teal-400 focus:outline-none">
                <option value="LESS_THAN">Nhỏ Hơn (&lt;)</option>
                <option value="GREATER_THAN">Lớn Hơn (&gt;)</option>
                <option value="CROSS_OVER">Cắt Lên (Cross Over)</option>
                <option value="CROSS_UNDER">Cắt Xuống (Cross Under)</option>
                <option value="PRICE_ABOVE_INDICATOR">Giá Nằm Trên Chỉ Báo</option>
                <option value="PRICE_BELOW_INDICATOR">Giá Nằm Dưới Chỉ Báo</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Chỉ Báo Gốc (Left Operand)</label>
              <input type="text" value={data.leftOperand || ''} onChange={(e) => handleChange('leftOperand', e.target.value)} placeholder="VD: RSI(14), EMA(20)..." className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono text-emerald-300 placeholder-slate-600 focus:border-teal-400 focus:outline-none" />
            </div>
            {(data.logicType === 'CROSS_OVER' || data.logicType === 'CROSS_UNDER') && (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Chỉ Báo So Sánh (Right Operand)</label>
                <input type="text" value={data.rightOperand || ''} onChange={(e) => handleChange('rightOperand', e.target.value)} placeholder="VD: EMA(50), SMA(200)..." className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono text-cyan-300 placeholder-slate-600 focus:border-teal-400 focus:outline-none" />
              </div>
            )}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Ngưỡng So Sánh (Threshold)</label>
              <input type="number" step="any" value={data.threshold ?? 30} onChange={(e) => handleChange('threshold', parseFloat(e.target.value) || 0)} className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-amber-300 focus:border-teal-400 focus:outline-none" />
            </div>
          </div>
        )}

        {/* RISK MANAGEMENT PROPERTIES */}
        {type === 'risk' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Chế Độ Đi Vốn</label>
              <select
                value={data.riskMode || 'FIXED_LOT'}
                onChange={(e) => handleChange('riskMode', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-amber-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="FIXED_LOT">Fixed Lot Size (Lot Cố Định)</option>
                <option value="PERCENT_BALANCE">% Risk Theo Tài Khoản Balance</option>
                <option value="VOLATILITY_ATR">Theo Biến Động ATR</option>
              </select>
            </div>

            {data.riskMode === 'FIXED_LOT' ? (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Khối Lượng Lot (Lot Size)</label>
                <input
                  type="number"
                  step="0.01"
                  value={data.lotSize || 0.05}
                  onChange={(e) => handleChange('lotSize', parseFloat(e.target.value) || 0.01)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-white focus:border-teal-400 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tỷ Lệ Rủi Ro (% Balance)</label>
                <input
                  type="number"
                  step="0.1"
                  value={data.riskPercent || 1.5}
                  onChange={(e) => handleChange('riskPercent', parseFloat(e.target.value) || 1)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-mono font-bold text-emerald-300 focus:border-teal-400 focus:outline-none"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-rose-300 block mb-1">Stop Loss (Pips)</label>
                <input
                  type="number"
                  value={data.stopLossPips || 35}
                  onChange={(e) => handleChange('stopLossPips', parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-rose-500/30 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-rose-300"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-emerald-300 block mb-1">Take Profit (Pips)</label>
                <input
                  type="number"
                  value={data.takeProfitPips || 50}
                  onChange={(e) => handleChange('takeProfitPips', parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-emerald-500/30 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-emerald-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Trailing Stop (Pips)</label>
                <input
                  type="number"
                  value={data.trailingStopPips || 15}
                  onChange={(e) => handleChange('trailingStopPips', parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-cyan-300"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Break-Even (Pips)</label>
                <input
                  type="number"
                  value={data.breakEvenPips || 20}
                  onChange={(e) => handleChange('breakEvenPips', parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-teal-300"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-rose-400 block mb-1">Max Drawdown Circuit Breaker (%)</label>
              <input
                type="number"
                value={data.maxDrawdownPercent || 10}
                onChange={(e) => handleChange('maxDrawdownPercent', parseInt(e.target.value) || 10)}
                className="w-full rounded-xl border border-rose-500/30 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-rose-400"
              />
            </div>
          </div>
        )}

        {/* ORDER EXECUTION PROPERTIES */}
        {type === 'order' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Hành Động Khớp Lệnh (CTrade)</label>
              <select
                value={data.orderAction || 'BUY_MARKET'}
                onChange={(e) => handleChange('orderAction', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-teal-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="BUY_MARKET">BUY MARKET (Mua Trực Tiếp)</option>
                <option value="SELL_MARKET">SELL MARKET (Bán Trực Tiếp)</option>
                <option value="BUY_LIMIT">BUY LIMIT (Chờ Mua Giá Thấp)</option>
                <option value="SELL_LIMIT">SELL LIMIT (Chờ Bán Giá Cao)</option>
                <option value="BUY_STOP">BUY STOP (Chờ Mua Đột Phá)</option>
                <option value="SELL_STOP">SELL STOP (Chờ Bán Đột Phá)</option>
                <option value="CLOSE_ALL">CLOSE ALL (Đóng Toàn Bộ Vị Thế)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Slippage Tối Đa (Points)</label>
              <input
                type="number"
                value={data.slippagePoints || 10}
                onChange={(e) => handleChange('slippagePoints', parseInt(e.target.value) || 10)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-white"
              />
            </div>
          </div>
        )}

        {/* PRICE SOURCE NODE PROPERTIES */}
        {type === 'priceSource' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Loại Giá Nguồn</label>
              <select
                value={data.sourceType || 'CLOSE'}
                onChange={(e) => handleChange('sourceType', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-amber-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="CLOSE">CLOSE (Giá Đóng Cửa)</option>
                <option value="OPEN">OPEN (Giá Mở Cửa)</option>
                <option value="HIGH">HIGH (Giá Cao Nhất)</option>
                <option value="LOW">LOW (Giá Thấp Nhất)</option>
                <option value="ASK">ASK (Giá Hỏi Mua)</option>
                <option value="BID">BID (Giá Chào Bán)</option>
                <option value="SPREAD">SPREAD (Chênh Lệch)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Shift Bar (Độ Trễ)</label>
              <input
                type="number"
                value={data.shift ?? 0}
                onChange={(e) => handleChange('shift', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono font-bold text-amber-300"
              />
            </div>
          </div>
        )}

        {/* FINISH NODE PROPERTIES */}
        {type === 'finish' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">Hành Động Kết Thúc</label>
              <select
                value={data.finishAction || 'ON_TICK_LOOP'}
                onChange={(e) => handleChange('finishAction', e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-teal-300 focus:border-teal-400 focus:outline-none"
              >
                <option value="ON_TICK_LOOP">OnTick() Loop (Lặp Liên Tục)</option>
                <option value="LOG_AND_NOTIFY">Log & Thông Báo</option>
                <option value="SAVE_PROJECT">Lưu Trạng Thái Dự Án</option>
              </select>
            </div>

            <div className="rounded-xl border border-teal-500/20 bg-teal-950/30 p-2.5 text-[11px] text-teal-300">
              <strong className="block mb-1">ℹ️ Ghi chú:</strong>
              <span className="text-slate-400">OnTick() Loop sẽ tự động kiểm tra điều kiện giao dịch mỗi khi có tick mới từ sàn.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
