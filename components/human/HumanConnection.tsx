import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";
import { foundedYear } from "@/content/site";

export function HumanConnection() {
  return (
    <section className="bg-navy-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-300">
            Quem cuida da sua viagem
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Uma conversa pode ser o começo da sua próxima viagem.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Por trás do site existe uma equipe de verdade, em Patrocínio, atendendo
            desde {foundedYear}. Sem robô, sem script pronto, só gente que gosta
            de ajudar outras pessoas a viajar.
          </p>
          <div className="mt-8">
            <Button href={buildWhatsAppLink(whatsappMessages.general)} variant="primary" external>
              Falar com a Patrotur
            </Button>
          </div>
        </Reveal>

        <Reveal className="flex justify-center" delay={0.15}>
          <div className="relative aspect-square w-full max-w-[26.25rem] overflow-hidden rounded-[28px] border border-white/10">
            <Image
              src="/images/Lucio.png"
              alt="Lúcio, da equipe Patrotur, sorrindo de camisa polo da agência"
              fill
              loading="lazy"
              sizes="(min-width: 480px) 420px, calc(100vw - 3rem)"
              className="object-contain"
            />
            <span className="absolute bottom-6 left-6 text-xs font-medium text-white/80">
              Lúcio, especialista em cuidar da sua viagem.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
