import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { getOrders, updateOrderStatus, deleteOrder, type Order } from "@/lib/orders";
import { products } from "@/lib/products";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Lock,
  LogOut,
  Trash2,
  Eye,
  X,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم — آرك" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const AUTH_KEY = "arc_admin_auth";
const ADMIN_PASSWORD = "admin123";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [tab, setTab] = useState<"overview" | "orders" | "products">("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === "1");
    setOrders(getOrders());
  }, []);

  const refresh = () => setOrders(getOrders());

  const stats = useMemo(() => {
    const revenue = orders.filter((o) => o.status !== "ملغي").reduce((s, o) => s + o.total, 0);
    return {
      revenue,
      orderCount: orders.length,
      pending: orders.filter((o) => o.status === "قيد المعالجة").length,
      productCount: products.length,
    };
  }, [orders]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md p-8 rounded-2xl bg-gradient-card border border-border shadow-elegant">
          <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-6">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-black mb-2">لوحة التحكم</h1>
          <p className="text-sm text-muted-foreground mb-6">يرجى إدخال كلمة المرور للمتابعة</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pwd === ADMIN_PASSWORD) {
                localStorage.setItem(AUTH_KEY, "1");
                setAuthed(true);
              } else {
                alert("كلمة المرور غير صحيحة");
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
            <button className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-xl font-bold shadow-glow">
              دخول
            </button>
            <p className="text-xs text-muted-foreground text-center">
              كلمة المرور الافتراضية: <span className="font-mono text-primary">admin123</span>
            </p>
            <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary">
              العودة للموقع
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/50 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <div className="font-display font-black">لوحة التحكم — آرك</div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">عرض الموقع</Link>
            <button
              onClick={() => {
                localStorage.removeItem(AUTH_KEY);
                setAuthed(false);
              }}
              className="inline-flex items-center gap-2 text-sm bg-surface border border-border px-3 py-1.5 rounded-lg hover:border-destructive/50"
            >
              <LogOut className="w-4 h-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="space-y-1 h-fit lg:sticky lg:top-24">
          {[
            { id: "overview" as const, label: "نظرة عامة", icon: TrendingUp },
            { id: "orders" as const, label: "الطلبات", icon: ShoppingBag },
            { id: "products" as const, label: "المنتجات", icon: Package },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                tab === t.id ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </aside>

        <main className="min-w-0">
          {tab === "overview" && (
            <div className="space-y-6">
              <h1 className="font-display text-3xl font-black">نظرة عامة</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="الإيرادات" value={`${stats.revenue.toLocaleString()} ر.س`} icon={TrendingUp} />
                <StatCard label="إجمالي الطلبات" value={stats.orderCount} icon={ShoppingBag} />
                <StatCard label="قيد المعالجة" value={stats.pending} icon={Users} />
                <StatCard label="المنتجات" value={stats.productCount} icon={Package} />
              </div>

              <div className="p-6 rounded-2xl bg-gradient-card border border-border">
                <h2 className="font-display font-black mb-4">آخر الطلبات</h2>
                {orders.slice(0, 5).length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">لا توجد طلبات بعد</p>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 5).map((o) => (
                      <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-surface text-sm">
                        <span className="font-mono text-primary">{o.id}</span>
                        <span className="text-muted-foreground">{o.customer.name}</span>
                        <span className="font-bold">{o.total.toLocaleString()} ر.س</span>
                        <StatusBadge status={o.status} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-6">
              <h1 className="font-display text-3xl font-black">الطلبات</h1>
              <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-elevated">
                      <tr className="text-right">
                        <th className="p-4 font-bold">رقم الطلب</th>
                        <th className="p-4 font-bold">العميل</th>
                        <th className="p-4 font-bold">المبلغ</th>
                        <th className="p-4 font-bold">الحالة</th>
                        <th className="p-4 font-bold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 && (
                        <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">لا توجد طلبات</td></tr>
                      )}
                      {orders.map((o) => (
                        <tr key={o.id} className="border-t border-border hover:bg-surface/50">
                          <td className="p-4 font-mono text-xs text-primary">{o.id}</td>
                          <td className="p-4">
                            <div className="font-bold">{o.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{o.customer.phone}</div>
                          </td>
                          <td className="p-4 font-bold">{o.total.toLocaleString()} ر.س</td>
                          <td className="p-4">
                            <select
                              value={o.status}
                              onChange={(e) => { updateOrderStatus(o.id, e.target.value as Order["status"]); refresh(); }}
                              className="bg-surface border border-border rounded-lg px-2 py-1 text-xs"
                            >
                              {["قيد المعالجة", "تم الشحن", "مكتمل", "ملغي"].map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              <button onClick={() => setViewOrder(o)} className="w-8 h-8 rounded-lg hover:bg-primary/10 text-primary flex items-center justify-center" aria-label="عرض">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => { if (confirm("حذف الطلب؟")) { deleteOrder(o.id); refresh(); } }}
                                className="w-8 h-8 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center"
                                aria-label="حذف"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === "products" && (
            <div className="space-y-6">
              <h1 className="font-display text-3xl font-black">المنتجات</h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="rounded-xl bg-gradient-card border border-border p-4">
                    <div className="flex gap-3">
                      <img src={p.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-primary">{p.brand}</div>
                        <div className="font-bold text-sm truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">SKU: {p.sku}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                      <div className="p-2 rounded-lg bg-surface text-center">
                        <div className="text-muted-foreground">السعر</div>
                        <div className="font-bold">{p.price}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-surface text-center">
                        <div className="text-muted-foreground">المخزون</div>
                        <div className={`font-bold ${p.stock < 10 ? "text-destructive" : ""}`}>{p.stock}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-surface text-center">
                        <div className="text-muted-foreground">التقييم</div>
                        <div className="font-bold flex items-center justify-center gap-0.5">
                          <Star className="w-3 h-3 fill-primary text-primary" />{p.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {viewOrder && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[80] flex items-center justify-center p-6" onClick={() => setViewOrder(null)}>
          <div className="bg-surface border border-border rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs text-muted-foreground">رقم الطلب</div>
                <div className="font-mono font-bold text-primary">{viewOrder.id}</div>
              </div>
              <button onClick={() => setViewOrder(null)} className="w-8 h-8 rounded-lg hover:bg-surface-elevated flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Info label="العميل" value={viewOrder.customer.name} />
                <Info label="الجوال" value={viewOrder.customer.phone} />
                <Info label="البريد" value={viewOrder.customer.email} />
                <Info label="المدينة" value={viewOrder.customer.city} />
              </div>
              <Info label="العنوان" value={viewOrder.customer.address} />
              <Info label="طريقة الدفع" value={viewOrder.paymentMethod} />
              <div>
                <div className="text-xs text-muted-foreground mb-2">المنتجات</div>
                <div className="space-y-2">
                  {viewOrder.items.map((it) => (
                    <div key={it.productId} className="flex justify-between p-2 rounded-lg bg-background">
                      <span>{it.name} × {it.quantity}</span>
                      <span className="font-bold">{(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>الإجمالي</span>
                <span className="text-gradient">{viewOrder.total.toLocaleString()} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-card border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">{label}</div>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="font-display text-2xl font-black">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<Order["status"], string> = {
    "قيد المعالجة": "bg-primary/15 text-primary",
    "تم الشحن": "bg-blue-500/15 text-blue-400",
    "مكتمل": "bg-green-500/15 text-green-400",
    "ملغي": "bg-destructive/15 text-destructive",
  };
  return <span className={`px-2 py-1 rounded-md text-xs font-bold ${styles[status]}`}>{status}</span>;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
