export default function Hero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 bg-surface/50 backdrop-blur-sm border border-border rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-secondary font-medium">
              Borsa ve Yatırım Dünyasında 20+ Yıllık Deneyim
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Yatırım Felsefesi ve
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              Teknik Analiz Uzmanlığı
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Yılların tecrübesiyle derlediğim stratejiler, analizler ve 
            yatırım notları ile finansal okuryazarlığınızı geliştirin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/blog"
              className="btn-primary px-8 py-4 text-black font-semibold rounded-xl inline-flex items-center group"
            >
              Blog Yazıları
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#philosophy"
              className="btn-secondary px-8 py-4 text-foreground font-semibold rounded-xl inline-flex items-center"
            >
              Yatırım Felsefem
            </a>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-sm text-secondary font-medium">Yıl Deneyim</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-secondary font-medium">Analiz Yazısı</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-secondary font-medium">Okuyucu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
