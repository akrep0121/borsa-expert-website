'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBlogPostById } from '@/lib/blog-data'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen">
      <article className="py-60 px-6 max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-white transition-colors mb-20 text-xs font-black uppercase tracking-[0.3em]"
        >
          ← Geri Dön
        </motion.button>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">
              {post.category}
            </span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-600">
              {post.readTime}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-12 uppercase leading-none">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-500 space-x-6 text-xs font-black uppercase tracking-[0.3em]">
            <span className="text-white">{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-16 md:p-24"
        >
          <div className="text-gray-400 space-y-8 whitespace-pre-wrap leading-relaxed text-xl">
            {post.content}
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24"
        >
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-16">
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-8">
              Yazar Hakkında
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              {post.author} - Borsa ve yatırım dünyasında yılların tecrübesi ile teknik ve temel 
              analiz üzerine uzman görüşler paylaşıyor. Finansal piyasalardaki güncel 
              gelişmeleri ve yatırım stratejilerini takip etmenize yardımcı oluyor.
            </p>
          </div>
        </motion.footer>
      </article>
    </div>
  )
}
