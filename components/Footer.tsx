export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg text-foreground font-medium mb-2">
              Borsa Uzmanı
            </p>
            <p className="text-sm text-secondary">
              Profesyonel yatırım danışmanlığı ve analiz platformu
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-secondary">
              © 2024 Tüm hakları saklıdır.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-secondary leading-relaxed">
              Bu sitedeki içerikler yatırım tavsiyesi değildir.<br />
              Sadece eğitim ve bilgilendirme amaçlıdır.
            </p>
          </div>
        </div>
        
        <div className="chart-line mt-12 opacity-30" />
      </div>
    </footer>
  )
}
