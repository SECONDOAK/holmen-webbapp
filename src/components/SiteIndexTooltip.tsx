import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

interface TooltipData {
  title: string;
  height: string;
}

interface SiteIndexTooltipProps {
  siteIndex: string;
  tooltipData: TooltipData;
  hideText?: boolean;
}

export function SiteIndexTooltip({ siteIndex, tooltipData, hideText }: SiteIndexTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isVisible && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isVisible]);

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isVisible]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setIsVisible(!isVisible);
    }
  };

  const tooltipContent = isVisible && createPortal(
    <div
      className="fixed z-[10000] pointer-events-none"
      style={isMobile ? {
        top: `${position.top}px`,
        left: '50%',
        transform: 'translate(-50%, calc(-100% - 12px))',
      } : {
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translate(calc(-100% - 8px), -50%)',
      }}
    >
      <div className={`${isMobile ? 'w-[calc(100vw-2rem)] max-w-sm' : 'w-80'} bg-white border border-[#e4e4e4] rounded-lg shadow-2xl p-4 animate-in fade-in duration-200`}>
        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] mb-3">
          {tooltipData.title}
        </p>
        <div className="space-y-2 text-[12px] text-gray-700">
          <p>{tooltipData.height}</p>
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {!hideText && (
        <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify" style={{ fontVariationSettings: "'wdth' 100" }}>
          {siteIndex || 'N/A'}
        </p>
      )}
      <div
        ref={iconRef}
        onMouseEnter={!isMobile ? () => setIsVisible(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsVisible(false) : undefined}
        onClick={handleClick}
        onTouchEnd={handleClick}
        className="inline-flex cursor-help"
      >
        <Info className="size-3.5 text-gray-500" strokeWidth={2} />
      </div>
      {tooltipContent}
    </>
  );
}