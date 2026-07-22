"use client";

import {
  useRef,
  useEffect,
  useCallback,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Destination } from "@/content/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";

interface DestinationCarouselProps {
  destinations: Destination[];
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Trilho triplicado (anterior/atual/próximo) para permitir loop infinito:
// sempre que o scroll sai da cópia do meio, reposiciona sem animação para
// a mesma posição relativa na cópia do meio, criando a ilusão de sequência contínua.
const REPEAT = 3;

export function DestinationCarousel({ destinations }: DestinationCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
  });
  const suppressNextClick = useRef(false);

  // originalIndex fica preservado em cada cópia para o ritmo de offset (par/ímpar)
  // não desalinhar visualmente quando o loop reposiciona entre cópias.
  const loopedItems = Array.from({ length: REPEAT }, (_, setIndex) =>
    destinations.map((destination, originalIndex) => ({
      ...destination,
      loopKey: `${destination.slug}-${setIndex}`,
      originalIndex,
    }))
  ).flat();

  const getSetWidth = useCallback(() => {
    const el = trackRef.current;
    return el ? el.scrollWidth / REPEAT : 0;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = getSetWidth();
  }, [getSetWidth]);

  // Só corrige a posição depois que o scroll REALMENTE parar (debounce).
  // Corrigir durante uma animação suave em andamento (clique nas setas) cancela
  // essa animação no meio do caminho, travando o carrossel sempre perto da borda.
  const handleScroll = useCallback(() => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const el = trackRef.current;
      if (!el) return;
      const setWidth = getSetWidth();
      if (setWidth === 0) return;

      if (el.scrollLeft < setWidth * 0.5) {
        el.scrollLeft += setWidth;
      } else if (el.scrollLeft > setWidth * 1.5) {
        el.scrollLeft -= setWidth;
      }
    }, 120);
  }, [getSetWidth]);

  useEffect(() => {
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: step * (direction === "left" ? -1 : 1), behavior: "smooth" });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };
    suppressNextClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (state.pointerId !== event.pointerId) return;

    const distance = state.startX - event.clientX;
    if (Math.abs(distance) > 4) suppressNextClick.current = true;
    if (!suppressNextClick.current) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = state.startScrollLeft + distance;
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current.pointerId = -1;

    if (suppressNextClick.current) {
      window.setTimeout(() => {
        suppressNextClick.current = false;
      }, 0);
    }
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressNextClick.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressNextClick.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
        role="region"
        aria-label="Destinos em destaque"
        className="flex cursor-grab select-none gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] snap-x snap-mandatory active:cursor-grabbing sm:px-8 sm:pb-6 [&::-webkit-scrollbar]:hidden [scroll-padding-left:24px] sm:[scroll-padding-left:32px]"
      >
        {loopedItems.map((destination) => (
          <DestinationCard
            key={destination.loopKey}
            destination={destination}
            offset={destination.originalIndex % 2 === 1}
          />
        ))}
      </div>

      <div
        data-carousel-edge
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-paper to-transparent sm:block"
      />
      <div
        data-carousel-edge
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-paper to-transparent sm:block"
      />

      <button
        type="button"
        onClick={() => scrollByCard("left")}
        aria-label="Ver destino anterior"
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/15 bg-paper text-navy-950 shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400 sm:flex"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard("right")}
        aria-label="Ver próximo destino"
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/15 bg-paper text-navy-950 shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-400 sm:flex"
      >
        <ChevronIcon direction="right" />
      </button>

      <div
        data-carousel-drag-hint
        aria-hidden="true"
        className="pointer-events-none mt-1 flex items-center justify-center gap-2 px-6 text-xs font-semibold tracking-[0.04em] text-navy-900/55 sm:hidden"
      >
        <svg
          viewBox="0 0 32 16"
          className="h-4 w-8 text-turquoise-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4 2 8l4 4M2 8h28M26 4l4 4-4 4" />
        </svg>
        <span>Arraste para ver mais destinos</span>
      </div>
    </div>
  );
}
