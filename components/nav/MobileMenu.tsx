"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

interface MobileMenuProps {
  isScrolled: boolean;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isScrolled, links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Trava o scroll do body enquanto o menu está aberto. Sem isso, a página
  // de fundo continua rolando atrás do overlay fixo (glitch ao arrastar) e
  // o toque no hambúrguer some às vezes por coincidir com o momentum-scroll.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-turquoise-400 ${
          isOpen ? "bg-navy-950" : isScrolled ? "bg-navy-900/10" : "bg-white/15"
        }`}
      >
        <span
          className={`h-0.5 w-5 rounded-full transition-all ${
            isOpen ? "translate-y-2 rotate-45 bg-white" : isScrolled ? "bg-navy-950" : "bg-white"
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full transition-all ${
            isOpen ? "opacity-0" : isScrolled ? "bg-navy-950" : "bg-white"
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full transition-all ${
            isOpen ? "-translate-y-2 -rotate-45 bg-white" : isScrolled ? "bg-navy-950" : "bg-white"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-8 bg-navy-950 px-8"
          >
            <Image
              src="/images/PATROTUR_HOR_WHITE.png"
              alt="Patrotur Turismo"
              width={1393}
              height={371}
              className="absolute left-8 top-6 h-6 w-auto"
            />
            <ul className="flex flex-col gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={buildWhatsAppLink(whatsappMessages.heroSecondary)}
              variant="primary"
              external
              className="w-fit"
            >
              Falar com a Patrotur
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
