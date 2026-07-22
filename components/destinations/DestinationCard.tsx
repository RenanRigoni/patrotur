import Image from "next/image";
import type { Destination } from "@/content/destinations";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

interface DestinationCardProps {
  destination: Destination;
  offset?: boolean;
}

export function DestinationCard({ destination, offset = false }: DestinationCardProps) {
  return (
    <a
      href={buildWhatsAppLink(whatsappMessages.destination(destination.name))}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block h-[420px] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[28px] sm:h-[480px] sm:w-[340px] ${
        offset ? "sm:translate-y-8" : ""
      }`}
    >
      <Image
        src={destination.image}
        alt={`${destination.name}, ${destination.region}. ${destination.teaser}`}
        fill
        loading="lazy"
        sizes="(min-width: 640px) 340px, 78vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-turquoise-300">
          {destination.region}
        </span>
        <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
        <p className="text-sm text-white/75">{destination.teaser}</p>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white underline decoration-turquoise-400 decoration-2 underline-offset-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Inspire-se e converse com a Patrotur
        </span>
      </div>
    </a>
  );
}
