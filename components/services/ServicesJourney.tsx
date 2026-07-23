import { serviceStages } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesJourney() {
  return (
    <section className="bg-navy-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            title="Da ideia de viajar até a hora de fazer as malas."
            light
          />
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block"
          />
          {serviceStages.map((stage, index) => (
            <Reveal key={stage.step} delay={index * 0.12}>
              <div className="flex flex-col gap-3">
                <span className="text-4xl font-bold text-white/20">{stage.step}</span>
                <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{stage.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
