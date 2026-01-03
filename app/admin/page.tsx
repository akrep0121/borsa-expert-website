'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLoginForm from '@/components/AdminLoginForm'
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, BlogPost } from '@/lib/blog-data'

const ADMIN_PASSWORD = 'KJSA1660'

interface FormData {
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  featured: boolean
  readTime: string
}

const INITIAL_FORM: FormData = {
  title: '',
  excerpt: '',
  content: '',
  author: 'Borsa Uzmanı',
  category: 'Yatırım Stratejileri',
  featured: false,
  readTime: '5 dk'
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadPosts()
    } else {
      setShowLogin(true)
    }
  }, [])

  const loadPosts = () => {
    const allPosts = getBlogPosts()
    setPosts(allPosts)
  }

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowLogin(false)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadPosts()
    } else {
      setLoginError('Hatalı şifre')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLogin(true)
    sessionStorage.removeItem('admin_authenticated')
    router.push('/')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingPost) {
      updateBlogPost(editingPost.id, formData)
      setEditingPost(null)
    } else {
      addBlogPost(formData)
    }
    
    setFormData(INITIAL_FORM)
    setIsFormOpen(false)
    loadPosts()
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      featured: post.featured,
      readTime: post.readTime
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      deleteBlogPost(id)
      loadPosts()
    }
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setFormData(INITIAL_FORM)
    setIsFormOpen(false)
  }

  if (!isAuthenticated) {
    return (
      <div>
        {showLogin && (
          <AdminLoginForm
            onLogin={handleLogin}
            onCancel={() => router.push('/')}
            error={loginError}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="py-60 px-6 max-w-[1600px] mx-auto border-t border-white/[0.05]">
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white uppercase mb-4">
                Admin
              </h1>
              <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
                Blog yazılarını yönetin
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setEditingPost(null)
                  setFormData(INITIAL_FORM)
                  setIsFormOpen(true)
                }}
                className="px-8 py-6 bg-white text-black rounded-full font-bold transition-all text-xs uppercase tracking-widest hover:bg-gray-200"
              >
                + Yeni Yazı
              </button>
              <button
                onClick={handleLogout}
                className="px-8 py-6 border border-white/[0.1] text-white rounded-full font-bold transition-all text-xs uppercase tracking-widest hover:bg-white/5"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>

        {isFormOpen && (
          <div className="mb-20">
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-16">
              <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-16">
                {editingPost ? 'Yazı Düzenle' : 'Yeni Yazı'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600"
                      placeholder="BAŞLIK"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600"
                      placeholder="KATEGORİ"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600"
                    placeholder="ÖZET"
                    required
                  />
                </div>

                <div>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600 resize-none"
                    placeholder="İÇERİK"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  <div>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600"
                      placeholder="YAZAR"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600"
                      placeholder="OKUMA SÜRESİ"
                      required
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-6 h-6 accent-indigo-500"
                      />
                      <span className="ml-4 text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                        Öne Çıkan
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-8">
                  <button
                    type="submit"
                    className="flex-1 px-12 py-6 bg-white text-black rounded-full font-bold transition-all text-xs uppercase tracking-widest hover:bg-gray-200"
                  >
                    {editingPost ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 px-12 py-6 border border-white/[0.1] text-white rounded-full font-bold transition-all text-xs uppercase tracking-widest hover:bg-white/5"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/[0.02] border border-white/[0.08] rounded-[2rem] p-12 flex justify-between items-center group hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    {post.title}
                  </h3>
                  {post.featured && (
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                      ÖNE ÇIKAN
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-base mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-6 text-xs font-black uppercase tracking-[0.3em] text-gray-600">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-4 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  title="Düzenle"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h2a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-4 bg-white/5 text-gray-400 hover:text-indigo-400 hover:bg-white/10 rounded-xl transition-all"
                  title="Sil"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
