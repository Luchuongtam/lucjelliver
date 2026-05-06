/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Diamond, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  Star, 
  Gem,
  TrendingDown,
  TrendingUp,
  Mail,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Simulated Gold Price Data
const INITIAL_GOLD_PRICES = [
  { type: 'SJC', buy: 79.50, sell: 81.50, trend: 'up' },
  { type: 'Nhẫn Tròn Trơn 9999', buy: 68.20, sell: 69.50, trend: 'up' },
  { type: 'Vàng 18K (75%)', buy: 50.15, sell: 52.45, trend: 'down' },
  { type: 'Vàng 14K (58.3%)', buy: 38.60, sell: 40.90, trend: 'up' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prices, setPrices] = useState(INITIAL_GOLD_PRICES);

  // Scroll handler for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        buy: p.buy + (Math.random() * 0.05 - 0.02),
        sell: p.sell + (Math.random() * 0.05 - 0.02),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-white shadow-gold-light/20 shadow-lg group-hover:scale-110 transition-transform">
              <Diamond size={22} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl md:text-2xl font-bold tracking-wider leading-none transition-colors ${scrolled ? 'text-midnight' : 'text-white'}`}>
                BẢO TÍN
              </span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors ${scrolled ? 'text-gold' : 'text-gold-light'}`}>
                MINH HƯNG
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10">
            {['Trang Chủ', 'Trang Sức Cưới', 'Vàng 9999', 'Bảng Giá Vàng', 'Liên Hệ'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`text-sm font-semibold tracking-widest uppercase transition-colors hover:text-gold ${
                  scrolled ? 'text-midnight' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="shimmer gold-gradient text-white px-8 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-105 transition-transform active:scale-95">
              Tư Vấn Zalo
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-midnight' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {['Trang Chủ', 'Trang Sức Cưới', 'Vàng 9999', 'Bảng Giá Vàng', 'Liên Hệ'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-2xl font-serif text-midnight hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="mt-4 gold-gradient text-white px-10 py-4 rounded-sm text-lg font-bold uppercase tracking-widest">
              Liên Hệ Ngay
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2069&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-gold-light uppercase tracking-[0.5em] text-sm font-semibold mb-6 block drop-shadow-md">
              Kể Chuyện Bằng Trang Sức
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight tracking-tight drop-shadow-2xl">
              BẢO TÍN MINH HƯNG <br/>
              <span className="gold-text-gradient italic font-normal">Tinh Hoa Chế Tác</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
              Tôn vinh vẻ đẹp vĩnh cửu qua những tuyệt tác trang sức <br className="hidden md:block" /> 
              được chế tác thủ công tinh xảo từ tâm hồn nghệ nhân.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="gold-gradient text-white px-12 py-4 rounded-sm text-base font-bold uppercase tracking-[0.2em] shadow-2xl hover:brightness-110 transition-all group">
                Khám Phá Bộ Sưu Tập
                <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-4 rounded-sm text-base font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-midnight transition-all">
                Dịch Vụ Chế Tác
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* --- LIVE GOLD PRICE BOARD --- */}
      <section className="py-24 bg-midnight relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-ruby/10 blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white font-bold mb-4">Bảng Giá Vàng Trực Tuyến</h2>
            <div className="w-24 h-1 gold-gradient mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-xl mx-auto">
              Cập nhật liên tục theo biến động thị trường thế giới và trong nước.
              Đảm bảo tính minh bạch và uy tín tuyệt đối.
            </p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden p-1"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="px-6 py-5 text-gold-light text-xs uppercase tracking-widest font-bold">Loại Vàng</th>
                    <th className="px-6 py-5 text-gold-light text-xs uppercase tracking-widest font-bold text-right">Mua Vào (Trđ)</th>
                    <th className="px-6 py-5 text-gold-light text-xs uppercase tracking-widest font-bold text-right">Bán Ra (Trđ)</th>
                    <th className="px-6 py-5 text-gold-light text-xs uppercase tracking-widest font-bold text-center">Xu Hướng</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {prices.map((gold, idx) => (
                    <tr key={gold.type} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors`}>
                      <td className="px-6 py-6 font-medium text-lg">{gold.type}</td>
                      <td className="px-6 py-6 text-right font-mono text-2xl font-light">
                        {gold.buy.toFixed(2)}
                      </td>
                      <td className="px-6 py-6 text-right font-mono text-2xl font-light">
                        {gold.sell.toFixed(2)}
                      </td>
                      <td className="px-6 py-6 flex justify-center">
                        <div className={`flex items-center gap-1 text-sm ${gold.trend === 'up' ? 'text-green-400' : 'text-ruby'}`}>
                          {gold.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span className="font-bold uppercase tracking-tighter">
                            {gold.trend === 'up' ? '+0.15%' : '-0.08%'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <p className="text-center text-gray-500 mt-8 text-sm italic">
            * Giá vàng mang tính chất tham khảo, vui lòng liên hệ hotline để có giá chính xác nhất tại thời điểm giao dịch.
          </p>
        </div>
      </section>

      {/* --- FEATURED COLLECTIONS --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-ruby font-bold tracking-widest uppercase text-xs mb-4 block">Tuyệt Tác Nghệ Thuật</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-midnight">Bộ Sưu Tập Nổi Bật</h2>
            <div className="w-24 h-1 bg-ruby/20 mx-auto"></div>
          </motion.div>

          <motion.div 
            {...stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: 'Tình Yêu Vĩnh Cửu', 
                subtitle: 'Bộ Sưu Tập Nhẫn Cưới', 
                img: 'https://images.unsplash.com/photo-1598560912005-59a195b1521a?q=80&w=1974&auto=format&fit=crop',
                tag: 'Wedding'
              },
              { 
                title: 'Kim Cương Tinh Tế', 
                subtitle: 'Sự Sang Trọng Đích Thực', 
                img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2003&auto=format&fit=crop',
                tag: 'Diamond'
              },
              { 
                title: 'Quà Tặng Phong Thủy', 
                subtitle: 'May Mắn & Tài Lộc', 
                img: 'https://images.unsplash.com/photo-1610444583737-14220b33e70d?q=80&w=1935&auto=format&fit=crop',
                tag: 'Luxury'
              }
            ].map((collection, idx) => (
              <motion.div 
                key={collection.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-sm aspect-[3/4] cursor-pointer shadow-xl"
              >
                {/* Image */}
                <img 
                  src={collection.img} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent flex flex-col justify-end p-8 transition-colors group-hover:from-midnight/95">
                  <span className="text-gold-light text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    {collection.tag}
                  </span>
                  <h3 className="text-white text-3xl font-serif font-bold mb-2 group-hover:gold-text-gradient transition-all">
                    {collection.title}
                  </h3>
                  <p className="text-gray-300 text-sm font-light mb-6 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-500">
                    {collection.subtitle}
                  </p>
                  
                  <div className="h-px w-0 bg-gold group-hover:w-full transition-all duration-500 mb-4"></div>
                  
                  <button className="flex items-center text-white text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem Chi Tiết <ChevronRight size={14} className="ml-2" />
                  </button>
                </div>
                
                {/* Border Hover Effect */}
                <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/30 transition-all duration-700 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Tại Sao Chọn Bảo Tín Minh Hưng?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hơn 20 năm khẳng định uy tín trên thị trường vàng bạc đá quý, chúng tôi cam kết mang đến những sản phẩm tốt nhất.
            </p>
          </motion.div>

          <motion.div 
            {...stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              { 
                icon: <ShieldCheck size={40} className="mx-auto text-gold mb-6" />, 
                title: 'Cam Kết Thu Đổi', 
                desc: 'Cam kết thu đổi 100% giá trị theo chính sách minh bạch.' 
              },
              { 
                icon: <Award size={40} className="mx-auto text-gold mb-6" />, 
                title: 'Kiểm Định Quốc Tế', 
                desc: 'Mọi sản phẩm kim cương, đá quý đều có giấy kiểm định quốc tế.' 
              },
              { 
                icon: <Gem size={40} className="mx-auto text-gold mb-6" />, 
                title: 'Chế Tác Thủ Công', 
                desc: 'Được bàn tay của những thợ kim hoàn lành nghề nhất thực hiện.' 
              },
              { 
                icon: <Star size={40} className="mx-auto text-gold mb-6" />, 
                title: 'Uy Tín Thương Hiệu', 
                desc: 'Top đầu thương hiệu vàng bạc đá quý tại khu vực Hưng Yên.' 
              },
            ].map((feature, idx) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                {feature.icon}
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-midnight pt-20 pb-10 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center text-white">
                  <Diamond size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white text-lg font-bold tracking-wider leading-none">BẢO TÍN</span>
                  <span className="text-[8px] text-gold-light uppercase tracking-[0.3em] font-medium">MINH HƯNG</span>
                </div>
              </div>
              <p className="text-sm leading-loose mb-8 font-light">
                Chuyên kinh doanh, chế tác các loại vàng bạc đá quý cao cấp. 
                Sứ mệnh của chúng tôi là tôn vinh vẻ đẹp và giá trị của khách hàng qua từng sản phẩm.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8 border-l-2 border-gold pl-4">Khám Phá</h5>
              <ul className="space-y-4 text-sm">
                {['Về chúng tôi', 'Bộ sưu tập nhẫn cưới', 'Trang sức kim cương', 'Dịch vụ chế tác', 'Kiến thức vàng bạc'].map(link => (
                  <li key={link}><a href="#" className="hover:text-gold transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8 border-l-2 border-gold pl-4">Liên Hệ</h5>
              <ul className="space-y-6 text-sm">
                <li className="flex gap-4 items-start">
                  <MapPin size={20} className="text-gold flex-shrink-0" />
                  <span>Số 22 đường Phố Nối, Tỉnh Hưng Yên.</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone size={20} className="text-gold flex-shrink-0" />
                  <span>Hotline: 0912 345 678</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Mail size={20} className="text-gold flex-shrink-0" />
                  <span>contact@baotinminhhung.vn</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8 border-l-2 border-gold pl-4">Đăng Ký Báo Giá</h5>
              <p className="text-xs mb-6 font-light">Nhận thông báo giá vàng hằng ngày và ưu đãi mới nhất.</p>
              <form className="relative">
                <input 
                  type="email" 
                  placeholder="Email của bạn..." 
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-5 text-sm focus:outline-none focus:border-gold transition-colors pr-12"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold text-white rounded-sm flex items-center justify-center hover:brightness-110 transition-all">
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest font-medium">
              &copy; 2026 CÔNG TY TNHH VÀNG BẠC BẢO TÍN MINH HƯNG. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium">
              <a href="#" className="hover:text-gold transition-colors">Điều khoản dịch vụ</a>
              <a href="#" className="hover:text-gold transition-colors">Chính sách bảo mật</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
