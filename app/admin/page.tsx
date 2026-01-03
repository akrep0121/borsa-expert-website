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
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Paneli
              </h1>
              <p className="text-secondary">Blog yazılarını yönetin</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setEditingPost(null)
                  setFormData(INITIAL_FORM)
                  setIsFormOpen(true)
                }}
                className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
              >
                + Yeni Yazı
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-surface border border-border text-foreground font-semibold rounded-lg hover:border-primary transition-colors"
              >
                Çıkış
              </button>
            </div>
          </div>

          {isFormOpen && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {editingPost ? 'Yazı Düzenle' : 'Yeni Yazı Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Özet
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    İçerik
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors font-mono text-sm"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Yazar
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Okuma Süresi
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="ml-2 text-sm text-foreground">Öne Çıkan</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
                  >
                    {editingPost ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 bg-surface border border-border text-foreground font-semibold rounded-lg hover:border-primary transition-colors"
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
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          Öne Çıkan
                        </span>
                      )}
                    </div>
                    <p className="text-secondary text-sm mb-3">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-secondary">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 hover:bg-surface rounded-lg transition-colors text-secondary hover:text-primary"
                      title="Düzenle"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 hover:bg-surface rounded-lg transition-colors text-secondary hover:text-danger"
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
