'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Layers, ShieldCheck, Trash2, Zap } from 'lucide-react';
import { NodeSmartAnalysisData } from '@/types/builder';

export const SmartAnalysisNode = memo(({ data, selected }: { data: NodeSmartAnalysisData; selected?: boolean }) => {
  const getSmcLabel = (type: string) => {
    switch (type) {
      case 'ORDER_BLOCK':
        return 'Order Block (OB)';
      case 'FAIR_VALUE_GAP':
        return 'Fair Value Gap (FVG)';
      case 'LIQUIDITY_SWEEP':
        return 'Liquidity Sweep';
      case 'BOS_CHOCH':
        return 'BOS / CHoCH Structure';
      case 'ENGULFING_CANDLE':
        return 'Engulfing Price Action';
      case 'FIBONACCI_RETRACEMENT':
        return 'Fibonacci 0.618 / 0.786';
      default:
        return type;
    }
  };

  return (
    <div
      className={`relative min-w-[260px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-indigo-400 bg-indigo-950/80 shadow-indigo-500/20 ring-2 ring-indigo-500/40'
          : 'border-slate-800 bg-[#070e1a]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="flow_in"
        className="!h-3 !w-3 !rounded-full !border-2 !border-indigo-400 !bg-slate-950 hover:!scale-125 transition-transform"
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">SMC & Price Action</div>
            <div className="text-xs font-extrabold text-white">{getSmcLabel(data.smcType)}</div>
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
          <span className="text-slate-400">Zone Timeframe:</span>
          <span className="font-bold text-indigo-300">{data.zoneTimeframe || 'H1'}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-400" /> Cần Mitigation:
          </span>
          <span className={data.mitigationRequired ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            {data.mitigationRequired ? 'Bắt buộc' : 'Tùy chọn'}
          </span>
        </div>

        {data.minPipsGap && (
          <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
            <span>Khoảng cách tối thiểu:</span>
            <span className="font-mono font-bold text-amber-300">{data.minPipsGap} pips</span>
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="smc_out"
        className="!h-3 !w-3 !rounded-full !border-2 !border-indigo-400 !bg-slate-950 hover:!scale-125 transition-transform"
      />
    </div>
  );
});

SmartAnalysisNode.displayName = 'SmartAnalysisNode';
