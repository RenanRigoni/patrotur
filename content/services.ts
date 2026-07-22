export interface ServiceStage {
  step: string;
  title: string;
  description: string;
}

export const serviceStages: ServiceStage[] = [
  {
    step: "01",
    title: "Passagem e hospedagem",
    description: "Aéreo e acomodação escolhidos de acordo com o seu roteiro, não o contrário.",
  },
  {
    step: "02",
    title: "Excursões e cruzeiros",
    description: "Experiências guiadas e roteiros marítimos para quem quer ir além do óbvio.",
  },
  {
    step: "03",
    title: "Nacional e internacional",
    description: "Do Brasil ao resto do mundo, com a documentação e os detalhes resolvidos.",
  },
  {
    step: "04",
    title: "Roteiro sob medida",
    description: "Quando nenhum pacote pronto encaixa, a viagem é montada do zero com você.",
  },
];
