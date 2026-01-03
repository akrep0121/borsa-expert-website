import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BlogPost } from '@/lib/blog-data'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block h-full">
      <article className="card-modern rounded-3xl overflow-hidden h-full flex flex-col group">
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold px-5 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20">
              {post.category}
            </span>
            <span className="text-sm text-secondary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
          
          <p className="text-secondary text-base mb-6 line-clamp-2 leading-relaxed flex-1">
            {post.excerpt}
          </p>
          
          <div className="pt-6 border-t border-border/50 flex items-center justify-between text-base text-secondary">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.date)}
            </span>
            <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              Devamı
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
