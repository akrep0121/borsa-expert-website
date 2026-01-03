import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BlogPost } from '@/lib/blog-data'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium px-3 py-1 bg-surface text-primary rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-secondary">{post.readTime}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-secondary text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-secondary">
            <span>{formatDate(post.date)}</span>
            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Devamını oku →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
