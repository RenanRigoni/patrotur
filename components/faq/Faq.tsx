import { faqItems } from "@/content/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Perguntas frequentes" title="Antes de chamar no WhatsApp" align="center" />
        </Reveal>

        <div className="mt-12 flex flex-col divide-y divide-navy-900/10 border-t border-navy-900/10">
          {faqItems.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400 sm:text-lg">
                {item.question}
                <span className="shrink-0 text-xl font-light text-navy-900/40 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-900/65 sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
