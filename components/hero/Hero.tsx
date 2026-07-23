"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RouteMotif } from "@/components/ui/RouteMotif";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) videoRef.current?.pause();
  }, []);

  return (
    <section id="topo" className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/images/hero-video.mp4"
          poster="/images/hero-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-20 pt-24 sm:px-8 sm:pb-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-accent text-4xl text-turquoise-300 sm:text-5xl"
        >
          Viajar é viver.
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-[20ch] text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:max-w-[18ch] md:text-6xl lg:text-7xl"
        >
          Seu próximo destino ainda não tem data. Só precisa de um começo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          A Patrotur transforma vontade de viajar em roteiro real, com gente de
          Patrocínio cuidando de cada detalhe, do sonho até a mala pronta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col items-start gap-5 sm:flex-row sm:items-center"
        >
          <Button href={buildWhatsAppLink(whatsappMessages.heroPrimary)} variant="primary" external>
            Planejar minha próxima viagem
          </Button>
          <a
            href={buildWhatsAppLink(whatsappMessages.heroSecondary)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white/80 underline decoration-white/30 decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400"
          >
            Falar com a Patrotur
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 right-6 z-10 hidden sm:right-8 lg:block"
        aria-hidden="true"
      >
        <RouteMotif variant="hero" className="h-16 w-40 text-turquoise-300/70" />
      </motion.div>
    </section>
  );
}
