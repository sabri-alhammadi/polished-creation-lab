import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Target, Eye, Users, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — آرك للأنظمة الأمنية" },
      { name: "description", content: "تعرّف على شركة آرك، رائدة تركيب وصيانة الأنظمة الأمنية في المملكة." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-xs tracking-widest text-primary mb-3">ABOUT US</div>
        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 leading-tight">حماية مصممة بفنّية <span className="text-gradient">هندسية</span>.</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-16">
          منذ تأسيسها، تخصصت شركة آرك في تقديم حلول أمنية متكاملة تجمع بين أحدث التقنيات وفريق هندسي
          مُعتمد. نؤمن بأن الأمن ليس منتجاً فحسب، بل تجربة كاملة من الاستشارة إلى الصيانة.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden border border-border mb-16">
          {[
            { icon: Target, title: "رسالتنا", text: "تمكين كل منشأة وعميل من التحكم الكامل بأمنه عبر حلول موثوقة وسهلة الاستخدام." },
            { icon: Eye, title: "رؤيتنا", text: "أن نكون الخيار الأول للأنظمة الأمنية الذكية في المملكة والمنطقة." },
            { icon: Users, title: "فريقنا", text: "مهندسون وفنيون مدرّبون على أحدث المعايير العالمية والشهادات الاحترافية." },
            { icon: Award, title: "جودتنا", text: "شراكات مع كبرى العلامات العالمية، وضمان شامل على التركيب والمنتجات." },
          ].map((b) => (
            <div key={b.title} className="bg-surface p-10">
              <b.icon className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-bold mb-3">{b.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-card border border-border rounded-3xl p-10 shadow-card">
          <h2 className="font-display text-3xl font-black mb-6">تخصصاتنا</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
            {[
              "تركيب كاميرات المراقبة بكافة أنواعها",
              "أنظمة الإنذار ضد السرقة والحريق",
              "الأقفال الذكية وأنظمة التحكم بالوصول",
              "صيانة دورية ووقائية للأنظمة الحالية",
              "استشارات أمنية للمنشآت والفلل",
              "ربط الأنظمة بالتطبيقات الذكية",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}
