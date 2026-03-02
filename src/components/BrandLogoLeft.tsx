export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Inoki — Rituales de Baño" className="flex items-center gap-2 group">
      <img
        src="/logo.png"
        alt="Inoki"
        className="h-10 w-auto object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          const span = document.createElement('span')
          span.className = 'font-playfair text-xl font-semibold tracking-widest text-foreground'
          span.textContent = 'INOKI'
          e.currentTarget.parentElement?.appendChild(span)
        }}
      />
    </a>
  )
}