import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BlogPost } from '@/lib/blog-data'
import { motion } from 'framer-motion'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          borderColor: "rgba(255,255,255,0.15)",
          scale: 1.01 
        }}
        className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-12 h-full flex flex-col transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
            {post.category}
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            {post.readTime}
          </span>
        </div>
        
        <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 leading-none">
          {post.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed flex-1">
          {post.excerpt}
        </p>
        
        <div className="pt-8 border-t border-white/[0.05] flex items-center justify-between text-xs text-gray-600 font-black uppercase tracking-[0.3em]">
          <span>{formatDate(post.date)}</span>
          <span className="text-indigo-400 hover:text-white transition">
            Devamı
          </span>
        </div>
      </motion.article>
    </Link>
  )
}
