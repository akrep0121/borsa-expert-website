export default function Hero() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center space-x-3 bg-gray-800/60 backdrop-blur-sm border border-border rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
            <span className="text-base text-secondary font-medium">
              20+ Yıllık Borsa ve Yatırım Uzmanı
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Yatırım Felsefesi ve
            <br />
            <span className="gradient-text">
              Profesyonel Analiz Uzmanlığı
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Yılların tecrübesiyle derlediğim stratejiler, analizler ve 
            yatırım notları ile finansal okuryazarlığınızı geliştirin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <a
              href="/blog"
              className="btn-primary px-10 py-5 text-white font-semibold rounded-2xl inline-flex items-center group text-lg"
            >
              Blog Yazıları
              <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#philosophy"
              className="btn-secondary px-10 py-5 text-foreground font-semibold rounded-2xl inline-flex items-center text-lg"
            >
              Yatırım Felsefem
            </a>
          </div>
        </div>

        <div className="mt-24 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/10 to-green-500/20 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-gray-800/60 backdrop-blur-xl border border-border rounded-3xl p-12 shadow-2xl">
              <div className="grid grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-4 transition-transform group-hover:scale-105">
                    20+
                  </div>
                  <div className="text-base text-secondary font-medium">Yıl Deneyim</div>
                </div>
                <div className="text-center border-x border-border/50 group">
                  <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-4 transition-transform group-hover:scale-105">
                    500+
                  </div>
                  <div className="text-base text-secondary font-medium">Analiz Yazısı</div>
                </div>
                <div className="text-center group">
                  <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-4 transition-transform group-hover:scale-105">
                    10K+
                  </div>
                  <div className="text-base text-secondary font-medium">Okuyucu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
