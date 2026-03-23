export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  heroImage: string;
  summary: string;
  content: {
    text: string;
    image?: string;
    imageCaption?: string;
  }[];
  author?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'nya-riktlinjer-skogsavverkning-2025',
    title: 'Nya riktlinjer för skogsavverkning 2025',
    category: 'SKOGSSKÖTSEL',
    date: '28 november 2024',
    heroImage: 'https://images.unsplash.com/photo-1651990766796-b56814ad40b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3RyeSUyMGxvZ2dpbmd8ZW58MXx8fHwxNzY0NzY1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'Skogsstyrelsen presenterar uppdaterade riktlinjer för hållbar skogsavverkning med fokus på biologisk mångfald och naturvårdsanpassning.',
    author: 'Maria Andersson, Skogsstyrelsen',
    content: [
      {
        text: 'Från och med januari 2025 träder nya riktlinjer för skogsavverkning i kraft. Förändringarna syftar till att stärka den biologiska mångfalden samtidigt som skogsbrukets lönsamhet bibehålls. De nya reglerna innebär bland annat utökade krav på hänsyn vid avverkning och skärpta bestämmelser kring kantzoner.'
      },
      {
        text: 'En central del i de nya riktlinjerna är att öka andelen lövträd och äldre träd som lämnas kvar vid slutavverkning. Skogsstyrelsen rekommenderar att minst 10 procent av produktiv skogsmark ska bestå av lövträd, vilket är en ökning från tidigare 5 procent.',
        image: 'https://images.unsplash.com/photo-1559597083-917ff50e4b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBiaW9kaXZlcnNpdHklMjB3aWxkbGlmZXxlbnwxfHx8fDE3NjQ3NjU2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        imageCaption: 'Biologisk mångfald i skogen stärks genom de nya riktlinjerna.'
      },
      {
        text: 'Riktlinjerna betonar också vikten av naturvårdsanpassad avverkning. Det innebär att skogsägare måste göra en noggrann inventering innan avverkning för att identifiera och skydda naturvärden som till exempel gamla träd, död ved och värdefulla vattendrag.'
      },
      {
        text: 'För att underlätta för skogsägare att följa de nya reglerna kommer Skogsstyrelsen att erbjuda kostnadsfri rådgivning och utbildning under 2025. Dessutom införs digitala verktyg som hjälper till att planera avverkningar på ett sätt som tar hänsyn till både ekonomi och miljö.'
      },
      {
        text: 'Skogsbrukets organisationer välkomnar de nya riktlinjerna och ser dem som ett viktigt steg mot ett mer hållbart skogsbruk. Samtidigt påpekar man vikten av att riktlinjerna är praktiskt genomförbara och inte skapar onödig byråkrati för skogsägarna.'
      }
    ]
  },
  {
    id: 'rekordpriser-virke-norra-sverige',
    title: 'Rekordpriser på virke i norra Sverige',
    category: 'MARKNAD',
    date: '25 november 2024',
    heroImage: 'https://images.unsplash.com/photo-1606073744343-716f021e0730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lJTIwZm9yZXN0JTIwc3dlZGVufGVufDF8fHx8MTc2NDc2NTU0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'Virkespriserna fortsätter att stiga i norra Sverige drivet av stark efterfrågan från sågindustrin och begränsad tillgång på kvalitetsvirke.',
    author: 'Johan Svensson, Skogsmarknad',
    content: [
      {
        text: 'Priserna på tallvirke i norra Sverige har nått rekordnivåer under hösten 2024. Genomsnittspriset för grot tall ligger nu på cirka 620 kronor per kubikmeter, vilket är en ökning med nästan 15 procent jämfört med samma period förra året.'
      },
      {
        text: 'Bakom prisutvecklingen ligger flera faktorer. Den främsta är stark efterfrågan från den svenska sågindustrin som har goda ordersituationer på exportmarknaderna. Särskilt efterfrågan från Storbritannien och Tyskland har ökat markant.',
        image: 'https://images.unsplash.com/photo-1639423188864-60c9bf6dda47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW1iZXIlMjBsb2dzJTIwcGlsZXxlbnwxfHx8fDE3NjQ3NjU2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        imageCaption: 'Timmerförråden håller jämna nivåer trots hög efterfrågan.'
      },
      {
        text: 'Samtidigt har tillgången på virke minskat något på grund av begränsningar i avverkning. Många skogsägare har valt att vänta med avverkning i avvaktan på ännu högre priser, vilket ytterligare spätt på prisuppgången.'
      },
      {
        text: 'Enligt marknadens bedömare kommer de höga priserna sannolikt att hålla i sig under första kvartalet 2025. Det rekommenderas dock att skogsägare följer marknadsutvecklingen noga och planerar sina avverkningar i dialog med virkesköpare.'
      },
      {
        text: 'För granvirke är situationen något annorlunda. Priserna har legat stabilt men efterfrågan förväntas öka under våren när byggsäsongen drar igång. Massavedspriserna har också stigit något till följd av hög efterfrågan från massa- och pappersindustrin.'
      }
    ]
  },
  {
    id: 'digital-skogsskotsel-revolutionerar',
    title: 'Digital skogsskötsel revolutionerar branschen',
    category: 'TEKNIK',
    date: '20 november 2024',
    heroImage: 'https://images.unsplash.com/photo-1595569099963-77bf7706643a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzY0NzY1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    summary: 'Ny teknik med drönare och AI gör det enklare att övervaka och planera skogsbruksåtgärder. Digitala verktyg ökar effektiviteten och minskar miljöpåverkan.',
    author: 'Emma Karlsson, Skogstech',
    content: [
      {
        text: 'Den digitala revolutionen har nått skogsbranschen med full kraft. Allt fler skogsägare använder sig av drönare, satellitbilder och artificiell intelligens för att få en bättre överblick över sina skogsinnehav och planera skogsbruksåtgärder på ett mer effektivt sätt.'
      },
      {
        text: 'En av de mest spännande utvecklingarna är användningen av drönare för skogsinventering. Med hjälp av högupplösta kameror och laserskannrar kan drönare kartlägga skogsbestånd med en precision som tidigare var omöjlig att uppnå.',
        image: 'https://images.unsplash.com/photo-1757425053228-1d73b6eb0f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtYWNoaW5lcnklMjBoYXJ2ZXN0ZXJ8ZW58MXx8fHwxNzY0NzY1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        imageCaption: 'Modern skogsteknik kombinerar traditionellt hantverk med digital innovation.'
      },
      {
        text: 'AI-baserade system kan nu analysera stora mängder data från olika källor – satellitbilder, väderdata, markfuktighet och historisk avverkningsinformation – för att ge rekommendationer om optimala tidpunkter för olika skogsbruksåtgärder. Detta hjälper skogsägare att maximera både avkastning och miljönytta.'
      },
      {
        text: 'Digitala plattformar gör det också möjligt för skogsägare att följa utvecklingen i realtid. Genom appar kan man se hur skogen utvecklas, få varningar om skaderisker som till exempel barkborreangrepp, och planera åtgärder långt i förväg.'
      },
      {
        text: 'Enligt en färsk undersökning använder redan 40 procent av de svenska skogsägarna någon form av digital tjänst för skogsskötsel. Andelen förväntas öka kraftigt under de kommande åren i takt med att tekniken blir mer tillgänglig och användarvänlig. De digitala verktygen bidrar inte bara till ökad lönsamhet utan också till bättre miljöhänsyn och mer hållbart skogsbruk.'
      }
    ]
  }
];

export function getArticleById(id: string): NewsArticle | undefined {
  return newsArticles.find(article => article.id === id);
}
