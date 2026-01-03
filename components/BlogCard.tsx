import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BlogPost } from '@/lib/blog-data'

interface BlogCardProps {
  post: BlogPost
}

const getCategoryColor = (category?: string) => {
  if (!category) return 'bg-gray-500 border-gray-400'
  const colors: Record<string, string> = {
    'fintech': 'bg-indigo-500 border-indigo-400',
    'borsa': 'bg-blue-500 border-blue-400',
    'yatırım': 'bg-emerald-500 border-emerald-400',
    'teknoloji': 'bg-purple-500 border-purple-400',
    'halka arz': 'bg-orange-500 border-orange-400',
    'genel': 'bg-gray-500 border-gray-400'
  }
  return colors[category.toLowerCase()] || 'bg-gray-500 border-gray-400'
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block h-full">
      <article className="blog-card group cursor-pointer bg-white/[0.01] border border-white/[0.05] rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-indigo-500/30" style={{animationDelay: `${Math.random() * 0.2}s`}}>
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
            alt={post.title}
            className="card-img w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className={`${getCategoryColor(post.category)} px-4 py-1.5 rounded-full text-[9px] font-black uppercase border tracking-[0.2em] backdrop-blur-sm`}>
              {post.category || 'Genel'}
            </span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold leading-tight group-hover:text-indigo-400 transition-colors text-white uppercase">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-medium text-gray-500">{formatDate(post.date)}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Oku
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
