export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-secondary">
              © 2024 Borsa Uzmanı. Tüm hakları saklıdır.
            </p>
          </div>
          <div className="text-sm text-secondary">
            <p>Yatırım tavsiyesi değildir.</p>
          </div>
        </div>
        <div className="chart-line mt-4" />
      </div>
    </footer>
  )
}
