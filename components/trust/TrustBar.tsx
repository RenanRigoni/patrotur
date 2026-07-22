import { Reveal } from "@/components/ui/Reveal";
import { foundedYear, yearsInBusiness } from "@/content/site";

const items = [
  `${yearsInBusiness}+ anos em Patrocínio`,
  "Atendimento humano e personalizado",
  "Viagens nacionais e internacionais",
  "Parcelamento facilitado",
  "Agência física no Centro",
];

const mobileItems = [
  `Desde ${foundedYear} em Patrocínio`,
  "Atendimento humano",
  "Nacional e internacional",
  "Parcelamento facilitado",
];

export function TrustBar() {
  return (
    <section className="border-b border-navy-900/10 bg-paper py-5 sm:py-6">
      <Reveal>
        <ul className="mx-auto grid max-w-sm grid-cols-2 px-6 sm:hidden">
          {mobileItems.map((item, index) => (
            <li
              key={item}
              className={`flex min-h-14 items-center justify-center px-3 py-3 text-center text-[13px] font-semibold leading-snug text-navy-900/70 ${
                index % 2 === 0 ? "border-r border-navy-900/10" : ""
              } ${index < 2 ? "border-b border-navy-900/10" : ""}`}
            >
              {item}
            </li>
          ))}
        </ul>

        <ul className="mx-auto hidden max-w-[90rem] items-center justify-center overflow-x-auto px-6 [scrollbar-width:none] sm:flex sm:flex-nowrap sm:px-8 md:divide-x md:divide-navy-900/15 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item} className="whitespace-nowrap px-5 text-sm font-medium text-navy-900/70 first:pl-0 last:pr-0">
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
