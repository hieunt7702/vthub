import type { Metadata } from "next";
import { Inter, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";
import { GlobalDropdownHandler } from "../components/providers/GlobalDropdownHandler";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vthub-web-teal.vercel.app"),
  title: {
    default: "VT Rewards Hub - Trung Tâm Quyền Lợi & Bot EA MT5 Độc Quyền",
    template: "%s | VT Rewards Hub"
  },
  description: "Trung tâm quyền lợi giao dịch & đối tác VT Markets: Chương trình thưởng Volume $200k, hoàn phí Backcom tự động, bộ 9 Bot EA MT5 miễn phí và Trình tạo Bot kéo thả No-Code MQL5.",
  keywords: [
    "VT Markets",
    "VT Rewards Hub",
    "Hoàn phí Backcom",
    "Bot EA MT5",
    "No-Code MQL5 Builder",
    "Apex Oracle SMC",
    "Bảng giá vàng trực tuyến",
    "VT Markets Vietnam",
    "Rebate Forex Gold"
  ],
  authors: [{ name: "Hau Tran", url: "https://github.com/hieunt7702" }],
  creator: "Hau Tran",
  publisher: "VT Rewards Hub",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vthub-web-teal.vercel.app",
    title: "VT Rewards Hub - Trung Tâm Quyền Lợi & Bot EA MT5 Độc Quyền",
    description: "Nhận hoàn phí Backcom tự động 95%, lộ trình thưởng $200,000 USD, tải miễn phí bộ 9 Bot EA MT5 và tự tạo Bot không cần code.",
    siteName: "VT Rewards Hub",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "VT Markets Rewards Hub - Trung Tâm Quyền Lợi & Bot MT5"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VT Rewards Hub - Trung Tâm Quyền Lợi & Bot EA MT5 Độc Quyền",
    description: "Nhận hoàn phí Backcom tự động 95%, lộ trình thưởng $200,000 USD, tải miễn phí bộ 9 Bot EA MT5 và tự tạo Bot không cần code.",
    images: ["/og-banner.jpg"],
    creator: "@HauTran"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo_white.webp",
    apple: "/logo_white.webp"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("bh_lang")?.value;
  const initialLanguage = (langCookie === "vi" || langCookie === "en") ? langCookie as "vi" | "en" : "vi";

  return (
    <html lang={initialLanguage} className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col font-body-md text-body-md bg-background overflow-x-hidden`} suppressHydrationWarning>
        <LanguageProvider initialLanguage={initialLanguage}>
          <GlobalDropdownHandler />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
