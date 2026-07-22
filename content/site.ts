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
  timeZone: "America/Sao_Paulo",
} as const;

export function getCompletedYears(
  foundedAt: string,
  currentDate = new Date(),
  timeZone = site.timeZone,
) {
  const [startYear, startMonth, startDay] = foundedAt.split("-").map(Number);
  const currentDateParts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(currentDate);
  const readDatePart = (type: "year" | "month" | "day") =>
    Number(currentDateParts.find((part) => part.type === type)?.value);
  const currentYear = readDatePart("year");
  const currentMonth = readDatePart("month");
  const currentDay = readDatePart("day");
  const anniversaryHasPassed =
    currentMonth > startMonth || (currentMonth === startMonth && currentDay >= startDay);

  return currentYear - startYear - (anniversaryHasPassed ? 0 : 1);
}

export const foundedYear = Number(site.foundedAt.slice(0, 4));
export const yearsInBusiness = getCompletedYears(site.foundedAt);
