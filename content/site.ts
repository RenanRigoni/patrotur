export const site = {
  brandName: "Patrotur Turismo",
  legalName: "LFS Viagens e Turismo LTDA",
  cnpj: "23.828.435/0001-24",
  foundedAt: "2015-12-11",
  address: {
    street: "Rua Coronel João Cândido de Aguiar, 185",
    neighborhood: "Centro",
    city: "Patrocínio",
    state: "MG",
    zip: "38740-050",
    country: "BR",
  },
  phones: {
    whatsapp: "+5534988554574",
    whatsappDisplay: "(34) 9 8855-4574",
    landline: "(34) 3831-1192",
  },
  instagram: {
    handle: "@patrotur_turismo",
    url: "https://www.instagram.com/patrotur_turismo/",
  },
  whatsappBaseUrl: "https://wa.me/5534988554574",
} as const;

export const foundedYear = new Date(site.foundedAt).getFullYear();
export const yearsInBusiness = new Date().getFullYear() - foundedYear;
