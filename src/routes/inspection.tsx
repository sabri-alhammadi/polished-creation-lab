import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Calendar, Clock, MapPin, Camera, CheckCircle2, CreditCard } from "lucide-react";

export const Route = createFileRoute("/inspection")({
  head: () => ({
    meta: [
      { title: "طلب فحص فني — آرك" },
      { name: "description", content: "احجز موعد فحص فني لنظامك الأمني خلال دقائق. السعر 150 ريال فقط." },
    ],
  }),
  component: InspectionPage,
});

const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function InspectionPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [systemType, setSystemType] = useState("كاميرات مراقبة");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const canNext1 = systemType && location;
  const canNext2 = date && time;
  const canPay = name && phone;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-widest text-primary mb-3">FAST TRACK</div>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-4">طلب فحص فني</h1>
            <p className="text-muted-foreground text-lg">رسوم الفحص ثابتة <span className="text-primary font-bold">150 ريال</span> — استجابة خلال 24 ساعة.</p>
          </div>

          <div className="flex items-center justify-between mb-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                  step >= n ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-surface border border-border text-muted-foreground"
                }`}>
                  {step > n ? <CheckCircle2 className="w-5 h-5" /> : n}
                </div>
                {n < 3 && <div className={`flex-1 h-px mx-2 ${step > n ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-gradient-card border border-border rounded-3xl p-8 md:p-10 shadow-elegant">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold flex items-center gap-3"><Camera className="w-6 h-6 text-primary" />تفاصيل النظام والموقع</h2>
                <Field label="نوع النظام المراد فحصه">
                  <select value={systemType} onChange={(e) => setSystemType(e.target.value)} className="input">
                    <option>كاميرات مراقبة</option>
                    <option>نظام إنذار</option>
                    <option>أقفال ذكية</option>
                    <option>منظومة متكاملة</option>
                  </select>
                </Field>
                <Field label="الموقع / العنوان التفصيلي" icon={<MapPin className="w-4 h-4" />}>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="الحي، الشارع، رقم المبنى" className="input" />
                </Field>
                <button disabled={!canNext1} onClick={() => setStep(2)} className="btn-primary w-full">التالي</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold flex items-center gap-3"><Calendar className="w-6 h-6 text-primary" />جدولة الموعد</h2>
                <Field label="التاريخ">
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="input" />
                </Field>
                <div>
                  <label className="block text-sm font-medium mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />اختر الوقت (9 ص - 9 م)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-2.5 rounded-lg text-sm font-medium border transition ${
                          time === t ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow" : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1">رجوع</button>
                  <button disabled={!canNext2} onClick={() => setStep(3)} className="btn-primary flex-1">التالي</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold flex items-center gap-3"><CreditCard className="w-6 h-6 text-primary" />تأكيد وسداد</h2>
                <Field label="الاسم الكامل">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
                </Field>
                <Field label="رقم الجوال">
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05xxxxxxxx" className="input" />
                </Field>

                <div className="bg-surface rounded-xl p-5 border border-border">
                  <div className="text-xs text-muted-foreground tracking-widest mb-3">ملخص الطلب</div>
                  <Row k="نوع النظام" v={systemType} />
                  <Row k="الموقع" v={location} />
                  <Row k="الموعد" v={`${date} — ${time}`} />
                  <div className="border-t border-border my-3" />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">الإجمالي</span>
                    <span className="font-display font-black text-gradient">150 ريال</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary flex-1">رجوع</button>
                  <button disabled={!canPay} onClick={() => alert("تم تأكيد الحجز! سيتواصل معك فريقنا قريباً.")} className="btn-primary flex-1">إكمال الدفع</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <style>{`
        .input { width:100%; background: var(--surface); border:1px solid var(--border); border-radius: 0.75rem; padding: 0.75rem 1rem; font-size: 0.875rem; color: var(--foreground); outline:none; transition: border-color .2s; }
        .input:focus { border-color: var(--primary); }
        .btn-primary { background: var(--gradient-primary); color: var(--primary-foreground); padding: 0.875rem 1.5rem; border-radius: 0.75rem; font-weight: 700; box-shadow: var(--shadow-glow); transition: opacity .2s, transform .2s; }
        .btn-primary:hover:not(:disabled) { transform: scale(1.01); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
        .btn-secondary { background: var(--surface); border:1px solid var(--border); color: var(--foreground); padding: 0.875rem 1.5rem; border-radius: 0.75rem; font-weight: 700; }
      `}</style>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 flex items-center gap-2">{icon}{label}</label>
      {children}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm py-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
