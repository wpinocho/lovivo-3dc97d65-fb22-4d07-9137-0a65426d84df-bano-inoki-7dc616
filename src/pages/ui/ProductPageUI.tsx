import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import {
  ShoppingBag, Plus, Minus, ChevronRight,
  Leaf, Shield, Truck, Star, RefreshCw
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import type { SellingPlan } from "@/lib/supabase"
import { VolumeBadge } from "@/components/ui/VolumeBadge"
import { BOGOLabel } from "@/components/ui/BOGOLabel"
import { intervalLabel } from "@/lib/subscription-utils"

interface ProductPageUIProps {
  logic: {
    product: any
    loading: boolean
    notFound: boolean
    selected: Record<string, string>
    quantity: number
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    handleBuyNow?: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    displayImages?: string[]
    sellingPlans?: SellingPlan[]
    selectedPlan?: SellingPlan | null
    setSelectedPlan?: (plan: SellingPlan | null) => void
    subscriptionPrice?: number
    formatMoney: (amount: number) => string
    [key: string]: any
  }
}

// ─── Static content ────────────────────────────────────────────────────────

const ALL_BOTANICALS = [
  { emoji: '🌿', name: 'Lavanda',     key: 'lavanda' },
  { emoji: '🌼', name: 'Manzanilla',  key: 'manzanilla' },
  { emoji: '🌸', name: 'Rosa',        key: 'rosa' },
  { emoji: '🌺', name: 'Jazmín',      key: 'jazmín' },
  { emoji: '🌱', name: 'Menta',       key: 'menta' },
  { emoji: '🫧', name: 'Eucalipto',   key: 'eucalipto' },
  { emoji: '🍋', name: 'Limón',       key: 'limón' },
  { emoji: '🫚', name: 'Jengibre',    key: 'jengibre' },
]

const DEFAULT_BOTANICALS = [
  { emoji: '🌿', name: 'Lavanda' },
  { emoji: '🌼', name: 'Manzanilla' },
  { emoji: '🌸', name: 'Rosa' },
  { emoji: '🫧', name: 'Sales Marinas' },
  { emoji: '🌱', name: 'Hierbas Frescas' },
  { emoji: '🌺', name: 'Botánicas' },
]

const HOW_TO_STEPS = [
  {
    title: 'Prepara tu tina',
    desc: 'Llena con agua caliente a 38–42°C. La temperatura ideal abre los poros y potencia la absorción de las plantas.',
  },
  {
    title: 'Añade la bolsita',
    desc: 'Sumerge la bolsita y deja infusionar 5 minutos antes de entrar. El agua tomará el color y aroma de las hierbas.',
  },
  {
    title: 'Sumérgete y respira',
    desc: 'Relájate 20–30 minutos. Respira profundo y deja que las plantas trabajen su magia en cuerpo y mente.',
  },
]

const WHY_INOKI = [
  { emoji: '🌿', title: '100% Natural',       desc: 'Sin conservadores ni químicos artificiales' },
  { emoji: '✋',  title: 'Artesanal',          desc: 'Elaborado a mano en pequeños lotes' },
  { emoji: '🇲🇽', title: 'Hecho en México',   desc: 'Con ingredientes locales y botánicas selectas' },
  { emoji: '♻️', title: 'Eco-friendly',        desc: 'Empaque sustentable y biodegradable' },
]

// ─── Component ─────────────────────────────────────────────────────────────

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0 })

  const displayImage =
    selectedImage ||
    logic.displayImages?.[0] ||
    logic.currentImage ||
    "/placeholder.svg"

  useEffect(() => { setSelectedImage(null) }, [logic.matchingVariant])
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Determine botanicals dynamically from product title
  const title = logic.product?.title?.toLowerCase() ?? ''
  const matched = ALL_BOTANICALS.filter(b => title.includes(b.key))
  const botanicals = matched.length >= 2 ? matched : DEFAULT_BOTANICALS

  // Loading
  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/5] rounded-sm" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  // Not found
  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <h1 className="font-playfair text-4xl font-medium mb-4">Producto no encontrado</h1>
          <p className="text-muted-foreground mb-10 font-light">El producto que buscas no existe o ha sido eliminado.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  const discountPct = logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice
    ? Math.round((1 - logic.currentPrice / logic.currentCompareAt) * 100)
    : null

  return (
    <EcommerceTemplate hideFloatingCartOnMobile>

      {/* ─── HERO ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-20">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <Link to="/" className="hover:text-foreground transition-colors">Tienda</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground line-clamp-1">{logic.product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* ── Image Gallery ── */}
          <div className="space-y-3">
            {/* Desktop main image */}
            <div className="hidden md:block aspect-[4/5] rounded-sm overflow-hidden bg-secondary/40">
              <img
                src={displayImage}
                alt={logic.product.title}
                className="w-full h-full object-cover transition-all duration-500"
                fetchPriority="high"
              />
            </div>

            {/* Mobile Carousel */}
            {logic.displayImages && logic.displayImages.length > 1 ? (
              <div className="md:hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {logic.displayImages.map((img: string, i: number) => (
                      <CarouselItem key={i}>
                        <div className="aspect-square rounded-sm overflow-hidden bg-secondary/40">
                          <img src={img} alt={`${logic.product.title} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            ) : (
              <div className="md:hidden aspect-square rounded-sm overflow-hidden bg-secondary/40">
                <img src={displayImage} alt={logic.product.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Thumbnails — Desktop */}
            {logic.displayImages && logic.displayImages.length > 1 && (
              <div className="hidden md:flex gap-2 overflow-x-auto pb-1">
                {logic.displayImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all",
                      (selectedImage === img || (!selectedImage && i === 0))
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    )}
                  >
                    <img src={img} alt={`Miniatura ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Details ── */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* Category label */}
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase font-medium">
              Ritual de Baño · Inoki México
            </p>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
              {logic.product.title}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-muted-foreground text-xs font-light">4.9 · 127 reseñas</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-playfair text-3xl font-medium text-foreground">
                {logic.formatMoney(logic.currentPrice)}
              </span>
              {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                <span className="text-base text-muted-foreground line-through font-light">
                  {logic.formatMoney(logic.currentCompareAt)}
                </span>
              )}
              {discountPct && (
                <span className="text-[10px] tracking-widest uppercase font-semibold text-accent bg-accent/10 px-2 py-1">
                  -{discountPct}%
                </span>
              )}
            </div>

            {/* Promo badges */}
            {logic.product?.id && (
              <div className="flex flex-wrap gap-2">
                <VolumeBadge productId={logic.product.id} />
                <BOGOLabel productId={logic.product.id} />
              </div>
            )}

            {/* Description */}
            {logic.product.description && (
              <div className="border-t border-border pt-5">
                <div
                  className="text-muted-foreground text-sm leading-relaxed font-light prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: logic.product.description }}
                />
              </div>
            )}

            {/* Selling plans */}
            {logic.sellingPlans && logic.sellingPlans.length > 0 && (
              <div className="space-y-2 border-t border-border pt-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3">
                  Tipo de Compra
                </p>
                <label className={cn(
                  "flex items-center justify-between p-3.5 border cursor-pointer transition-all",
                  !logic.selectedPlan
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/30"
                )}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="plan" checked={!logic.selectedPlan} onChange={() => logic.setSelectedPlan?.(null)} className="w-4 h-4 accent-foreground" />
                    <span className="text-sm font-medium">Compra única</span>
                  </div>
                  <span className="text-sm font-semibold">{logic.formatMoney(logic.currentPrice)}</span>
                </label>

                {logic.sellingPlans.map((plan: SellingPlan) => {
                  const subPrice = plan.discount_type === 'percentage' && plan.discount_value
                    ? logic.currentPrice * (1 - plan.discount_value / 100)
                    : plan.discount_type === 'fixed' && plan.discount_value
                      ? Math.max(0, logic.currentPrice - plan.discount_value)
                      : logic.currentPrice
                  return (
                    <label key={plan.id} className={cn(
                      "flex items-center justify-between p-3.5 border cursor-pointer transition-all",
                      logic.selectedPlan?.id === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="plan" checked={logic.selectedPlan?.id === plan.id} onChange={() => logic.setSelectedPlan?.(plan)} className="w-4 h-4 accent-primary" />
                        <div>
                          <span className="text-sm font-medium">{plan.name}</span>
                          {plan.discount_value && plan.discount_value > 0 && (
                            <span className="ml-2 text-xs text-primary font-medium">
                              -{plan.discount_value}{plan.discount_type === 'percentage' ? '%' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {logic.formatMoney(subPrice)}/{intervalLabel(plan.interval, plan.interval_count)}
                      </span>
                    </label>
                  )
                })}
              </div>
            )}

            {/* Variants */}
            {logic.product.options && logic.product.options.length > 0 && (
              <div className="space-y-4 border-t border-border pt-5">
                {logic.product.options.map((option: any) => (
                  <div key={option.name}>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3">
                      {option.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => {
                        const isSelected = logic.selected[option.name] === value
                        const isAvailable = logic.isOptionValueAvailable(option.name, value)
                        return (
                          <button
                            key={value}
                            onClick={() => logic.handleOptionSelect(option.name, value)}
                            disabled={!isAvailable}
                            className={cn(
                              "px-4 py-2.5 text-[11px] tracking-widest uppercase font-medium transition-all border",
                              isSelected
                                ? "bg-foreground text-background border-foreground"
                                : isAvailable
                                  ? "bg-transparent text-foreground border-border hover:border-foreground"
                                  : "opacity-35 cursor-not-allowed border-border text-muted-foreground line-through"
                            )}
                          >
                            {value}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-6 border-t border-border pt-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Cantidad
              </p>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                  disabled={logic.quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-medium text-foreground border-x border-border">
                  {logic.quantity}
                </span>
                <button
                  onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="space-y-3 pt-1">
              <button
                onClick={logic.handleAddToCart}
                disabled={!logic.inStock}
                className={cn(
                  "w-full py-4 text-sm tracking-widest uppercase font-medium transition-all flex items-center justify-center gap-3",
                  logic.inStock
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.99]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                {logic.inStock
                  ? (logic.selectedPlan
                    ? `Suscribirse — ${logic.formatMoney(logic.subscriptionPrice || logic.currentPrice)}/${intervalLabel(logic.selectedPlan.interval, logic.selectedPlan.interval_count)}`
                    : 'Agregar al carrito')
                  : 'Agotado'}
              </button>

              {logic.inStock && (
                <button
                  onClick={logic.handleBuyNow}
                  className="w-full py-4 text-sm tracking-widest uppercase font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all active:scale-[0.99]"
                >
                  Comprar ahora
                </button>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[
                { icon: <Leaf className="h-4 w-4" />, label: '100% Natural' },
                { icon: <Shield className="h-4 w-4" />, label: 'Garantía 30 días' },
                { icon: <Truck className="h-4 w-4" />, label: 'Envío rápido' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <span className="text-primary/70">{item.icon}</span>
                  <span className="text-[9px] tracking-widest uppercase text-muted-foreground font-medium leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTANICALS ─── */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-2 font-medium">
              Ingredientes Selectos
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-foreground">
              La naturaleza como ingrediente principal
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            {botanicals.map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-20">
                <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-background border border-primary/20 flex items-center justify-center text-2xl shadow-sm">
                  {b.emoji}
                </div>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground text-center font-medium leading-tight">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CÓMO USAR ─── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase mb-3 font-medium">
            Instrucciones
          </p>
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-medium text-foreground">
            Cómo preparar tu ritual
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {HOW_TO_STEPS.map((step, i) => (
            <div key={i} className="text-center space-y-5 px-4">
              <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-medium text-primary">{i + 1}</span>
              </div>
              <h3 className="font-playfair text-lg md:text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Divider line decoration */}
        <div className="hidden md:flex items-center justify-center gap-0 mt-16 opacity-20">
          <div className="h-px flex-1 bg-border" />
          <Leaf className="h-4 w-4 text-primary mx-4" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </section>

      {/* ─── WHY INOKI ─── */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {WHY_INOKI.map((item, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="text-3xl">{item.emoji}</div>
                <h3 className="font-playfair text-base md:text-lg font-medium text-primary-foreground">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/55 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STICKY CTA BAR ─── */}
      {logic.inStock && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-lg transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)]",
            ctaInView ? "translate-y-full" : "translate-y-0"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="flex items-center gap-5 min-w-0">
                <h3 className="font-playfair text-base font-medium truncate text-foreground">
                  {logic.product.title}
                </h3>
                <span className="font-semibold text-lg shrink-0 text-foreground">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={logic.handleAddToCart}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Agregar al carrito
                </button>
                <button
                  onClick={logic.handleBuyNow}
                  className="flex items-center gap-2 border border-foreground text-foreground px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-foreground hover:text-background transition-colors"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
            {/* Mobile */}
            <div className="md:hidden">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-medium text-sm truncate text-foreground">{logic.product.title}</h3>
                <span className="font-semibold shrink-0 text-foreground">{logic.formatMoney(logic.currentPrice)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={logic.handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-3 text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Agregar
                </button>
                <button
                  onClick={logic.handleBuyNow}
                  className="flex-1 border border-foreground text-foreground py-3 text-xs tracking-widest uppercase font-medium hover:bg-foreground hover:text-background transition-colors"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </EcommerceTemplate>
  )
}