export const whatsappMessages = {
  general: "Olá! Conheci a Patrotur pelo site e gostaria de planejar minha próxima viagem.",
  heroPrimary: "Olá! Vi o site da Patrotur e quero planejar minha próxima viagem.",
  heroSecondary: "Olá! Gostaria de falar com a Patrotur sobre uma viagem.",
  finalCta: "Olá! Cheguei até aqui pelo site da Patrotur e quero contar para onde eu sonho ir.",
  destination: (destinationName: string) =>
    `Olá! Vi o destino ${destinationName} no site da Patrotur e gostaria de saber quais possibilidades vocês têm.`,
  travelStyle: (intent: string) =>
    `Olá! Gostaria de planejar ${intent} com a Patrotur.`,
} as const;
