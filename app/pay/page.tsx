import type { Metadata } from "next";
import { QuickPay } from "@/components/QuickPay";

export const metadata: Metadata = {
  title: "Quick Pay",
  description: "Quick mobile payment screen for Vento Café & Market sales with Pago Móvil Venezuela and Binance."
};

export default function PayPage() {
  return <QuickPay />;
}
