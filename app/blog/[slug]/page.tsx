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
        <p className="text-secondary">Yazı bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <article className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-secondary hover:text-primary transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </button>

          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary/20 text-primary rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-secondary">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center text-secondary">
              <span className="font-medium text-foreground">{post.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </header>

          <div className="chart-line mb-8" />

          <div className="prose prose-invert max-w-none">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-foreground space-y-4 whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-border">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Yazar Hakkında</h3>
              <p className="text-secondary">
                {post.author} - Borsa ve yatırım dünyasında yılların tecrübesi ile teknik ve temel 
                analiz üzerine uzman görüşler paylaşıyor.
              </p>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
