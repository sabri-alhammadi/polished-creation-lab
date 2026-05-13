import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Camera, Bell, Lock, ArrowLeft, Zap, Clock, Award, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-security.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "آرك — تركيب وصيانة الأنظمة الأمنية" },
      { name: "description", content: "حلول أمنية متكاملة، كاميرات مراقبة، أنظمة إنذار، فحص فني سريع خلال 24 ساعة." },
      { property: "og:title", content: "آرك — تركيب وصيانة الأنظمة الأمنية" },
      { property: "og:description", content: "حلول أمنية متكاملة وفحص فني سريع." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Stats />
      <Categories />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-glow" />

      <div className="relative container mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            خدمة فحص متاحة الآن — استجابة خلال 24 ساعة
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            حماية لا تُساوم.
            <br />
            <span className="text-gradient">أنظمة أمنية</span> بلمسة احترافية.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            من تصميم وتركيب كاميرات المراقبة إلى أنظمة الإنذار الذكية — آرك توفر لك راحة البال
            بحلول مهندسة بدقة، وفحص فني فوري بـ <span className="text-primary font-bold">150 ريال</span> فقط.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/inspection"
              className="inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-bold shadow-glow hover:scale-105 transition-transform animate-pulse-glow"
            >
              <Zap className="w-5 h-5" />
              طلب فحص فوري
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-surface border border-border text-foreground px-8 py-4 rounded-xl font-bold hover:bg-surface-elevated transition"
            >
              تصفح المتجر
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-elegant">
            <img src={heroImg} alt="غرفة تحكم أنظمة المراقبة" width={1920} height={1080} className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-px bg-primary/60 animate-scan" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "+1,200", label: "عملية صيانة ناجحة" },
    { value: "+450", label: "نظام أمني مُركّب" },
    { value: "24/7", label: "دعم فني متواصل" },
    { value: "99%", label: "رضا العملاء" },
  ];
  return (
    <section className="container mx-auto px-6 -mt-16 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border bg-gradient-card backdrop-blur shadow-elegant">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-8 text-center">
            <div className="font-display text-4xl font-black text-gradient">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { icon: Camera, title: "كاميرات المراقبة", desc: "تقنيات 4K ورؤية ليلية احترافية" },
    { icon: Bell, title: "أنظمة الإنذار", desc: "حماية ذكية مع تنبيهات فورية" },
    { icon: Lock, title: "الأقفال الذكية", desc: "تحكم بالوصول من أي مكان" },
    { icon: Shield, title: "ملحقات وحلول", desc: "كل ما تحتاجه لمنظومة متكاملة" },
  ];
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-2xl mb-12">
        <div className="text-xs tracking-widest text-primary mb-3">CATEGORIES</div>
        <h2 className="font-display text-4xl md:text-5xl font-black mb-4">تصنيفات المتجر</h2>
        <p className="text-muted-foreground">اكتشف منظومتنا المختارة بعناية من أفضل العلامات التجارية العالمية.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cats.map((c) => (
          <Link
            key={c.title}
            to="/store"
            className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 shadow-card"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-gradient-primary group-hover:shadow-glow transition-all">
              <c.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" strokeWidth={2} />
            </div>
            <h3 className="font-bold text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Clock, title: "استجابة سريعة", desc: "فني عند بابك خلال 24 ساعة بمسار الفحص السريع." },
    { icon: Award, title: "خبرة معتمدة", desc: "فريق هندسي مُدرّب على أحدث تقنيات الأنظمة الأمنية." },
    { icon: CheckCircle2, title: "ضمان شامل", desc: "ضمان على التركيب والمنتجات يصل إلى 24 شهراً." },
  ];
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
        {features.map((f) => (
          <div key={f.title} className="bg-surface p-10 hover:bg-surface-elevated transition">
            <f.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-bold mb-3">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero border border-border p-12 md:p-20 text-center shadow-elegant">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="relative">
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
            جاهز لرفع مستوى <span className="text-gradient">حمايتك؟</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            احجز فحصاً فنياً اليوم، واحصل على تقرير مفصّل وعرض خاص لمنظومتك الأمنية.
          </p>
          <Link
            to="/inspection"
            className="inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-bold shadow-glow hover:scale-105 transition-transform"
          >
            <Zap className="w-5 h-5" />
            احجز فحصك الآن
          </Link>
        </div>
      </div>
    </section>
  );
}
