import Image from "next/image";
import { site } from "@/content/site";

const postPreviews = [
  {
    src: "/images/instagram/post-01.jpg",
    alt: "Lúcio apresentando as condições e os preços da Patrotur",
    position: "center",
  },
  {
    src: "/images/instagram/post-02.jpg",
    alt: "Lúcio falando dentro da agência Patrotur",
    position: "center 35%",
  },
  {
    src: "/images/instagram/post-03.jpg",
    alt: "Fachada renovada da agência Patrotur",
    position: "center 42%",
  },
] as const;

export function InstagramPostsGrid() {
  return (
    <a
      href={site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir o perfil ${site.instagram.handle} no Instagram`}
      className="group block overflow-hidden rounded-[28px] border border-navy-900/10 bg-white shadow-[0_18px_55px_rgba(11,26,51,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(11,26,51,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise-400"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-950 text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.4" cy="6.7" r="1" className="fill-current stroke-none" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-navy-950">
              {site.instagram.handle}
            </span>
            <span className="block truncate text-xs text-navy-900/60">
              Dicas, bastidores e destinos
            </span>
          </span>
        </div>

        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-950">
          Ver perfil
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-navy-950/5 p-1 sm:gap-2 sm:p-2">
        {postPreviews.map((post) => (
          <div
            key={post.src}
            className="relative aspect-square overflow-hidden rounded-[14px] bg-navy-900 sm:rounded-[18px]"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1280px) 220px, (min-width: 1024px) 18vw, 30vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              style={{ objectPosition: post.position }}
            />
            <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-navy-950/70 text-white backdrop-blur-sm sm:right-3 sm:top-3 sm:size-8">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-0.5 size-3.5 fill-current">
                <path d="M6.5 4.8a1 1 0 0 1 1.52-.85l7.15 5.2a1 1 0 0 1 0 1.7l-7.15 5.2a1 1 0 0 1-1.52-.85V4.8Z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </a>
  );
}
