import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RouteMotif } from "@/components/ui/RouteMotif";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 sm:py-36">
      <div className="absolute inset-0">
        <Image
          src="/images/destinations/lisboa.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/70" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center sm:px-8">
        <RouteMotif variant="divider" className="h-12 w-64 text-turquoise-300" />
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          O próximo trecho da sua rota começa com uma conversa.
        </h2>
        <p className="max-w-xl text-base text-white/70 sm:text-lg">
          Conte para a Patrotur onde você sonha chegar. O resto do caminho a
          gente ajuda a construir com você.
        </p>
        <Button href={buildWhatsAppLink(whatsappMessages.finalCta)} variant="primary" external>
          Planejar minha próxima viagem
        </Button>
      </div>

      <Image
        src="/images/malu.png"
        alt="Malu, a mala mascote da Patrotur, acenando"
        width={420}
        height={560}
        loading="lazy"
        className="pointer-events-none absolute bottom-2 right-0 hidden w-40 drop-shadow-2xl sm:block sm:w-52 lg:right-10 lg:w-64"
      />
    </section>
  );
}
