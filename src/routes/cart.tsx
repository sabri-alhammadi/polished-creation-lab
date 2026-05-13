import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "سلة التسوق — آرك" }] }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-black mb-10">سلة التسوق</h1>

        {lines.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-gradient-card border border-border">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
            <p className="text-muted-foreground mb-6">سلتك فارغة حالياً</p>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold"
            >
              تصفح المتجر
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {lines.map((l) => (
                <div key={l.productId} className="flex gap-4 p-4 rounded-2xl bg-gradient-card border border-border">
                  <Link to="/store/$productId" params={{ productId: l.productId }} className="shrink-0">
                    <img src={l.product.image} alt={l.product.name} className="w-28 h-28 rounded-xl object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-primary mb-1">{l.product.brand}</div>
                    <Link to="/store/$productId" params={{ productId: l.productId }} className="font-bold hover:text-primary">
                      {l.product.name}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-1">SKU: {l.product.sku}</div>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                      <div className="flex items-center bg-surface rounded-lg border border-border">
                        <button onClick={() => setQty(l.productId, l.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:text-primary">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">{l.quantity}</span>
                        <button onClick={() => setQty(l.productId, l.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:text-primary">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-display text-xl font-black">
                        {(l.product.price * l.quantity).toLocaleString()} <span className="text-xs text-muted-foreground">ريال</span>
                      </div>
                      <button onClick={() => remove(l.productId)} className="text-destructive hover:opacity-80" aria-label="حذف">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 h-fit p-6 rounded-2xl bg-gradient-card border border-border space-y-4 shadow-elegant">
              <h2 className="font-display text-xl font-black">ملخص الطلب</h2>
              <div className="space-y-2 text-sm border-b border-border pb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">المجموع الفرعي</span><span>{subtotal.toLocaleString()} ريال</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ريال`}</span></div>
                {subtotal < 1000 && subtotal > 0 && (
                  <div className="text-xs text-primary">أضف {(1000 - subtotal).toLocaleString()} ريال للحصول على شحن مجاني</div>
                )}
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>الإجمالي</span>
                <span className="font-display text-2xl text-gradient">{total.toLocaleString()} ريال</span>
              </div>
              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground py-4 rounded-xl font-bold shadow-glow hover:opacity-90"
              >
                إتمام الشراء
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link to="/store" className="w-full inline-flex items-center justify-center text-sm text-muted-foreground hover:text-primary">
                مواصلة التسوق
              </Link>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
