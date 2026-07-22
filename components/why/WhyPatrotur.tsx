import { whyReasons } from "@/content/why";
import { Reveal } from "@/components/ui/Reveal";

export function WhyPatrotur() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <p className="text-3xl font-bold leading-tight tracking-tight text-navy-950 sm:text-4xl">
              Você aproveita a viagem.
              <br />A gente ajuda a cuidar do caminho até ela.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {whyReasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.1}>
              <div className="flex gap-5 border-t border-navy-900/10 pt-6">
                <span className="font-accent text-3xl text-turquoise-500">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-bold text-navy-950">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{reason.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
