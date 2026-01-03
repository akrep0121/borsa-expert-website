export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-surface border border-border rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-secondary">
              Borsa ve Yatırım Dünyasında 20+ Yıllık Deneyim
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-green-400 to-foreground bg-clip-text text-transparent">
            Yatırım Felsefesi ve
            <br />
            Teknik Analiz Uzmanlığı
          </h1>
          
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
            Yılların tecrübesiyle derlediğim stratejiler, analizler ve 
            yatırım notları ile finansal okuryazarlığınızı geliştirin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/blog"
              className="px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-green-400 transition-colors glow-effect"
            >
              Blog Yazıları
            </a>
            <a
              href="#philosophy"
              className="px-8 py-3 bg-surface border border-border text-foreground font-semibold rounded-lg hover:border-primary transition-colors"
            >
              Yatırım Felsefem
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-50">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">20+</div>
            <div className="text-xs text-secondary">Yıl Deneyim</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-xs text-secondary">Analiz Yazısı</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-xs text-secondary">Okuyucu</div>
          </div>
        </div>
      </div>
    </section>
  )
}
