import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/trust/TrustBar";
import { DestinationDiscovery } from "@/components/destinations/DestinationDiscovery";
import { TravelStyleQuiz } from "@/components/quiz/TravelStyleQuiz";
import { ServicesJourney } from "@/components/services/ServicesJourney";
import { WhyPatrotur } from "@/components/why/WhyPatrotur";
import { RouteTimeline } from "@/components/how-it-works/RouteTimeline";
import { HumanConnection } from "@/components/human/HumanConnection";
import { InstagramReference } from "@/components/social/InstagramReference";
import { LocalAgency } from "@/components/local/LocalAgency";
import { Faq } from "@/components/faq/Faq";
import { FinalCta } from "@/components/cta/FinalCta";
import { Footer } from "@/components/footer/Footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp/WhatsAppFloatingButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo-principal">
        <Hero />
        <TrustBar />
        <DestinationDiscovery />
        <TravelStyleQuiz />
        <ServicesJourney />
        <WhyPatrotur />
        <RouteTimeline />
        <HumanConnection />
        <InstagramReference />
        <LocalAgency />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
