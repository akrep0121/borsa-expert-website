import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getFeaturedPosts } from '@/lib/blog-data'

export default function Home() {
  const featuredPosts = getFeaturedPosts(3)

  return (
    <div>
      <Hero />
      
      <section id="philosophy" className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Yatırım Felsefem
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              Başarılı yatırımcılığın temel prensipleri ve kanıtlanmış yöntemler
            </p>
            <div className="chart-line max-w-xs mx-auto mt-10" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="card-modern rounded-3xl p-10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Teknik Analiz</h3>
              <p className="text-secondary text-base leading-relaxed">
                Grafik desenleri, trend çizgileri ve teknik indikatörler ile fiyat hareketlerini analiz edin.
              </p>
            </div>
            
            <div className="card-modern rounded-3xl p-10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Temel Analiz</h3>
              <p className="text-secondary text-base leading-relaxed">
                Şirket finansalları, raporlar ve sektör analizleri ile gerçek değerlerini keşfedin.
              </p>
            </div>
            
            <div className="card-modern rounded-3xl p-10 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Risk Yönetimi</h3>
              <p className="text-secondary text-base leading-relaxed">
                Portföy dengesi, stop-loss stratejileri ve risk yönetimi ile yatırımlarınızı koruyun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 lg:py-40 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Öne Çıkan Analizler
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              Son yazılarımdan seçkiler ve önemli analiz notları
            </p>
            <div className="chart-line max-w-xs mx-auto mt-10" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a
              href="/blog"
              className="btn-secondary px-10 py-5 text-foreground font-semibold rounded-2xl inline-flex items-center group text-lg"
            >
              Tüm Yazıları Görüntüle
              <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
