import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "سياسة الخصوصية — آرك" }, { name: "description", content: "سياسة حماية البيانات في شركة آرك للأنظمة الأمنية." }] }),
  component: () => <Policy title="سياسة الخصوصية" intro="نلتزم في آرك بحماية خصوصية عملائنا وبياناتهم بأعلى المعايير الأمنية." sections={[
    { h: "البيانات التي نجمعها", p: "نجمع البيانات الأساسية مثل الاسم، رقم الجوال، البريد الإلكتروني، وعنوان الموقع المراد فحصه، بالإضافة إلى بيانات الدفع الضرورية لإتمام المعاملة." },
    { h: "كيفية استخدام بياناتك", p: "نستخدم بياناتك حصراً لتقديم الخدمة المطلوبة، التواصل معك، وتحسين تجربتك. لا نشاركها مع أي طرف ثالث دون موافقتك الصريحة." },
    { h: "حماية بيانات الموقع الجغرافي", p: "بيانات موقعك تُستخدم فقط لجدولة موعد الفحص ولا تُخزّن بعد إكمال الخدمة سوى لأغراض السجلات الإدارية." },
    { h: "حماية بيانات الدفع", p: "تتم جميع عمليات الدفع عبر بوابات دفع معتمدة ومشفّرة بمعيار PCI-DSS، ولا نقوم بتخزين بيانات بطاقتك على خوادمنا." },
    { h: "حقوقك", p: "يحق لك في أي وقت طلب الاطلاع على بياناتك، تعديلها، أو حذفها بمراسلتنا على البريد info@arc-sec.sa." },
  ]} />,
});

export function Policy({ title, intro, sections }: { title: string; intro: string; sections: { h: string; p: string }[] }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="text-xs tracking-widest text-primary mb-3">POLICY</div>
        <h1 className="font-display text-5xl md:text-6xl font-black mb-6">{title}</h1>
        <p className="text-muted-foreground text-lg mb-12">{intro}</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.h} className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold mb-3">{s.h}</h2>
              <p className="text-muted-foreground leading-loose">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
