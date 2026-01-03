export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/[0.05] bg-[#000]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-600 flex items-center gap-4">
          <span>Borsa Uzmanı</span>
          © 2024
        </div>
        <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
          <a href="#" className="hover:text-indigo-400 transition">
            Twitter
          </a>
          <a href="#" className="hover:text-indigo-400 transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
