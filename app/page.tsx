import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getFeaturedPosts } from '@/lib/blog-data'

export default function Home() {
  const featuredPosts = getFeaturedPosts(3)

  return (
    <div>
      <Hero />
      
      <section id="philosophy" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Yatırım Felsefem
            </h2>
            <div className="chart-line max-w-xs mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Teknik Analiz</h3>
              <p className="text-secondary text-sm">
                Grafik desenleri, trend çizgileri ve teknik indikatörler ile fiyat hareketlerini analiz edin.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Temel Analiz</h3>
              <p className="text-secondary text-sm">
                Şirket finansalları, raporlar ve sektör analizleri ile gerçek değerlerini keşfedin.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Risk Yönetimi</h3>
              <p className="text-secondary text-sm">
                Portföy dengesi, stop-loss stratejileri ve risk yönetimi ile yatırımlarınızı koruyun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Öne Çıkan Analizler
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Son yazılarımdan seçkiler ve önemli analiz notları
            </p>
            <div className="chart-line max-w-xs mx-auto mt-4" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-surface border border-border text-foreground font-semibold rounded-lg hover:border-primary transition-colors"
            >
              Tüm Yazıları Görüntüle
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
