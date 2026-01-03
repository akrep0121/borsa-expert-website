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
        <p className="text-secondary text-xl">Yazı bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <article className="py-32 lg:py-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-secondary hover:text-primary transition-colors mb-12 group"
          >
            <svg className="w-6 h-6 mr-3 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </button>

          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-5 mb-8">
              <span className="text-base font-semibold px-6 py-3 bg-primary/10 text-primary rounded-2xl border border-primary/20">
                {post.category}
              </span>
              <span className="text-base text-secondary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-secondary space-x-6 text-lg">
              <span className="font-semibold text-foreground">{post.author}</span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.date)}
              </span>
            </div>
          </header>

          <div className="chart-line mb-16" />

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="card-modern rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="text-foreground space-y-8 whitespace-pre-wrap leading-relaxed text-xl">
                {post.content}
              </div>
            </div>
          </div>

          <footer className="mt-24 pt-16 border-t border-border/50">
            <div className="card-modern rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Yazar Hakkında</h3>
              <p className="text-secondary text-lg leading-relaxed">
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
