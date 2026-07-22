"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { journeySteps } from "@/content/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RouteTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  return (
    <section id="como-funciona" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Como funciona"
          title="Cada viagem segue a mesma rota, com um destino diferente."
          align="center"
        />

        <div ref={containerRef} className="relative mt-16 flex flex-col gap-14 pl-10 sm:pl-14">
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-navy-900/10 sm:left-[11px]">
            <motion.div
              className="w-full origin-top bg-turquoise-500"
              style={{
                scaleY: scrollYProgress,
                height: "100%",
              }}
            />
          </div>

          {journeySteps.map((step, index) => (
            <div key={step.title} className="relative">
              <span className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-turquoise-500 ring-4 ring-paper sm:-left-14 sm:h-5 sm:w-5">
                <span className="text-[10px] font-bold text-navy-950">{index + 1}</span>
              </span>
              <h3 className="text-lg font-bold text-navy-950 sm:text-xl">{step.title}</h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-navy-900/65 sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
