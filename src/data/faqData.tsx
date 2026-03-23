export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  name?: string; // subcategory name, undefined for general items
  items: FAQItem[];
}

export interface FAQCategory {
  id: string;
  name: string;
  sections: FAQSection[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'skogsskotsel',
    name: 'Skogsskötsel',
    sections: [
      {
        items: [
          {
            question: 'Vad är mitt ansvar som skogsägare?',
            answer: 'Som skogsägare ansvarar du för att skogen brukas enligt gällande lagar, framför allt skogsvårdslagen. Det innebär bland annat ansvar för återväxt efter skörd, hänsyn till natur- och kulturvärden samt att åtgärder genomförs på ett säkert sätt.'
          },
          {
            question: 'Hur vet jag vilka åtgärder som är rätt för min skog?',
            answer: 'Rätt åtgärd beror på skogens ålder, trädslag, markförhållanden och dina mål som skogsägare. Vissa bestånd behöver gallras, andra föryngras eller lämnas för naturvård. Kontakta din virkesköpare så får du hjälp att gå igenom din fastighet och ta beslut om rätt åtgärder, i rätt ordning och vid rätt tidpunkt.'
          },
          {
            question: 'När är det dags att gallra eller skörda?',
            answer: 'Gallring görs vanligtvis när beståndet nått en viss höjd och täthet för att gynna tillväxt och kvalitet. Skörd sker när skogen nått slutet av sin omloppstid. Tidpunkten påverkas av både biologiska och ekonomiska faktorer samt dina långsiktiga mål.'
          },
          {
            question: 'Behöver jag anmäla åtgärder till myndigheter?',
            answer: 'Vissa åtgärder, som skörd, kräver anmälan till Skogsstyrelsen. Även åtgärder i känsliga miljöer kan omfattas av särskilda regler. Det är viktigt att kontrollera vad som gäller innan arbetet påbörjas.'
          },
          {
            question: 'Vad innebär certifiering och behöver jag det?',
            answer: 'Certifiering t.ex. FSC\u00ae eller PEFC\u2122 visar att skogen brukas hållbart enligt vissa krav. Det är frivilligt men kan underlätta virkesaffärer och bidra till tydliga rutiner för miljöhänsyn, arbetsmiljö och dokumentation.'
          },
          {
            question: 'Hur påverkar skogsbruket klimatet?',
            answer: 'Skogen bidrar till klimatarbetet både genom att binda koldioxid under tillväxt och genom att virket används i förnybara produkter som ersätter fossila material. Ett aktivt och hållbart skogsbruk är en viktig del av klimatomställningen.'
          },
          {
            question: 'Vad gäller vid storm-, brand- eller insektsskador?',
            answer: 'Vid skador är säkerheten alltid viktigast. Skador behöver bedömas innan åtgärder planeras, och hanteringen kan ta tid. I många fall krävs professionell hjälp. Det är också viktigt att tidigt ta kontakt med försäkringsbolag vid större skador.'
          }
        ]
      },
      {
        name: 'Skogsbruksplan',
        items: [
          {
            question: 'Vad är en skogsbruksplan och behöver jag en?',
            answer: 'Skogsbruksplanen är ett verktyg för att omsätta dina mål med skogen i praktiken. Den är ett viktigt planeringsverktyg som ger en överblick över din skog, dess värden och föreslagna åtgärder över tid. Den underlättar både skötsel, ekonomisk planering och långsiktiga beslut särskilt vid större åtgärder eller vid skogsskador.'
          },
          {
            question: 'Hur ofta behöver skogsbruksplanen ajourhållas?',
            answer: 'En skogsbruksplan brukar ajourhållas (uppdateras) i samband med att åtgärder utförs. En plan som inte har ajourhållits brukar anses utdaterad efter 10 år.'
          },
          {
            question: 'Vem kan hjälpa mig med skogsbruksplanen?',
            answer: 'Din virkesköpare kan hjälpa dig att ta fram, uppdatera och använda skogsbruksplanen utifrån dina mål och din fastighets förutsättningar.'
          },
          {
            question: 'Hur skaffar jag en skogsbruksplan?',
            answer: 'Kontakta din virkesköpare så får du hjälp att upprätta en skogsbruksplan.'
          }
        ]
      }
    ]
  },
  {
    id: 'holmen',
    name: 'Holmen',
    sections: [
      {
        items: [
          {
            question: 'Vem kan hjälpa mig med rådgivning och praktiska åtgärder?',
            answer: 'Våra virkesköpare kan stötta dig med bedömning, planering, genomförande och uppföljning av åtgärder så att ditt skogsägande blir tryggt, effektivt och långsiktigt.'
          },
          {
            question: 'Hur går ett samarbete med Holmen till?',
            answer: 'Samarbetet utgår från dina förutsättningar och ambitioner. Tillsammans går vi igenom din fastighet, diskuterar åtgärder och planerar dem i rätt ordning. Vårt fokus ligger på trygghet, kvalitet och långsiktighet.'
          },
          {
            question: 'Hur fungerar virkesaffären?',
            answer: 'Virkesaffären planeras i dialog med din virkesköpare. Du får tydlighet kring omfattning, villkor och genomförande. Transparens och långsiktiga relationer är centrala delar i vårt samarbete.'
          },
          {
            question: 'Kan Holmen hjälpa till med myndighetskontakter?',
            answer: 'Ja, Holmen kan stötta med rådgivning kring anmälningar, regler och vad som gäller inför olika åtgärder, så att processen blir trygg och korrekt.'
          },
          {
            question: 'Hur hanterar Holmen storm- och andra skogsskador?',
            answer: 'Vid storm- eller insektsskador är säkerheten alltid första prioritet. Holmen kan hjälpa till med bedömning, planering och prioritering av åtgärder i den takt som är rimlig och säker.'
          },
          {
            question: 'Hur arbetar Holmen med hållbart skogsbruk?',
            answer: 'Hållbarhet är en integrerad del av Holmens skogsbruk. Det innebär att vi tar hänsyn till miljö, ekonomi och sociala värden, samtidigt som skogen brukas aktivt för framtida generationer.'
          }
        ]
      }
    ]
  },
  {
    id: 'ekonomi',
    name: 'Ekonomi',
    sections: [
      {
        items: [
          {
            question: 'Hur fungerar ekonomin i skogsägandet?',
            answer: 'Skogsbruk är långsiktigt och intäkterna kommer ofta oregelbundet. Det är viktigt att planera både åtgärder och ekonomi över tid. Skattefrågor, avsättningar och investeringar kan ha stor betydelse för resultatet.'
          },
          {
            question: 'Behöver jag skilja på min skogs ekonomi och min privatekonomi?',
            answer: 'Ja, det är en grundregel för att kunna driva skogsbruket företagsekonomiskt. Skogen ger intäkter men kräver också investeringar. Genom att hålla isär ekonomierna kan du bättre planera för år när du har stora utgifter men inga intäkter, och därmed få ut mer av ditt skogsägande på lång sikt.'
          },
          {
            question: 'Vilka framtida utgifter måste jag planera för efter en avverkning?',
            answer: 'När du får in pengar från en avverkning är det klokt att sätta av en del av beloppet för att täcka framtida kostnader såsom:\n\n\u2022 Återväxt t.ex. markberedning och plantering\n\u2022 Vägunderhåll\n\u2022 Försäkringar och räntor\n\u2022 Uppdatering av din skogsbruksplan'
          },
          {
            question: 'Hur kan skogsbruksplanen hjälpa mig ekonomiskt?',
            answer: 'Skogsbruksplanen är ditt viktigaste verktyg för ekonomisk planering. Den visar vilka möjliga inkomster du har genom gallring eller skörd och vilka nödvändiga utgifter som väntar de närmaste åren.'
          },
          {
            question: 'Vad bör jag tänka på när det gäller skatteregler?',
            answer: 'Skattereglerna påverkar din lönsamhet. Det är särskilt viktigt att kontakta en ekonomisk rådgivare om du nyligen har köpt en fastighet eller har fått stora intäkter från skörd, så att du kan optimera din skattesituation.'
          },
          {
            question: 'Vad krävs för att samägande av skog ska fungera bra?',
            answer: 'Vid samägande krävs kompromisser eftersom olika delägare ofta har olika mål. Det är viktigt att sitta ner tillsammans och diskutera:\n\n1. Vilka gemensamma mål har vi med skogen?\n2. Hur ska besluten fattas?\n\nTips! Använd skogsbruksplanen som ett objektivt underlag för att hitta balansen mellan miljö, produktion och era olika intressen.'
          },
          {
            question: 'Vad är en betalningsplan?',
            answer: 'En betalningsplan ger dig möjlighet att fördela utbetalningen från en skörd över flera år. På så sätt kan du skjuta upp beskattningen av intäkten och jämna ut ditt resultat mellan åren. Betalningsplanen upprättas tillsammans med köparen av avverkningsrätten i samband med att kontraktet skrivs.'
          },
          {
            question: 'Är jag bokföringsskyldig som skogsägare?',
            answer: 'Ja, om du bedriver skogsbruk som näringsverksamhet är du bokföringsskyldig enligt bokföringslagen. Det innebär att alla affärshändelser ska bokföras löpande och att bokföringsmaterial ska sparas i minst sju år.'
          },
          {
            question: 'Vad räknas som direkt avdragsgilla kostnader?',
            answer: 'Direkt avdragsgilla kostnader är i princip alla driftkostnader som uppstår för att förvärva och bibehålla inkomster i skogsbruket. En ekonomisk rådgivare kan hjälpa dig att bedöma vad som räknas som direkt avdragsgilla kostnader.'
          },
          {
            question: 'Vad är en ersättningsfond?',
            answer: 'En ersättningsfond ger dig möjlighet att skjuta upp beskattningen av försäkringsersättningar som du fått vid exempelvis storm-, brand- eller insektsskador. Genom fonden kan ersättningen reserveras för framtida återinvesteringar i skogen. Ta hjälp av en ekonomisk rådgivare om du har frågor om att upprätta en ersättningsfond.'
          },
          {
            question: 'När kan jag använda ersättningsfond?',
            answer: 'Ersättningsfond kan användas när du fått ersättning för skadad skog och planerar att återställa eller återinvestera i skogsbruket. Fonden ger ekonomiskt utrymme och flexibilitet i en situation där kostnader ofta uppstår över flera år. Ta hjälp av en ekonomisk rådgivare om du har frågor.'
          },
          {
            question: 'Vad är en expansionsfond?',
            answer: 'Expansionsfond är ett sätt för dig som enskild näringsidkare att sätta av vinst och skjuta upp beskattningen till ett senare tillfälle. Medlen i expansionsfonden beskattas initialt med bolagsskatt, vilket kan ge bättre likviditet för investeringar i skogen. Ta hjälp av en ekonomisk rådgivare om du har frågor.'
          },
          {
            question: 'När kan expansionsfond vara bra i skogsbruk?',
            answer: 'Skogsbruk har ofta ojämna intäkter över tid. En expansionsfond gör det möjligt att bygga upp kapital under goda år och använda pengarna för investeringar eller framtida kostnader, utan att behöva ta ut hela vinsten till full beskattning direkt.'
          },
          {
            question: 'Vad är en periodiseringsfond?',
            answer: 'Med periodiseringsfond kan du skjuta upp beskattningen av en del av vinsten och istället ta upp den ett senare år. Syftet är att jämna ut resultatet mellan år med höga och låga inkomster, vilket är särskilt relevant i skogsbruk. Ta hjälp av en ekonomisk rådgivare om du vill veta mer om hur en periodiseringsfond fungerar.'
          },
          {
            question: 'Hur länge kan pengar stå i en periodiseringsfond?',
            answer: 'En periodiseringsfond måste återföras till beskattning senast efter sex år. Du väljer själv när under perioden fonden ska återföras, vilket ger flexibilitet i din skatteplanering. Ta hjälp av en ekonomisk rådgivare om du vill veta mer om hur en periodiseringsfond fungerar.'
          },
          {
            question: 'Behöver jag hjälp för att använda dessa verktyg rätt?',
            answer: 'Det är ofta klokt att ta hjälp av en ekonomisk rådgivare för att planera skatter, fonder och betalningsupplägg på ett sätt som passar just din fastighet och din ekonomi.'
          },
          {
            question: 'Vad är ett mätbesked?',
            answer: 'Mätbeskedet visar exakt hur mycket virke som har levererats, hur det har bedömts och om eventuella avdrag har gjorts. Det ligger till grund för din ersättning och visar bland annat volym, kvalitet och eventuella avdrag.'
          },
          {
            question: 'Vem utfärdar mätbeskedet?',
            answer: 'I Sverige är det Biometria, en oberoende aktör, som utfärdar mätbeskedet, och mätningen sker enligt lag och vedertagen branschstandard.'
          },
          {
            question: 'När får jag mitt mätbesked?',
            answer: 'Mätbeskedet skickas ut så snart mätningen är godkänd och komplett. De allra flesta skogsägare får sitt besked digitalt i Kivra, men det går fortfarande att få det per post om du inte har en digital brevlåda.'
          },
          {
            question: 'Vad gör jag om jag har frågor kring mätbeskedet?',
            answer: 'Om du har frågor kontakta Biometria eller din virkesköpare hos Holmen.'
          }
        ]
      },
      {
        name: 'Årsbesked',
        items: [
          {
            question: 'Vad är ett årsbesked?',
            answer: 'Årsbeskedet är en sammanställning av dina affärer med oss under det gångna året. Det ger dig en överblick över utbetalningar, leveranser och andra ekonomiska uppgifter som rör ditt skogsägande.'
          },
          {
            question: 'Varför får jag ett årsbesked?',
            answer: 'Årsbeskedet är ett stöd inför bokslut och deklaration. Det hjälper dig att få kontroll över årets skogsaffärer och fungerar som ett underlag till din bokföring och din skattedeklaration.'
          },
          {
            question: 'Vilken information finns med i årsbeskedet?',
            answer: 'Årsbeskedet innehåller bland annat:\n\n\u2022 Utbetalda ersättningar under året\n\u2022 Levererat virke och avräkningar\n\u2022 Eventuella avdrag eller tillägg\n\u2022 Sammanställda belopp per fastighet eller affär\n\nInnehållet kan variera beroende på vilka affärer du haft under året.'
          },
          {
            question: 'Är årsbeskedet samma sak som en faktura eller avräkning?',
            answer: 'Nej, årsbeskedet är en sammanställning och ersätter inte enskilda avräkningar eller fakturor. Det är ett kompletterande dokument som ger helhetsbilden för året.'
          },
          {
            question: 'När skickas årsbeskedet ut?',
            answer: 'Årsbeskedet skickas vanligtvis ut i början av året efter det år som sammanställningen avser. Exakt tidpunkt kan variera. Årsbeskedet skickas normalt via post och laddas upp i Min Skog, beroende på vad som gäller för dig som kund och vilka kontaktuppgifter vi har registrerade.'
          },
          {
            question: 'Vad gör jag om något verkar fel i årsbeskedet?',
            answer: 'Om du upptäcker uppgifter som inte stämmer, eller om något är oklart, ska du kontakta din virkesköpare eller virkesredovisare så snart som möjligt. Vi hjälper dig att reda ut eventuella frågor.'
          },
          {
            question: 'Behöver jag spara årsbeskedet?',
            answer: 'Ja, årsbeskedet bör sparas tillsammans med övrigt bokförings- och deklarationsunderlag. För dig som bedriver näringsverksamhet gäller normalt arkivering i minst sju år.'
          }
        ]
      },
      {
        name: 'Slutredovisning',
        items: [
          {
            question: 'Vad är en slutredovisning?',
            answer: 'Slutredovisningen är den sammanställning du får när en skörd eller åtgärd är helt avslutad. Den visar utfallet av affären, till exempel levererade volymer, priser, avdrag och slutlig ersättning.'
          },
          {
            question: 'När får jag min slutredovisning?',
            answer: 'Slutredovisningen skickas när allt virke är inmätt, redovisat och affären är färdigställd.'
          },
          {
            question: 'Vad ingår i slutredovisningen?',
            answer: 'I slutredovisningen framgår bland annat:\n\n\u2022 Levererade volymer per sortiment\n\u2022 Pris och ersättning\n\u2022 Eventuella kostnader och avdrag\n\u2022 Slutligt belopp som betalats ut'
          },
          {
            question: 'Hur skiljer sig slutredovisningen från löpande avräkningar?',
            answer: 'Löpande avräkningar visar delar av affären under tiden arbetet pågår. Slutredovisningen är den slutliga sammanfattningen när allt är klart.'
          },
          {
            question: 'Vem kontaktar jag om jag har frågor om årsbesked eller slutredovisning?',
            answer: 'Om du har frågor eller vill gå igenom slutredovisningen är du alltid välkommen att kontakta din virkesköpare eller virkesredovisare hos Holmen.'
          }
        ]
      },
      {
        name: 'Utbetalning & faktura',
        items: [
          {
            question: 'Jag vill ändra mina utbetalningsuppgifter (kontonummer), vem kontaktar jag?',
            answer: 'Om du vill ändra dina utbetalningsuppgifter ska du kontakta din virkesredovisare hos Holmen.'
          },
          {
            question: 'Jag vill göra en utbetalning, vem kontaktar jag?',
            answer: 'Om du vill göra en utbetalning ska du kontakta din virkesredovisare hos Holmen.'
          },
          {
            question: 'Jag har frågor gällande en faktura, vem kontaktar jag?',
            answer: 'Om du har frågor gällande en faktura är du alltid välkommen att kontakta din virkesköpare eller virkesredovisare hos Holmen.'
          }
        ]
      }
    ]
  },
  {
    id: 'nyskogsagare',
    name: 'Ny skogsägare',
    sections: [
      {
        items: [
          {
            question: 'Jag har nyligen blivit skogsägare, var börjar jag?',
            answer: 'Börja med att skaffa dig en överblick över fastigheten. Ta reda på om det finns en skogsbruksplan, tidigare åtgärder och eventuella pågående åtgärder. Ta kontakt med din virkesköpare hos Holmen, tidig kontakt gör stor skillnad.'
          },
          {
            question: 'Måste jag göra något direkt när jag äger skog?',
            answer: 'Nej, skogsbruk är långsiktigt och sällan akut. Det viktigaste är att fatta genomtänkta beslut och planera i lugn och ro.'
          },
          {
            question: 'Vilket är mitt ansvar enligt lag?',
            answer: 'Du ansvarar bland annat för återväxt efter skörd, att följa skogsvårdslagen och att visa hänsyn till natur- och kulturvärden. Du ansvarar också för säkerheten vid arbete i skogen.'
          },
          {
            question: 'Vad är skillnaden mellan gallring och skörd?',
            answer: 'Gallring är en skötselåtgärd som görs för att förbättra tillväxt och kvalitet i skogen. Skörd görs när skogen nått sin mognad och följs av ny föryngring.'
          },
          {
            question: 'Hur ofta kan jag få inkomster från skogen?',
            answer: 'Intäkter från skog kommer ofta oregelbundet och i större poster. Därför är planering viktigt, både för ekonomi och skötselåtgärder över tid.'
          },
          {
            question: 'Behöver jag själv arbeta i skogen?',
            answer: 'Nej, många skogsägare väljer att ta hjälp med både planering och utförande av åtgärder. Det är vanligt att inte själv utföra praktiskt arbete, särskilt av säkerhetsskäl.'
          },
          {
            question: 'Är det farligt att arbeta i skogen?',
            answer: 'Arbete i skogen innebär risker och ska alltid utföras med rätt kunskap, utrustning och planering.'
          },
          {
            question: 'Hur påverkar mina beslut framtida generationer?',
            answer: 'Skogsbruk sträcker sig över lång tid. De beslut du tar idag påverkar både skogens värde och framtida generationers möjligheter långt fram i tiden.'
          },
          {
            question: 'Måste jag tänka på miljö och naturvärden?',
            answer: 'Ja, hänsyn till miljö och naturvärden är en del av skogsägandet. Det bidrar till biologisk mångfald och ett hållbart skogsbruk.'
          },
          {
            question: 'Vem kan hjälpa mig som ny skogsägare?',
            answer: 'Din virkesköpare är ett bra stöd, inte minst i början. Du kan få hjälp att förstå din skog, dina möjligheter och vilka steg som är lämpliga att ta.'
          }
        ]
      }
    ]
  },
  {
    id: 'teknisksupport',
    name: 'Teknisk support',
    sections: [
      {
        items: [
          {
            question: 'Jag har en skogsbruksplan men den visas inte, varför?',
            answer: 'Ta gärna kontakt med din virkesköpare om du har din skogsbruksplan hos Holmen och den inte visas i Min Skog. Din virkesköpare kan hjälpa dig att reda ut vad som hänt och se till att planen blir tillgänglig.'
          },
          {
            question: 'Kartan över mina fastigheter visas inte, varför?',
            answer: 'Det kan finnas flera orsaker till att kartan inte visas. Kontakta din virkesköpare så kan vi hjälpa dig att felsöka och lösa problemet.'
          },
          {
            question: 'Varför kan jag inte se alla kontrakt som jag har på skogsfastigheten?',
            answer: 'Kontrakten visas sorterade per fastighet, men för vissa kontrakt kan kopplingen saknas. Det kan bero på att fastigheten har bytt ägare eller fastighetsbeteckning sedan kontraktstillfället. Kontakta din virkesköpare för mer information.'
          },
          {
            question: 'Vilka kontrakt visas?',
            answer: 'Kontrakten visas i fem år från det att avtal har tecknats. Äldre kontrakt kan förekomma om de inte avslutats i våra system. Kontakta din virkesköpare om du saknar ett kontrakt.'
          }
        ]
      }
    ]
  }
];
