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
      <section className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-20">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">
                Admin Paneli
              </h1>
              <p className="text-xl text-secondary">
                Blog yazılarını profesyonel bir şekilde yönetin
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setEditingPost(null)
                  setFormData(INITIAL_FORM)
                  setIsFormOpen(true)
                }}
                className="btn-primary px-8 py-4 text-white font-semibold rounded-2xl inline-flex items-center text-base"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Yazı
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary px-8 py-4 text-foreground font-semibold rounded-2xl text-base"
              >
                Çıkış
              </button>
            </div>
          </div>

          {isFormOpen && (
            <div className="card-modern rounded-3xl p-12 mb-16 shadow-2xl">
              <h2 className="text-3xl font-bold text-foreground mb-10">
                {editingPost ? 'Yazı Düzenle' : 'Yeni Yazı Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-base font-semibold text-foreground mb-3">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-foreground mb-3">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-foreground mb-3">
                    Özet
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all text-lg resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-foreground mb-3">
                    İçerik
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all font-mono text-base resize-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-base font-semibold text-foreground mb-3">
                      Yazar
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-foreground mb-3">
                      Okuma Süresi
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-6 h-6 text-primary border-border rounded-2xl focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="ml-4 text-base font-medium text-foreground">Öne Çıkan</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="btn-primary px-10 py-4 text-white font-semibold rounded-2xl text-base"
                  >
                    {editingPost ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn-secondary px-10 py-4 text-foreground font-semibold rounded-2xl text-base"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card-modern rounded-3xl p-8 hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-xl border border-primary/20">
                          Öne Çıkan
                        </span>
                      )}
                    </div>
                    <p className="text-secondary text-base mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-secondary">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3 xl:ml-6">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-3 hover:bg-gray-800/60 rounded-2xl transition-colors text-secondary hover:text-primary border border-transparent hover:border-border"
                      title="Düzenle"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-3 hover:bg-gray-800/60 rounded-2xl transition-colors text-secondary hover:text-red-400 border border-transparent hover:border-border"
                      title="Sil"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
