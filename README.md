# 🌐 VT Markets Rewards Hub & MT5 Algo-Trading Ecosystem

> **Lead Architect & Developer:** **Hau Tran**  
> **Platform & Tech Stack:** Next.js 16 (Turbopack) • React 19 • TypeScript • Tailwind CSS • React Flow (`@xyflow/react`) • MQL5 Engine • Lucide Icons

---

## 📖 Giới Thiệu Tổng Quan (Project Overview)

**VT Rewards Hub** là hệ sinh thái Web App tài chính và công cụ Algo-Trading toàn diện được thiết kế chuẩn nhận diện thương hiệu **VT Markets (Dark Mode Luxury & Glassmorphism)**. 

Dự án bao gồm nền tảng tính toán hoàn phí hoa hồng Backcom, lộ trình đổi thưởng khối lượng $200k, thư viện 9 Bot EA MT5 độc quyền, bảng giá vàng trực tuyến Realtime và đặc biệt là **No-Code MT5 EA Builder** — trình thiết kế bot giao dịch kéo thả tự động sinh mã nguồn `.mq5` chuẩn 0 lỗi.

---

## 👨‍💻 Tác Giả & Phân Hệ Đóng Góp (Authored Modules by Hau Tran)

### 1. 🤖 No-Code MT5 EA Builder Engine (`/builder` & `/api/builder/gemini`)
* **Visual Graph Canvas:** Hệ thống Node kéo thả trực quan với `@xyflow/react`, hỗ trợ kết nối đa luồng dữ liệu (Price Source ➔ Indicator ➔ Condition ➔ Risk ➔ Order Action).
* **Pure MQL5 Code Generator (100% Offline / Local Engine):** Thuật toán tự động sinh toàn bộ mã nguồn MQL5 (`OnInit`, `OnTick`, `OnDeinit`, `CopyBuffer`, Order Send, Trailing Stop) chạy độc lập không cần API Key bên ngoài.
* **Tích hợp 15 Chỉ báo Kỹ thuật (15 Indicator Nodes):**
  * *Dao động:* RSI, Stochastic, MACD, CCI, WPR (Williams %R), MFI (Money Flow Index).
  * *Xu hướng:* EMA, SMA, SuperTrend (ATR Multiplier), ADX, Parabolic SAR, Ichimoku Kinko Hyo.
  * *Dải & Kênh:* Bollinger Bands, Envelopes (MA Envelopes), ATR.
* **Smart Money Concept (SMC) Analysis Engine:** Khối nhận diện cấu trúc tự động Order Block (OB), Fair Value Gap (FVG), Break of Structure (BOS / CHoCH), Liquidity Sweep.
* **Smart Risk & Lot Sizing Manager:** Tự động tính khối lượng vào lệnh theo Lot cố định, % Balance rủi ro, hoặc biến động ATR, tích hợp Trailing Stop, Break-Even, Max Spread Filter và bộ lọc phiên Á/Âu/Mỹ.

### 2. 💎 VT Rewards & Công Cụ Tính Hoàn Phí Backcom (`/rewards` & `/ib-commission-overview`)
* **Interactive Rebate Calculator:** Công cụ tính số tiền hoàn phí Backcom tích lũy theo số Lot và loại tài khoản (Standard STP / Raw ECN).
* **Lộ Trình Tích Lũy Volume $200,000 USD:** 11 cột mốc thưởng minh bạch theo thời gian thực.
* **Bảng Tra Cứu Hoa Hồng IB Đa Cấp:** So sánh mức chi trả hoa hồng và đặc quyền đối tác.

### 3. 📈 Realtime Market & Bảng Giá Vàng Trực Tuyến (`/gia-vang-hom-nay`)
* Bảng giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu cập nhật liên tục.
* Tích hợp biểu đồ kỹ thuật TradingView Pro XAU/USD Realtime.
* Dải ticker báo giá thị trường Live chạy mượt mà (Marquee Live Ticker).

### 4. 📚 Học Viện MQL5 & Thư Viện 9 Bot EA MT5 (`/indicators` & `/courses`)
* Kho 9 Bot EA MT5 chuyên sâu: *Apex Oracle SMC (AI), Imbalance Striker (ICT FVG), Matrix Grid Pro, Dual Vortex DCA, Shadow Dragon Scalper, v.v.*
* Hệ thống bài giảng lập trình thuật toán MQL5 và hướng dẫn tối ưu Strategy Tester.

### 5. ⚙️ Admin Control Panel & Realtime Data Store (`/admin` & `lib/dataStore.ts`)
* Hệ thống quản trị toàn diện: Indicators/Bots, Tin tức SEO, Khóa học Academy, Ưu đãi Bonus, Tài khoản Passview live.
* Cơ chế **Real-time Cross-tab Sync & Broadcast:** Mọi thao tác thêm/sửa/xóa trong Admin tự động đồng bộ tức thì lên web chính mà không cần tải lại trang.
* **Mật khẩu Quản trị & Passview Investor:** `VT8386@`

---

## 📂 Cấu Trúc Thư Mục (Project Architecture)

```
vthub web/
├── apps/
│   └── web/                               # Next.js 16 Web Application (App Router)
│       ├── app/
│       │   ├── page.tsx                   # Trang chủ (Hero Video, 3D Coin Array, Ticker)
│       │   ├── builder/page.tsx           # No-Code MT5 EA Builder Canvas
│       │   ├── indicators/page.tsx        # Thư viện Bot EA & Chỉ báo MT5
│       │   ├── rewards/page.tsx           # Lộ trình thưởng $200k & Backcom
│       │   ├── offers-bonus/page.tsx      # Ưu đãi & Hoàn phí
│       │   ├── passview/page.tsx          # Tài khoản Passview thực tế
│       │   ├── gia-vang-hom-nay/page.tsx  # Bảng giá Vàng SJC & Thế giới
│       │   ├── tin-tuc/page.tsx           # Tin tức & Chiến lược MQL5
│       │   ├── courses/page.tsx           # Học viện MQL5 Academy
│       │   ├── admin/                     # Dashboard Quản Trị Hệ Thống
│       │   │   ├── indicators/            # Quản lý Indicators & Bots
│       │   │   ├── posts/                 # Quản lý Bài viết SEO
│       │   │   ├── courses/               # Quản lý Khóa học
│       │   │   ├── offers/                # Quản lý Ưu đãi
│       │   │   └── passview/              # Quản lý Passview
│       │   └── api/
│       │       └── builder/gemini/route.ts# MQL5 Code Generator (Pure Engine + AI)
│       ├── components/
│       │   ├── builder/                   # Custom Node Components & Property Drawer
│       │   │   ├── nodes/                 # Start, Indicator, SMC, Condition, Risk, Order Nodes
│       │   │   └── NodePropertyDrawer.tsx # Drawer tùy biến tham số chỉ báo/rủi ro
│       │   └── layout/                    # Header & Footer Navigation
│       ├── lib/
│       │   └── dataStore.ts               # LocalStorage Data Store & Realtime Sync Event
│       └── types/
│           └── builder.ts                 # TypeScript Definitions cho Builder & Indicators
├── package.json                           # Turborepo Monorepo Config
└── README.md                              # Tài liệu dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Vận Hành (Getting Started for Collaborators & AI)

### 1. Yêu cầu môi trường
* **Node.js:** `>= 18.18.0` (Khuyên dùng Node 20 LTS)
* **Package Manager:** `npm` hoặc `pnpm`

### 2. Cài đặt dependencies
```bash
# Di chuyển vào thư mục web app
cd apps/web

# Cài đặt thư viện
npm install
```

### 3. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:3000`

### 4. Kiểm tra biên dịch & Build Production
```bash
npm run build
```

---

## 🤖 Hướng Dẫn Dành Cho AI Coding Agents (Instructions for AI Agents)

Khi bất kỳ AI Assistant nào (Claude, Gemini, ChatGPT, Cursor, Copilot) tiếp nhận và phát triển tiếp dự án này, vui lòng tuân thủ các nguyên tắc sau:

1. **Kiến trúc MQL5 Code Generator (`apps/web/app/api/builder/gemini/route.ts`):**
   * Hàm sinh mã MQL5 Pure Engine phải luôn duy trì tính toàn vẹn cú pháp MetaTrader 5 (biến toàn cục, `OnInit`, `OnTick`, `CopyBuffer`, mảng biến động, đóng/mở lệnh).
   * Khi thêm indicator mới, phải đăng ký type trong `types/builder.ts`, thêm UI config trong `NodePropertyDrawer.tsx`, và handler tương ứng trong `route.ts`.
2. **Hệ thống Quản Trị & Đồng Bộ Dữ Liệu (`lib/dataStore.ts`):**
   * Tất cả trang Admin và Public đều kết nối qua hook `useVTDataStore(STORAGE_KEYS.<MODULE>, INITIAL_<MODULE>)`.
   * Luôn sử dụng hàm `broadcastDataChange` hoặc `setStoreData` để kích hoạt phát sóng cập nhật realtime đa tab.
3. **Quy chuẩn Giao diện (UI/UX Design Rules):**
   * Giữ nguyên phong cách **VT Markets Luxury Dark Mode** (`#020712`, `#050D1A`, accent `#00C2FF` và `#0052FF`).
   * Không tự ý thay đổi màu nền trắng hoặc phong cách phẳng làm mất tính sang trọng của thương hiệu.

---

## 📜 Bản Quyền & Giấy Phép (License & Credits)
Dự án được xây dựng và sở hữu bản quyền phát triển bởi **Hau Tran**. Mọi quyền được bảo lưu.
