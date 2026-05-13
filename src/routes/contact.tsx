import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Phone, Mail, MessageCircle, MapPin, Instagram, Twitter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — آرك" },
      { name: "description", content: "تواصل مع فريق دعم آرك عبر الهاتف، البريد، أو واتساب." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="text-xs tracking-widest text-primary mb-3">CONTACT</div>
        <h1 className="font-display text-5xl md:text-7xl font-black mb-6">تواصل معنا.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mb-12">فريقنا جاهز للإجابة على استفساراتك وحجز فحوصاتك في أي وقت.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "الهاتف", value: "920 000 000", href: "tel:920000000" },
              { icon: MessageCircle, label: "واتساب", value: "+966 50 000 0000", href: "https://wa.me/966500000000" },
              { icon: Mail, label: "البريد الإلكتروني", value: "info@arc-sec.sa", href: "mailto:info@arc-sec.sa" },
              { icon: MapPin, label: "العنوان", value: "الرياض، حي العليا، المملكة العربية السعودية" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition group shadow-card">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary group-hover:shadow-glow transition">
                  <c.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground tracking-widest">{c.label}</div>
                  <div className="font-bold text-lg mt-1">{c.value}</div>
                </div>
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bg-gradient-card border border-border rounded-3xl p-8 shadow-elegant space-y-5"
          >
            <h2 className="font-display text-2xl font-bold">أرسل لنا رسالة</h2>
            <input required placeholder="الاسم" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            <input required type="email" placeholder="البريد الإلكتروني" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            <input required placeholder="رقم الجوال" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            <textarea required rows={5} placeholder="رسالتك..." className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
            <button type="submit" className="w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold shadow-glow hover:scale-[1.01] transition">
              {sent ? "تم الإرسال ✓" : "إرسال الرسالة"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
