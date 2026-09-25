'use client';

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  FileCode, 
  Send, 
  Loader2,
  AlertCircle
} from 'lucide-react';

interface CodeOutputModalProps {
  isOpen: boolean;
  onClose: () => void;
  botName: string;
  mql5Code: string;
  summary: string;
  features: string[];
  provider?: string;
}

export const CodeOutputModal: React.FC<CodeOutputModalProps> = ({
  isOpen,
  onClose,
  botName,
  mql5Code,
  summary,
  features,
  provider = 'VT Markets Pure MT5 Engine',
}) => {
  const [copied, setCopied] = useState(false);
  const [currentCode, setCurrentCode] = useState(mql5Code);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  // Keep internal state updated when prop changes
  React.useEffect(() => {
    setCurrentCode(mql5Code);
    setAiChatHistory([]); // Reset chat history when new code is generated
    setAiPrompt('');
  }, [mql5Code]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMq5 = () => {
    const filename = `${botName.replace(/\s+/g, '_') || 'VT_Quant_Bot'}.mq5`;
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRefineCode = async () => {
    if (!aiPrompt.trim() || isRefining) return;

    const userMessage = aiPrompt.trim();
    setAiChatHistory((prev) => [...prev, { role: 'user', content: userMessage }]);
    setAiPrompt('');
    setIsRefining(true);

    try {
      const res = await fetch('/api/builder/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'refine',
          code: currentCode,
          refinePrompt: userMessage,
          targetPlatform: 'mql5',
          history: aiChatHistory,
        }),
      });

      const data = await res.json();
      if (data.success && data.code) {
        setCurrentCode(data.code);
        setAiChatHistory((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.explanation || 'Đã cập nhật mã nguồn MT5 theo yêu cầu của bạn.',
          },
        ]);
      } else {
        setAiChatHistory((prev) => [
          ...prev,
          { role: 'assistant', content: data.error || 'Lỗi tinh chỉnh mã nguồn từ AI.' },
        ]);
      }
    } catch (err: any) {
      setAiChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: 'Không thể kết nối đến AI Copilot. Vui lòng thử lại.' },
      ]);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 text-slate-100 font-sans">
      <div className="relative flex h-[92vh] w-full max-w-6xl flex-col rounded-3xl border border-teal-500/30 bg-[#060f17] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-teal-500/20 bg-teal-950/40 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white">{botName}.mq5</h2>
                <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-300 border border-teal-500/30">
                  MetaTrader 5 MQL5 Pure Code
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Engine: <span className="text-teal-300 font-semibold">{provider}</span> (0 Errors Ready)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Đã sao chép!' : 'Copy Code'}</span>
            </button>

            {/* Download .mq5 Button */}
            <button
              onClick={handleDownloadMq5}
              className="flex items-center gap-1.5 rounded-xl border border-teal-400/40 bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-xs font-black text-slate-950 hover:brightness-110 transition-all shadow-lg shadow-teal-500/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Tải file .mq5</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* MODAL MAIN CONTENT: Split into Code View & Copilot Panel */}
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT: Code View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col border-r border-slate-800/80 bg-[#040911] overflow-hidden">
            {/* Strategy Brief Bar */}
            <div className="border-b border-slate-800/80 bg-slate-950/60 p-3.5 text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-400 shrink-0" />
                <span className="font-bold text-slate-200">Tóm tắt cấu trúc chiến lược:</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pl-6">{summary}</p>
              
              {features && features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 pl-6">
                  {features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-teal-950/60 border border-teal-500/20 px-2 py-0.5 text-[10px] font-semibold text-teal-300"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Raw Code Editor Area */}
            <div className="relative flex-1 overflow-auto p-4 font-mono text-[11.5px] leading-5 text-emerald-300 select-text">
              <pre className="whitespace-pre">{currentCode}</pre>
            </div>
          </div>

          {/* RIGHT: AI Copilot & Compilation Instructions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-[#07131b] overflow-hidden">
            {/* MetaEditor 5 Guide */}
            <div className="border-b border-teal-500/20 bg-teal-950/30 p-4 text-xs">
              <h4 className="font-extrabold text-teal-300 flex items-center gap-1.5 mb-2">
                <Terminal className="h-4 w-4 text-teal-400" /> Hướng dẫn cài đặt vào MT5:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                <li>Mở MetaTrader 5, nhấn phím <strong className="text-white font-mono">F4</strong> (MetaEditor).</li>
                <li>Tạo file mới: <strong className="text-teal-300">New → Expert Advisor (template)</strong>.</li>
                <li>Dán toàn bộ code ở trên vào và nhấn <strong className="text-white font-mono">F7 (Compile)</strong>.</li>
                <li>Quay lại MT5, kéo Bot vào biểu đồ và bật <strong className="text-emerald-300">Algo Trading</strong>.</li>
              </ol>
            </div>

            {/* AI Copilot Chat Area */}
            <div className="flex-1 flex flex-col overflow-hidden p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  AI MT5 Copilot Assistant
                </span>
              </div>

              {/* Chat Message Box */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-xs mb-3">
                <div className="rounded-xl bg-teal-950/40 border border-teal-500/20 p-2.5 text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-teal-300 block mb-1">👋 Xin chào!</strong>
                  Tôi là trợ lý AI chuyên về MQL5. Bạn muốn bổ sung tính năng gì vào bot (ví dụ: thêm Trailing Stop, lọc phiên Á/Âu, hay nâng cấp khối lượng lot)?
                </div>

                {aiChatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-2.5 text-[11px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-800 text-white font-semibold ml-4'
                        : 'bg-teal-950/40 border border-teal-500/20 text-slate-200 mr-2'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">
                      {msg.role === 'user' ? 'Bạn' : 'AI Copilot'}
                    </span>
                    {msg.content}
                  </div>
                ))}

                {isRefining && (
                  <div className="flex items-center gap-2 text-teal-400 text-[11px] p-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Đang tinh chỉnh và tái biên dịch mã nguồn MT5...</span>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ví dụ: Thêm Trailing Stop 20 pips và lọc phiên Mỹ..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRefineCode()}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none"
                />
                <button
                  onClick={handleRefineCode}
                  disabled={isRefining || !aiPrompt.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:opacity-40 transition-colors shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
