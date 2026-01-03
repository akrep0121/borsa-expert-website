import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getFeaturedPosts } from '@/lib/blog-data'

export default function Home() {
  const featuredPosts = getFeaturedPosts(3)

  return (
    <div>
      <Hero />
      
      <section id="philosophy" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Yatırım Felsefem
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Başarılı yatırımcılığın temel prensipleri ve yöntemleri
            </p>
            <div className="chart-line max-w-xs mx-auto mt-6" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all card-hover group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Teknik Analiz</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Grafik desenleri, trend çizgileri ve teknik indikatörler ile fiyat hareketlerini analiz edin.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all card-hover group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Temel Analiz</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Şirket finansalları, raporlar ve sektör analizleri ile gerçek değerlerini keşfedin.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all card-hover group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Risk Yönetimi</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Portföy dengesi, stop-loss stratejileri ve risk yönetimi ile yatırımlarınızı koruyun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Öne Çıkan Analizler
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Son yazılarımdan seçkiler ve önemli analiz notları
            </p>
            <div className="chart-line max-w-xs mx-auto mt-6" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="btn-secondary px-8 py-4 text-foreground font-semibold rounded-xl inline-flex items-center group"
            >
              Tüm Yazıları Görüntüle
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
