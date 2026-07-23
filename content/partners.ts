export interface Partner {
  name: string;
  logoSrc?: string;
}

// Provisório: nomes reais e logos oficiais chegam do cliente (parcerias
// confirmadas, ex.: CVC e Azul). Preencher logoSrc conforme os arquivos
// forem enviados — até lá renderiza o nome como placeholder.
export const partners: Partner[] = [
  { name: "CVC" },
  { name: "Azul" },
  { name: "Operadora parceira 03" },
  { name: "Operadora parceira 04" },
  { name: "Operadora parceira 05" },
  { name: "Operadora parceira 06" },
  { name: "Operadora parceira 07" },
  { name: "Operadora parceira 08" },
  { name: "Operadora parceira 09" },
  { name: "Operadora parceira 10" },
];
