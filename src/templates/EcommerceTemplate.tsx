import { ReactNode, useState, useEffect } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { ScrollLink } from '@/components/ScrollLink'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
  hideFloatingCartOnMobile?: boolean
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  layout = 'full-width',
  hideFloatingCartOnMobile = false
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const header = (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs tracking-widest uppercase font-light">
        🌿 Envío gratis en pedidos +$599 MXN &nbsp;·&nbsp; Ingredientes 100% naturales
      </div>

      {/* Main header */}
      <div className={`transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Desktop Nav Left */}
            <nav className="hidden md:flex items-center gap-8 w-48">
              {!loadingCollections && hasCollections && (
                <ScrollLink to="/#collections" className="text-foreground/60 hover:text-foreground text-sm tracking-wide transition-colors">
                  Colecciones
                </ScrollLink>
              )}
              <ScrollLink to="/#products" className="text-foreground/60 hover:text-foreground text-sm tracking-wide transition-colors">
                Productos
              </ScrollLink>
            </nav>

            {/* Logo — centered */}
            <div className="flex-1 flex justify-center md:justify-center">
              <BrandLogoLeft />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 w-48 justify-end">
              <ProfileMenu />
              {showCart && (
                <button
                  onClick={openCart}
                  className="relative flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Ver carrito"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </button>
              )}
              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-foreground/70 hover:text-foreground"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Page Title */}
          {pageTitle && (
            <div className="mt-6 max-w-7xl mx-auto px-6">
              <h1 className="font-playfair text-3xl font-semibold text-foreground">{pageTitle}</h1>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border mt-2 px-6 py-4 space-y-4 animate-fade-in">
            {!loadingCollections && hasCollections && (
              <ScrollLink to="/#collections" onClick={() => setMobileMenuOpen(false)} className="block text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors py-1">
                Colecciones
              </ScrollLink>
            )}
            <ScrollLink to="/#products" onClick={() => setMobileMenuOpen(false)} className="block text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors py-1">
              Productos
            </ScrollLink>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors py-1">
              Blog
            </Link>
          </div>
        )}
      </div>
    </>
  )

  const footer = (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="font-playfair text-2xl font-medium text-primary-foreground tracking-widest">INOKI</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Rituales de baño con hierbas mexicanas y botánicas del mundo. Porque cuidarte no debería ser un lujo, sino tu momento sagrado del día.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-4 font-medium">Tienda</h3>
            <div className="space-y-3">
              <ScrollLink to="/#collections" className="block text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                Colecciones
              </ScrollLink>
              <ScrollLink to="/#products" className="block text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                Todos los productos
              </ScrollLink>
              <Link to="/blog" className="block text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                Blog de bienestar
              </Link>
            </div>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-4 font-medium">Ayuda</h3>
            <div className="space-y-3">
              <span className="block text-primary-foreground/70 text-sm">hola@inoki.mx</span>
              <span className="block text-primary-foreground/70 text-sm">Envíos en México</span>
              <span className="block text-primary-foreground/70 text-sm">Devoluciones 30 días</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-xs tracking-wide">
            © 2025 Inoki México. Todos los derechos reservados.
          </p>
          <p className="text-primary-foreground/40 text-xs">
            Hecho con amor en México 🌿
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>

      {showCart && <FloatingCart hideOnMobile={hideFloatingCartOnMobile} />}
    </>
  )
}