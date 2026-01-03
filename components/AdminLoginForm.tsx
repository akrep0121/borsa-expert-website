'use client'

import { useState } from 'react'

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
    <div className="fixed inset-0 z-[140] bg-black backdrop-blur-xl flex items-center justify-center p-6">
      <div className="bg-[#050505] border border-white/10 p-16 rounded-[4rem] w-full max-w-md shadow-2xl">
        <h3 className="text-5xl font-black tracking-tighter text-white mb-16 uppercase italic text-center">
          Admin
        </h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input 
            type="password" 
            name="password"
            placeholder="Parola" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 outline-none focus:border-indigo-500 text-center text-2xl tracking-[0.5em] text-white"
            required 
            autoFocus
          />
          {error && (
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Hatalı şifre
            </p>
          )}
          <button 
            type="submit" 
            className="w-full px-8 py-6 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition"
          >
            Doğrula
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="w-full text-gray-600 text-xs font-bold uppercase tracking-widest hover:text-white transition"
          >
            Vazgeç
          </button>
        </form>
      </div>
    </div>
  )
}
