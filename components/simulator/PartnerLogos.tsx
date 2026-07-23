import Image from "next/image";
import { partners } from "@/content/partners";

export function PartnerLogos() {
  const track = [...partners, ...partners];

  return (
    <div className="mt-14">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-900/40">
        Operadoras parceiras
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
          {track.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className={`flex h-14 min-w-[160px] items-center justify-center rounded-xl border px-6 ${
                partner.variant === "dark"
                  ? "border-navy-900/10 bg-navy-950"
                  : "border-navy-900/10 bg-navy-900/[0.03]"
              }`}
            >
              <Image
                src={partner.logoSrc}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
