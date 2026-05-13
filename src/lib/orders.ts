export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; email: string; address: string; city: string };
  items: { productId: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "قيد المعالجة" | "تم الشحن" | "مكتمل" | "ملغي";
  paymentMethod: "بطاقة" | "تحويل" | "عند الاستلام";
};

const KEY = "arc_orders_v1";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const all = getOrders();
  all.unshift(order);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const all = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteOrder(id: string) {
  const all = getOrders().filter((o) => o.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function newOrderId() {
  return "ARC-" + Date.now().toString(36).toUpperCase();
}
