import type { Destination } from "@/content/destinations";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

interface DestinationCardProps {
  destination: Destination;
  offset?: boolean;
}

export function DestinationCard({ destination, offset = false }: DestinationCardProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const imageKey = destination.image.split("/").at(-1)?.replace(/\.[^.]+$/, "") ?? destination.slug;
  const imageBase = `${basePath}/images/destinations/cards/${imageKey}`;

  return (
    <a
      href={buildWhatsAppLink(whatsappMessages.destination(destination.name))}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block h-[420px] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[28px] sm:h-[480px] sm:w-[340px] ${
        offset ? "sm:translate-y-8" : ""
      }`}
    >
      {/* The exact two variants keep this repeated carousel light on static hosting. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${imageBase}-640.webp`}
        srcSet={`${imageBase}-640.webp 640w, ${imageBase}-960.webp 960w`}
        alt={`${destination.name}, ${destination.region}. ${destination.teaser}`}
        width="640"
        height="904"
        loading="lazy"
        decoding="async"
        sizes="(min-width: 640px) 340px, 78vw"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
