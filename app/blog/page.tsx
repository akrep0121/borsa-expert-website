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
      <section className="py-60 px-6 max-w-[1600px] mx-auto border-t border-white/[0.05]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="mb-20">
              <h2 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white uppercase mb-4">
                Yazılar
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  .
                </span>
              </h2>
              <p className="text-gray-500 text-sm font-medium tracking-widest">
                Toplam <span className="text-indigo-400">{posts.length}</span> içerik
              </p>
            </div>

            <div className="mb-16 space-y-8">
              <input
                type="text"
                placeholder="İçeriklerde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-white outline-none focus:border-indigo-500 w-full md:w-auto"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                    !selectedCategory
                      ? 'bg-indigo-500 text-white border-indigo-400'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Tümü
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                      selectedCategory === category
                        ? 'bg-indigo-500 text-white border-indigo-400'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Sonuç bulunamadı.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[2.5rem] sticky top-32 space-y-12">
              <div className="space-y-6">
                <h3 className="text-lg font-black uppercase tracking-widest text-white flex items-center gap-3">
                  Kategoriler
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const count = posts.filter(p => p.category === category).length
                    const isActive = selectedCategory === category
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xs font-black uppercase tracking-wider">{category}</span>
                        <span className="text-xs font-bold">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
