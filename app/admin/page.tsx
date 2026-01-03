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
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Admin Paneli
              </h1>
              <p className="text-secondary text-lg">Blog yazılarını yönetin</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEditingPost(null)
                  setFormData(INITIAL_FORM)
                  setIsFormOpen(true)
                }}
                className="btn-primary px-6 py-3 text-black font-semibold rounded-xl inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Yazı
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary px-6 py-3 text-foreground font-semibold rounded-xl"
              >
                Çıkış
              </button>
            </div>
          </div>

          {isFormOpen && (
            <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingPost ? 'Yazı Düzenle' : 'Yeni Yazı Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Özet
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    İçerik
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all font-mono text-sm resize-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Yazar
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Okuma Süresi
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="ml-3 text-sm font-medium text-foreground">Öne Çıkan</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3 text-black font-semibold rounded-xl"
                  >
                    {editingPost ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn-secondary px-8 py-3 text-foreground font-semibold rounded-xl"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all card-hover"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-foreground">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                          Öne Çıkan
                        </span>
                      )}
                    </div>
                    <p className="text-secondary text-sm mb-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-secondary">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 lg:ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2.5 hover:bg-surface rounded-lg transition-colors text-secondary hover:text-primary border border-transparent hover:border-border"
                      title="Düzenle"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2.5 hover:bg-surface rounded-lg transition-colors text-secondary hover:text-danger border border-transparent hover:border-border"
                      title="Sil"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
