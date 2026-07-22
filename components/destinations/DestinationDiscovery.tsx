import { destinations } from "@/content/destinations";
import { DestinationCarousel } from "@/components/destinations/DestinationCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function DestinationDiscovery() {
  return (
    <section id="destinos" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            title="Para onde você quer ir?"
            description="Nem todo mundo já sabe o destino certo, e tudo bem. Estes são pontos de partida para imaginar. Inspire-se, e vamos descobrir juntos qual combina com a sua viagem."
          />
        </Reveal>
      </div>

      <div className="mt-14">
        <DestinationCarousel destinations={destinations} />
      </div>
    </section>
  );
}
