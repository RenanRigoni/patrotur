import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramPostsGrid } from "@/components/social/InstagramPostsGrid";
import { site } from "@/content/site";

export function InstagramReference() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="flex flex-col items-start gap-4 text-left">
            <Image
              src="/images/PATROTU_VERT.png"
              alt="Patrotur Turismo"
              width={1011}
              height={753}
              loading="lazy"
              className="h-16 w-auto self-center lg:self-start"
            />
            <p className="max-w-sm text-lg text-navy-900/70">
              O dia a dia da Patrotur, dicas de viagem e destinos em destaque
              também estão no Instagram.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-900/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400"
            >
              Ver perfil no Instagram
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <InstagramPostsGrid />
        </Reveal>
      </div>
    </section>
  );
}
