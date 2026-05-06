import { useState, useEffect } from "react";
import { ServiceCard } from "../components/ServiceCard";
import ServiceDetailPage from "./ServiceDetailPage";
import { Footer } from "../components/Footer";
import imgImage2 from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgImage4 from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";
import imgImage5 from "figma:asset/7e4894246ac213d40d8e6723e9a93bfd063f70d5.png";
import imgImage6 from "figma:asset/75b3c58e1d7ca3dcdad92a5df6536325e03f9adb.png";
import imgImage7 from "figma:asset/b9b24634fb07428e2dc20f8097db4e9fc28da1a8.png";
import imgImage8 from "figma:asset/fe902db78ebf8b551b1b2dc46c5994abab490075.png";
import imgImage9 from "figma:asset/b757b27974630ff853f231ffb96e907b1257534b.png";
import imgImage10 from "figma:asset/602dabd0db506d59f8b824f328d43843335f7ec5.png";

interface Service {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

const services: Service[] = [
  {
    id: "skogsbruksplan",
    title: "Skogsbruksplan",
    description: "Få en tydlig överblick över din skogsfastighet. En uppdaterad skogsbruksplan hjälper dig att planera åtgärder, öka värdet och bruka skogen hållbart.",
    buttonText: "Läs mer om skogsbruksplan",
    imageUrl: imgImage2
  },
  {
    id: "rojning",
    title: "Röjning",
    description: "Behöver din skog röjas eller planteras? Vi hjälper dig att hålla skogen i gott skick genom professionella skogsvårdsåtgärder.",
    buttonText: "Läs mer om röjning",
    imageUrl: "https://images.unsplash.com/photo-1661241111784-b5575f2a140f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0aGlubmluZyUyMGNsZWFyaW5nfGVufDF8fHx8MTc2NDE1MTQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "radgivning",
    title: "Rådgivning och planering",
    description: "Här hittar du kontaktuppgifter till din virkesköpare och skogliga rådgivare – dina viktigaste kontakter för att utveckla din fastighet.",
    buttonText: "Kontakta din rådgivare",
    imageUrl: "https://images.unsplash.com/photo-1644754260085-e9e85988299a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3RyeSUyMGNvbnN1bHRpbmclMjBhZHZpY2V8ZW58MXx8fHwxNzY0MTUxNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "plantering",
    title: "Plantering",
    description: "Efter föryngringsavverkning planterar vi nya träd, oftast gran eller tall beroende på markens förutsättningar. En bra etablering ger framtidsskogen en stark start och skapar långsiktiga värden på fastigheten.",
    buttonText: "Läs mer om plantering",
    imageUrl: imgImage6
  },
  {
    id: "foryngringsavverkning",
    title: "Föryngringsavverkning",
    description: "När skogen har nått sin mognad är det dags för föryngringsavverkning. Vi avverkar det gamla beståndet och skapar förutsättningar för en ny, livskraftig skog att växa upp.",
    buttonText: "Läs mer om föryngringsavverkning",
    imageUrl: imgImage7
  },
  {
    id: "skogsbilvagar",
    title: "Skogsbilvägar",
    description: "Här hittar du kontaktuppgifter till din virkesköpare och skogliga rådgivare – dina viktigaste kontakter för att utveckla din fastighet.",
    buttonText: "Läs mer om skogsbilvägar",
    imageUrl: "https://images.unsplash.com/photo-1763516764137-1ad49f36ad77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjByb2FkJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NDE1MTQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "leveransvirke",
    title: "Leveransvirke",
    description: "Vill du själv hugga men ha hjälp med resten? Vi köper ditt leveransvirke, sköter transporten till industrin och ser till att du får korrekt mätning och ersättning.",
    buttonText: "Läs mer om leveransvirke",
    imageUrl: imgImage9
  },
  {
    id: "gallring",
    title: "Gallring",
    description: "Gallring innebär att vi tar bort vissa träd i ett växande bestånd för att gynna resterande träd. Det ger mer ljus, näring och tillväxt för de kvarvarande träden och höjer framtida avverkningsvärde.",
    buttonText: "Läs mer om gallring",
    imageUrl: imgImage10
  }
];

export default function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenService = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSelectedServiceId(customEvent.detail);
    };

    window.addEventListener('openService', handleOpenService);
    return () => {
      window.removeEventListener('openService', handleOpenService);
    };
  }, []);

  if (selectedServiceId) {
    return (
      <ServiceDetailPage 
        serviceId={selectedServiceId} 
        onBack={() => setSelectedServiceId(null)} 
      />
    );
  }

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1800px] mx-auto">
          {/* Page Title */}
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[#021c20] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Skogliga tjänster
          </p>

          {/* Services Grid - Mobile: 1 column, Desktop: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] w-full">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                buttonText={service.buttonText}
                imageUrl={service.imageUrl}
                onClick={() => setSelectedServiceId(service.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}