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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
          Admin Paneli
        </h2>
        <p className="text-secondary text-center mb-6 text-sm">
          Lütfen erişim şifrenizi girin
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-all"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
              <p className="text-danger text-sm text-center">{error}</p>
            </div>
          )}

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className="btn-primary flex-1 px-4 py-3 text-black font-semibold rounded-xl"
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1 px-4 py-3 text-foreground font-semibold rounded-xl"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
