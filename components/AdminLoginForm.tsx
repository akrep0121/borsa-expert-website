'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AdminLoginFormProps {
  onLogin: (password: string) => void
  onCancel: () => void
  error?: string
}

export default function AdminLoginForm({ onLogin, onCancel, error }: AdminLoginFormProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(password)
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-16 w-full max-w-md"
      >
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
          Admin
        </h2>
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-12">
          Lütfen şifrenizi girin
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/[0.1] py-6 outline-none focus:border-indigo-500 text-xl font-bold uppercase transition text-white placeholder-gray-600"
              placeholder="ŞİFRE"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Hatalı şifre
            </p>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-8 py-6 bg-white text-black rounded-full font-bold transition-all text-xs uppercase tracking-widest hover:bg-gray-200"
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-8 py-6 border border-white/[0.1] text-white rounded-full font-bold transition-all text-xs uppercase tracking-widest hover:bg-white/5"
            >
              İptal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
