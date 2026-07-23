export const whatsappMessages = {
  general: "Olá! Conheci a Patrotur pelo site e gostaria de planejar minha próxima viagem.",
  heroPrimary: "Olá! Vi o site da Patrotur e quero planejar minha próxima viagem.",
  heroSecondary: "Olá! Gostaria de falar com a Patrotur sobre uma viagem.",
  finalCta: "Olá! Cheguei até aqui pelo site da Patrotur e quero contar para onde eu sonho ir.",
  destination: (destinationName: string) =>
    `Olá! Vi o destino ${destinationName} no site da Patrotur e gostaria de saber quais possibilidades vocês têm.`,
  travelStyle: (intent: string) =>
    `Olá! Gostaria de planejar ${intent} com a Patrotur.`,
  simulator: (details: { destinations: string[]; period: string; travelers: number; budget: string }) =>
    `Olá! Fiz uma simulação de viagem no site da Patrotur:\n\n` +
    `📍 Destino(s): ${details.destinations.join(", ")}\n` +
    `🗓️ Período: ${details.period}\n` +
    `👥 Viajantes: ${details.travelers}\n` +
    `💰 Investimento por pessoa: ${details.budget}\n\n` +
    `Gostaria de saber as opções reais disponíveis com vocês.`,
} as const;
