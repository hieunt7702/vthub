import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 w-full py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
              VT
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Rewards</span>
            </span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            VT Rewards Hub là trung tâm tổng hợp quyền lợi giao dịch và cơ chế đối tác dành cho khách hàng VT Markets. Cập nhật mới nhất về ưu đãi, chương trình thưởng và chính sách IB.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Hệ thống quyền lợi</h4>
          <Link href="/rewards" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Chương trình thưởng</Link>
          <Link href="/offers-bonus" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Ưu đãi khách hàng</Link>
          <Link href="/ib-commission-overview" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Cơ chế IB / Đối tác</Link>
          <Link href="/indicators" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Công cụ giao dịch</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Hỗ trợ & Công cụ</h4>
          <Link href="/contact" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Hướng dẫn liên kết tài khoản</Link>
          <Link href="/contact" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Liên hệ đội ngũ hỗ trợ</Link>
          <Link href="/gia-vang-hom-nay" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Giá vàng trực tuyến</Link>
          <Link href="/courses" className="text-zinc-400 hover:text-orange-400 transition-colors text-sm w-fit">Khóa học Trading</Link>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Pháp lý & Cảnh báo</h4>
          <p className="text-zinc-500 text-xs leading-relaxed">
            <strong className="text-zinc-400">Disclaimer:</strong> Thông tin trên VT Rewards Hub được sử dụng nhằm mục đích hỗ trợ tra cứu ưu đãi và chính sách đối tác. Các điều kiện có thể thay đổi theo từng thời điểm. Vui lòng liên hệ đội ngũ hỗ trợ để xác nhận thông tin mới nhất.
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <Link href="/terms" className="text-zinc-500 hover:text-white underline transition-colors text-xs w-fit">Điều khoản sử dụng</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-white underline transition-colors text-xs w-fit">Chính sách bảo mật</Link>
          </div>
        </div>

      </div>
      
      <div className="mt-16 px-4 lg:px-8 max-w-7xl mx-auto text-zinc-600 text-xs text-center border-t border-white/5 pt-8">
        &copy; {new Date().getFullYear()} VT Rewards Hub. Thuộc hệ sinh thái đối tác VT Markets. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}
