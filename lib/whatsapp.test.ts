import { describe, it, expect } from "vitest";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { whatsappMessages } from "@/content/whatsapp-messages";

describe("buildWhatsAppLink", () => {
  it("builds a wa.me link against the Patrotur WhatsApp number", () => {
    const link = buildWhatsAppLink("Olá!");
    expect(link.startsWith(site.whatsappBaseUrl)).toBe(true);
  });

  it("URL-encodes the message text", () => {
    const link = buildWhatsAppLink("Olá! Tudo bem?");
    expect(link).toBe(`${site.whatsappBaseUrl}?text=Ol%C3%A1!%20Tudo%20bem%3F`);
  });

  it("embeds the destination name in the destination-specific message", () => {
    const message = whatsappMessages.destination("Fernando de Noronha");
    expect(message).toContain("Fernando de Noronha");
    const link = buildWhatsAppLink(message);
    expect(decodeURIComponent(link.split("?text=")[1])).toBe(message);
  });

  it("embeds the travel style intent in the travel-style message", () => {
    const message = whatsappMessages.travelStyle("uma viagem de praia");
    expect(message).toContain("uma viagem de praia");
  });
});
