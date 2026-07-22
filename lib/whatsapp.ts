import { site } from "@/content/site";

export function buildWhatsAppLink(message: string): string {
  return `${site.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
