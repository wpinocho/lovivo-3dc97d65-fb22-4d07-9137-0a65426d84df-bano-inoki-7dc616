import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
  eager?: boolean
}

export const CollectionCard = ({ collection, onViewProducts, eager }: CollectionCardProps) => {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer rounded-sm"
      onClick={() => onViewProducts(collection.id)}
    >
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden bg-muted">
        {collection.image ? (
          <img
            src={collection.image}
            alt={collection.name}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
        <h3 className="font-playfair text-2xl font-medium mb-1">{collection.name}</h3>
        {collection.description && (
          <p className="text-primary-foreground/70 text-sm mb-4 line-clamp-2 font-light">{collection.description}</p>
        )}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">
          Ver productos <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  )
}