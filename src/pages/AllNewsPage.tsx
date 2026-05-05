import { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import CalendarEventCard from '../components/CalendarEventCard';
import { newsArticles } from '../data/newsArticles';
import { Footer } from '../components/Footer';
import ForestButton from '../components/ForestButton';

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

const ITEMS_PER_PAGE = 8;

type ContentFilter = 'all' | 'news' | 'calendar';

export default function AllNewsPage({ onBack, onArticleClick }: AllNewsPageProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  // Combine news and calendar events, then sort by date (most recent first)
  const allContent = useMemo(() => {
    const combined = [
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

    if (contentFilter === 'all') return combined;
    return combined.filter(item => item.type === contentFilter);
  }, [contentFilter]);

  const visibleContent = allContent.slice(0, visibleCount);
  const hasMore = visibleCount < allContent.length;

  const handleFilterChange = (filter: ContentFilter) => {
    setContentFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filterOptions: { value: ContentFilter; label: string }[] = [
    { value: 'all', label: 'Alla' },
    { value: 'news', label: 'Nyheter' },
    { value: 'calendar', label: 'Kalenderhändelser' },
  ];

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="w-full">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[#1e3856] hover:text-[#152b40] hover:gap-3 transition-all duration-200 font-['IBM_Plex_Sans',sans-serif] font-semibold mb-4"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <ArrowLeft className="w-5 h-5" />
              Tillbaka
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Senaste nytt
              </h1>

              {/* Content Filter */}
              <div className="flex items-center gap-3">
                <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] text-[#1e3856] uppercase tracking-wide" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Visa
                </span>
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className={`flex items-center justify-between h-[40px] px-[12px] min-w-[160px] bg-white border-2 font-['IBM_Plex_Sans',sans-serif] text-[14px] transition-colors cursor-pointer ${
                      contentFilter !== 'all' ? 'border-[#1e3856]' : 'border-[#ededed]'
                    }`}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="truncate text-left">
                      {filterOptions.find(o => o.value === contentFilter)?.label}
                    </span>
                    <ChevronDown size={16} strokeWidth={2} className={`shrink-0 ml-2 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20 min-w-[160px]">
                      {filterOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => { handleFilterChange(option.value); setFilterOpen(false); }}
                          className="flex items-center gap-[10px] w-full px-[12px] py-[10px] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
                        >
                          <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 ${
                            contentFilter === option.value ? 'bg-[#1e3856] border-[#1e3856]' : 'border-[#ccc] bg-white'
                          }`}>
                            {contentFilter === option.value && <Check size={12} strokeWidth={2.5} className="text-white" />}
                          </div>
                          <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-gray-500" style={{ fontVariationSettings: "'wdth' 100" }}>
            Visar {visibleContent.length} av {allContent.length} inlägg
          </p>

          {/* Mixed News and Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] w-full">
            {visibleContent.map((item, i) => {
              if (item.type === 'calendar') {
                const event = item.data;
                return (
                  <CalendarEventCard
                    key={`calendar-${visibleCount}-${i}`}
                    month={event.month}
                    day={event.day}
                    year={event.year}
                    category={event.category}
                    title={event.title}
                    description={event.description}
                    showCategory={false}
                  />
                );
              } else {
                const article = item.data;
                return (
                  <div key={`news-${visibleCount}-${i}`} className="bg-white border border-gray-200 overflow-hidden flex flex-col cursor-pointer group" onClick={() => onArticleClick(article.id)}>
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <ImageWithFallback
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={article.heroImage}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-500 text-xs mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {article.date}
                      </p>

                      <h3 className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#1e3856] mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {article.title}
                      </h3>

                      <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-600 mb-4 flex-1 line-clamp-3" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {article.summary}
                      </p>

                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#1e3856] group-hover:text-[#152b40] transition-colors inline-flex items-baseline gap-1"
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

          {/* Empty state */}
          {allContent.length === 0 && (
            <div className="w-full text-center py-12">
              <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-500 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Inga inlägg hittades för vald period.
              </p>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex flex-col items-center w-full pt-4">
              <div className="flex flex-col items-center">
                <div className="w-[calc(100%+48px)] border-t-2 border-[#1e3856] mb-4" />
                <button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 font-['IBM_Plex_Sans',sans-serif] font-bold text-[15px] text-[#1e3856] uppercase tracking-wide hover:opacity-70 transition-opacity cursor-pointer"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Ladda fler
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
