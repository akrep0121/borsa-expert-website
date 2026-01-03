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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="card-modern rounded-3xl p-12 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-foreground mb-3 text-center">
          Admin Paneli
        </h2>
        <p className="text-secondary text-center mb-10 text-base">
          Lütfen erişim şifrenizi girin
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-foreground mb-3">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800/60 backdrop-blur-sm border border-border rounded-2xl text-foreground focus:border-primary focus:outline-none transition-all text-lg"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
              <p className="text-red-400 text-base text-center">{error}</p>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1 px-6 py-4 text-white font-semibold rounded-2xl text-base"
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1 px-6 py-4 text-foreground font-semibold rounded-2xl text-base"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
