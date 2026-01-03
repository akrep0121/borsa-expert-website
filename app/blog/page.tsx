'use client'

import { useState, useEffect } from 'react'
import BlogCard from '@/components/BlogCard'
import { getBlogPosts, getAllCategories } from '@/lib/blog-data'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const allPosts = getBlogPosts()
    const allCategories = getAllCategories()
    setPosts(allPosts)
    setCategories(allCategories)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <section className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-8">
              Blog & Analiz Yazıları
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              Borsa yatırımı, teknik analiz ve temel analiz üzerine detaylı yazılarım
            </p>
            <div className="chart-line max-w-xs mx-auto mt-10" />
          </div>

          <div className="mb-16 space-y-8 max-w-5xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Yazı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-5 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground placeholder:text-secondary focus:border-primary focus:outline-none transition-all text-lg"
              />
              <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-8 py-3 rounded-2xl text-base font-semibold transition-all ${
                  !selectedCategory
                    ? 'bg-primary text-black shadow-xl shadow-primary/30'
                    : 'btn-secondary text-secondary hover:text-foreground'
                }`}
              >
                Tümü
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-2xl text-base font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-black shadow-xl shadow-primary/30'
                      : 'btn-secondary text-secondary hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-secondary text-xl">Sonuç bulunamadı.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
