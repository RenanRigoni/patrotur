"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { whatsappMessages } from "@/content/whatsapp-messages";

const links = [
  { href: "#destinos", label: "Destinos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#agencia", label: "Agência" },
  { href: "#faq", label: "Perguntas" },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_rgba(11,26,51,0.08)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="#topo" className="shrink-0">
          <Image
            src={isScrolled ? "/images/PATROTUR_HOR.png" : "/images/PATROTUR_HOR_WHITE.png"}
            alt="Patrotur Turismo"
            width={1394}
            height={371}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-navy-900/80 hover:text-navy-950" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            href={buildWhatsAppLink(whatsappMessages.heroSecondary)}
            variant={isScrolled ? "ghost" : "secondary"}
            external
            className="!py-2.5 !px-5 text-xs"
          >
            Falar com a Patrotur
          </Button>
        </div>

        <MobileMenu isScrolled={isScrolled} links={links} />
      </nav>
    </header>
  );
}
