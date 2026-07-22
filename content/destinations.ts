export type TravelCategory =
  | "praia"
  | "romance"
  | "familia"
  | "aventura"
  | "cultura"
  | "internacional"
  | "cruzeiro"
  | "descanso";

export interface Destination {
  slug: string;
  name: string;
  region: string;
  image: string;
  categories: TravelCategory[];
  teaser: string;
  coordinates: { lat: number; lng: number };
}

export const destinations: Destination[] = [
  {
    slug: "fernando-de-noronha",
    name: "Fernando de Noronha",
    region: "Pernambuco, Brasil",
    image: "/images/destinations/fernando-de-noronha.jpg",
    categories: ["praia", "aventura", "descanso"],
    teaser: "Águas de um azul que parece editado, mas é real.",
    coordinates: { lat: -3.85, lng: -32.42 },
  },
  {
    slug: "gramado",
    name: "Gramado",
    region: "Rio Grande do Sul, Brasil",
    image: "/images/destinations/gramado.jpg",
    categories: ["romance", "descanso", "familia"],
    teaser: "Serra, lareira e aquele clima de filme europeu no Brasil.",
    coordinates: { lat: -29.37, lng: -50.87 },
  },
  {
    slug: "salvador",
    name: "Salvador",
    region: "Bahia, Brasil",
    image: "/images/destinations/salvador.jpg",
    categories: ["cultura", "praia"],
    teaser: "História, música e mar no mesmo quarteirão.",
    coordinates: { lat: -12.97, lng: -38.5 },
  },
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    region: "Rio de Janeiro, Brasil",
    image: "/images/destinations/rio-de-janeiro.jpg",
    categories: ["cultura", "aventura"],
    teaser: "Montanha, mar e cidade se misturando o tempo todo.",
    coordinates: { lat: -22.91, lng: -43.17 },
  },
  {
    slug: "roma",
    name: "Roma",
    region: "Itália",
    image: "/images/destinations/roma.jpg",
    categories: ["internacional", "cultura", "romance"],
    teaser: "Toda esquina parece ter dois mil anos de história.",
    coordinates: { lat: 41.9, lng: 12.5 },
  },
  {
    slug: "lisboa",
    name: "Lisboa",
    region: "Portugal",
    image: "/images/destinations/lisboa.jpg",
    categories: ["internacional", "cultura", "descanso"],
    teaser: "Ladeiras, luz dourada e um jeito de viver mais devagar.",
    coordinates: { lat: 38.72, lng: -9.14 },
  },
  {
    slug: "jericoacoara",
    name: "Jericoacoara",
    region: "Ceará, Brasil",
    image: "/images/destinations/jericoacoara.jpg",
    categories: ["praia", "aventura", "descanso"],
    teaser: "Dunas, vento e um pôr do sol que vira ritual todo dia.",
    coordinates: { lat: -2.8, lng: -40.51 },
  },
  {
    slug: "maceio",
    name: "Maceió",
    region: "Alagoas, Brasil",
    image: "/images/destinations/maceio.jpg",
    categories: ["praia", "familia"],
    teaser: "Piscinas naturais que parecem uma piscina de resort, só que naturais.",
    coordinates: { lat: -9.67, lng: -35.74 },
  },
  {
    slug: "lencois-maranhenses",
    name: "Lençóis Maranhenses",
    region: "Maranhão, Brasil",
    image: "/images/destinations/lencois-maranhenses.jpg",
    categories: ["aventura", "descanso"],
    teaser: "Dunas brancas com lagoas azuis no meio, um deserto que não é deserto.",
    coordinates: { lat: -2.51, lng: -43.12 },
  },
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    region: "Peru",
    image: "/images/destinations/machu-picchu.jpg",
    categories: ["internacional", "aventura", "cultura"],
    teaser: "Uma cidade inteira escondida no topo da montanha.",
    coordinates: { lat: -13.16, lng: -72.55 },
  },
  {
    slug: "orlando",
    name: "Orlando",
    region: "Estados Unidos",
    image: "/images/destinations/orlando.jpg",
    categories: ["familia", "internacional"],
    teaser: "Parques temáticos feitos pra família inteira virar criança de novo.",
    coordinates: { lat: 28.39, lng: -81.56 },
  },
];
