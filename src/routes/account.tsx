import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getOrders, type Order } from "@/lib/orders";
import { User as UserIcon, Mail, Phone, LogOut, Package } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "حسابي — آرك" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ full_name: string; phone: string }>({ full_name: "", phone: "" });
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", search: { redirect: "/account" } });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile({ full_name: data.full_name ?? "", phone: data.phone ?? "" });
    });
    setOrders(getOrders());
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: profile.full_name, phone: profile.phone })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error("تعذر الحفظ");
    else toast.success("تم تحديث المعلومات");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center text-muted-foreground">جارٍ التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-xs tracking-widest text-primary mb-2">ACCOUNT</div>
            <h1 className="font-display text-4xl md:text-5xl font-black">حسابي</h1>
            <p className="text-muted-foreground mt-2">مرحباً، {profile.full_name || user.email}</p>
          </div>
          <button
            onClick={async () => {
              await signOut();
              toast.success("تم تسجيل الخروج");
              navigate({ to: "/" });
            }}
            className="inline-flex items-center gap-2 bg-surface border border-border hover:border-destructive/60 px-4 py-2.5 rounded-lg text-sm font-bold transition"
          >
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={save} className="lg:col-span-1 p-6 rounded-2xl bg-gradient-card border border-border space-y-4 h-fit">
            <h2 className="font-display text-xl font-black flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" /> المعلومات الشخصية
            </h2>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">البريد</label>
              <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">الاسم الكامل</label>
              <input
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">رقم الجوال</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-surface border border-border rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-xl font-bold shadow-glow hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </button>
          </form>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-card border border-border">
            <h2 className="font-display text-xl font-black flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-primary" /> طلباتي ({orders.length})
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                لا توجد طلبات بعد.{" "}
                <Link to="/store" className="text-primary hover:underline">تصفّح المتجر</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="font-mono font-bold text-primary text-sm">{o.id}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("ar-SA")}</div>
                    </div>
                    <div className="text-sm">{o.items.length} منتج</div>
                    <div className="font-display font-black">{o.total.toLocaleString()} ريال</div>
                    <div className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">{o.status}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
