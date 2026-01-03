import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { getFeaturedPosts } from '@/lib/blog-data'

export default function Home() {
  const featuredPosts = getFeaturedPosts(3)

  return (
    <div>
      <Hero />
      
      <section id="analysis" className="py-60 px-6 max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white uppercase mb-4 text-center">
            Analiz
            <span className="text-indigo-500">.</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium tracking-widest text-center uppercase">
            Başarılı yatırımcılığın temel prensipleri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-16 transition-all duration-300 hover:border-indigo-500/30">
            <svg className="w-16 h-16 text-indigo-500 mb-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-6">
              Teknik Analiz
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Grafik desenleri, trend çizgileri ve teknik indikatörler ile fiyat hareketlerini analiz edin.
            </p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-16 transition-all duration-300 hover:border-indigo-500/30">
            <svg className="w-16 h-16 text-indigo-500 mb-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002-2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-6">
              Temel Analiz
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Şirket finansalları, raporlar ve sektör analizleri ile gerçek değerlerini keşfedin.
            </p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-16 transition-all duration-300 hover:border-indigo-500/30">
            <svg className="w-16 h-16 text-indigo-500 mb-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-6">
              Risk Yönetimi
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Portföy dengesi, stop-loss stratejileri ve risk yönetimi ile yatırımlarınızı koruyun.
            </p>
          </div>
        </div>
      </section>

      <section id="blog" className="py-60 px-6 max-w-[1600px] mx-auto border-t border-white/[0.05]">
        <div className="mb-20">
          <h2 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white uppercase mb-4 text-center">
            Güncel
            <span className="text-indigo-500">.</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium tracking-widest text-center uppercase">
            Son yazılarımdan seçkiler
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
