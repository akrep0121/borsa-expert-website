export default function Hero() {
  return (
    <section className="pt-80 pb-40 px-6 max-w-6xl mx-auto relative z-10">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full opacity-50 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-8 py-2.5 rounded-full text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase mb-12">
            <span>Borsa ve Yatırım Uzmanı</span>
          </div>
        </div>
        
        <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-24 text-white uppercase text-center">
          Geleceği <span className="text-indigo-500">bugünden</span> inşa edin.
        </h1>
        
        <button 
          onClick={() => document.getElementById('analysis')?.scrollIntoView({behavior: 'smooth'})}
          className="px-8 py-4 bg-white text-black rounded-full font-bold transition-all text-sm uppercase tracking-widest hover:bg-gray-200"
        >
          İçerikleri Keşfet
        </button>
      </div>
    </section>
  )
}
