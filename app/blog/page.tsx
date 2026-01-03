'use client'

import { useState, useEffect } from 'react'
import BlogCard from '@/components/BlogCard'
import { getBlogPosts, getAllCategories } from '@/lib/blog-data'
import { motion } from 'framer-motion'

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-3">
            <div className="mb-20">
              <h2 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white uppercase mb-4">
                Yazılar
                <span className="text-indigo-500">.</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
                Borsa yatırımı ve analiz üzerine detaylı yazılarım
              </p>
            </div>

            <div className="mb-16 space-y-8">
              <input
                type="text"
                placeholder="İçeriklerde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/[0.1] rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-white outline-none focus:border-indigo-500 transition"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${
                    !selectedCategory
                      ? 'bg-indigo-500 text-white border-indigo-400'
                      : 'text-gray-500 hover:text-white border-white/[0.1]'
                  }`}
                >
                  Tümü
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${
                      selectedCategory === category
                        ? 'bg-indigo-500 text-white border-indigo-400'
                        : 'text-gray-500 hover:text-white border-white/[0.1]'
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
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-12 sticky top-32 space-y-12"
            >
              <div className="space-y-8">
                <h3 className="text-lg font-black uppercase tracking-widest text-white">
                  Kategoriler
                </h3>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-[10px] font-black uppercase tracking-[0.3em] block w-full text-left transition-colors ${
                        selectedCategory === category
                          ? 'text-white'
                          : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
