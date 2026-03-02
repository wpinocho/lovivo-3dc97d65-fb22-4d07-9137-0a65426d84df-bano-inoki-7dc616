import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import { PriceRuleBadge } from "@/components/ui/PriceRuleBadge"
import { usePriceRules } from "@/hooks/usePriceRules"
import type { Product } from "@/lib/supabase"
import { ShoppingBag } from "lucide-react"

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  const { getRulesForProduct } = usePriceRules()
  const productRules = getRulesForProduct(product.id)

  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <div className="group flex flex-col bg-card border border-border overflow-hidden rounded-sm hover:shadow-md transition-shadow duration-300">
          {/* Image */}
          <Link to={`/productos/${logic.product.slug}`} className="block relative overflow-hidden">
            <div className="aspect-square bg-muted relative overflow-hidden">
              {(logic.matchingVariant?.image || logic.product.images?.length) ? (
                <>
                  <img
                    src={logic.matchingVariant?.image_urls?.[0] || (logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image && !logic.matchingVariant?.image_urls?.[0]
                        ? 'group-hover:opacity-0'
                        : 'group-hover:scale-105'
                    }`}
                  />
                  {logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image && !logic.matchingVariant?.image_urls?.[0] && (
                    <img
                      src={logic.product.images[1]}
                      alt={`${logic.product.title} — alternativa`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Sin imagen
                </div>
              )}

              {/* Badges */}
              {(() => {
                const badges: React.ReactNode[] = []
                if (logic.discountPercentage) {
                  badges.push(
                    <span key="discount" className="bg-accent text-accent-foreground text-[10px] px-2 py-1 font-medium tracking-wide">
                      -{logic.discountPercentage}%
                    </span>
                  )
                }
                if (!logic.inStock) {
                  badges.push(
                    <span key="oos" className="bg-muted text-muted-foreground text-[10px] px-2 py-1 font-medium">
                      Agotado
                    </span>
                  )
                }
                const volBogo = productRules.filter(r => r.rule_type === 'volume' || r.rule_type === 'bogo')
                for (const rule of volBogo) {
                  if (badges.length >= 2) break
                  badges.push(<PriceRuleBadge key={rule.id} rule={rule} />)
                }
                if (badges.length === 0) return null
                return (
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {badges.slice(0, 2)}
                  </div>
                )
              })()}
            </div>
          </Link>

          {/* Info */}
          <div className="p-4 flex flex-col flex-1">
            <Link to={`/productos/${logic.product.slug}`}>
              <h3 className="font-playfair text-foreground font-medium text-base mb-1 leading-tight line-clamp-2 hover:text-primary transition-colors">
                {logic.product.title}
              </h3>
            </Link>

            {logic.product.description && (
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2 font-light leading-relaxed">
                {logic.product.description.replace(/<[^>]*>/g, '')}
              </p>
            )}

            {/* Variants */}
            {logic.hasVariants && logic.options && (
              <div className="mb-3 space-y-2">
                {logic.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">{opt.name}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                        const isSelected = logic.selected[opt.name] === val
                        const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                        if (swatch) {
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              title={val}
                              className={`h-5 w-5 rounded-full border-2 transition-all ${isSelected ? 'border-foreground scale-110' : 'border-border'}`}
                              style={{ backgroundColor: swatch }}
                              aria-label={val}
                            />
                          )
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            className={`border px-2 py-0.5 text-[10px] font-medium tracking-wide transition-all ${
                              isSelected
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border bg-card text-muted-foreground hover:border-foreground/50'
                            }`}
                            aria-pressed={isSelected}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price + Add to cart */}
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
              <div>
                <span className="text-foreground font-semibold text-base">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-muted-foreground text-xs line-through ml-2">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  logic.onAddToCartSuccess()
                  logic.handleAddToCart()
                }}
                disabled={!logic.canAddToCart}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs tracking-wider uppercase font-medium transition-all rounded-none ${
                  logic.inStock
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                {logic.inStock ? 'Agregar' : 'Agotado'}
              </button>
            </div>
          </div>
        </div>
      )}
    </HeadlessProductCard>
  )
}