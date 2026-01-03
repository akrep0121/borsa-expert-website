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
        <p className="text-secondary text-lg">Yazı bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <article className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-secondary hover:text-primary transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </button>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm font-semibold px-4 py-2 bg-primary/10 text-primary rounded-lg">
                {post.category}
              </span>
              <span className="text-sm text-secondary flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-secondary space-x-4">
              <span className="font-semibold text-foreground">{post.author}</span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.date)}
              </span>
            </div>
          </header>

          <div className="chart-line mb-12" />

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="text-foreground space-y-6 whitespace-pre-wrap leading-relaxed text-lg">
                {post.content}
              </div>
            </div>
          </div>

          <footer className="mt-16 pt-12 border-t border-border">
            <div className="bg-surface/50 border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Yazar Hakkında</h3>
              <p className="text-secondary leading-relaxed">
                {post.author} - Borsa ve yatırım dünyasında yılların tecrübesi ile teknik ve temel 
                analiz üzerine uzman görüşler paylaşıyor. Finansal piyasalardaki güncel 
                gelişmeleri ve yatırım stratejilerini takip etmenize yardımcı oluyor.
              </p>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
