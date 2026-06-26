import { ArrowLeft } from "lucide-react";
import imgImage2 from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgImage4 from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";
import imgImage5 from "figma:asset/7e4894246ac213d40d8e6723e9a93bfd063f70d5.png";
import imgImage6 from "figma:asset/75b3c58e1d7ca3dcdad92a5df6536325e03f9adb.png";
import imgImage7 from "figma:asset/b9b24634fb07428e2dc20f8097db4e9fc28da1a8.png";
import imgImage8 from "figma:asset/fe902db78ebf8b551b1b2dc46c5994abab490075.png";
import imgImage9 from "figma:asset/b757b27974630ff853f231ffb96e907b1257534b.png";
import imgImage10 from "figma:asset/602dabd0db506d59f8b824f328d43843335f7ec5.png";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  benefits: string[];
  process: string[];
  contactInfo?: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
}

const serviceDetails: Record<string, ServiceDetail> = {
  skogsbruksplan: {
    id: "skogsbruksplan",
    title: "Skogsbruksplan",
    description: "Få en tydlig överblick över din skogsfastighet",
    longDescription: "En uppdaterad skogsbruksplan är grunden för ett lönsamt och hållbart skogsbruk. Den ger dig en komplett bild av din skogs potential och hjälper dig att planera för framtiden. Med en väl genomarbetad plan kan du maximera värdet på din skog samtidigt som du bryr dig om miljön.",
    imageUrl: imgImage2,
    benefits: [
      "Detaljerad inventering av alla skogsbestånd",
      "Rekommendationer för optimala åtgärder",
      "Ekonomiska beräkningar och prognoser",
      "Miljö- och naturvårdshänsyn",
      "Digital tillgång via Min Skog"
    ],
    process: [
      "Kontakta oss för offert",
      "Vi bokar in fältinventering",
      "Inventeringen genomförs av certifierad skogskonsulent",
      "Planen sammanställs och kvalitetsgranskas",
      "Du får din färdiga plan digitalt och i tryck"
    ],
    contactInfo: {
      name: "Daniel Larsson",
      role: "Skogskonsulent",
      email: "daniel.larsson@holmen.com",
      phone: "070-123 45 67"
    }
  },
  rojning: {
    id: "rojning",
    title: "Röjning",
    description: "Professionell skogsvård för optimal tillväxt",
    longDescription: "Röjning är en viktig åtgärd i den unga skogen. Genom att ta bort konkurrerande träd ger vi de bästa träden mer utrymme, ljus och näring. Detta leder till snabbare tillväxt och högre framtida värde på skogen.",
    imageUrl: imgImage4,
    benefits: [
      "Ökad tillväxt på de bästa träden",
      "Friskare och mer värdefull skog",
      "Minskad risk för skador och sjukdomar",
      "Bättre förutsättningar för gallring",
      "Professionella röjare med certifiering"
    ],
    process: [
      "Vi inventerar området tillsammans",
      "Du får en offert baserad på areal och svårighetsgrad",
      "Vid godkännande planeras röjningsarbetet in",
      "Erfarna röjare utför arbetet enligt din skogsbruksplan",
      "Slutbesiktning och dokumentation"
    ],
    contactInfo: {
      name: "Maria Andersson",
      role: "Skogsvårdsansvarig",
      email: "maria.andersson@holmen.com",
      phone: "070-234 56 78"
    }
  },
  radgivning: {
    id: "radgivning",
    title: "Rådgivning och planering",
    description: "Experthjälp för ditt skogsbruk",
    longDescription: "Våra erfarna skogskonsulenter finns här för att hjälpa dig utveckla din fastighet. Oavsett om du funderar på avverkning, skogsvård eller långsiktig planering kan vi ge dig råd baserat på många års erfarenhet och lokal kunskap.",
    imageUrl: imgImage5,
    benefits: [
      "Personlig kontakt med din lokala rådgivare",
      "Oberoende och kompetent rådgivning",
      "Hjälp med beslutsunderlag",
      "Stöd med ansökningar och tillstånd",
      "Kontinuerlig uppföljning"
    ],
    process: [
      "Boka ett kostnadsfritt första möte",
      "Vi besöker din fastighet",
      "Diskussion om dina mål och förutsättningar",
      "Förslag på åtgärdsplan",
      "Löpande stöd vid genomförande"
    ],
    contactInfo: {
      name: "Erik Bergström",
      role: "Skogskonsulent",
      email: "erik.bergstrom@holmen.com",
      phone: "070-345 67 89"
    }
  },
  plantering: {
    id: "plantering",
    title: "Plantering",
    description: "Etablering av framtidens skog",
    longDescription: "Efter föryngringsavverkning planterar vi nya träd för att säkerställa att din skog fortsätter att växa och utvecklas. Vi använder högkvalitativa plantor och beprövade metoder för bästa möjliga etablering.",
    imageUrl: imgImage6,
    benefits: [
      "Certifierade plantor från etablerade plantskolor",
      "Rätt trädslag för din mark",
      "Professionella plantörer",
      "Garanti för plantresultat",
      "Uppföljning efter etablering"
    ],
    process: [
      "Markberedning för optimal plantetablering",
      "Beställning av plantor anpassade för området",
      "Plantering vid optimal tidpunkt",
      "Markering och dokumentation",
      "Återbesök för resultatuppföljning"
    ],
    contactInfo: {
      name: "Anna Lundqvist",
      role: "Föryngringsansvarig",
      email: "anna.lundqvist@holmen.com",
      phone: "070-456 78 90"
    }
  },
  foryngringsavverkning: {
    id: "foryngringsavverkning",
    title: "Föryngringsavverkning",
    description: "Från gammal till ny skog",
    longDescription: "När din skog nått sin mognad är det dags för föryngringsavverkning. Detta ger både ekonomisk avkastning och skapar förutsättningar för en ny generation skog. Vi hanterar hela processen från planering till utförande.",
    imageUrl: imgImage7,
    benefits: [
      "Maximalt ekonomiskt utbyte",
      "Miljöanpassad avverkning",
      "Kvalitetssäkrad virkesmätning",
      "Snabb betalning",
      "Komplett service från A till Ö"
    ],
    process: [
      "Virkesbesiktning och värdering",
      "Offert och avtal",
      "Planering av avverkning",
      "Professionell avverkning med modern teknik",
      "Virkesmätning och betalning"
    ],
    contactInfo: {
      name: "Daniel Larsson",
      role: "Virkesköpare",
      email: "daniel.larsson@holmen.com",
      phone: "070-123 45 67"
    }
  },
  skogsbilvagar: {
    id: "skogsbilvagar",
    title: "Skogsbilvägar",
    description: "Infrastruktur för tillgänglig skog",
    longDescription: "Väl fungerande skogsbilvägar är avgörande för ett effektivt skogsbruk. Vi hjälper dig med planering, projektering och byggande av nya vägar samt underhåll av befintligt vägnät.",
    imageUrl: imgImage8,
    benefits: [
      "Ökad tillgänglighet till skogen",
      "Lägre avverkningskostnader",
      "Bättre virkeskvalitet tack vare snabbare transport",
      "Miljöanpassad vägbyggnation",
      "Professionell projektering"
    ],
    process: [
      "Kartläggning av behov",
      "Projektering och tillståndsansökan",
      "Offert för vägbyggnation",
      "Byggande med certifierade entreprenörer",
      "Slutbesiktning och dokumentation"
    ],
    contactInfo: {
      name: "Per Svensson",
      role: "Vägansvarig",
      email: "per.svensson@holmen.com",
      phone: "070-567 89 01"
    }
  },
  leveransvirke: {
    id: "leveransvirke",
    title: "Leveransvirke",
    description: "Vi köper ditt självhuggna virke",
    longDescription: "Vill du själv avverka men få hjälp med resten? Vi köper ditt leveransvirke, hanterar transport till industrin och säkerställer att du får korrekt mätning och rättvist pris.",
    imageUrl: imgImage9,
    benefits: [
      "Flexibelt för dig som vill hugga själv",
      "Vi sköter all logistik",
      "Certifierad virkesmätning",
      "Konkurrenskraftiga priser",
      "Snabb och säker betalning"
    ],
    process: [
      "Kontakta oss för avtal",
      "Du avverkar enligt överenskommelse",
      "Vi hämtar virket vid väg",
      "Mätning vid industri",
      "Betalning enligt avtal"
    ],
    contactInfo: {
      name: "Johan Nilsson",
      role: "Leveransvirke-ansvarig",
      email: "johan.nilsson@holmen.com",
      phone: "070-678 90 12"
    }
  },
  gallring: {
    id: "gallring",
    title: "Gallring",
    description: "Värdetillväxt i växande skog",
    longDescription: "Gallring innebär att vi tar bort vissa träd i ett växande bestånd. Detta ger kvarvarande träd mer utrymme, ljus och näring vilket resulterar i snabbare diameter-tillväxt och högre framtida värde.",
    imageUrl: imgImage10,
    benefits: [
      "Ökad tillväxt på kvarlämnade träd",
      "Tidigare intäkt från skogen",
      "Förbättrad skogshälsa",
      "Minskad konkurrans",
      "Ekonomisk avkastning under omloppstiden"
    ],
    process: [
      "Gallringsbehovsinventering",
      "Offert baserat på areal och volym",
      "Planering av gallring",
      "Avverkning med certifierad maskinlag",
      "Slutbesiktning"
    ],
    contactInfo: {
      name: "Lisa Karlsson",
      role: "Gallringsansvarig",
      email: "lisa.karlsson@holmen.com",
      phone: "070-789 01 23"
    }
  }
};

interface ServiceDetailPageProps {
  serviceId: string;
  onBack: () => void;
}

export default function ServiceDetailPage({ serviceId, onBack }: ServiceDetailPageProps) {
  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full">
          <p>Tjänst hittades inte</p>
          <button onClick={onBack} className="text-[#1e3856]">
            Tillbaka
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0">
      <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1200px] mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#1e3856] hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="size-5" />
          <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px]">
            Tillbaka till tjänster
          </span>
        </button>

        {/* Hero Image */}
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden border border-[#e4e4e4]">
          <img 
            src={service.imageUrl} 
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="font-['IBM_Plex_Sans',sans-serif] text-[32px] md:text-[40px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {service.title}
          </h1>
          <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] md:text-[20px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {service.description}
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] leading-relaxed" style={{ fontVariationSettings: "'wdth' 100" }}>
            {service.longDescription}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] w-full">
          {/* Benefits */}
          <div className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] p-[24px] md:p-[32px]">
            <h2 className="font-['IBM_Plex_Sans',sans-serif] text-[24px] text-[#1e3856] mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
              Fördelar
            </h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="shrink-0 size-2 bg-[#1e3856] rounded-full mt-2" />
                  <span className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] p-[24px] md:p-[32px]">
            <h2 className="font-['IBM_Plex_Sans',sans-serif] text-[24px] text-[#1e3856] mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
              Så går det till
            </h2>
            <ol className="space-y-4">
              {service.process.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="shrink-0 size-8 bg-[#1e3856] text-white rounded-full flex items-center justify-center font-['IBM_Plex_Sans',sans-serif] font-semibold">
                    {index + 1}
                  </div>
                  <span className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] pt-1" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Contact Card */}
        {service.contactInfo && (
          <div className="bg-[#1e3856] p-[32px] md:p-[40px] w-full">
            <h2 className="font-['IBM_Plex_Sans',sans-serif] text-[20px] text-white mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
              Kontakta oss
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-['IBM_Plex_Sans',sans-serif] text-[20px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {service.contactInfo.name}
                </p>
                <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-white opacity-80" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {service.contactInfo.role}
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <a 
                    href={`mailto:${service.contactInfo.email}`}
                    className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-white hover:opacity-70 transition-opacity"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {service.contactInfo.email}
                  </a>
                  <a 
                    href={`tel:${service.contactInfo.phone}`}
                    className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-white hover:opacity-70 transition-opacity"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {service.contactInfo.phone}
                  </a>
                </div>
              </div>
              <button className="bg-white text-[#1e3856] px-8 py-4 hover:bg-gray-100 transition-colors">
                <span className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Skicka meddelande
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}