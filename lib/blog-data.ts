export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  featured: boolean
  readTime: string
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Borsada Başarı İçin 10 Altın Kural',
    excerpt: 'Yılların tecrübesiyle derlediğim yatırım prensipleri ve risk yönetimi stratejileri',
    content: '# Borsada Başarı İçin 10 Altın Kural\n\nYıllardır borsa yatırımı yapıyorum ve öğrendiğim en önemli dersleri sizinle paylaşmak istiyorum.\n\n## 1. Duygusuz Kalın\n\nPanik satar ve açgözlü alırlar. Bu sözü asla unutmayın.\n\n## 2. Risk Yönetimi\n\nHiçbir zaman portföyünüzün %5\'inden fazlasını tek bir hisseye yatırmayın.\n\n## 3. Araştırmaya Devam Edin\n\nHer zaman öğrenmeye devam edin. Piyasa değişir, senin de değişmelisin.',
    author: 'Borsa Uzmanı',
    date: '2024-01-15',
    category: 'Yatırım Stratejileri',
    featured: true,
    readTime: '5 dk'
  },
  {
    id: '2',
    title: 'Teknik Analiz Başlangıç Rehberi',
    excerpt: 'Grafik okuma teknikleri ve temel indikatörler hakkında detaylı bir başlangıç kılavuzu',
    content: '# Teknik Analiz Başlangıç Rehberi\n\nTeknik analiz, fiyat hareketlerini analiz etmek için geçmiş verilere bakar.\n\n## Temel İndikatörler\n\n- RSI (Relative Strength Index)\n- MACD\n- Moving Averages\n- Bollinger Bands',
    author: 'Borsa Uzmanı',
    date: '2024-01-10',
    category: 'Teknik Analiz',
    featured: true,
    readTime: '8 dk'
  },
  {
    id: '3',
    title: 'Temel Analiz Nedir ve Nasıl Yapılır?',
    excerpt: 'Şirket finansallarını analiz ederek değer yatırımı yapmayı öğrenin',
    content: '# Temel Analiz Nedir?\n\nTemel analiz, bir şirketin gerçek değerini anlamak için finansal verileri inceler.\n\n## Önemli Metrikler\n\n- P/E Rasyo\n- F/K Rasyo\n- ROE\n- Net Kar',
    author: 'Borsa Uzmanı',
    date: '2024-01-05',
    category: 'Temel Analiz',
    featured: true,
    readTime: '6 dk'
  },
  {
    id: '4',
    title: 'Yatırım Portföyü Diversifikasyonu',
    excerpt: 'Riskleri dağıtmak için portföy dengesi nasıl kurulmalı?',
    content: '# Diversifikasyonun Önemi\n\nYumurtalarınızı tek sepete koymayın. Bu yatırım dünyasının en önemli derslerinden biridir.',
    author: 'Borsa Uzmanı',
    date: '2024-01-01',
    category: 'Portföy Yönetimi',
    featured: false,
    readTime: '4 dk'
  },
  {
    id: '5',
    title: 'Piyasa Döngülerini Anlama',
    excerpt: 'Ayı piyasası ve boğa piyasası arasındaki farkları keşfedin',
    content: '# Piyasa Döngüleri\n\nHer piyasa döngüsü farklıdır ve her döngü farklı stratejiler gerektirir.',
    author: 'Borsa Uzmanı',
    date: '2023-12-28',
    category: 'Piyasa Analizi',
    featured: false,
    readTime: '7 dk'
  }
]

const STORAGE_KEY = 'borsa_blog_posts'

export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return MOCK_POSTS
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_POSTS))
    return MOCK_POSTS
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return MOCK_POSTS
  }
}

export const saveBlogPosts = (posts: BlogPost[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.error('Error saving blog posts:', error)
  }
}

export const addBlogPost = (post: Omit<BlogPost, 'id'>): BlogPost => {
  const posts = getBlogPosts()
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString()
  }
  const updatedPosts = [newPost, ...posts]
  saveBlogPosts(updatedPosts)
  return newPost
}

export const updateBlogPost = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const posts = getBlogPosts()
  const index = posts.findIndex(p => p.id === id)
  
  if (index === -1) return null
  
  const updatedPosts = [...posts]
  updatedPosts[index] = { ...updatedPosts[index], ...updates }
  saveBlogPosts(updatedPosts)
  return updatedPosts[index]
}

export const deleteBlogPost = (id: string): boolean => {
  const posts = getBlogPosts()
  const filteredPosts = posts.filter(p => p.id !== id)
  
  if (filteredPosts.length === posts.length) return false
  
  saveBlogPosts(filteredPosts)
  return true
}

export const getBlogPostById = (id: string): BlogPost | null => {
  const posts = getBlogPosts()
  return posts.find(p => p.id === id) || null
}

export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  const posts = getBlogPosts()
  return posts.filter(p => p.featured).slice(0, limit)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  const posts = getBlogPosts()
  return posts.filter(p => p.category === category)
}

export const getAllCategories = (): string[] => {
  const posts = getBlogPosts()
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories)
}

export const resetToMockData = (): void => {
  saveBlogPosts(MOCK_POSTS)
}
