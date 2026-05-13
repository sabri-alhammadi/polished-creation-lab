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
  image: string;
  description: string;
};

export const products: Product[] = [
  { id: "cam-pro", name: "كاميرا قبة احترافية 4K", brand: "Hikvision", category: "كاميرات", price: 850, image: camera, description: "كاميرا مراقبة عالية الدقة مع رؤية ليلية متقدمة." },
  { id: "alarm-1", name: "نظام إنذار لاسلكي ذكي", brand: "Ajax", category: "أنظمة إنذار", price: 1450, image: alarm, description: "لوحة تحكم ذكية مع اتصال خلوي وواي فاي." },
  { id: "doorbell", name: "جرس باب ذكي بالفيديو", brand: "Ring", category: "ملحقات", price: 620, image: doorbell, description: "تنبيهات لحظية ومحادثة ثنائية الاتجاه." },
  { id: "lock", name: "قفل بصمة ذكي", brand: "Yale", category: "أقفال ذكية", price: 1190, image: lock, description: "فتح ببصمة الإصبع، رمز PIN، أو تطبيق الجوال." },
  { id: "nvr", name: "مسجل شبكي 16 قناة", brand: "Dahua", category: "ملحقات", price: 1850, image: nvr, description: "تخزين بدقة 4K حتى 8 تيرابايت." },
  { id: "sensor", name: "حساس حركة PIR", brand: "Bosch", category: "أنظمة إنذار", price: 240, image: sensor, description: "كشف دقيق مع مقاومة الحيوانات الأليفة." },
];
