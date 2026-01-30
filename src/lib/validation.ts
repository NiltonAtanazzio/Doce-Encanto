import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z
    .string()
    .email({ message: "Digite um email válido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Telefone deve conter apenas números" })
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" })
    .max(11, { message: "Telefone deve ter no máximo 11 dígitos" }),
  message: z
    .string()
    .min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "Mensagem deve ter no máximo 1000 caracteres" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  phone: z
    .string()
    .optional(),
  address: z
    .string()
    .optional(),
  deliveryType: z.enum(["retirada", "entrega"]),
  observations: z
    .string()
    .optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Phone formatting helper
export function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, "");
  return numbers.slice(0, 11);
}
