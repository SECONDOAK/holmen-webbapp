interface CalendarEventCardProps {
  month: string;
  day: string;
  year: string;
  category: string;
  title: string;
  description?: string;
  showCategory?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function CalendarEventCard({ 
  month, 
  day, 
  year, 
  category, 
  title,
  description,
  showCategory = true,
  onClick,
  className
}: CalendarEventCardProps) {
  return (
    <div 
      className={`bg-white border border-gray-200 overflow-hidden flex flex-col cursor-pointer group transition-shadow duration-300 ${className || ''}`}
      onClick={onClick}
    >
      {/* Date Block - Replaces image in news cards */}
      <div className="relative aspect-[3/2] w-full bg-[#e4f5f5] flex flex-col items-center justify-center overflow-hidden">
        <div className="group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#8F3857] text-[14px] uppercase tracking-wider mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
            {month}
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[#1e3856] text-[64px] leading-none mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
            {day}
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#1e3856] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {year}
          </p>
        </div>
      </div>

      {/* Content - Same structure as news cards */}
      <div className="p-6 flex flex-col flex-1">
        {showCategory && (
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#1e3856] text-[12px] uppercase tracking-wider mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
            {category}
          </p>
        )}
        <h3 className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#1e3856] mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
          {title}
        </h3>
        {description && (
          <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-600 mb-4 flex-1 line-clamp-3" style={{ fontVariationSettings: "'wdth' 100" }}>
            {description}
          </p>
        )}
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