import { useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Shield, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const emailSchema = z.string().trim().email({ message: "بريد إلكتروني غير صالح" }).max(255);
const passwordSchema = z.string().min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }).max(72);
const nameSchema = z.string().trim().min(2, { message: "الاسم قصير جداً" }).max(100);

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { redirect?: string };
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = search.redirect || "/";

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanEmail = emailSchema.parse(email);
      const cleanPassword = passwordSchema.parse(password);
      let cleanName = "";
      if (mode === "signup") cleanName = nameSchema.parse(name);
      setLoading(true);
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: cleanName },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء حسابك بنجاح");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });
        if (error) throw error;
        toast.success("مرحباً بعودتك");
      }
      navigate({ to: redirectTo });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0]?.message || "بيانات غير صالحة");
      } else if (err instanceof Error) {
        const msg = err.message.includes("Invalid login")
          ? "البريد أو كلمة المرور غير صحيحة"
          : err.message.includes("already registered") || err.message.includes("already been registered")
          ? "هذا البريد مسجل مسبقاً"
          : err.message;
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setGoogleLoading(true);
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + redirectTo,
      });
      if (result.error) {
        toast.error("تعذر تسجيل الدخول عبر جوجل");
        setGoogleLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: redirectTo });
    } catch {
      toast.error("حدث خطأ غير متوقع");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 justify-center mb-10 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition">
            <Shield className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-black text-2xl">آرك</div>
            <div className="text-[10px] text-muted-foreground tracking-widest">ARC SECURITY</div>
          </div>
        </Link>

        <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-elegant">
          <h1 className="font-display text-3xl font-black mb-2">
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === "login" ? "أهلاً بعودتك إلى آرك" : "انضم إلى آلاف العملاء الموثوقين"}
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-surface border border-border hover:border-primary/50 rounded-xl py-3 font-bold transition disabled:opacity-60 mb-6"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.9 36.3 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"/>
              </svg>
            )}
            المتابعة باستخدام Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">أو عبر البريد الإلكتروني</span>
            </div>
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            {mode === "signup" && (
              <Field icon={UserIcon} placeholder="الاسم الكامل" value={name} onChange={setName} />
            )}
            <Field icon={Mail} type="email" placeholder="البريد الإلكتروني" value={email} onChange={setEmail} />
            <Field icon={Lock} type="password" placeholder="كلمة المرور" value={password} onChange={setPassword} />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-xl font-bold shadow-glow hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            {mode === "login" ? (
              <>
                ليس لديك حساب؟{" "}
                <Link to="/signup" className="text-primary font-bold hover:underline">
                  أنشئ حساباً
                </Link>
              </>
            ) : (
              <>
                لديك حساب بالفعل؟{" "}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  سجّل الدخول
                </Link>
              </>
            )}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          بمتابعتك أنت توافق على{" "}
          <Link to="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full bg-surface border border-border rounded-xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:border-primary transition"
      />
    </div>
  );
}
