import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import CalendarEventCard from '../components/CalendarEventCard';
import { newsArticles } from '../data/newsArticles';
import { Footer } from '../components/Footer';

interface AllNewsPageProps {
  onBack: () => void;
  onArticleClick: (articleId: string) => void;
}

// Calendar events data
const calendarEvents = [
  {
    month: "JANUARI",
    day: "30",
    year: "2026",
    date: "30 januari 2026",
    sortDate: new Date(2026, 0, 30),
    category: "DELÅRSRAPPORT",
    title: "Bokslutsrapport 2025",
    description: "Holmen offentliggör bokslutsrapport för 2025 fredag den 30 januari 2026."
  },
  {
    month: "MARS",
    day: "29",
    year: "2026",
    date: "29 mars 2026",
    sortDate: new Date(2026, 2, 29),
    category: "TYST PERIOD",
    title: "Tyst period inför delårsrapport",
    description: "Vi tillämpar 30 dagars tyst period inför publiceringen av varje delårsrapport."
  },
  {
    month: "APRIL",
    day: "25",
    year: "2026",
    date: "25 april 2026",
    sortDate: new Date(2026, 3, 25),
    category: "ÅRSSTÄMMA",
    title: "Holmen Årsstämma 2026",
    description: "Holmens årsstämma 2026 kommer att genomföras i Stockholm måndag den 25 april 2026, klockan 15:00."
  },
  {
    month: "JULI",
    day: "15",
    year: "2026",
    date: "15 juli 2026",
    sortDate: new Date(2026, 6, 15),
    category: "DELÅRSRAPPORT",
    title: "Delårsrapport Q2 2026",
    description: "Holmen presenterar sin delårsrapport för andra kvartalet 2026."
  },
  {
    month: "OKTOBER",
    day: "22",
    year: "2026",
    date: "22 oktober 2026",
    sortDate: new Date(2026, 9, 22),
    category: "DELÅRSRAPPORT",
    title: "Delårsrapport Q3 2026",
    description: "Holmen presenterar sin delårsrapport för tredje kvartalet 2026."
  }
];

// Parse Swedish date format "DD månad YYYY" to Date object
const parseSwedishDate = (dateStr: string): Date => {
  const months: { [key: string]: number } = {
    'januari': 0, 'februari': 1, 'mars': 2, 'april': 3, 'maj': 4, 'juni': 5,
    'juli': 6, 'augusti': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
  };
  
  const parts = dateStr.toLowerCase().split(' ');
  const day = parseInt(parts[0]);
  const month = months[parts[1]];
  const year = parseInt(parts[2]);
  
  return new Date(year, month, day);
};

export default function AllNewsPage({ onBack, onArticleClick }: AllNewsPageProps) {
  // Combine news and calendar events, then sort by date (most recent first)
  const allContent = [
    ...newsArticles.map(article => ({
      type: 'news' as const,
      data: article,
      sortDate: parseSwedishDate(article.date)
    })),
    ...calendarEvents.map(event => ({
      type: 'calendar' as const,
      data: event,
      sortDate: event.sortDate
    }))
  ].sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          {/* Header */}
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[#1e3856] hover:text-[#152b40] hover:gap-3 transition-all duration-200 font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold mb-4"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <ArrowLeft className="w-5 h-5" />
              Tillbaka
            </button>
            
            <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Senaste nytt
            </h1>
          </div>

          {/* Mixed News and Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
            {allContent.map((item, i) => {
              if (item.type === 'calendar') {
                const event = item.data;
                return (
                  <CalendarEventCard
                    key={`calendar-${i}`}
                    month={event.month}
                    day={event.day}
                    year={event.year}
                    category={event.category}
                    title={event.title}
                    description={event.description}
                  />
                );
              } else {
                const article = item.data;
                return (
                  <div key={`news-${i}`} className="bg-white border border-gray-200 overflow-hidden flex flex-col cursor-pointer group" onClick={() => onArticleClick(article.id)}>
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <ImageWithFallback 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        src={article.heroImage} 
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category and Date */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#1e3856] uppercase text-xs" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {article.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="font-['IBM_Plex_Sans',sans-serif] text-gray-600 text-xs" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {article.date}
                        </span>
                      </div>

                      <h3 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#1e3856] mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {article.title}
                      </h3>
                      
                      <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-600 mb-4 flex-1 line-clamp-3" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {article.summary}
                      </p>
                      
                      <span 
                        className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#1e3856] group-hover:text-[#152b40] transition-colors inline-flex items-baseline gap-1"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        Läs mer
                        <svg className="w-3.5 h-3.5 relative top-[2px] group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}