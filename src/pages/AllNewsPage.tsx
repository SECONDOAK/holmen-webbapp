import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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

type DateFilter = 'all' | '2024' | '2025' | '2026';

export default function AllNewsPage({ onBack, onArticleClick }: AllNewsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

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

    if (dateFilter === 'all') return combined;
    const year = parseInt(dateFilter);
    return combined.filter(item => item.sortDate.getFullYear() === year);
  }, [dateFilter]);

  const totalPages = Math.ceil(allContent.length / ITEMS_PER_PAGE);
  const paginatedContent = allContent.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    setCurrentPage(1);
  };

  const filterOptions: { value: DateFilter; label: string }[] = [
    { value: 'all', label: 'Alla' },
    { value: '2026', label: '2026' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
  ];

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="w-full">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[#1e3856] hover:text-[#152b40] hover:gap-3 transition-all duration-200 font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold mb-4"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <ArrowLeft className="w-5 h-5" />
              Tillbaka
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Senaste nytt
              </h1>

              {/* Date Filter */}
              <div className="flex items-center gap-3">
                <label htmlFor="date-filter" className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[13px] text-[#1e3856] uppercase tracking-wide" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Period
                </label>
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={(e) => handleFilterChange(e.target.value as DateFilter)}
                  className="h-[48px] px-4 pr-10 border-2 border-[#ededed] bg-white text-[#1e3856] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] focus:border-[#1e3856] focus:outline-none appearance-none cursor-pointer"
                  style={{ fontVariationSettings: "'wdth' 100", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231e3856' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-gray-500" style={{ fontVariationSettings: "'wdth' 100" }}>
            Visar {paginatedContent.length} av {allContent.length} inlägg
          </p>

          {/* Mixed News and Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] w-full">
            {paginatedContent.map((item, i) => {
              if (item.type === 'calendar') {
                const event = item.data;
                return (
                  <CalendarEventCard
                    key={`calendar-${currentPage}-${i}`}
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
                  <div key={`news-${currentPage}-${i}`} className="bg-white border border-gray-200 overflow-hidden flex flex-col cursor-pointer group" onClick={() => onArticleClick(article.id)}>
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

          {/* Empty state */}
          {allContent.length === 0 && (
            <div className="w-full text-center py-12">
              <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-500 text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Inga inlägg hittades för vald period.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 w-full pt-4">
              <ForestButton
                variant="white"
                size="small"
                disabled={currentPage === 1}
                onClick={() => { setCurrentPage(p => p - 1); }}
              >
                <ChevronLeft className="w-4 h-4" />
                Föregående
              </ForestButton>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-[13px] font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold transition-colors ${
                      page === currentPage
                        ? 'bg-[#1e3856] text-white'
                        : 'text-[#1e3856] hover:bg-gray-200'
                    }`}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <ForestButton
                variant="white"
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => { setCurrentPage(p => p + 1); }}
              >
                Nästa
                <ChevronRight className="w-4 h-4" />
              </ForestButton>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
