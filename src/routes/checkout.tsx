import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { saveOrder, newOrderId, type Order } from "@/lib/orders";
import { CheckCircle2, CreditCard, Banknote, Wallet } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "إتمام الشراء — آرك" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState<string | null>(null);
  const [payment, setPayment] = useState<Order["paymentMethod"]>("بطاقة");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "الرياض" });

  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    const id = newOrderId();
    saveOrder({
      id,
      createdAt: new Date().toISOString(),
      customer: form,
      items: lines.map((l) => ({ productId: l.productId, name: l.product.name, price: l.product.price, quantity: l.quantity })),
      subtotal,
      shipping,
      total,
      status: "قيد المعالجة",
      paymentMethod: payment,
    });
    clear();
    setDone(id);
    toast.success("تم استلام طلبك بنجاح");
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="container mx-auto px-6 py-24 max-w-xl text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-black mb-3">تم استلام طلبك!</h1>
          <p className="text-muted-foreground mb-2">شكراً لاختيارك آرك. سيتواصل معك فريقنا قريباً.</p>
          <p className="text-sm mb-8">رقم الطلب: <span className="font-mono font-bold text-primary">{done}</span></p>
          <div className="flex gap-3 justify-center">
            <Link to="/store" className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold">
              مواصلة التسوق
            </Link>
            <Link to="/" className="bg-surface border border-border px-6 py-3 rounded-xl font-bold">
              الرئيسية
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="container mx-auto px-6 py-24 text-center">
          <p className="text-muted-foreground mb-6">سلتك فارغة</p>
          <Link to="/store" className="text-primary hover:underline">تصفح المتجر</Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-black mb-10">إتمام الشراء</h1>
        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-card border border-border space-y-4">
              <h2 className="font-display text-xl font-black">معلومات الشحن</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="الاسم الكامل" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="رقم الجوال" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                <Field label="البريد الإلكتروني" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">المدينة</label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  >
                    {["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Field label="العنوان التفصيلي" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
            </div>

            <div className="p-6 rounded-2xl bg-gradient-card border border-border space-y-4">
              <h2 className="font-display text-xl font-black">طريقة الدفع</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "بطاقة" as const, label: "بطاقة ائتمان", icon: CreditCard },
                  { id: "تحويل" as const, label: "تحويل بنكي", icon: Wallet },
                  { id: "عند الاستلام" as const, label: "عند الاستلام", icon: Banknote },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPayment(p.id)}
                    className={`p-4 rounded-xl border text-center transition ${
                      payment === p.id ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface hover:border-primary/50"
                    }`}
                  >
                    <p.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-bold">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit p-6 rounded-2xl bg-gradient-card border border-border space-y-4 shadow-elegant lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-black">طلبك</h2>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {lines.map((l) => (
                <div key={l.productId} className="flex gap-3 text-sm">
                  <img src={l.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate">{l.product.name}</div>
                    <div className="text-xs text-muted-foreground">×{l.quantity}</div>
                  </div>
                  <div className="font-bold">{(l.product.price * l.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">المجموع</span><span>{subtotal.toLocaleString()} ريال</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ريال`}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>الإجمالي</span>
                <span className="font-display text-2xl text-gradient">{total.toLocaleString()}</span>
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-4 rounded-xl font-bold shadow-glow hover:opacity-90">
              تأكيد الطلب
            </button>
          </aside>
        </form>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm mb-2 text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
      />
    </div>
  );
}
