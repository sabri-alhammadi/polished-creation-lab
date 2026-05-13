import camera from "@/assets/product-camera.jpg";
import alarm from "@/assets/product-alarm.jpg";
import doorbell from "@/assets/product-doorbell.jpg";
import lock from "@/assets/product-lock.jpg";
import nvr from "@/assets/product-nvr.jpg";
import sensor from "@/assets/product-sensor.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "كاميرات" | "أنظمة إنذار" | "ملحقات" | "أقفال ذكية";
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
  stock: number;
  rating: number;
  reviews: number;
  sku: string;
  warranty: string;
  installation: boolean;
};

export const products: Product[] = [
  {
    id: "cam-pro",
    name: "كاميرا قبة احترافية 4K",
    brand: "Hikvision",
    category: "كاميرات",
    price: 850,
    oldPrice: 1100,
    image: camera,
    description: "كاميرا مراقبة عالية الدقة مع رؤية ليلية متقدمة.",
    longDescription:
      "كاميرا قبة احترافية بدقة 4K Ultra HD مزوّدة بمستشعر Sony StarVis للحصول على صور شديدة الوضوح حتى في أصعب ظروف الإضاءة. تدعم الرؤية الليلية بالأشعة تحت الحمراء حتى 30 متراً، ومقاومة للماء والغبار IP67، ومناسبة للاستخدام الداخلي والخارجي.",
    features: [
      "دقة 4K (8 ميجا بكسل)",
      "رؤية ليلية حتى 30 متر",
      "مقاومة الماء والغبار IP67",
      "ضغط فيديو H.265+ لتقليل التخزين",
      "تنبيهات حركة ذكية",
      "دعم PoE — كابل واحد للطاقة والبيانات",
    ],
    specs: [
      { label: "الدقة", value: "3840 × 2160 (4K)" },
      { label: "زاوية الرؤية", value: "110°" },
      { label: "المستشعر", value: 'Sony 1/2.8"' },
      { label: "ضغط الفيديو", value: "H.265+ / H.264" },
      { label: "حماية", value: "IP67" },
      { label: "الطاقة", value: "12V DC / PoE" },
    ],
    stock: 24,
    rating: 4.8,
    reviews: 156,
    sku: "ARC-CAM-4K-01",
    warranty: "ضمان 24 شهراً",
    installation: true,
  },
  {
    id: "alarm-1",
    name: "نظام إنذار لاسلكي ذكي",
    brand: "Ajax",
    category: "أنظمة إنذار",
    price: 1450,
    image: alarm,
    description: "لوحة تحكم ذكية مع اتصال خلوي وواي فاي.",
    longDescription:
      "منظومة إنذار متكاملة لاسلكية تعمل بتقنية Jeweller للاتصال الموثوق حتى 2000 متر. تدعم الاتصال عبر الإيثرنت والواي فاي وشريحة 2G/3G/4G كنسخ احتياطية متعددة. تطبيق ذكي للتحكم الكامل من أي مكان.",
    features: [
      "اتصال موثوق حتى 2000م",
      "نسخ احتياطية متعددة (Wi-Fi/خلوي)",
      "تطبيق ذكي iOS و Android",
      "بطارية احتياطية حتى 16 ساعة",
      "إشعارات لحظية",
      "دعم حتى 100 جهاز فرعي",
    ],
    specs: [
      { label: "البروتوكول", value: "Jeweller" },
      { label: "التشفير", value: "AES 128-bit" },
      { label: "الاتصال", value: "Wi-Fi / Ethernet / 2G-4G" },
      { label: "البطارية", value: "16 ساعة احتياطية" },
      { label: "السعة", value: "100 جهاز / 50 مستخدم" },
    ],
    stock: 12,
    rating: 4.9,
    reviews: 92,
    sku: "ARC-ALM-AJX-01",
    warranty: "ضمان 24 شهراً",
    installation: true,
  },
  {
    id: "doorbell",
    name: "جرس باب ذكي بالفيديو",
    brand: "Ring",
    category: "ملحقات",
    price: 620,
    oldPrice: 750,
    image: doorbell,
    description: "تنبيهات لحظية ومحادثة ثنائية الاتجاه.",
    longDescription:
      "جرس باب ذكي بكاميرا 1080p HD ومحادثة ثنائية الاتجاه. يرسل إشعاراً مباشراً إلى هاتفك عند الضغط على الجرس أو رصد حركة. يدعم الرؤية الليلية والتسجيل السحابي.",
    features: [
      "كاميرا HD 1080p",
      "محادثة ثنائية الاتجاه",
      "رؤية ليلية بالأشعة تحت الحمراء",
      "كشف حركة قابل للتخصيص",
      "تخزين سحابي اختياري",
      "تركيب سهل بدون أسلاك",
    ],
    specs: [
      { label: "الدقة", value: "1920 × 1080 HD" },
      { label: "زاوية الرؤية", value: "155°" },
      { label: "البطارية", value: "قابلة للشحن — 6 أشهر" },
      { label: "الاتصال", value: "Wi-Fi 2.4GHz" },
    ],
    stock: 38,
    rating: 4.6,
    reviews: 240,
    sku: "ARC-DB-RNG-01",
    warranty: "ضمان 12 شهراً",
    installation: false,
  },
  {
    id: "lock",
    name: "قفل بصمة ذكي",
    brand: "Yale",
    category: "أقفال ذكية",
    price: 1190,
    image: lock,
    description: "فتح ببصمة الإصبع، رمز PIN، أو تطبيق الجوال.",
    longDescription:
      "قفل ذكي متعدد طرق الفتح: بصمة، رمز PIN، بطاقة RFID، تطبيق جوال، أو مفتاح طوارئ. مصنوع من سبائك الزنك المقاومة للصدأ، ويعمل ببطاريات AA لمدة عام كامل.",
    features: [
      "5 طرق فتح مختلفة",
      "حفظ حتى 100 بصمة",
      "تنبيهات الدخول الفوري",
      "وضع الإجازة وكلمات مرور مؤقتة",
      "بطارية تعمل حتى 12 شهراً",
      "تنبيه عند البطارية المنخفضة",
    ],
    specs: [
      { label: "طرق الفتح", value: "بصمة / PIN / RFID / تطبيق / مفتاح" },
      { label: "السعة", value: "100 بصمة / 100 رمز" },
      { label: "البطارية", value: "4× AA — حتى 12 شهر" },
      { label: "الخامة", value: "سبائك زنك مقاومة للصدأ" },
    ],
    stock: 17,
    rating: 4.7,
    reviews: 84,
    sku: "ARC-LCK-YAL-01",
    warranty: "ضمان 24 شهراً",
    installation: true,
  },
  {
    id: "nvr",
    name: "مسجل شبكي 16 قناة",
    brand: "Dahua",
    category: "ملحقات",
    price: 1850,
    image: nvr,
    description: "تخزين بدقة 4K حتى 8 تيرابايت.",
    longDescription:
      "جهاز تسجيل شبكي 16 قناة بدقة 4K يدعم بروتوكولات ONVIF لربط كاميرات من أي علامة تجارية. يحتوي على منفذي SATA لقرصين صلبين حتى 16 تيرابايت إجمالاً.",
    features: [
      "16 قناة دخل فيديو 4K",
      "منفذا SATA للأقراص الصلبة",
      "دعم ONVIF متعدد الماركات",
      "ضغط H.265+ يوفر 50% من السعة",
      "وصول عن بعد عبر تطبيق DMSS",
      "خروج HDMI و VGA متزامن",
    ],
    specs: [
      { label: "القنوات", value: "16 قناة 4K" },
      { label: "النطاق الترددي", value: "320 Mbps" },
      { label: "التخزين", value: "2× SATA حتى 16TB" },
      { label: "الخروج", value: "HDMI 4K + VGA" },
    ],
    stock: 8,
    rating: 4.9,
    reviews: 47,
    sku: "ARC-NVR-DH-16",
    warranty: "ضمان 36 شهراً",
    installation: true,
  },
  {
    id: "sensor",
    name: "حساس حركة PIR",
    brand: "Bosch",
    category: "أنظمة إنذار",
    price: 240,
    image: sensor,
    description: "كشف دقيق مع مقاومة الحيوانات الأليفة.",
    longDescription:
      "حساس حركة سلبي بالأشعة تحت الحمراء (PIR) بتقنية ألمانية الصنع. يميّز بدقة بين البشر والحيوانات الأليفة حتى 25 كجم لتقليل الإنذارات الكاذبة.",
    features: [
      "كشف حتى 12 متر",
      "مقاومة الحيوانات حتى 25 كجم",
      "زاوية كشف 90°",
      "تركيب سريع",
      "حماية من العبث",
    ],
    specs: [
      { label: "نطاق الكشف", value: "12 متر / 90°" },
      { label: "البطارية", value: "CR123A — 5 سنوات" },
      { label: "حماية", value: "Tamper Switch" },
    ],
    stock: 64,
    rating: 4.5,
    reviews: 312,
    sku: "ARC-SNS-BSH-01",
    warranty: "ضمان 24 شهراً",
    installation: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
