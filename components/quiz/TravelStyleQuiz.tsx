"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { travelStyles } from "@/content/travel-styles";
import { destinations } from "@/content/destinations";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

export function TravelStyleQuiz() {
  const [selectedId, setSelectedId] = useState(travelStyles[0].id);
  const selectedStyle = travelStyles.find((style) => style.id === selectedId) ?? travelStyles[0];
  const backdrop = destinations.find((destination) => destination.slug === selectedStyle.destinationSlug);

  return (
    <section id="quiz" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {backdrop && (
            <motion.div
              key={backdrop.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={backdrop.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center opacity-40"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/85 to-navy-950" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          title="Que tipo de viagem combina com você?"
          description="Escolha um estilo e veja como a Patrotur pensaria a sua próxima viagem a partir dele."
          align="center"
          light
        />

        <div
          role="group"
          aria-label="Estilos de viagem"
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {travelStyles.map((style) => {
            const isSelected = style.id === selectedId;
            return (
              <button
                key={style.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(style.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400 ${
                  isSelected
                    ? "border-turquoise-400 bg-turquoise-500 text-navy-950"
                    : "border-white/25 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {style.label}
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStyle.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-12"
            >
              <h3 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
                {selectedStyle.headline}
              </h3>
              <p className="max-w-xl text-white/70">{selectedStyle.description}</p>
              <Button
                href={buildWhatsAppLink(whatsappMessages.travelStyle(selectedStyle.whatsappIntent))}
                variant="primary"
                external
              >
                Quero montar minha viagem de {selectedStyle.label.toLowerCase()}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
