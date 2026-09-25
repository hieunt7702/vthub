'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CircleDollarSign, Trash2 } from 'lucide-react';
import { NodePriceSourceData } from '@/types/builder';

export const PriceSourceNode = memo(({ data, selected }: { data: NodePriceSourceData; selected?: boolean }) => {
  return (
    <div
      className={`relative min-w-[220px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? 'border-amber-400 bg-amber-950/80 shadow-amber-500/20 ring-2 ring-amber-500/40'
          : 'border-slate-800 bg-[#0c1017]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="flow_in"
        className="!h-3 !w-3 !rounded-full !border-2 !border-amber-400 !bg-slate-950"
      />

      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3 py-2 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <CircleDollarSign className="h-3.5 w-3.5" />
          </div>
          <span className="text-[11px] font-bold text-slate-200">Nguồn Giá MT5</span>
        </div>
        {data.onDelete && (
          <button onClick={data.onDelete} className="p-1 text-slate-400 hover:text-red-400">
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="space-y-1.5 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Loại Giá:</span>
          <span className="font-mono font-bold text-amber-300">{data.sourceType || 'CLOSE'}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Shift Bar:</span>
          <span className="font-mono text-slate-200 font-semibold">{data.shift ?? 0}</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="price_out"
        className="!h-3 !w-3 !rounded-full !border-2 !border-amber-400 !bg-slate-950"
      />
    </div>
  );
});

PriceSourceNode.displayName = 'PriceSourceNode';
