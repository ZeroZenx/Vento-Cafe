import type { Metadata } from "next";
import { QuickPay } from "@/components/QuickPay";

export const metadata: Metadata = {
  title: "Quick Pay",
  description: "Pago rapido para Vento Cafe con Pago Movil Venezuela o Binance."
};

export default function PayPage() {
  return <QuickPay />;
}
