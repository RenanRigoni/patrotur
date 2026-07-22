import { site } from "@/content/site";

export function buildTravelAgencySchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.brandName,
    legalName: site.legalName,
    url: siteUrl,
    telephone: site.phones.landline,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    sameAs: [site.instagram.url],
  };
}
