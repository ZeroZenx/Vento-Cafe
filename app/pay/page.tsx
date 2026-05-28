import type { Metadata } from "next";
import { PayClient } from "@/components/PayClient";

export const metadata: Metadata = {
  title: "Quick Pay",
  description:
    "Quick mobile payment screen for Vento Café roadside and event sales with Pago Móvil Venezuela and Binance."
};

export default function PayPage() {
  return <PayClient />;
}

