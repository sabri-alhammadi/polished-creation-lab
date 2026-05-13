import { Link } from "@tanstack/react-router";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const { isOpen, setOpen, lines, count, subtotal, setQty, remove } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 bottom-0 w-full sm:w-[440px] bg-surface border-l border-border z-[70] flex flex-col shadow-elegant transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <div>
              <div className="font-display font-black text-lg">سلة التسوق</div>
              <div className="text-xs text-muted-foreground">{count} عنصر</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-lg hover:bg-surface-elevated flex items-center justify-center"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {lines.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
              السلة فارغة
            </div>
          ) : (
            lines.map((l) => (
              <div
                key={l.productId}
                className="flex gap-4 p-3 rounded-xl bg-background border border-border"
              >
                <img
                  src={l.product.image}
                  alt={l.product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-primary mb-1">{l.product.brand}</div>
                  <div className="font-bold text-sm leading-snug truncate">
                    {l.product.name}
                  </div>
                  <div className="font-display font-black mt-1">
                    {l.product.price.toLocaleString()}{" "}
                    <span className="text-xs text-muted-foreground">ريال</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-surface rounded-lg border border-border">
                      <button
                        onClick={() => setQty(l.productId, l.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:text-primary"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{l.quantity}</span>
                      <button
                        onClick={() => setQty(l.productId, l.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:text-primary"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(l.productId)}
                      className="text-destructive hover:opacity-80"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <footer className="p-6 border-t border-border space-y-4 bg-surface-elevated">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span className="font-bold">{subtotal.toLocaleString()} ريال</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground py-4 rounded-xl font-bold shadow-glow hover:opacity-90"
            >
              إتمام الشراء
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center text-sm text-muted-foreground hover:text-primary"
            >
              عرض السلة الكاملة
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
