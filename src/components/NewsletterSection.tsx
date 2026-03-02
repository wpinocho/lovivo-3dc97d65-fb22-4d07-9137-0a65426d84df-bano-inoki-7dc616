import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter'
import { Leaf } from 'lucide-react'

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-primary py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            {logic.success ? (
              <div className="space-y-4 animate-fade-up">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full border border-primary-foreground/30 flex items-center justify-center">
                    <Leaf className="h-7 w-7 text-primary-foreground/70" />
                  </div>
                </div>
                <h3 className="font-playfair text-3xl font-medium text-primary-foreground">
                  ¡Bienvenida al ritual!
                </h3>
                <p className="text-primary-foreground/60 font-light">
                  Recibirás nuestras mejores ofertas, rituales y secretos de bienestar.
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-up">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-primary-foreground/50" />
                  </div>
                </div>
                <p className="text-primary-foreground/50 text-xs tracking-[0.3em] uppercase">El Círculo Inoki</p>
                <h3 className="font-playfair text-3xl md:text-4xl font-medium text-primary-foreground">
                  Únete a tu ritual semanal
                </h3>
                <p className="text-primary-foreground/60 font-light leading-relaxed max-w-md mx-auto">
                  Recibe rituales de bienestar, descuentos exclusivos y los primeros en conocer nuestras nuevas colecciones.
                </p>

                <form
                  onSubmit={(e) => { e.preventDefault(); logic.handleSubscribe() }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6"
                >
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    required
                    className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/60 rounded-none h-12"
                  />
                  <Button
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 px-8 h-12 text-xs tracking-widest uppercase rounded-none font-medium shrink-0"
                  >
                    {logic.isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
                  </Button>
                </form>

                {logic.error && (
                  <p className="text-sm text-destructive-foreground bg-destructive/20 px-4 py-2 rounded">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  )
}