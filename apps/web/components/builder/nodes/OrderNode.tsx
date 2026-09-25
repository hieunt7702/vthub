'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ShoppingCart, ArrowUpRight, ArrowDownRight, Trash2, XCircle } from 'lucide-react';
import { NodeOrderData } from '@/types/builder';

export const OrderNode = memo(({ data, selected }: { data: NodeOrderData; selected?: boolean }) => {
  const isBuy = data.orderAction?.includes('BUY');
  const isSell = data.orderAction?.includes('SELL');

  return (
    <div
      className={`relative min-w-[260px] rounded-2xl border transition-all duration-200 shadow-xl backdrop-blur-xl ${
        selected
          ? isBuy
            ? 'border-emerald-400 bg-emerald-950/80 shadow-emerald-500/20 ring-2 ring-emerald-500/40'
            : 'border-rose-400 bg-rose-950/80 shadow-rose-500/20 ring-2 ring-rose-500/40'
          : 'border-slate-800 bg-[#090d16]/90 hover:border-slate-700 shadow-black/60'
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="order_in"
        className={`!h-3 !w-3 !rounded-full !border-2 ${
          isBuy ? '!border-emerald-400' : isSell ? '!border-rose-400' : '!border-teal-400'
        } !bg-slate-950`}
      />

      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
              isBuy
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : isSell
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
            }`}
          >
            {isBuy ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : isSell ? (
              <ArrowDownRight className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Thực Thi Lệnh MT5 (CTrade)</div>
            <div
              className={`text-xs font-black ${
                isBuy ? 'text-emerald-400' : isSell ? 'text-rose-400' : 'text-teal-300'
              }`}
            >
              {data.orderAction || 'BUY_MARKET'}
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
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Trượt giá cho phép (Slippage):</span>
          <span className="font-mono text-slate-200 font-bold">{data.slippagePoints || 10} points</span>
        </div>
        {data.partialClosePercent > 0 && (
          <div className="flex items-center justify-between text-[11px] text-teal-300">
            <span>Đóng từng phần (Partial):</span>
            <span className="font-mono font-bold">{data.partialClosePercent}%</span>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="order_out"
        className="!h-3 !w-3 !rounded-full !border-2 !border-teal-400 !bg-slate-950"
      />
    </div>
  );
});

OrderNode.displayName = 'OrderNode';
