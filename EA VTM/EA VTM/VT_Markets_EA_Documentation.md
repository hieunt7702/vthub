# Hướng Dẫn Sử Dụng & Giới Thiệu Tính Năng Hệ Thống Bot Giao Dịch VT-Markets

Tài liệu này tổng hợp toàn bộ thông tin sử dụng, tính năng nổi bật và chiến lược giao dịch của **9 dòng Expert Advisor (EA)** đã được nâng cấp, tối ưu hóa cấu trúc và bảo mật để vận hành độc quyền trên sàn **VT-Markets**.

---

## 🔒 Điều Kiện Bảo Mật & Hệ Thống Symbol Hỗ Trợ
Tất cả các dòng bot dưới đây đã được tích hợp bộ lọc bảo mật tự động `IsSecurityValid()`. Bot sẽ **ngay lập tức dừng hoạt động (INIT_FAILED) và gửi thông báo cảnh báo** nếu không thỏa mãn hai điều kiện sau:
1. **Sàn Giao Dịch**: Tài khoản phải thuộc sàn **VT-Markets** (Hệ thống kiểm tra tên Công ty quản lý tài khoản và tên Server chứa các từ khóa như `VT-Markets`, `VT Markets` hoặc `VTMarkets`).
2. **Cặp Tiền Tệ (Symbol)**: Chỉ cho phép chạy trên các symbol vàng đặc quyền của sàn:
   - `XAUUSD-STD` (Tài khoản Standard)
   - `XAUUSD-STDc` (Tài khoản Standard Cent)
   - `XAUUSD-VIP` (Tài khoản VIP)
   - `XAUUSD-VIPc` (Tài khoản VIP Cent)

> [!NOTE]
> Hệ thống bảo mật tự động bỏ qua kiểm tra tên sàn trong chế độ **Strategy Tester (Backtest)** để hỗ trợ việc kiểm tra dữ liệu lịch sử trên mọi tài khoản, tuy nhiên điều kiện ràng buộc Symbol vẫn được thực thi nghiêm ngặt.

---

## 🤖 Danh Sách & Tính Năng Chi Tiết Của Các Bot

### 1. Apex Oracle SMC (`Apex_Oracle_SMC.mq5`)
* **Chiến Lược**: Kết hợp lý thuyết cấu trúc thị trường SMC (Smart Money Concepts) với trí tuệ nhân tạo (OpenAI API). Bot thu thập dữ liệu giá nến M5 cùng các chỉ báo kỹ thuật (EMA, ATR, RSI, MACD) gửi đến OpenAI để phân tích xu hướng, tìm điểm quét thanh khoản, hỗ trợ kháng cự và đưa ra quyết định giao dịch tối ưu.
* **Khung Thời Gian Khuyên Dùng**: `M5` (Vàng)
* **Tính Năng Nổi Bật**:
  - Giao diện trực quan với nút bấm gọi AI phân tích thủ công (`Btn_Call_ChatGPT`).
  - Tự động vẽ các đường cản hỗ trợ/kháng cự, Stop Loss (SL) và Take Profit (TP) được đề xuất bởi AI trực tiếp lên chart.
  - Gửi thông báo đẩy về thiết bị di động (`InpSendMobileAlert`).
* **Thông Số Quan Trọng**:
  - `InpApiKey`: API Key tài khoản OpenAI của bạn.
  - `InpModel`: Model AI sử dụng (mặc định `gpt-4o-mini` để tối ưu chi phí và tốc độ).
  - `InpPriceThreshold`: Sai số chấp nhận được khi chạm vùng cản ($0.30).

---

### 2. Dual Vortex DCA (`Dual_Vortex_DCA.mq5`)
* **Chiến Lược**: EA giao dịch lưới DCA đa tầng theo hai hướng Buy và Sell độc lập (Chuỗi Dương và Chuỗi Âm). Khi một hướng đi đúng hướng, hệ thống sẽ chốt lời và có thể dùng lợi nhuận thu được để "tỉa" bớt các lệnh thua lỗ xa nhất của hướng ngược lại.
* **Khung Thời Gian Khuyên Dùng**: `M1` hoặc `M5`
* **Tính Năng Nổi Bật**:
  - Sử dụng hệ số Lot cộng tuyến tính (tăng dần 0.01 -> 0.02 -> 0.03...) thay vì nhân gấp thếp, giúp hạn chế rủi ro cháy tài khoản.
  - Hỗ trợ tính năng **Trailing Take Profit** cho chuỗi lệnh có lợi nhuận để gồng lãi tối đa.
  - **Tỉa Lệnh Chéo (Lock/Unlock)**: Tự động đóng từng phần hoặc đóng lệnh xa nhất có khoảng cách âm lớn khi đạt điều kiện hòa vốn.
  - Tự động khóa chuỗi âm khi vượt quá giới hạn lệnh và mở khóa khi số lệnh giảm xuống an toàn.
* **Thông Số Quan Trọng**:
  - `Duong_LotBase` & `Am_LotBase`: Khối lượng vào lệnh đầu tiên cho chuỗi Dương/Âm.
  - `Duong_StepPips` & `Am_StepPips`: Khoảng cách tối thiểu giữa các lệnh DCA.
  - `Tia_Enable`: Bật/Tắt tính năng tỉa lệnh chéo cứu tài khoản.

---

### 3. Shadow Dragon Grid (`Shadow_Dragon_Grid.mq5`)
* **Chiến Lược**: Dòng bot giao dịch lưới đa dạng (Grid EA) sử dụng thuật toán tính toán biên độ thị trường nâng cao để phân bổ lưới lệnh. Tích hợp dashboard đồ họa đầy đủ, chi tiết hiển thị trạng thái tài khoản.
* **Khung Thời Gian Khuyên Dùng**: `M5` hoặc `M15`
* **Tính Năng Nổi Bật**:
  - Bảng điều khiển (Canvas GUI) hiển thị trực tiếp lợi nhuận, drawdown và quản lý bật tắt lệnh nhanh trên chart.
  - Tích hợp bộ lọc thời gian giao dịch chặt chẽ.
  - Khả năng kiểm soát số lượng lệnh tối đa cho phép của broker (`ACCOUNT_LIMIT_ORDERS`).
* **Thông Số Quan Trọng**:
  - `MagicNumber`: Mã nhận diện lệnh của bot.
  - `TrailStart` & `TrailDistance`: Cấu hình trailing stop bảo vệ lợi nhuận lưới.

---

### 4. Imbalance Striker (`Imbalance_Striker.mq5`)
* **Chiến Lược**: Giao dịch theo phương pháp ICT (Inner Circle Trader) tập trung vào việc săn các vùng khoảng trống thanh khoản FVG (Fair Value Gap / Imbalance). Bot sẽ vẽ các vùng FVG, đợi giá quay lại kiểm chứng (mitigation) kết hợp xác nhận bằng nến đảo chiều mới vào lệnh.
* **Khung Thời Gian Khuyên Dùng**: `M5` hoặc `M15`
* **Tính Năng Nổi Bật**:
  - **Trend Filter**: Chỉ giao dịch thuận xu hướng chính dựa trên đường EMA 200 (chỉ Buy khi giá trên EMA 200, chỉ Sell khi giá dưới EMA 200).
  - **Daily Loss Cap**: Tự động ngừng giao dịch trong ngày nếu tổng số lỗ chạm mức giới hạn thiết lập sẵn nhằm bảo vệ tài khoản khỏi chuỗi thua lỗ.
  - Đa dạng tùy chọn xác nhận: Đóng cửa nến, Engulfing hoặc Pinbar đảo chiều.
* **Thông Số Quan Trọng**:
  - `InpMinFVGPoints`: Độ rộng tối thiểu của khoảng trống FVG để được tính là hợp lệ (mặc định 200 điểm giá).
  - `InpConfirmType`: Loại nến xác nhận (mặc định `2` - Pinbar).
  - `InpDailyLossCap`: Mức giới hạn thua lỗ tối đa trong ngày.

---

### 5. Zenith Grid (`Zenith_Grid.mq5`)
* **Chiến Lược**: Bot chạy lưới độc lập thuần túy cho hai chiều BUY và SELL. Đây là dòng bot tối giản, tập trung vào hiệu năng tính toán và sự ổn định của hệ thống lưới lệnh.
* **Khung Thời Gian Khuyên Dùng**: `M15` hoặc `H1`
* **Tính Năng Nổi Bật**:
  - Bảng điều khiển nhỏ gọn hiển thị Equity, Số dư và Trạng thái lãi/lỗ thả nổi (Floating P&L).
  - Nút bấm Reset nhanh ngay trên biểu đồ.
  - Tự động tạm dừng giao dịch theo chiều nếu mức drawdown vượt quá ngưỡng quy định.
* **Thông Số Quan Trọng**:
  - `SellThreshold` & `BuyThreshold`: Điểm khởi phát khoảng cách lưới lệnh cho Sell/Buy.
  - `MaxLossSell` & `MaxLossBuy`: Khoản lỗ tối đa cho từng chiều để tự động cắt lỗ bảo vệ tài khoản.
  - `MinBalance`: Số dư tài khoản tối thiểu cần thiết để bot duy trì hoạt động.

---

### 6. Ghost Sweep Liquidity (`Ghost_Sweep_Liquidity.mq5`)
* **Chiến Lược**: Quét thanh khoản (Liquidity Run/Sweep) dựa trên các đỉnh/đáy lịch sử khung lớn (H1/H4). Khi giá phá vỡ giả các đỉnh/đáy này (quét SL của thị trường) rồi quay đầu đóng cửa bên trong, EA sẽ thực hiện vào lệnh ngược lại hoặc chờ giá hồi quy về các vùng FVG cùng chiều sau khi cấu trúc bị phá vỡ (BOS - Break of Structure).
* **Khung Thời Gian Khuyên Dùng**: `H1`
* **Tính Năng Nổi Bật**:
  - Quản lý cấu trúc thị trường tự động (xác định Swing High, Swing Low).
  - Hỗ trợ tính năng Breakeven (dịch SL về điểm hòa vốn) và Trailing Stop động.
  - Tích hợp bộ lọc thời gian giao dịch an toàn (tránh tin tức mạnh).
* **Thông Số Quan Trọng**:
  - `InpUseLiquidityRun`: Bật/Tắt mô hình quét thanh khoản.
  - `InpUseLiquidityGap`: Bật/Tắt mô hình lấp khoảng trống FVG.
  - `InpRequireBOS`: Yêu cầu phải có sự phá vỡ cấu trúc mới kích hoạt lệnh.

---

### 7. Trend Cascade DCA (`Trend_Cascade_DCA.mq5`)
* **Chiến Lược**: Đánh thuận xu hướng mạnh khi 4 đường EMA (EMA20, EMA50, EMA100, EMA200) xếp chồng song song chỉ hướng rõ ràng. Vào lệnh đầu tiên khi giá hồi quy (pullback) về chạm EMA20 và thực hiện DCA tại các mốc EMA50, EMA100, EMA200 (mỗi mốc MA chỉ vào duy nhất 1 lệnh).
* **Khung Thời Gian Khuyên Dùng**: `M15` hoặc `H1`
* **Tính Năng Nổi Bật**:
  - Không nhồi lệnh vô tội vạ. Tối đa chỉ có 4 lệnh trong một chu kỳ tương ứng với 4 đường MA hỗ trợ/kháng cự động.
  - Tự động tính toán điểm hòa vốn và dời chốt lời TP nhóm lệnh một cách khoa học.
* **Thông Số Quan Trọng**:
  - `InpMAMethod`: Phương thức trung bình trượt (mặc định EMA).
  - `InpMA1Period` đến `InpMA4Period`: Chu kỳ các đường MA (mặc định 20, 50, 100, 200).

---

### 8. Infinity Gauntlet Grid (`Infinity_Gauntlet_Grid.mq5`)
* **Chiến Lược**: Phiên bản lưới lệnh chuyển đổi từ thuật toán lưới đa hướng thông minh. EA Blackbox tự động kiểm soát khoảng cách, khối lượng lệnh dựa trên bước dịch chuyển và xu hướng hiện tại của thị trường để phân bổ vốn.
* **Khung Thời Gian Khuyên Dùng**: `M5`
* **Tính Năng Nổi Bật**:
  - Tích hợp đóng toàn bộ lệnh cả hai chiều hoặc từng chiều khi đạt mức lợi nhuận target mục tiêu bằng tiền tệ.
  - Chức năng tự động xóa các lệnh chờ ẩn (pending orders) sau một khung giờ cụ thể để tránh rủi ro biến động giá ban đêm.
  - Sử dụng hệ số nhân lot động (`Multiply_lotsize_by`).
* **Thông Số Quan Trọng**:
  - `Distance_between_orders`: Khoảng cách cơ bản giữa các lệnh lưới.
  - `Multiply_lotsize_by`: Hệ số nhân khối lượng cho lệnh tiếp theo (mặc định 1.5).
  - `Close_loss_by_drawdown`: Giới hạn sụt giảm tài khoản tính theo phần trăm (%) để kích hoạt cơ chế cắt lỗ khẩn cấp.

---

### 9. Iron Shell Turtle (`Iron_Shell_Turtle.mq5`)
* **Chiến Lược**: Tuân thủ nghiêm ngặt quy tắc giao dịch kinhдени của nhóm "Turtle Trading" (Nguyên lý kênh Donchian Channel phá vỡ biên độ). Mặc dù EA được treo trên khung thời gian nhỏ (M5/M15) để nhận tick giá nhanh nhất, các chỉ số ATR (N) và kênh giá Donchian đều được tính toán chuẩn xác trên khung ngày (`D1`).
* **Khung Thời Gian Treo Bot**: `M5` hoặc `M15` (Tính toán nội bộ trên `D1`)
* **Tính Năng Nổi Bật**:
  - Quản lý rủi ro chuẩn mực: Tự động tính toán khối lượng dựa trên độ biến động ATR của cặp vàng (`InpRiskPercent` mặc định rủi ro 1% tài khoản cho mỗi đơn vị Unit đầu tiên).
  - Cơ chế nhồi lệnh thêm khi giá đi đúng hướng (tối đa 4 Units).
  - Cơ chế cắt lỗ tại khoảng cách `2N` (2 lần biến động ATR ngày) hoặc chốt lời khi giá chạm kênh ngược lại (hệ thống thoát lệnh S1 là 10 ngày).
* **Thông Số Quan Trọng**:
  - `InpRiskPercent`: Tỷ lệ rủi ro trên mỗi đơn vị lệnh (1.0 = 1%).
  - `InpS1EntryPeriod`: Kênh Donchian phá vỡ xu hướng ngắn hạn (20 ngày).
  - `InpS1ExitPeriod`: Kênh Donchian chốt lời ngắn hạn (10 ngày).

---

## 🛠️ Hướng Dẫn Cài Đặt Chi Tiết Trên MetaTrader 5

Để các dòng bot chạy ổn định nhất trên MT5, quý nhà đầu tư vui lòng thực hiện theo các bước sau:

1. **Sao chép file bot**:
   - Mở MT5 -> Chọn `File` -> Chọn `Open Data Folder`.
   - Tìm đến thư mục `MQL5\Experts\` và dán các file `.mq5` đã đổi tên vào đây (ví dụ: `MQL5\Experts\VT-Markets\`).
2. **Cài đặt WebRequest (Chỉ cần thiết khi dùng bot `Apex_Oracle_SMC.mq5` gọi AI)**:
   - Trên MT5 chọn `Tools` -> Chọn `Options` -> Chuyển sang tab `Expert Advisors`.
   - Đánh dấu chọn vào mục **"Allow WebRequest for listed URL"**.
   - Thêm đường dẫn: `https://api.openai.com`
3. **Bật tính năng giao dịch tự động**:
   - Cũng tại tab `Expert Advisors`, tích chọn **"Allow Algo Trading"**.
   - Nhấn **OK** để lưu cấu hình.
4. **Khởi chạy Bot**:
   - Trong bảng điều khiển `Navigator` (nhấn `Ctrl + N`), nhấp chuột phải vào `Experts` chọn `Refresh`.
   - Kéo bot mong muốn vào biểu đồ vàng của tài khoản VT-Markets (ví dụ: Chart `XAUUSD-STD`, khung thời gian phù hợp).
   - Trong cửa sổ cài đặt hiện ra, chuyển qua tab **Common**, đảm bảo mục **"Allow Algo Trading"** đã được chọn. Cấu hình các thông số tại tab **Inputs** theo chiến lược của bạn và nhấn **OK**.

---

## ⚠️ Nguyên Tắc Quản Lý Vốn & Khuyến Nghị An Toàn

> [!WARNING]
> Thị trường Vàng (XAUUSD) có mức biến động cực kỳ mạnh, đặc biệt là các tài khoản chạy lưới Grid và DCA cần tuân thủ nghiêm ngặt kỷ luật vốn:
> 
> - **Phân loại tài khoản Cent (`XAUUSD-STDc`, `XAUUSD-VIPc`)**: Phù hợp cho số vốn nhỏ từ $100 - $1000. Tài khoản Cent nhân số dư lên 100 lần giúp bot lưới gồng lệnh DCA an toàn hơn rất nhiều so với tài khoản Standard.
> - **Phân loại tài khoản Standard/VIP (`XAUUSD-STD`, `XAUUSD-VIP`)**: Khuyến nghị chỉ nên sử dụng với vốn tối thiểu từ $5,000 trở lên đối với các EA chạy lưới (như *Dual Vortex DCA*, *Shadow Dragon Grid*, *Infinity Gauntlet Grid*).
> - **Bật Daily Loss Cap / Max Loss**: Luôn thiết lập ngưỡng cắt lỗ tối đa cho phép trong ngày đối với các bot có tính năng này để tránh các đợt bão giá đi một chiều quét sạch tài khoản của bạn.
