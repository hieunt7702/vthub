"use client";

import { useState } from "react";

interface ShareProps {
  slug: string;
  title: string;
}

export function ShareButtons({ slug, title }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const articleUrl = typeof window !== "undefined" ? window.location.href : `https://www.hieunthub.co/vi/cms/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ Facebook"
        title="Chia sẻ Facebook"
        className="flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 text-zinc-400 hover:bg-orange-500/10 hover:border-orange-400/30 hover:text-orange-300 transition"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M13.5 8.5V6.8c0-.9.2-1.3 1.2-1.3H16V2.6h-2.3c-2.8 0-4 1.2-4 3.8v2.1H8v3h1.7V21h3.8v-9.5H16l.3-3z" />
        </svg>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ X"
        title="Chia sẻ X"
        className="flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 text-zinc-400 hover:bg-orange-500/10 hover:border-orange-400/30 hover:text-orange-300 transition"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M4 4h4.3l4.2 6 5-6H20l-6.3 7.6L20.5 20h-4.3l-4.6-6.6L6 20H3.5l6.8-8z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ LinkedIn"
        title="Chia sẻ LinkedIn"
        className="flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 text-zinc-400 hover:bg-orange-500/10 hover:border-orange-400/30 hover:text-orange-300 transition"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M5.2 8.8h3.2V20H5.2zM6.8 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zm3.9 5.3h3v1.6h.1c.4-.8 1.5-1.9 3.2-1.9 3.4 0 4 2.2 4 5.1V20h-3.2v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20h-3.3z" />
        </svg>
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ Telegram"
        title="Chia sẻ Telegram"
        className="flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 text-zinc-400 hover:bg-orange-500/10 hover:border-orange-400/30 hover:text-orange-300 transition"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="m20.7 4.4-2.8 13.8c-.2 1-.8 1.2-1.6.8l-4.4-3.2-2.1 2c-.2.2-.4.4-.8.4l.3-4.5 8.2-7.4c.4-.3-.1-.5-.5-.2l-10 6.3-4.3-1.3c-.9-.3-.9-.9.2-1.3L19 3.6c.8-.3 1.5.2 1.2.8z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:bg-orange-500/10 hover:border-orange-400/30 hover:text-orange-300 transition"
        title="Sao chép link bài viết"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          )}
        </svg>
        <span>{copied ? "Đã sao chép" : "Sao chép link"}</span>
      </button>
    </div>
  );
}
