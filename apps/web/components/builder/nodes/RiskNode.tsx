'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shield, ShieldAlert, Sparkles, Trash2, Zap } from 'lucide-react';
import { NodeRiskData } from '@/types/builder';

export const RiskNode = memo(({ data, selected }: { data: NodeRiskData; selected?: boolean }) => {
  return (
    <div
      className={`relative min-w-[270px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-amber-400 bg-amber-950/80 shadow-amber-500/20 ring-2 ring-amber-500/40'
          : 'border-slate-800 bg-[#120d06]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="flow_in"
        className="!h-3 !w-3 !rounded-full !border-2 !border-amber-400 !bg-slate-950"
      />

      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Quản Trị Vốn & Rủi Ro</div>
            <div className="text-xs font-extrabold text-white">
              {data.riskMode === 'FIXED_LOT' ? `Fixed: ${data.lotSize || 0.05} Lot` : `% Risk: ${data.riskPercent || 1.5}% Balance`}
            </div>
          </div>
        </div>
        {data.onDelete && (
          <button onClick={data.onDelete} className="p-1 text-slate-400 hover:text-red-400">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-2 p-3.5 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-rose-500/20 bg-rose-950/30 p-2">
            <span className="text-[10px] text-rose-300 block">Stop Loss (SL)</span>
            <span className="font-mono font-bold text-rose-400">{data.stopLossPips || 35} pips</span>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-2">
            <span className="text-[10px] text-emerald-300 block">Take Profit (TP)</span>
            <span className="font-mono font-bold text-emerald-400">{data.takeProfitPips || 50} pips</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1 text-[11px] text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Trailing Stop:</span>
            <span className="font-mono text-cyan-300 font-bold">{data.trailingStopPips ? `${data.trailingStopPips} pips` : 'Tắt'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Break-Even (Dời SL):</span>
            <span className="font-mono text-teal-300 font-bold">{data.breakEvenPips ? `${data.breakEvenPips} pips` : 'Tắt'}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5 text-rose-400">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldAlert className="h-3 w-3 text-rose-400" /> Max Drawdown Shield:
            </span>
            <span className="font-mono font-bold text-rose-300">{data.maxDrawdownPercent || 10}% DD</span>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="risk_out"
        className="!h-3 !w-3 !rounded-full !border-2 !border-amber-400 !bg-slate-950"
      />
    </div>
  );
});

RiskNode.displayName = 'RiskNode';
