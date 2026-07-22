import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

function fullAddress(): string {
  return `${site.address.street}, ${site.address.neighborhood}, ${site.address.city} - ${site.address.state}, ${site.address.zip}`;
}

function buildMapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;
}

function buildMapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`;
}

export function LocalAgency() {
  return (
    <section id="agencia" className="bg-navy-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-300">
            Agência física
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Se preferir, venha conversar pessoalmente.
          </h2>
          <address className="mt-6 not-italic text-base leading-relaxed text-white/70">
            {site.address.street}, {site.address.neighborhood}
            <br />
            {site.address.city}/{site.address.state}, CEP {site.address.zip}
            <br />
            <a href={`tel:${site.phones.landline.replace(/\D/g, "")}`} className="underline decoration-white/30 underline-offset-4 hover:text-white">
              {site.phones.landline}
            </a>
          </address>
          <div className="mt-8">
            <Button href={buildMapsUrl()} variant="secondary" external>
              Ver rota até a Patrotur
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="aspect-square overflow-hidden rounded-[28px] border border-white/10 sm:aspect-[4/3]">
            <iframe
              src={buildMapsEmbedUrl()}
              title={`Localização da Patrotur no mapa: ${fullAddress()}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[15%] contrast-[1.05]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
