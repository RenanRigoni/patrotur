import Image from "next/image";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 py-12 text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Image
            src="/images/PATROTUR_HOR_WHITE.png"
            alt="Patrotur Turismo"
            width={1393}
            height={371}
            loading="lazy"
            className="h-7 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            <span className="block whitespace-nowrap">Agência de viagens em Patrocínio/MG.</span>
            <span className="block">
              Roteiros nacionais e internacionais planejados de forma pessoal.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-white/80">Contato</span>
          <a href={`https://wa.me/${site.phones.whatsapp.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {site.phones.whatsappDisplay}
          </a>
          <a href={`tel:${site.phones.landline.replace(/\D/g, "")}`} className="hover:text-white">
            {site.phones.landline}
          </a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {site.instagram.handle}
          </a>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-white/80">Endereço</span>
          <span>{site.address.street}</span>
          <span>
            {site.address.neighborhood}, {site.address.city}/{site.address.state}
          </span>
          <span>CEP {site.address.zip}</span>
        </div>

        <div className="flex flex-col gap-1 text-xs text-white/65">
          <span>{site.legalName}</span>
          <span>CNPJ {site.cnpj}</span>
        </div>
      </div>

      <p className="mt-10 px-6 text-xs text-white/65 sm:px-8">
        © {new Date().getFullYear()} {site.brandName}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
