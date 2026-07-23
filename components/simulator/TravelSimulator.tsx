"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerLogos } from "@/components/simulator/PartnerLogos";
import { destinations } from "@/content/destinations";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

const quickDestinations = destinations.slice(0, 8).map((destination) => destination.name);

const budgetRanges = [
  "Até R$ 2.000 por pessoa",
  "R$ 2.000 – R$ 4.000 por pessoa",
  "R$ 4.000 – R$ 8.000 por pessoa",
  "Acima de R$ 8.000 por pessoa",
  "Ainda não sei",
];

const steps = ["Destino", "Período", "Viajantes", "Investimento", "Resumo"] as const;

const choiceButtonClasses = (isSelected: boolean) =>
  `rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
    isSelected
      ? "border-turquoise-500 bg-turquoise-500/10 text-navy-950"
      : "border-navy-900/15 text-navy-900/70 hover:border-navy-900/30"
  }`;

export function TravelSimulator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [destination, setDestination] = useState<string | null>(null);
  const [customDestination, setCustomDestination] = useState("");
  const [period, setPeriod] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<string | null>(null);

  const resolvedDestination = (destination === "outro" ? customDestination : destination)?.trim();
  const isLastStep = stepIndex === steps.length - 1;

  const canAdvance = [
    Boolean(resolvedDestination),
    period.trim().length > 0,
    travelers > 0,
    Boolean(budget),
  ][stepIndex];

  const goNext = () => setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const goBack = () => setStepIndex((current) => Math.max(current - 1, 0));

  const resetSimulator = () => {
    setStepIndex(0);
    setDestination(null);
    setCustomDestination("");
    setPeriod("");
    setTravelers(2);
    setBudget(null);
  };

  const whatsappHref =
    resolvedDestination && budget
      ? buildWhatsAppLink(
          whatsappMessages.simulator({
            destination: resolvedDestination,
            period,
            travelers,
            budget,
          }),
        )
      : buildWhatsAppLink(whatsappMessages.general);

  return (
    <section id="simulador" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Simulador de viagem"
            title="Monte uma prévia da sua viagem"
            description="Responda 4 perguntas rápidas e receba um resumo pra conversar com a gente. O valor final depende da disponibilidade real de aéreo e hospedagem no momento da compra."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-[28px] border border-navy-900/10 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,26,51,0.25)] sm:p-10">
            <div className="mb-8 flex items-center gap-2" aria-hidden="true">
              {steps.map((label, index) => (
                <div
                  key={label}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    index <= stepIndex ? "bg-turquoise-500" : "bg-navy-900/10"
                  }`}
                />
              ))}
            </div>

            <div aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {stepIndex === 0 && (
                    <fieldset>
                      <legend className="text-lg font-bold text-navy-950">Para onde você quer ir?</legend>
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {quickDestinations.map((name) => (
                          <button
                            key={name}
                            type="button"
                            onClick={() => setDestination(name)}
                            className={choiceButtonClasses(destination === name)}
                          >
                            {name}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setDestination("outro")}
                          className={choiceButtonClasses(destination === "outro")}
                        >
                          Outro destino
                        </button>
                      </div>
                      {destination === "outro" && (
                        <input
                          type="text"
                          value={customDestination}
                          onChange={(event) => setCustomDestination(event.target.value)}
                          placeholder="Digite o destino"
                          className="mt-4 w-full rounded-2xl border border-navy-900/15 px-4 py-3 text-navy-950 outline-none transition-colors focus:border-turquoise-500"
                        />
                      )}
                    </fieldset>
                  )}

                  {stepIndex === 1 && (
                    <div>
                      <label htmlFor="simulator-period" className="text-lg font-bold text-navy-950">
                        Quando pretende viajar?
                      </label>
                      <p className="mt-1 text-sm text-navy-900/60">
                        Uma ideia já ajuda, tipo &quot;julho de 2026&quot; ou &quot;próximas férias&quot;.
                      </p>
                      <input
                        id="simulator-period"
                        type="text"
                        value={period}
                        onChange={(event) => setPeriod(event.target.value)}
                        placeholder="Ex: julho de 2026"
                        className="mt-4 w-full rounded-2xl border border-navy-900/15 px-4 py-3 text-navy-950 outline-none transition-colors focus:border-turquoise-500"
                      />
                    </div>
                  )}

                  {stepIndex === 2 && (
                    <div>
                      <p className="text-lg font-bold text-navy-950">Quantas pessoas vão viajar?</p>
                      <div className="mt-5 flex items-center gap-6">
                        <button
                          type="button"
                          onClick={() => setTravelers((count) => Math.max(1, count - 1))}
                          aria-label="Diminuir número de viajantes"
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/15 text-xl font-semibold text-navy-950 transition-colors hover:border-turquoise-500"
                        >
                          −
                        </button>
                        <span className="min-w-12 text-center text-2xl font-bold text-navy-950">{travelers}</span>
                        <button
                          type="button"
                          onClick={() => setTravelers((count) => Math.min(20, count + 1))}
                          aria-label="Aumentar número de viajantes"
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/15 text-xl font-semibold text-navy-950 transition-colors hover:border-turquoise-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {stepIndex === 3 && (
                    <fieldset>
                      <legend className="text-lg font-bold text-navy-950">Investimento aproximado por pessoa</legend>
                      <div className="mt-5 flex flex-col gap-2.5">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setBudget(range)}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
                              budget === range
                                ? "border-turquoise-500 bg-turquoise-500/10 text-navy-950"
                                : "border-navy-900/15 text-navy-900/70 hover:border-navy-900/30"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {stepIndex === 4 && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="text-lg font-bold text-navy-950">Sua viagem simulada</p>
                        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                          <div>
                            <dt className="text-navy-900/50">Destino</dt>
                            <dd className="font-semibold text-navy-950">{resolvedDestination}</dd>
                          </div>
                          <div>
                            <dt className="text-navy-900/50">Período</dt>
                            <dd className="font-semibold text-navy-950">{period}</dd>
                          </div>
                          <div>
                            <dt className="text-navy-900/50">Viajantes</dt>
                            <dd className="font-semibold text-navy-950">{travelers}</dd>
                          </div>
                          <div>
                            <dt className="text-navy-900/50">Investimento</dt>
                            <dd className="font-semibold text-navy-950">{budget}</dd>
                          </div>
                        </dl>
                      </div>
                      <p className="rounded-2xl bg-navy-950/5 px-4 py-3 text-xs leading-relaxed text-navy-900/60">
                        Essa simulação é uma estimativa pra organizar sua ideia de viagem. Passagem aérea, hospedagem
                        e câmbio mudam de preço a todo momento — o valor real é confirmado com nossas operadoras
                        parceiras no momento da compra.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button href={whatsappHref} variant="primary" external>
                          Confirmar essa simulação no WhatsApp
                        </Button>
                        <button
                          type="button"
                          onClick={resetSimulator}
                          className="text-sm font-semibold text-navy-900/50 transition-colors hover:text-navy-900"
                        >
                          Refazer simulação
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {!isLastStep && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className={`text-sm font-semibold text-navy-900/50 transition-colors hover:text-navy-900 ${
                    stepIndex === 0 ? "invisible" : ""
                  }`}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canAdvance}
                  className="rounded-full bg-turquoise-500 px-7 py-3 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-turquoise-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <PartnerLogos />
      </div>
    </section>
  );
}
