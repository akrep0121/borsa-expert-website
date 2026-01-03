'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBlogPostById } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    const postId = params.slug as string
    const fetchedPost = getBlogPostById(postId)
    setPost(fetchedPost)
  }, [params.slug])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Yazı bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[#ededed]">
      <nav className="fixed w-full z-50 p-8 flex justify-center">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] px-12 py-4 rounded-full shadow-2xl flex items-center gap-16 transition-all hover:border-white/[0.12]">
          <div 
            onClick={() => router.push('/')}
            className="text-2xl font-black tracking-tighter text-white uppercase italic cursor-pointer hover:opacity-80 transition"
          >
            Borsa<span className="text-indigo-500">.</span>
          </div>
          <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            <span 
              onClick={() => router.push('/')}
              className="hover:text-white transition cursor-pointer"
            >
              Giriş
            </span>
            <span 
              onClick={() => router.push('/blog')}
              className="hover:text-white transition cursor-pointer"
            >
              Yazılar
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/blog')}
          className="mb-12 flex items-center gap-3 text-gray-400 hover:text-white transition text-sm font-bold uppercase tracking-wider"
        >
          <span>←</span>
          <span>Yazılara Dön</span>
        </button>

        <div className="mb-20">
          <span className="bg-indigo-500/20 border-indigo-500 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full inline-block text-white shadow-xl">
            {post.category || 'Genel'}
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-12 uppercase leading-none">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="font-medium text-white">{formatDate(post.date)}</span>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
          alt={post.title}
          className="w-full h-[60vh] object-cover rounded-[2rem] shadow-2xl mb-20"
        />

        <div className="max-w-none">
          <div
            className="prose prose-invert prose-p:text-gray-400 prose-p:text-xl prose-h2:text-white prose-h2:text-4xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>

        <div className="mt-24 p-12 bg-white/[0.02] border border-white/[0.05] rounded-[3rem] text-center">
          <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Haftalık Analizler</h3>
          <p className="text-gray-400 mb-8">En güncel finansal analizler, yatırım stratejileri ve teknoloji trendleri.</p>
          <div className="flex justify-center">
            <div className="inline-block bg-gray-500/10 rounded-full w-4 h-4 animate-pulse"></div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white/[0.1]">
          <h3 className="text-2xl font-black text-white uppercase mb-8 flex items-center gap-4">
            Paylaş
          </h3>
        </div>
      </div>
    </div>
  )
}
