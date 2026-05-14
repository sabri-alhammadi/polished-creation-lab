import { Link } from "@tanstack/react-router";
import { Shield, Menu, X, ShoppingCart, User as UserIcon, LogIn } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/store", label: "المتجر" },
  { to: "/inspection", label: "طلب فحص" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-black text-xl tracking-tight">آرك</div>
            <div className="text-[10px] text-muted-foreground tracking-widest">ARC SECURITY</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              activeProps={{ className: "px-4 py-2 rounded-lg text-sm font-medium text-primary bg-surface" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-11 h-11 rounded-lg bg-surface border border-border hover:border-primary/50 flex items-center justify-center transition"
            aria-label="السلة"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -left-1 min-w-[20px] h-5 px-1 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-glow">
                {count}
              </span>
            )}
          </button>

          {user ? (
            <Link
              to="/account"
              className="hidden sm:inline-flex items-center gap-2 bg-surface border border-border hover:border-primary/50 px-3 h-11 rounded-lg text-sm font-bold transition"
              aria-label="حسابي"
            >
              <UserIcon className="w-4 h-4" />
              <span className="max-w-[100px] truncate">{user.email?.split("@")[0]}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 bg-surface border border-border hover:border-primary/50 px-3 h-11 rounded-lg text-sm font-bold transition"
            >
              <LogIn className="w-4 h-4" />
              دخول
            </Link>
          )}

          <Link
            to="/inspection"
            className="hidden lg:inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold shadow-glow hover:opacity-90 transition"
          >
            طلب فحص فوري
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface"
                activeProps={{ className: "px-4 py-3 rounded-lg text-sm font-medium text-primary bg-surface" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to={user ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              {user ? "حسابي" : "تسجيل الدخول"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
