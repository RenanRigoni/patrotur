const defaultSiteUrl = "https://www.patroturturismo.com.br";

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl || defaultSiteUrl;

  return `${siteUrl.replace(/\/+$/, "")}/`;
}
