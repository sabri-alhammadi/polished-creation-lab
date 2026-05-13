import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProductById, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  Shield,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Minus,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/store/$productId")({
  loader: ({ params }) => {
    const product = getProductById(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — آرك` },
      { name: "description", content: loaderData?.product.description },
      { property: "og:title", content: loaderData?.product.name },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-black mb-4">المنتج غير موجود</h1>
        <Link to="/store" className="text-primary hover:underline">
          العودة للمتجر
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-destructive">{error.message}</p>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-12">
        <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-primary">المتجر</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-card border border-border shadow-elegant">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs tracking-widest text-primary mb-2">{product.brand} · {product.category}</div>
              <h1 className="font-display text-4xl md:text-5xl font-black leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  ))}
                  <span className="font-bold mr-2">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} تقييم)</span>
                <span className="text-muted-foreground">SKU: {product.sku}</span>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <div className="font-display text-5xl font-black text-gradient">{product.price.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mb-2">ريال</div>
              {product.oldPrice && (
                <div className="text-lg text-muted-foreground line-through mb-1">{product.oldPrice.toLocaleString()}</div>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-surface border border-border text-center">
                <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">{product.warranty}</div>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-border text-center">
                <Truck className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">شحن خلال 48 ساعة</div>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-border text-center">
                <Wrench className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">{product.installation ? "تركيب احترافي" : "تركيب ذاتي سهل"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">متوفر —</span>
              <span className="font-bold">{product.stock} قطعة</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-surface rounded-xl border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:text-primary">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-11 h-11 flex items-center justify-center hover:text-primary">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.id, qty);
                  toast.success(`تمت إضافة ${qty} قطعة إلى السلة`);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3.5 rounded-xl font-bold shadow-glow hover:opacity-90 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                أضف إلى السلة
              </button>
            </div>

            <Link
              to="/inspection"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              تحتاج استشارة قبل الشراء؟ احجز فحصاً فنياً
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex gap-2 border-b border-border mb-8">
            {[
              { id: "desc" as const, label: "المميزات" },
              { id: "specs" as const, label: "المواصفات" },
              { id: "reviews" as const, label: "التقييمات" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-6 py-3 text-sm font-bold border-b-2 transition ${
                  tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "desc" && (
            <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl">
              {product.features.map((f: string) => (
                <li key={f} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          )}

          {tab === "specs" && (
            <div className="max-w-2xl rounded-xl overflow-hidden border border-border">
              {product.specs.map((s: { label: string; value: string }, i: number) => (
                <div key={s.label} className={`flex justify-between p-4 ${i % 2 === 0 ? "bg-surface" : "bg-surface-elevated"}`}>
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-2xl space-y-4">
              <div className="p-6 rounded-xl bg-gradient-card border border-border text-center">
                <div className="font-display text-5xl font-black text-gradient mb-2">{product.rating}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">بناءً على {product.reviews} تقييم من عملائنا</div>
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-black mb-8">منتجات مشابهة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/store/$productId"
                  params={{ productId: r.id }}
                  className="group rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/50 transition"
                >
                  <div className="aspect-square overflow-hidden bg-surface">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-primary mb-1">{r.brand}</div>
                    <div className="font-bold mb-2">{r.name}</div>
                    <div className="font-display text-xl font-black">{r.price.toLocaleString()} <span className="text-xs text-muted-foreground">ريال</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
