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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Admin Paneli
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Şifrenizi girin..."
              autoFocus
            />
          </div>

          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-surface border border-border text-foreground font-semibold rounded-lg hover:border-primary transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
