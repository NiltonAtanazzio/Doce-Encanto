import { CartItem } from "@/contexts/CartContext";
import { AddressData, formatAddressForWhatsApp } from "@/lib/addressValidation";

export const WHATSAPP_NUMBER = "5515999999999";
export const INSTAGRAM_URL =
  "https://www.instagram.com/doceencanto-atanasio-dev/";

export interface CheckoutData {
  name: string;
  phone?: string;
  address?: AddressData;
  deliveryType: "retirada" | "entrega";
  observations?: string;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function generateWhatsAppMessage(
  items: CartItem[],
  total: number,
  checkoutData?: CheckoutData,
): string {
  let message = "Olá! Gostaria de fazer um pedido 🍬\n\n";

  if (checkoutData?.name) {
    message += `*Nome:* ${checkoutData.name}\n`;
  }
  if (checkoutData?.phone) {
    message += `*Telefone:* ${checkoutData.phone}\n`;
  }

  message += "\n*📋 Pedido:*\n";

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    message += `▸ ${item.quantity}x ${item.name} (${formatCurrency(itemTotal)})\n`;
    if (item.observation) {
      message += `   _Obs: ${item.observation}_\n`;
    }
  });

  message += `\n*💰 Total: ${formatCurrency(total)}*\n`;

  if (checkoutData?.deliveryType) {
    message += `\n*🚚 Tipo:* ${checkoutData.deliveryType === "retirada" ? "Retirada no local" : "Entrega"}\n`;
  }

  if (checkoutData?.address && checkoutData.deliveryType === "entrega") {
    message += `*📍 Endereço:*\n${formatAddressForWhatsApp(checkoutData.address)}\n`;
  }

  if (checkoutData?.observations) {
    message += `\n*📝 Observações:* ${checkoutData.observations}\n`;
  }

  message += "\nAguardo confirmação! 🙏";

  return message;
}

export function generateWhatsAppURL(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function openWhatsApp(
  items: CartItem[],
  total: number,
  checkoutData?: CheckoutData,
): void {
  const message = generateWhatsAppMessage(items, total, checkoutData);
  const url = generateWhatsAppURL(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

export function openWhatsAppGeneral(customMessage?: string): void {
  const message =
    customMessage || "Olá! Gostaria de saber mais sobre os doces 🍬";
  const url = generateWhatsAppURL(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

export function generateKitOrderMessage(kitName: string): string {
  return `Olá! Quero encomendar o Kit ${kitName}. 🎁`;
}

export function generateKitsQuestionMessage(): string {
  return "Olá! Gostaria de tirar uma dúvida sobre os Kits Especiais. 🎁";
}
