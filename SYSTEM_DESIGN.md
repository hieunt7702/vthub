# Tài liệu Thiết kế Hệ thống - HieuNTHub

Tài liệu này mô tả kiến trúc tổng quan và thiết kế cơ sở dữ liệu của hệ thống HieuNTHub hiện tại.

## 1. Kiến trúc Tổng quan (System Architecture)

Hệ thống được thiết kế theo mô hình **Monorepo** sử dụng công cụ **Turborepo** và trình quản lý gói **pnpm**, giúp quản lý mã nguồn linh hoạt và chia sẻ các module chung (packages) dễ dàng giữa các ứng dụng.

### Các thành phần chính trong Monorepo:

*   **`apps/web` (Frontend)**
    *   **Framework**: Next.js (React).
    *   **Styling**: Tailwind CSS.
    *   **Chức năng**: Giao diện người dùng web, thực hiện Server-Side Rendering (SSR) và Static Site Generation (SSG) để tối ưu SEO và hiệu năng.
*   **`apps/api` (Backend)**
    *   **Framework**: NestJS (Node.js).
    *   **Chức năng**: Cung cấp các APIs để xử lý logic nghiệp vụ, giao tiếp với cơ sở dữ liệu và phục vụ cho ứng dụng web.
*   **`packages/database` (Database Module)**
    *   **ORM**: Prisma.
    *   **Cơ sở dữ liệu**: PostgreSQL.
    *   **Chức năng**: Quản lý schema (`schema.prisma`), migrations và cung cấp Database Client (`@prisma/client`) dùng chung cho toàn bộ dự án.
*   **Các Packages chia sẻ khác (`packages/*`)**
    *   `ui`: Chứa các component UI dùng chung cho giao diện.
    *   `eslint-config`: Cấu hình chuẩn hóa code (Linting) dùng chung cho toàn dự án.
    *   `typescript-config`: Cấu hình TypeScript chia sẻ.

## 2. Thiết kế Cơ sở Dữ liệu (Database Design)

Hệ thống sử dụng hệ quản trị cơ sở dữ liệu **PostgreSQL** và được quản lý thiết kế (schema) thông qua **Prisma ORM**.

### Các Models (Thực thể) hiện tại

Dưới đây là các bảng được định nghĩa trong hệ thống:

#### 1. Bảng `User` (Tài khoản người dùng)
Lưu trữ thông tin tài khoản người dùng trong hệ thống.

| Tên trường  | Kiểu dữ liệu | Thuộc tính | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `cuid()` | Khóa chính, tự động tạo chuỗi CUID ngẫu nhiên và duy nhất. |
| `email` | `String` | `@unique` | Địa chỉ email đăng nhập, duy nhất trong hệ thống. |
| `name` | `String?` | Optional | Tên hiển thị của người dùng (có thể bỏ trống). |
| `password` | `String` | Required | Mật khẩu tài khoản (lưu trữ dưới dạng mã hóa). |
| `role` | `Role` (Enum) | `@default(USER)` | Quyền hạn của tài khoản, mặc định là người dùng cơ bản (`USER`). |
| `createdAt` | `DateTime` | `@default(now())` | Thời điểm tạo tài khoản tự động. |
| `updatedAt` | `DateTime` | `@updatedAt` | Thời điểm cập nhật thông tin tài khoản gần nhất. |

#### 2. Enum `Role` (Phân quyền)
Định nghĩa các loại quyền truy cập cơ bản trong hệ thống:
*   `USER`: Người dùng phổ thông.
*   `ADMIN`: Quản trị viên, có toàn quyền quản lý hệ thống.

---

## 3. Cấu trúc Menu và Routes (Điều hướng)

Hệ thống frontend (ứng dụng web) sử dụng Next.js App Router (`apps/web/app`). Dưới đây là thiết kế cấu trúc menu hiển thị trên Header Navigation và ánh xạ với các URL/Routes tương ứng:

### Menu Chính (Desktop & Mobile)

*   **Trang chủ (Home)**
    *   **Route**: `/`
    *   **Mô tả**: Trang màn hình chính của hệ thống.
*   **Sàn giao dịch (Brokers)**
    *   **Route**: `/brokers`
    *   **Mô tả**: Nơi liệt kê danh sách và đánh giá các sàn Forex.
*   **Khuyến mãi (Offers)**
    *   **Route**: `/offers-bonus`
    *   **Mô tả**: Thông tin các chương trình ưu đãi, bonus từ các sàn (dán nhãn HOT).
*   **So sánh sàn (Compare)**
    *   **Route**: `/brokers/so-sanh`
    *   **Mô tả**: Tính năng so sánh song song các sàn giao dịch.
*   **Chỉ báo (Indicators)**
    *   **Route**: `/indicators`
    *   **Mô tả**: Nơi cung cấp các công cụ và chỉ báo phân tích thị trường.
*   **Hoa hồng IB (IB Commission)**
    *   **Route**: `/ib-commission-overview`
    *   **Mô tả**: Bảng tổng quan thông tin tỷ lệ hoa hồng IB (Introducing Broker).

### Menu Tài nguyên (Resources)

Được thiết kế dưới dạng Dropdown (trên máy tính) và Menu mở rộng (trên điện thoại):

*   **Giá vàng hôm nay**: `/gia-vang-hom-nay` (dán nhãn LIVE)
*   **Passview**: `/passview`
*   **Khóa học (Courses)**: `/courses`
*   **Tin tức (News)**: `/cms` (Tích hợp tính năng quản lý nội dung CMS)
*   **Yêu cầu IB riêng**: `/brokers/submit-request`

### Liên hệ và Tiện ích

*   **Trang liên hệ**: `/contact` (Nút Contact ở góc phải Header)
*   **Đa ngôn ngữ**: Hệ thống hỗ trợ chuyển đổi giữa Tiếng Việt (VI) và Tiếng Anh (EN) thông qua Context API (`LanguageContext`).

---

*Ghi chú: Thiết kế hiện tại phản ánh cấu trúc nền tảng (boilerplate) cơ bản của dự án. Khi các tính năng nghiệp vụ (ví dụ: giao dịch, thông tin broker...) được phát triển, thiết kế dữ liệu và các route này sẽ tiếp tục được mở rộng.*
