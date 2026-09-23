export interface Article {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  cover: string;
  date: string;
  readTime: string;
  snippet: string;
  isFeatured?: boolean;
  timeLabel?: string;
  toc?: { id: string; label: string; num: number }[];
  contentHtml?: string;
}

export const articlesData: Article[] = [
  {
    slug: "nha-sang-lap-flc-trinh-van-quyet-khong-tro-lai-hdqt-tai-dai-hoi-dong-co-dong-bat-thuong",
    title: "Nhà sáng lập FLC Trịnh Văn Quyết không trở lại HĐQT tại đại hội đồng cổ đông bất thường",
    category: "market-news",
    categoryLabel: "Tin tức thị trường",
    cover: "https://vcdn1-kinhdoanh.vnecdn.net/2026/05/27/trinh-van-quyet-1779858172-1235-1779858713.png?w=680&h=0&q=100&dpr=1&fit=crop&s=2STQxCZJ92WOOLVxn90D-A",
    date: "27/05/2026",
    timeLabel: "27/05/2026 09:30",
    readTime: "2 phút đọc",
    snippet: "Sáng 27/5, tại Cầu Giấy, Hà Nội, Công ty Cổ phần Tập đoàn FLC đã tổ chức phiên đại hội đồng cổ đông bất thường, đánh dấu sự trở lại hiếm hoi của ông Trịnh Văn Quyết, nhà sáng lập tập đoàn. Tuy nhiên, trong danh sách bầu...",
    isFeatured: true,
    toc: [
      { id: "dai-hoi-bat-thuong", label: "Đại hội cổ đông bất thường FLC", num: 1 },
      { id: "su-tro-lai-cua-ong-quyet", label: "Sự trở lại hiếm hoi của nhà sáng lập", num: 2 },
      { id: "bau-cu-ban-dieu-hanh", label: "Danh sách bầu cử Hội đồng quản trị", num: 3 }
    ],
    contentHtml: `<p>Sáng 27/5, tại Cầu Giấy, Hà Nội, Công ty Cổ phần Tập đoàn FLC đã tổ chức phiên đại hội đồng cổ đông bất thường, đánh dấu sự trở lại hiếm hoi của ông Trịnh Văn Quyết, nhà sáng lập tập đoàn. Tuy nhiên, trong danh sách bầu cử bổ sung thành viên HĐQT, tên của ông Quyết đã không xuất hiện.</p>
    <h2 id="dai-hoi-bat-thuong">Đại hội cổ đông bất thường FLC</h2>
    <p>Phiên họp diễn ra trong không khí trang nghiêm với sự tham gia của đông đảo cổ đông và các đại diện ban điều hành mới. FLC đặt mục tiêu thông qua phương án tái cấu trúc toàn diện tài sản và nghĩa vụ nợ, mở đường cho việc khôi phục hoạt động kinh doanh cốt lõi.</p>
    <h2 id="su-tro-lai-cua-ong-quyet">Sự trở lại hiếm hoi của nhà sáng lập</h2>
    <p>Sự hiện diện của ông Trịnh Văn Quyết tại hội trường thu hút sự quan tâm lớn từ giới truyền thông và các nhà đầu tư. Tuy nhiên, ông tham dự với tư cách cổ đông lớn sở hữu cổ phần và không tham gia phát biểu hay chất vấn trực tiếp tại đại hội.</p>
    <h2 id="bau-cu-ban-dieu-hanh">Danh sách bầu cử Hội đồng quản trị</h2>
    <p>Đại hội đã tiến hành bỏ phiếu bầu bổ sung các thành viên Hội đồng quản trị mới nhằm kiện toàn bộ máy nhân sự cấp cao. Ban lãnh đạo lâm thời nhấn mạnh sự thay đổi này là cần thiết để khôi phục niềm tin của thị trường và đưa FLC vượt qua giai đoạn khó khăn tài chính hiện tại.</p>
    <div><p><strong>Theo dõi HieuNTHUB để cập nhật thêm tin tức thị trường và phân tích tài chính mới nhất.</strong></p>
    <p>👉<strong> HieuNTHUB:&nbsp;</strong><a href="/">https://hieunthub.co</a></p></div>`
  },
  {
    slug: "phat-dat-ky-ket-hop-tac-voi-tap-doan-lotte-phat-trien-thu-thiem-eco-smart-city",
    title: "Phát Đạt Ký Kết Hợp Tác Với Tập Đoàn Lotte Phát Triển Thủ Thiêm Eco Smart City",
    category: "market-news",
    categoryLabel: "Tin tức thị trường",
    cover: "https://vcdn1-vnexpress.vnecdn.net/2026/05/27/eco-1779845345-8321-1779845351.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=0iVumRI0m1hVmN9AS8d2Tg",
    date: "27/05/2026",
    timeLabel: "27/05/2026 14:15",
    readTime: "2 phút đọc",
    snippet: "Ngày 27 tháng 5 năm 2026, Công ty cổ phần Phát triển bất động sản Phát Đạt đã chính thức ký biên bản ghi nhớ hợp tác với Lotte Properties HCMC, một thành viên thuộc Tập đoàn Lotte, nhằm phát triển dự án Thủ Thiêm Eco Sma...",
    toc: [
      { id: "ky-ket-ghi-nho", label: "Lễ ký kết biên bản ghi nhớ hợp tác", num: 1 },
      { id: "tam-nhin-thu-thiem", label: "Tầm nhìn dự án Eco Smart City", num: 2 },
      { id: "nang-luc-hai-ben", label: "Năng lực phát triển bất động sản", num: 3 }
    ],
    contentHtml: `<p>Ngày 27 tháng 5 năm 2026, Công ty cổ phần Phát triển bất động sản Phát Đạt đã chính thức ký biên bản ghi nhớ hợp tác với Lotte Properties HCMC, một thành viên thuộc Tập đoàn Lotte, nhằm hợp tác đầu tư và phát triển một phần dự án phân khu cao cấp tại Thủ Thiêm Eco Smart City.</p>
    <h2 id="ky-ket-ghi-nho">Lễ ký kết biên bản ghi nhớ hợp tác</h2>
    <p>Sự kiện ký kết diễn ra thành công tốt đẹp với sự chứng kiến của ban lãnh đạo cấp cao hai bên, khẳng định cam kết đồng hành lâu dài trong việc kiến tạo những dự án đô thị thông minh đẳng cấp quốc tế tại trung tâm tài chính mới Thủ Thiêm.</p>
    <h2 id="tam-nhin-thu-thiem">Tầm nhìn dự án Eco Smart City</h2>
    <p>Dự án Thủ Thiêm Eco Smart City có tổng vốn đầu tư lớn, tích hợp các công nghệ thông minh tiên tiến, dịch vụ tài chính, trung tâm thương mại cao cấp và căn hộ thông minh sang trọng bậc nhất thành phố Hồ Chí Minh.</p>
    <h2 id="nang-luc-hai-ben">Năng lực phát triển bất động sản</h2>
    <p>Với bề dày kinh nghiệm của Tập đoàn Lotte kết hợp cùng quỹ đất sạch phong phú và am hiểu thị trường địa phương của Phát Đạt, liên doanh hứa hẹn sẽ mang đến những sản phẩm bất động sản đột phá về thiết kế cũng như chất lượng thi công.</p>
    <div><p><strong>Theo dõi HieuNTHUB để cập nhật thêm tin tức thị trường và phân tích tài chính mới nhất.</strong></p>
    <p>👉<strong> HieuNTHUB:&nbsp;</strong><a href="/">https://hieunthub.co</a></p></div>`
  },
  {
    slug: "thay-doi-can-bo-cap-cao-tai-eximbank",
    title: "Thay Đổi Cán Bộ Cấp Cao Tại Eximbank",
    category: "market-news",
    categoryLabel: "Tin tức thị trường",
    cover: "https://hieunthub.co/uploads/brokers/logos/01KJ4SBN05D7JBA333SC0S2NG7.webp",
    date: "26/05/2026",
    timeLabel: "26/05/2026 06:42",
    readTime: "2 phút đọc",
    snippet: "Ngày 26 tháng 5 năm 2026, Ngân hàng Xuất Nhập khẩu Việt Nam (Eximbank) thông báo về sự ra đi của ba lãnh đạo cấp cao trong ngân hàng, một động thái có thể để tạo ra sự thay đổi tích cực trong quản lý và tổ chức. Ba Phó T...",
    toc: [
      { id: "ba-pho-tong-giam-doc-tu-nhiem-1", label: "Ba Phó Tổng Giám Đốc Từ Nhiệm", num: 1 },
      { id: "lich-su-cong-tac-dai-han-2", label: "Lịch Sử Công Tác Dài Hạn", num: 2 },
      { id: "dinh-huong-phat-trien-moi-3", label: "Định Hướng Phát Triển Mới", num: 3 },
      { id: "su-thay-doi-can-thiet-4", label: "Sự Thay Đổi Cần Thiết", num: 4 }
    ],
    contentHtml: `<p>Ngày 26 tháng 5 năm 2026, Ngân hàng Xuất Nhập khẩu Việt Nam (Eximbank) thông báo về sự ra đi của ba lãnh đạo cấp cao trong ngân hàng, một động thái có thể để tạo ra sự thay đổi tích cực trong quản lý và tổ chức.</p>
    <h2 id="ba-pho-tong-giam-doc-tu-nhiem-1">Ba Phó Tổng Giám Đốc Từ Nhiệm</h2>
    <p>Cụ thể, ông Đào Hồng Châu, ông Nguyễn Hồ Hoàng Vũ và ông Nguyễn Hướng Minh đã nộp đơn xin từ nhiệm các chức vụ Phó Tổng Giám đốc tại Eximbank. Theo thông báo, ông Đào Hồng Châu sẽ thôi giữ chức vụ từ ngày 1 tháng 6 năm 2026; ông Nguyễn Hồ Hoàng Vũ cũng từ chức vị Phó Tổng Giám đốc kiêm Giám đốc Tài chính vào cùng ngày hoặc theo quyết định của Hội đồng quản trị. Ông Nguyễn Hướng Minh, người giữ chức vụ Phó Tổng Giám đốc từ năm 2018, cũng sẽ rời khỏi vị trí này vào ngày 15 tháng 7 năm 2026.</p>
    <p>Trong đơn từ nhiệm, cả ba lãnh đạo đều nêu lý do cá nhân và cam kết bàn giao công việc để đảm bảo hoạt động của ngân hàng không bị gián đoạn.</p>
    <h2 id="lich-su-cong-tac-dai-han-2">Lịch Sử Công Tác Dài Hạn</h2>
    <p>Cả ba Phó Tổng Giám đốc đều có nhiều năm kinh nghiệm làm việc tại Eximbank. Ông Đào Hồng Châu và ông Nguyễn Hồ Hoàng Vũ đã cống hiến gần 30 năm cho ngân hàng, trong khi ông Nguyễn Hướng Minh tham gia vào vị trí lãnh đạo từ năm 2018.</p>
    <h2 id="dinh-huong-phat-trien-moi-3">Định Hướng Phát Triển Mới</h2>
    <p>Về phía Eximbank, ngân hàng này đang thực hiện rà soát mô hình hoạt động, chiến lược và định hướng phát triển cho giai đoạn 2026-2030. Eximbank cho biết mục tiêu của họ là tinh chỉnh cơ cấu tổ chức để xây dựng một mô hình vận hành hiệu quả hơn, giúp ngân hàng hoạt động linh hoạt và tăng cường khả năng phối hợp trong toàn hệ thống.</p>
    <p>Eximbank cũng thông báo rằng họ đang xem xét, sắp xếp lại một số vị trí quản lý nhằm phù hợp với định hướng phát triển trong tương lai gần.</p>
    <h2 id="su-thay-doi-can-thiet-4">Sự Thay Đổi Cần Thiết</h2>
    <p>Sự ra đi của những lãnh đạo kỳ cựu không chỉ đánh dấu một bước ngoặt trong quản lý và tổ chức mà còn cho thấy Eximbank đang hướng tới những mục tiêu phát triển mới. Việc bổ sung nhân sự mới và điều chỉnh cơ cấu điều hành có thể giúp ngân hàng cải thiện hiệu quả kinh doanh và đáp ứng tốt hơn nhu cầu của thị trường.</p>
    <p>Tóm lại, sự từ nhiệm của ba Phó Tổng Giám đốc tại Eximbank phản ánh xu hướng thay đổi trong quản lý, đồng thời khẳng định cam kết của ngân hàng đối với sự phát triển bền vững và hiệu quả trong tương lai.</p>
    <div><p><strong>Theo dõi HieuNTHUB để cập nhật thêm tin tức thị trường, phân tích tài chính và các bài viết mới nhất về broker, vàng và giao dịch.</strong></p>
    <p>👉<strong> HieuNTHUB:&nbsp;</strong><a href="/">https://hieunthub.co</a></p></div>`
  },
  {
    slug: "ty-phu-pham-nhat-vuong-ra-mat-vinenergo-holding-voi-von-dieu-le-khung",
    title: "Tỷ Phú Phạm Nhật Vượng Ra Mắt VinEnergo Holding với Vốn Điều Lệ Khủng",
    category: "market-news",
    categoryLabel: "Tin tức thị trường",
    cover: "https://vcdn1-kinhdoanh.vnecdn.net/2026/05/25/pham-nhat-vuong-1776830359-867-5048-9379-1779682727.png?w=680&h=0&q=100&dpr=1&fit=crop&s=kEp5bWauMPabLn6FeGVqMQ",
    date: "25/05/2026",
    timeLabel: "25/05/2026 10:20",
    readTime: "2 phút đọc",
    snippet: "Ông Phạm Nhật Vượng, người sáng lập Vingroup, vừa khởi xướng một doanh nghiệp mới mang tên VinEnergo Holding với vốn điều lệ lên tới 79.763 tỷ đồng, vượt xa mức vốn của tập đoàn Vingroup. Chi Tiết Về Doanh Nghiệp MớiTheo...",
    toc: [
      { id: "thanh-lap-doanh-nghiep", label: "Thành lập siêu doanh nghiệp năng lượng", num: 1 },
      { id: "von-dieu-le-khung", label: "Quy mô vốn điều lệ cực lớn", num: 2 },
      { id: "dinh-huong-tuong-lai", label: "Tầm nhìn và định hướng năng lượng xanh", num: 3 }
    ],
    contentHtml: `<p>Ông Phạm Nhật Vượng, người sáng lập kiêm Chủ tịch Vingroup, vừa khởi xướng một doanh nghiệp mới mang tên VinEnergo Holding với quy mô vốn đăng ký vượt trội.</p>
    <h2 id="thanh-lap-doanh-nghiep">Thành lập siêu doanh nghiệp năng lượng</h2>
    <p>VinEnergo Holding đăng ký hoạt động kinh doanh chính trong lĩnh vực sản xuất và truyền tải năng lượng tái tạo, phát triển hạ tầng trạm sạc xe điện thông minh toàn cầu.</p>
    <h2 id="von-dieu-le-khung">Quy mô vốn điều lệ cực lớn</h2>
    <p>Với mức vốn điều lệ lên tới 79.763 tỷ đồng, VinEnergo vượt qua nhiều doanh nghiệp đầu ngành tại Việt Nam, thể hiện quyết tâm cực lớn của tỷ phú Phạm Nhật Vượng trong việc chinh phục thị trường năng lượng sạch.</p>
    <h2 id="dinh-huong-tuong-lai">Tầm nhìn và định hướng năng lượng xanh</h2>
    <p>Doanh nghiệp hướng đến mục tiêu đồng hành cùng cam kết phát thải ròng bằng 0 của Việt Nam, cung cấp giải pháp nguồn điện xanh toàn diện và thúc đẩy cuộc cách mạng xe điện toàn cầu.</p>
    <div><p><strong>Theo dõi HieuNTHUB để cập nhật thêm tin tức thị trường và phân tích tài chính mới nhất.</strong></p>
    <p>👉<strong> HieuNTHUB:&nbsp;</strong><a href="/">https://hieunthub.co</a></p></div>`
  }
];
