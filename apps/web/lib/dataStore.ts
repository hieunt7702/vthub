'use client';

import { useState, useEffect, useCallback } from 'react';

// ==================== TYPES ====================
export interface VTIndicator {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail?: string;
  downloadUrl: string;
  platform: 'MT5' | 'TradingView' | 'cTrader';
  category: string;
  price: number; // 0 = Miễn phí
  author: string;
  rating: string;
  downloadsCount: number;
  isFeatured: boolean;
  version: string;
  recommendedTimeframe?: string;
  supportedSymbols?: string;
  createdAt: string;
}

export interface VTPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Tin Tức Thị Trường' | 'Chiến Lược MQL5' | 'Hướng Dẫn VT Markets' | 'Phân Tích Kỹ Thuật';
  author: string;
  readTime: string;
  publishedAt: string;
  thumbnail: string;
  isFeatured: boolean;
  views: number;
}

export interface VTCourse {
  id: string;
  title: string;
  slug: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | 'Master';
  duration: string;
  lessonsCount: number;
  description: string;
  instructor: string;
  isFree: boolean;
  enrolledCount: number;
  createdAt: string;
}

export interface VTOffer {
  id: string;
  title: string;
  slug?: string;
  broker: string;
  rewardRate?: string;
  bonusType?: string;
  tag?: string;
  badgeColor?: string;
  description: string;
  highlights?: string[];
  referralUrl?: string;
  actionText?: string;
  actionLink?: string;
  isFeatured?: boolean;
  hot?: boolean;
  validUntil?: string;
  amount?: number;
  createdAt?: string;
}

export interface VTPassview {
  id: string;
  brokerId: string;
  brokerName: string;
  brokerLogo?: string;
  rating?: string;
  accountType: string;
  platform: 'MT4' | 'MT5';
  status: string;
  server: string;
  login: string;
  passwordInvestor: string;
  registerLinks?: {
    label: string;
    href: string;
    group: 'Link khách lẻ' | 'Link IB';
  }[];
  reviewUrl?: string;
  createdAt?: string;
}

// ==================== INITIAL DEFAULT DATA ====================
export const INITIAL_INDICATORS: VTIndicator[] = [
  {
    id: 'ea-apex-oracle-smc',
    name: 'Apex Oracle SMC (AI + Smart Money)',
    slug: 'apex-oracle-smc',
    description: 'Kết hợp cấu trúc thị trường SMC (Smart Money Concepts) với trí tuệ nhân tạo (OpenAI API). Tự động phân tích xu hướng M5, tìm điểm quét thanh khoản và đề xuất SL/TP trực tiếp lên chart.',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Apex_Oracle_SMC.ex5',
    platform: 'MT5',
    category: 'Smart Money Concept (SMC)',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '5.0',
    downloadsCount: 5280,
    isFeatured: true,
    version: '2.5.0',
    recommendedTimeframe: 'M5',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'ea-dual-vortex-dca',
    name: 'Dual Vortex DCA (Lưới Tỉa Lệnh Chéo)',
    slug: 'dual-vortex-dca',
    description: 'EA giao dịch lưới DCA đa tầng theo hai hướng Buy và Sell độc lập. Sử dụng hệ số Lot cộng tuyến tính an toàn và tính năng tỉa bớt các lệnh âm xa nhất khi hòa vốn để bảo toàn vốn.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Dual_Vortex_DCA.ex5',
    platform: 'MT5',
    category: 'Chiến lược DCA',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.9',
    downloadsCount: 4890,
    isFeatured: true,
    version: '3.2.0',
    recommendedTimeframe: 'M1 / M5',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'ea-shadow-dragon-grid',
    name: 'Shadow Dragon Grid (Canvas GUI Dashboard)',
    slug: 'shadow-dragon-grid',
    description: 'Dòng bot giao dịch lưới đa dạng sử dụng thuật toán biên độ nâng cao. Tích hợp Dashboard đồ họa trực tiếp trên chart hiển thị P&L, Drawdown và quản lý rủi ro lệnh khẩn cấp.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Shadow_Dragon_Grid.ex5',
    platform: 'MT5',
    category: 'Giao dịch Lưới (Grid)',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.9',
    downloadsCount: 4120,
    isFeatured: true,
    version: '4.0.1',
    recommendedTimeframe: 'M5 / M15',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'ea-imbalance-striker',
    name: 'Imbalance Striker (ICT FVG + Daily Loss Cap)',
    slug: 'imbalance-striker',
    description: 'Chiến lược săn khoảng trống thanh khoản FVG (Fair Value Gap) theo phương pháp ICT, lọc xu hướng EMA 200 và tự động ngắt giao dịch trong ngày khi chạm ngưỡng Daily Loss Cap.',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Imbalance_Striker.ex5',
    platform: 'MT5',
    category: 'Smart Money Concept (SMC)',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.9',
    downloadsCount: 3760,
    isFeatured: true,
    version: '2.1.0',
    recommendedTimeframe: 'M5 / M15',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'ea-zenith-grid',
    name: 'Zenith Grid (Lưới Độc Lập Buy/Sell Tối Ưu)',
    slug: 'zenith-grid',
    description: 'Dòng bot chạy lưới độc lập thuần túy cho hai chiều BUY và SELL, tối ưu hiệu năng tính toán cực cao và tự động ngắt theo chiều nếu Drawdown vượt ngưỡng an toàn.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Zenith_Grid.ex5',
    platform: 'MT5',
    category: 'Giao dịch Lưới (Grid)',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.8',
    downloadsCount: 3200,
    isFeatured: false,
    version: '1.9.0',
    recommendedTimeframe: 'M15 / H1',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 'ea-ghost-sweep-liquidity',
    name: 'Ghost Sweep Liquidity (Quét Thanh Khoản H1/H4)',
    slug: 'ghost-sweep-liquidity',
    description: 'Phát hiện các đợt quét thanh khoản (Liquidity Run) tại đỉnh/đáy lịch sử khung lớn H1/H4. Tự động xác định Swing High/Low, Break of Structure (BOS) và dời Breakeven hòa vốn.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Ghost_Sweep_Liquidity.ex5',
    platform: 'MT5',
    category: 'Smart Money Concept (SMC)',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.9',
    downloadsCount: 3950,
    isFeatured: true,
    version: '3.0.0',
    recommendedTimeframe: 'H1',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 'ea-trend-cascade-dca',
    name: 'Trend Cascade DCA (4 EMA Pullback System)',
    slug: 'trend-cascade-dca',
    description: 'Chiến lược thuận xu hướng mạnh khi 4 đường EMA (20, 50, 100, 200) xếp chồng song song. Chỉ vào tối đa 4 lệnh tại các mốc MA hỗ trợ/kháng cự động, tránh nhồi lệnh vô tội vạ.',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Trend_Cascade_DCA.ex5',
    platform: 'MT5',
    category: 'Theo Xu Hướng',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.8',
    downloadsCount: 2980,
    isFeatured: false,
    version: '2.3.1',
    recommendedTimeframe: 'M15 / H1',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 518400000).toISOString()
  },
  {
    id: 'ea-infinity-gauntlet-grid',
    name: 'Infinity Gauntlet Grid (Dynamic Multiplier)',
    slug: 'infinity-gauntlet-grid',
    description: 'Thuật toán lưới Blackbox tự động kiểm soát khoảng cách và khối lượng lệnh dựa trên độ biến động thực tế. Tự động đóng toàn bộ khi đạt target lợi nhuận hoặc chạm ngưỡng bảo vệ vốn.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Infinity_Gauntlet_Grid.ex5',
    platform: 'MT5',
    category: 'Giao dịch Lưới (Grid)',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.9',
    downloadsCount: 3610,
    isFeatured: true,
    version: '3.4.0',
    recommendedTimeframe: 'M5',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 604800000).toISOString()
  },
  {
    id: 'ea-iron-shell-turtle',
    name: 'Iron Shell Turtle (Donchian Channel D1 Strategy)',
    slug: 'iron-shell-turtle',
    description: 'Áp dụng nguyên lý Turtle Trading huyền thoại với kênh Donchian Channel phá vỡ biên độ và quản trị rủi ro ATR biến động ngày (D1). Tính toán khối lượng chuẩn 1% Unit.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '/downloads/ea-vtm/Iron_Shell_Turtle.ex5',
    platform: 'MT5',
    category: 'Theo Xu Hướng',
    price: 0,
    author: 'VT Markets Quant Lab',
    rating: '4.9',
    downloadsCount: 3340,
    isFeatured: true,
    version: '2.0.0',
    recommendedTimeframe: 'M5 / M15 (Tính trên D1)',
    supportedSymbols: 'XAUUSD-STD, XAUUSD-STDc, XAUUSD-VIP, XAUUSD-VIPc',
    createdAt: new Date(Date.now() - 691200000).toISOString()
  }
];

export const INITIAL_POSTS: VTPost[] = [
  {
    id: 'post-1',
    title: 'Chi Tiết Cơ Chế Hoàn Phí Backcom VT Markets Tự Động',
    slug: 'co-che-hoan-phi-backcom-vt-markets',
    excerpt: 'Tìm hiểu cách VT Rewards Hub hoàn tiền Backcom tự động mỗi ngày trực tiếp vào tài khoản giao dịch mà không làm tăng spread hay phí hoa hồng của bạn.',
    content: `Hoàn phí Backcom (Rebate) là một trong những quyền lợi tài chính lớn nhất mà mọi trader giao dịch tại sàn VT Markets cần nắm rõ. Với chính sách hoàn phí tự động theo khối lượng giao dịch trên tài khoản Standard và Raw ECN, tiền hoàn sẽ được chi trả trực tiếp và tự động vào tài khoản giao dịch mỗi ngày.`,
    category: 'Hướng Dẫn VT Markets',
    author: 'VT Research Team',
    readTime: '5 phút đọc',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    views: 3850
  },
  {
    id: 'post-2',
    title: 'Hướng Dẫn Cài Đặt & Vận Hành Bộ 9 Bot EA VT Markets Trên MetaTrader 5',
    slug: 'huong-dan-cai-dat-9-bot-ea-vt-markets-mt5',
    excerpt: 'Quy trình chi tiết từ A-Z tải file .ex5, cấu hình WebRequest OpenAI, thiết lập Auto Trading và phân bổ vốn chuẩn trên các tài khoản XAUUSD-STD và Cent.',
    content: `Bộ 9 Expert Advisor VT-Markets được tối ưu hóa chuyên sâu cho thị trường Vàng XAUUSD. Để cài đặt, bạn mở MT5 -> File -> Open Data Folder -> MQL5/Experts và sao chép file .ex5 vào. Đừng quên bật Allow Algo Trading để bot kích hoạt tự động.`,
    category: 'Chiến Lược MQL5',
    author: 'VT Algorithmic Specialist',
    readTime: '8 phút đọc',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    views: 4620
  },
  {
    id: 'post-3',
    title: 'Bản Tin Thị Trường: Dự Báo Xu Hướng Giá Vàng XAUUSD & Phân Tích Dòng Tiền Liên Thị Trường',
    slug: 'du-bao-xu-huong-gia-vang-xauusd-dong-tien',
    excerpt: 'Áp dụng Smart Money Concept và dữ liệu On-chain/CME để định vị các vùng Order Block then chốt, phản ứng giá tại các mốc kháng cự tâm lý.',
    content: `Thị trường Vàng thế giới đang ghi nhận những bước chuyển dịch mạnh mẽ. Sự dịch chuyển của lợi suất trái phiếu kho bạc Mỹ 10 năm kết hợp cùng chỉ số DXY đang tạo nên các nhịp quét thanh khoản liên tục tại phiên Âu và Mỹ.`,
    category: 'Tin Tức Thị Trường',
    author: 'Senior Market Analyst',
    readTime: '4 phút đọc',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    views: 2980
  },
  {
    id: 'post-4',
    title: 'Chiến Lược Quản Lý Rủi Ro 1% & Nguyên Lý Turtle Trading Trên Vàng',
    slug: 'chien-luoc-quan-ly-rui-ro-turtle-trading-vang',
    excerpt: 'Khám phá bí quyết giao dịch phá vỡ kênh Donchian Channel kết hợp bộ đệm ATR để giữ tỷ lệ sụt giảm tài khoản luôn ở mức kiểm soát an toàn.',
    content: `Nguyên tắc cốt lõi của Turtle Trading là luôn xác định trước rủi ro tối đa cho mỗi lệnh (1% vốn) dựa trên độ biến động ATR ngày. Khi giá phá vỡ đỉnh 20 ngày, hệ thống mở vị thế và nhồi thêm khi giá di chuyển thuận lợi.`,
    category: 'Phân Tích Kỹ Thuật',
    author: 'Senior Quant Trader',
    readTime: '6 phút đọc',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    views: 2150
  }
];

export const INITIAL_COURSES: VTCourse[] = [
  {
    id: 'crs-1',
    title: 'Cơ Bản: Nhập Môn Trading & Vận Hành MetaTrader 5 Thực Chiến',
    slug: 'nhap-mon-trading-van-hanh-mt5',
    level: 'Cơ bản',
    duration: '4 Giờ',
    lessonsCount: 8,
    description: 'Nắm vững thao tác đặt lệnh Stop Loss / Take Profit, cơ chế tính đòn bẩy, phí spread, nạp rút VietQR và nguyên tắc quản trị rủi ro 1% vốn an toàn.',
    instructor: 'VT Rewards Academy',
    isFree: true,
    enrolledCount: 1850,
    createdAt: new Date(Date.now() - 604800000).toISOString()
  },
  {
    id: 'crs-2',
    title: 'Nâng Cao: Chiến Lược Smart Money Concept (SMC) & Săn Thanh Khoản FVG',
    slug: 'chien-luoc-smc-order-block-fvg',
    level: 'Nâng cao',
    duration: '8 Giờ',
    lessonsCount: 14,
    description: 'Phân tích cấu trúc sóng thị trường, nhận diện vùng Order Block của tổ chức tài chính, quét thanh khoản (Liquidity Hunt) và điểm vào lệnh tối ưu tỷ lệ R:R.',
    instructor: 'Senior Quant Trader',
    isFree: true,
    enrolledCount: 1420,
    createdAt: new Date(Date.now() - 1209600000).toISOString()
  },
  {
    id: 'crs-3',
    title: 'Chuyên Sâu: Lập Trình Thuật Toán MQL5 & Vận Hành Bộ 9 Bot EA MT5',
    slug: 'lap-trinh-mql5-van-hanh-9-bot-ea',
    level: 'Master',
    duration: '12 Giờ',
    lessonsCount: 20,
    description: 'Học cách code thuật toán Expert Advisor, tối ưu tham số Strategy Tester, kết nối OpenAI API, cơ chế tỉa lệnh chéo cứu tài khoản và quản trị danh mục bot.',
    instructor: 'VT Algorithmic Specialist',
    isFree: true,
    enrolledCount: 980,
    createdAt: new Date(Date.now() - 1814400000).toISOString()
  }
];

export const INITIAL_OFFERS: VTOffer[] = [
  {
    id: "vt-backcom-auto",
    title: "Chương Trình Hoàn Phí Backcom Tự Động Hàng Ngày",
    tag: "QUYỀN LỢI ĐỘC QUYỀN",
    badgeColor: "bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30",
    broker: "VT Markets",
    description: "Nhận lại 85% - 95% phí hoa hồng và spread giao dịch Vàng (XAUUSD) & Forex. Tiền hoàn tự động trả thẳng về tài khoản giao dịch mỗi ngày.",
    highlights: [
      "Hoàn phí trực tiếp về tài khoản MT5",
      "Thanh toán tự động minh bạch hàng ngày",
      "Không yêu cầu điều kiện rút tiền",
      "Hỗ trợ cả tài khoản Standard & Raw ECN"
    ],
    actionText: "Nhận Hoàn Phí Ngay",
    actionLink: "https://www.vtmarkets.com/get-trading/?affid=8421818926",
    referralUrl: "https://www.vtmarkets.com/get-trading/?affid=8421818926",
    isFeatured: true,
    hot: true,
    validUntil: "Vô thời hạn"
  },
  {
    id: "vt-welcome-bonus",
    title: "Thưởng 50% Nạp Tiền Lần Đầu (Welcome Bonus)",
    tag: "HOT BONUS",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    broker: "VT Markets",
    description: "Tăng 50% sức mua ký quỹ cho tài khoản mở mới tại sàn VT Markets, giúp tăng khối lượng giao dịch và gia tăng số tiền hoàn phí Backcom tích lũy.",
    highlights: [
      "Tăng 50% vốn giao dịch",
      "Hỗ trợ gồng lỗ an toàn",
      "Kích hoạt tức thì sau khi nạp"
    ],
    actionText: "Kích Hoạt Bonus & Hoàn Phí",
    actionLink: "https://www.vtmarkets.com/get-trading/?affid=8421818926",
    referralUrl: "https://www.vtmarkets.com/get-trading/?affid=8421818926",
    isFeatured: true,
    hot: false,
    validUntil: "Đang diễn ra"
  },
  {
    id: "vt-free-ea-tools",
    title: "Tặng Miễn Phí Bộ 9 Bot EA MT5 Độc Quyền",
    tag: "SIÊU TIỆN ÍCH",
    badgeColor: "bg-[#0052FF]/20 text-[#00C2FF] border-[#00C2FF]/40",
    broker: "VT Markets",
    description: "Tất cả khách hàng giao dịch tại VT Markets đều được sử dụng miễn phí 100% kho 9 Bot EA (Apex Oracle AI, Dual Vortex DCA, Shadow Dragon, v.v.) và Trình Build EA Trading MT5.",
    highlights: [
      "Mã nguồn chuẩn 0-Error tối ưu cho MT5",
      "Khóa bảo mật Server VT-Markets an toàn",
      "Hỗ trợ cấu hình WebRequest OpenAI"
    ],
    actionText: "Tải Bộ 9 Bot EA Free",
    actionLink: "/indicators",
    referralUrl: "/indicators",
    isFeatured: true,
    hot: false,
    validUntil: "Vô thời hạn"
  },
  {
    id: "vt-active-trader",
    title: "VT Rewards & Lộ Trình Thưởng Trading Volume",
    tag: "REWARDS ĐỔI QUÀ",
    badgeColor: "bg-[#00C2FF]/15 text-[#00C2FF] border-[#00C2FF]/30",
    broker: "VT Markets",
    description: "Tích lũy khối lượng giao dịch quy đổi (Trading Volume) để nhận thưởng tiền mặt cộng dồn từ $500 lên đến $200,000 USD rút trực tiếp về ngân hàng.",
    highlights: [
      "Thưởng khối lượng lên đến $200,000 USD",
      "Cộng dồn song song với tiền Backcom",
      "Minh bạch kiểm tra tiến độ realtime"
    ],
    actionText: "Kiểm Tra Lộ Trình Thưởng",
    actionLink: "/rewards",
    referralUrl: "/rewards",
    isFeatured: true,
    hot: false,
    validUntil: "Vô thời hạn"
  }
];

export const INITIAL_PASSVIEWS: VTPassview[] = [
  {
    id: "1",
    brokerId: "vt-markets",
    brokerName: "VT Markets",
    brokerLogo: "/logo_white.webp",
    rating: "4.9",
    accountType: "RAW ECN VIP",
    platform: "MT5",
    status: "Ổn định",
    server: "VTMarkets-Live",
    login: "8820491",
    passwordInvestor: "VT8386@",
    registerLinks: [
      { label: "Mở Tài Khoản Nhận Backcom", href: "https://www.vtmarkets.com/get-trading/?affid=8421818926", group: "Link khách lẻ" },
      { label: "Đăng Ký Đối Tác IB", href: "/ib-commission-overview", group: "Link IB" }
    ],
    reviewUrl: "/brokers/vt-markets"
  },
  {
    id: "2",
    brokerId: "vt-markets-std",
    brokerName: "VT Markets",
    brokerLogo: "/logo_white.webp",
    rating: "4.9",
    accountType: "STANDARD STP",
    platform: "MT5",
    status: "Ổn định",
    server: "VTMarkets-Live2",
    login: "8820492",
    passwordInvestor: "VT8386@",
    registerLinks: [
      { label: "Mở Tài Khoản Nhận Backcom", href: "https://www.vtmarkets.com/get-trading/?affid=8421818926", group: "Link khách lẻ" }
    ],
    reviewUrl: "/brokers/vt-markets"
  }
];

// ==================== STORAGE KEYS & EVENT ====================
export const STORAGE_KEYS = {
  INDICATORS: 'vt_indicators_v2',
  POSTS: 'vt_posts_v2',
  COURSES: 'vt_courses_v2',
  OFFERS: 'vt_offers_v2',
  BROKERS: 'vt_brokers_v2',
  PASSVIEWS: 'vt_passviews_v2'
};

const SYNC_EVENT_NAME = 'vt_data_sync_event';

// Helper to broadcast change across components & tabs
export function broadcastDataChange(key: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { key } }));
  }
}

// ==================== REACT HOOK FOR DATA STORE ====================
export function useVTDataStore<T>(key: string, initialData: T[]) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  const loadData = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setData(parsed);
          setIsLoaded(true);
          return;
        }
      }
      // If not stored yet, save initial data
      localStorage.setItem(key, JSON.stringify(initialData));
      setData(initialData);
    } catch (e) {
      console.error(`Error loading data from localStorage for key ${key}:`, e);
      setData(initialData);
    }
    setIsLoaded(true);
  }, [key, initialData]);

  useEffect(() => {
    loadData();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.key === key) {
        loadData();
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [loadData, key]);

  // Methods to modify data
  const saveAll = useCallback((action: T[] | ((prev: T[]) => T[])) => {
    setData((prev) => {
      const next = typeof action === 'function' ? (action as (prev: T[]) => T[])(prev) : action;
      try {
        localStorage.setItem(key, JSON.stringify(next));
        broadcastDataChange(key);
      } catch (e) {
        console.error(`Error saving data for key ${key}:`, e);
      }
      return next;
    });
  }, [key]);

  const addItem = useCallback((item: T) => {
    setData((prev) => {
      const updated = [item, ...prev];
      localStorage.setItem(key, JSON.stringify(updated));
      broadcastDataChange(key);
      return updated;
    });
  }, [key]);

  const updateItem = useCallback((idField: keyof T, idValue: any, updatedFields: Partial<T>) => {
    setData((prev) => {
      const updated = prev.map((item) => {
        if (item[idField] === idValue) {
          return { ...item, ...updatedFields };
        }
        return item;
      });
      localStorage.setItem(key, JSON.stringify(updated));
      broadcastDataChange(key);
      return updated;
    });
  }, [key]);

  const removeItem = useCallback((idField: keyof T, idValue: any) => {
    setData((prev) => {
      const updated = prev.filter((item) => item[idField] !== idValue);
      localStorage.setItem(key, JSON.stringify(updated));
      broadcastDataChange(key);
      return updated;
    });
  }, [key]);

  const resetToDefault = useCallback(() => {
    try {
      localStorage.setItem(key, JSON.stringify(initialData));
      setData(initialData);
      broadcastDataChange(key);
    } catch (e) {
      console.error(`Error resetting data for key ${key}:`, e);
    }
  }, [key, initialData]);

  return [
    data,
    saveAll,
    {
      isLoaded,
      addItem,
      updateItem,
      removeItem,
      resetToDefault
    }
  ] as const;
}
