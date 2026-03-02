import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { CollectionCard } from '@/components/CollectionCard'
import { FloatingCart } from '@/components/FloatingCart'
import { NewsletterSection } from '@/components/NewsletterSection'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { BundleCard } from '@/components/ui/BundleCard'
import { useBundles } from '@/hooks/useBundles'
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex'
import { Leaf, Droplets, Sparkles, ArrowRight } from 'lucide-react'

interface IndexUIProps {
  logic: UseIndexLogicReturn
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts
  } = logic

  const { bundles, loading: loadingBundles } = useBundles()

  return (
    <EcommerceTemplate showCart={true} layout="full-width">

      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[580px] flex items-end overflow-hidden">
        <img
          src="/hero.webp"
          alt="Ritual de baño de té Inoki — tina con plantas y velas"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-primary-foreground/70 text-xs tracking-[0.3em] uppercase mb-4 font-light">
              Rituales de Bienestar
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-tight mb-6">
              Alivia la Tensión.<br />
              <em className="font-normal">Restaura</em> el Equilibrio.
            </h1>
            <p className="text-primary-foreground/75 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
              Baños de té artesanales con hierbas 100% naturales que transforman tu tina en un spa privado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 border-0 px-8 py-6 text-sm tracking-widest uppercase font-medium rounded-none"
              >
                <Link to="/#products">Descubrir Rituales</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-sm tracking-widest uppercase font-light rounded-none"
              >
                <Link to="/#collections">Ver Colecciones</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Leaf className="h-4 w-4" />, text: '100% Natural' },
              { icon: <Droplets className="h-4 w-4" />, text: 'Sin Químicos' },
              { icon: <Sparkles className="h-4 w-4" />, text: 'Artesanal' },
              { icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, text: 'Envío Gratis +$599' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground">
                <span className="text-primary/70">{item.icon}</span>
                <span className="text-xs tracking-widest uppercase font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS INTRO ─── */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Nuestra Línea</p>
          <h2 className="font-playfair text-3xl md:text-5xl font-medium text-foreground mb-4">
            Pequeños rituales,<br /><em className="font-normal">grandes cambios</em>
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto font-light leading-relaxed">
            Cada bolsita contiene la sabiduría de ingredientes naturales seleccionados para transformar tu baño en un momento de sanación.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted rounded-sm h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div id="products" className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}

        {filteredProducts.length > 4 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-10 py-5 text-xs tracking-widest uppercase rounded-none"
              onClick={handleShowAllProducts}
            >
              Ver Todos los Productos
            </Button>
          </div>
        )}
      </section>

      {/* ─── FEATURE BANNER ─── */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative h-80 md:h-auto min-h-[480px] overflow-hidden">
            <img
              src="/feature-banner.webp"
              alt="Ritual de baño de té artesanal"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Text */}
          <div className="bg-primary flex items-center px-10 lg:px-16 py-16">
            <div className="max-w-sm">
              <p className="text-primary-foreground/50 text-xs tracking-[0.3em] uppercase mb-4">El Ritual</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium text-primary-foreground leading-tight mb-6">
                Un pequeño ritual.<br />
                <em className="font-normal">Un gran reset.</em>
              </h2>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-8 font-light">
                Solo coloca la bolsita en tu tina, deja que las hierbas infusionen el agua, y date permiso de desconectarte por completo. Así de simple. Así de poderoso.
              </p>
              <div className="space-y-3">
                {['Paso 1 — Llena tu tina con agua caliente', 'Paso 2 — Agrega la bolsita de té', 'Paso 3 — Sumérgete 20–30 minutos'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                    <span className="w-5 h-5 rounded-full border border-primary-foreground/30 flex items-center justify-center text-[10px] flex-shrink-0">{i + 1}</span>
                    {step.replace(`Paso ${i + 1} — `, '')}
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="mt-8 bg-primary-foreground text-foreground hover:bg-primary-foreground/90 px-8 py-5 text-xs tracking-widest uppercase rounded-none"
              >
                <Link to="/#products">
                  Comenzar mi Ritual <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Explorar</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium text-foreground">
                Nuestras Colecciones
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onViewProducts={handleViewCollectionProducts}
                  eager={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── BUNDLES ─── */}
      {!loadingBundles && bundles.length > 0 && (
        <section id="bundles" className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-medium text-foreground">Paquetes Especiales</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── ALL PRODUCTS ─── */}
      {filteredProducts.length > 4 && (
        <section id="products" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-playfair text-3xl font-medium text-foreground">
                {selectedCollectionId
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name}`
                  : 'Todos los Productos'}
              </h2>
              {selectedCollectionId && (
                <Button variant="ghost" onClick={handleShowAllProducts} className="text-sm text-muted-foreground hover:text-foreground gap-1">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── BRAND STORY ─── */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">Nuestra Historia</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
                Nacidos en México,<br />
                <em className="font-normal">inspirados en la naturaleza</em>
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed font-light">
                <p>
                  Inoki nació de una sola pregunta: ¿por qué los rituales de bienestar se sienten tan lejanos? Porque están hechos para otras latitudes, otros cuerpos, otro estilo de vida.
                </p>
                <p>
                  Nosotros creamos baños de té con ingredientes que crecen en nuestro país, seleccionados por herbolarios locales, para que el ritual sea accesible, auténtico y tuyo.
                </p>
                <p>
                  Sin conservadores. Sin químicos. Solo la magia que la naturaleza ya sabía hacer.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-8 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-5 text-xs tracking-widest uppercase rounded-none"
              >
                <Link to="/blog">Leer más sobre nosotros</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src="/brand-story.webp"
                  alt="Mujer disfrutando un ritual de baño de té Inoki en México"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg">
                <span className="font-playfair text-xl font-medium leading-none">100%</span>
                <span className="text-[9px] tracking-widest uppercase mt-1 leading-tight">Natural</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  )
}