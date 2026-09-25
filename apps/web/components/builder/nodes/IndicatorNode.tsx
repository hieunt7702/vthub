'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Activity, Sliders, Trash2, TrendingUp, BarChart2 } from 'lucide-react';
import { NodeIndicatorData } from '@/types/builder';

export const IndicatorNode = memo(({ data, selected }: { data: NodeIndicatorData; selected?: boolean }) => {
  const getIndicatorColor = () => {
    switch (data.indicator) {
      case 'RSI':
      case 'WPR':
      case 'MFI':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'EMA':
      case 'SMA':
      case 'Envelopes':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'MACD':
      case 'CCI':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'Bollinger':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'ATR':
      case 'SuperTrend':
      case 'ParabolicSAR':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'ADX':
        return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'Ichimoku':
      case 'Stochastic':
        return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
      default:
        return 'text-teal-400 border-teal-500/30 bg-teal-500/10';
    }
  };

  return (
    <div
      className={`relative min-w-[260px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-cyan-400 bg-cyan-950/80 shadow-cyan-500/20 ring-2 ring-cyan-500/40'
          : 'border-slate-800 bg-[#061219]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="flow_in"
        className="!h-3 !w-3 !rounded-full !border-2 !border-cyan-400 !bg-slate-950 hover:!scale-125 transition-transform"
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${getIndicatorColor()}`}>
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Chỉ Báo Kỹ Thuật MT5</div>
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>{data.indicator || 'RSI'}</span>
              <span className="text-[10px] text-cyan-400 font-mono">({data.period || 14})</span>
            </div>
          </div>
        </div>
        {data.onDelete && (
          <button
            onClick={data.onDelete}
            className="rounded p-1 text-slate-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            title="Xóa Node"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 p-3.5 text-xs">
        <div className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/60 px-2.5 py-1.5">
          <span className="text-slate-400 flex items-center gap-1">
            <Sliders className="h-3 w-3 text-cyan-400" /> Giá áp dụng:
          </span>
          <span className="font-mono font-semibold text-slate-200">{data.appliedPrice || 'PRICE_CLOSE'}</span>
        </div>

        {data.indicator === 'MACD' && (
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-center">
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Fast</span>
              <span className="text-cyan-300 font-bold">{data.periodFast || 12}</span>
            </div>
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Slow</span>
              <span className="text-purple-300 font-bold">{data.periodSlow || 26}</span>
            </div>
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Signal</span>
              <span className="text-amber-300 font-bold">{data.periodSignal || 9}</span>
            </div>
          </div>
        )}

        {data.indicator === 'Stochastic' && (
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-center">
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">%K Period</span>
              <span className="text-indigo-300 font-bold">{data.periodK || 5}</span>
            </div>
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">%D Smoothing</span>
              <span className="text-indigo-300 font-bold">{data.periodD || 3}</span>
            </div>
          </div>
        )}

        {data.indicator === 'Ichimoku' && (
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-center">
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Tenkan</span>
              <span className="text-indigo-300 font-bold">{data.tenkanPeriod || 9}</span>
            </div>
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Kijun</span>
              <span className="text-indigo-300 font-bold">{data.kijunPeriod || 26}</span>
            </div>
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Senkou</span>
              <span className="text-indigo-300 font-bold">{data.senkouPeriod || 52}</span>
            </div>
          </div>
        )}

        {(data.indicator === 'Bollinger' || data.indicator === 'Envelopes') && (
          <div className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/60 px-2.5 py-1.5">
            <span className="text-slate-400">{data.indicator === 'Bollinger' ? 'Độ lệch (Dev):' : 'Biên (%):'}</span>
            <span className="font-mono font-semibold text-emerald-300">{data.deviation || (data.indicator === 'Bollinger' ? 2.0 : 0.1)}</span>
          </div>
        )}

        {data.indicator === 'SuperTrend' && (
          <div className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/60 px-2.5 py-1.5">
            <span className="text-slate-400">Hệ số nhân (Mult):</span>
            <span className="font-mono font-semibold text-rose-300">{data.multiplier || 3.0}</span>
          </div>
        )}

        {data.indicator === 'ParabolicSAR' && (
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-center">
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Step</span>
              <span className="text-rose-300 font-bold">{data.sarStep || 0.02}</span>
            </div>
            <div className="bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Maximum</span>
              <span className="text-rose-300 font-bold">{data.sarMaximum || 0.2}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Shift (Độ trễ Bar):</span>
          <span className="font-mono text-slate-300 font-bold">{data.shift ?? 0}</span>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="val_out"
        className="!h-3 !w-3 !rounded-full !border-2 !border-cyan-400 !bg-slate-950 hover:!scale-125 transition-transform"
      />
    </div>
  );
});

IndicatorNode.displayName = 'IndicatorNode';
