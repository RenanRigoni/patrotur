export interface Partner {
  name: string;
  logoSrc: string;
  width: number;
  height: number;
  /** "dark" = artwork is light/white and needs a dark chip background to read. */
  variant?: "light" | "dark";
}

// Parcerias reais confirmadas pelo cliente. Logos baixados dos sites oficiais
// de cada operadora (jul/2026) — trocar pelo arquivo definitivo do cliente se
// ele enviar uma versão própria depois.
export const partners: Partner[] = [
  { name: "CVC", logoSrc: "/images/partners/cvc.png", width: 200, height: 182 },
  { name: "Azul Viagens", logoSrc: "/images/partners/azul-viagens.png", width: 127, height: 71 },
  {
    name: "Orinter Tour & Travel",
    logoSrc: "/images/partners/orinter.png",
    width: 700,
    height: 150,
    variant: "dark",
  },
  { name: "Agaxtur", logoSrc: "/images/partners/agaxtur.png", width: 513, height: 146 },
  { name: "EHTL Viagens", logoSrc: "/images/partners/ehtl.png", width: 150, height: 90 },
  {
    name: "Trend Operadora",
    logoSrc: "/images/partners/trend.png",
    width: 919,
    height: 359,
    variant: "dark",
  },
  {
    name: "BRT Operadora",
    logoSrc: "/images/partners/brt.png",
    width: 1794,
    height: 294,
    variant: "dark",
  },
  {
    name: "Diversa Turismo",
    logoSrc: "/images/partners/diversa-turismo.png",
    width: 809,
    height: 270,
    variant: "dark",
  },
  {
    name: "Queensberry",
    logoSrc: "/images/partners/queensberry.png",
    width: 200,
    height: 50,
    variant: "dark",
  },
  {
    name: "Teresa Perez",
    logoSrc: "/images/partners/teresa-perez.svg",
    width: 248,
    height: 44,
    variant: "dark",
  },
];
