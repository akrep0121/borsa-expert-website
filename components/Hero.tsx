import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-80 pb-40 px-6 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div>
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-8 py-2.5 rounded-full text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase mb-16">
              <span>Borsa ve Yatırım Uzmanı</span>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-12 text-white uppercase">
            Geleceği<br />
            <span className="text-indigo-500">bugünden</span><br />
            inşa edin.
          </h1>
          
          <a
            href="#analysis"
            className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold transition-all text-sm uppercase tracking-widest hover:bg-gray-200"
          >
            İçerikleri Keşfet
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-12 text-center"
          >
            <div className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
              20+
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Yıl Deneyim
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-12 text-center"
          >
            <div className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
              500+
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Analiz Yazısı
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-12 text-center"
          >
            <div className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
              10K+
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Okuyucu
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-12 text-center flex items-center justify-center"
          >
            <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
