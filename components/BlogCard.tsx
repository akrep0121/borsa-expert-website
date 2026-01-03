import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BlogPost } from '@/lib/blog-data'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block">
      <article className="bg-card border border-border rounded-xl overflow-hidden card-hover group h-full flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold px-4 py-1.5 bg-surface text-primary rounded-lg border border-border">
              {post.category}
            </span>
            <span className="text-xs text-secondary flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
          
          <p className="text-secondary text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
            {post.excerpt}
          </p>
          
          <div className="pt-4 border-t border-border flex items-center justify-between text-sm text-secondary">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.date)}
            </span>
            <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Devamı
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
