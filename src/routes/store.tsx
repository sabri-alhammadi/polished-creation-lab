import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { products, type Product } from "@/lib/products";
import { useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "المتجر — آرك للأنظمة الأمنية" },
      { name: "description", content: "تسوق كاميرات المراقبة وأنظمة الإنذار والأقفال الذكية من أفضل العلامات." },
    ],
  }),
  component: StorePage,
});

const categories = ["الكل", "كاميرات", "أنظمة إنذار", "أقفال ذكية", "ملحقات"] as const;

function StorePage() {
  const [cat, setCat] = useState<string>("الكل");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let list = products.filter((p) => (cat === "الكل" || p.category === cat) && (p.name.includes(q) || p.brand.toLowerCase().includes(q.toLowerCase())));
    list = [...list].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
    return list;
  }, [cat, q, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="text-xs tracking-widest text-primary mb-3">STORE</div>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">المتجر</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">منتجات أصلية بضمان رسمي، مع تركيب احترافي اختياري.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن منتج أو علامة تجارية..."
              className="w-full bg-surface border border-border rounded-xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:border-primary transition"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "asc" | "desc")}
            className="bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
          >
            <option value="asc">السعر: من الأقل</option>
            <option value="desc">السعر: من الأعلى</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                cat === c
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-surface border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-20">لا توجد نتائج مطابقة.</div>
        )}
      </section>
      <Footer />
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-gradient-card border border-border hover:border-primary/50 transition-all shadow-card hover:shadow-glow">
      <div className="aspect-square overflow-hidden bg-surface">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="text-xs text-primary tracking-widest mb-2">{p.brand}</div>
        <h3 className="font-bold text-lg mb-2 leading-snug">{p.name}</h3>
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-2xl font-black">{p.price.toLocaleString()} <span className="text-sm font-medium text-muted-foreground">ريال</span></div>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition">
            <ShoppingCart className="w-4 h-4" />
            أضف
          </button>
        </div>
      </div>
    </div>
  );
}
