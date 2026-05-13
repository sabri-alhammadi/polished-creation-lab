import { Link } from "@tanstack/react-router";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="font-display font-black text-xl">آرك</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              شركة آرك متخصصة في تركيب وصيانة الأنظمة الأمنية بأعلى معايير الاحترافية.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/store" className="hover:text-primary transition">المتجر</Link></li>
              <li><Link to="/inspection" className="hover:text-primary transition">طلب فحص</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">من نحن</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide">السياسات</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition">سياسة الخصوصية</Link></li>
              <li><Link to="/refund" className="hover:text-primary transition">الإلغاء والاسترجاع</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> 920000000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@arc-sec.sa</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> الرياض، السعودية</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} شركة آرك للأنظمة الأمنية. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
