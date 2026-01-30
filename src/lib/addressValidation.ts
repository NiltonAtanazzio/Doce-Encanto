import { z } from "zod";

export const addressSchema = z.object({
  street: z.string()
    .min(3, "Rua deve ter pelo menos 3 caracteres")
    .max(100, "Rua deve ter no máximo 100 caracteres"),
  number: z.string()
    .min(1, "Número é obrigatório")
    .max(20, "Número deve ter no máximo 20 caracteres"),
  neighborhood: z.string()
    .min(2, "Bairro deve ter pelo menos 2 caracteres")
    .max(50, "Bairro deve ter no máximo 50 caracteres"),
  city: z.string().default("Itapeva-SP"),
  cep: z.string()
    .optional()
    .refine(
      (val) => !val || /^\d{5}-?\d{3}$/.test(val),
      "CEP deve estar no formato 00000-000"
    ),
  reference: z.string().max(200, "Observação deve ter no máximo 200 caracteres").optional(),
});

export type AddressData = z.infer<typeof addressSchema>;

export interface AddressErrors {
  street?: string;
  number?: string;
  neighborhood?: string;
  cep?: string;
  reference?: string;
}

export function validateAddress(address: Partial<AddressData>): AddressErrors {
  const errors: AddressErrors = {};
  
  if (!address.street || address.street.trim().length < 3) {
    errors.street = "Rua deve ter pelo menos 3 caracteres";
  }
  
  if (!address.number || address.number.trim().length < 1) {
    errors.number = "Número é obrigatório";
  }
  
  if (!address.neighborhood || address.neighborhood.trim().length < 2) {
    errors.neighborhood = "Bairro deve ter pelo menos 2 caracteres";
  }
  
  if (address.cep && !/^\d{5}-?\d{3}$/.test(address.cep)) {
    errors.cep = "CEP deve estar no formato 00000-000";
  }
  
  return errors;
}

export function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatAddressForWhatsApp(address: AddressData): string {
  let formatted = `${address.street}, ${address.number} - ${address.neighborhood}`;
  
  if (address.city) {
    formatted += `\n${address.city}`;
  }
  
  if (address.cep) {
    formatted += ` - CEP: ${address.cep}`;
  }
  
  if (address.reference) {
    formatted += `\nRef: ${address.reference}`;
  }
  
  return formatted;
}
