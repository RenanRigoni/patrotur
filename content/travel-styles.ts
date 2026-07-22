import type { TravelCategory } from "@/content/destinations";

export interface TravelStyle {
  id: TravelCategory;
  label: string;
  headline: string;
  description: string;
  destinationSlug: string;
  whatsappIntent: string;
}

export const travelStyles: TravelStyle[] = [
  {
    id: "praia",
    label: "Praia",
    headline: "Sol, mar e nenhum compromisso além de aproveitar.",
    description: "Do litoral brasileiro às ilhas mais desejadas, a Patrotur ajuda a encontrar o tipo de praia que combina com o seu jeito de viajar.",
    destinationSlug: "fernando-de-noronha",
    whatsappIntent: "uma viagem de praia",
  },
  {
    id: "romance",
    label: "Romance",
    headline: "Aquela viagem a dois que fica na memória por anos.",
    description: "Cenários que pedem uma boa companhia e nenhuma pressa, planejados nos detalhes que fazem diferença.",
    destinationSlug: "gramado",
    whatsappIntent: "uma viagem romântica",
  },
  {
    id: "familia",
    label: "Família",
    headline: "Todo mundo junto, sem ninguém estressado com logística.",
    description: "Roteiros pensados para diferentes idades, com o conforto de saber que alguém está cuidando dos detalhes por vocês.",
    destinationSlug: "orlando",
    whatsappIntent: "uma viagem em família",
  },
  {
    id: "aventura",
    label: "Aventura",
    headline: "Se a viagem não te tira um pouco da zona de conforto, não é a mesma coisa.",
    description: "Trilhas, natureza e experiências que valem a história, com a segurança de um planejamento bem-feito.",
    destinationSlug: "jericoacoara",
    whatsappIntent: "uma viagem de aventura",
  },
  {
    id: "cultura",
    label: "Cultura",
    headline: "Viajar para entender um lugar, não só para ver.",
    description: "História, gastronomia e gente de verdade: o tipo de viagem que muda a forma como você enxerga o mundo.",
    destinationSlug: "salvador",
    whatsappIntent: "uma viagem cultural",
  },
  {
    id: "internacional",
    label: "Internacional",
    headline: "O mundo é maior do que parece daqui de Patrocínio.",
    description: "Passagem, documentação, roteiro: a parte complicada de viajar para fora, resolvida por quem já fez isso antes.",
    destinationSlug: "roma",
    whatsappIntent: "uma viagem internacional",
  },
  {
    id: "cruzeiro",
    label: "Cruzeiro",
    headline: "Um destino diferente a cada manhã, sem desfazer a mala.",
    description: "Uma forma de conhecer vários lugares em uma única viagem, com todo o suporte de planejamento que ela exige.",
    destinationSlug: "fernando-de-noronha",
    whatsappIntent: "um cruzeiro",
  },
  {
    id: "descanso",
    label: "Descanso",
    headline: "Às vezes a melhor viagem é a que não tem roteiro nenhum.",
    description: "Lugares e ritmos pensados para desacelerar de verdade, sem notificação, sem pressa, sem culpa.",
    destinationSlug: "lisboa",
    whatsappIntent: "uma viagem de descanso",
  },
];
