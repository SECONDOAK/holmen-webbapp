import { MessageCircle, LayoutDashboard, Trees, ChartNoAxesCombined } from 'lucide-react';
import svgPaths from '../imports/svg-b657te3gpb';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { 
      id: 'overview', 
      label: 'Start',
      icon: (active: boolean) => (
        <div className="relative shrink-0 size-[24px]">
          <LayoutDashboard className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: '#1E3856' }} />
        </div>
      )
    },
    { 
      id: 'properties', 
      label: 'Fastigheter',
      icon: (active: boolean) => (
        <div className="relative shrink-0 size-[24px]">
          <Trees className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: active ? '#1e3856' : '#021C20' }} />
        </div>
      )
    },
    { 
      id: 'economy', 
      label: 'Ekonomi',
      icon: (active: boolean) => (
        <div className="relative shrink-0 size-[24px]">
          <ChartNoAxesCombined className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: active ? '#1e3856' : '#021C20' }} />
        </div>
      )
    },
    { 
      id: 'services', 
      label: 'Tjänster',
      icon: (active: boolean) => (
        <div className="relative shrink-0 size-[24px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24" style={{ opacity: active ? 1 : 0.5 }}>
            {(() => { const c = active ? '#1e3856' : '#021C20'; return (<>
            <rect height="10" rx="4" stroke={c} strokeWidth="2" width="8" x="11.9998" y="2.60547" />
            <path d="M9 7L20.5 7" stroke={c} strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p16d34100} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2470da00} stroke={c} strokeLinecap="round" strokeWidth="2" />
            <path d="M6 12.5V15.5" stroke={c} strokeLinecap="round" strokeWidth="2" />
            <path d="M19 20V21.5" stroke={c} strokeLinecap="round" strokeWidth="2" />
            </>); })()}
          </svg>
        </div>
      )
    },
    { 
      id: 'more', 
      label: 'Kontakt',
      icon: (active: boolean) => (
        <div className="relative shrink-0 size-[24px]">
          <MessageCircle className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: active ? '#1e3856' : '#021C20' }} />
        </div>
      )
    },
  ];

  const isActive = (itemId: string) => {
    if (itemId === 'economy') {
      return currentPage === 'economy' || currentPage === 'contracts' || currentPage === 'invoices' || currentPage === 'annual-statement';
    }
    if (itemId === 'more') {
      return currentPage === 'more';
    }
    return currentPage === itemId;
  };

  return (
    <div className="bg-white content-stretch flex items-center w-full border-t border-[#e4e4e4] relative z-[100]">
      {navItems.map((item) => {
        const active = isActive(item.id);
        return (
          <div 
            key={item.id}
            className="basis-0 content-stretch flex flex-col grow h-[80px] items-start justify-between min-h-px min-w-px relative shrink-0 cursor-pointer"
            onClick={() => onNavigate(item.id)}
          >
            <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
              <div 
                className="h-[4px] shrink-0 w-full transition-opacity"
                style={{ 
                  backgroundColor: '#1e3856',
                  opacity: active ? 1 : 0
                }}
              />
              <div className="flex-1 flex flex-col items-center justify-center gap-[4px] w-full">
                {item.icon(active)}
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#021c20] text-[11px] text-center transition-opacity"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    opacity: active ? 1 : 0.6
                  }}
                >
                  {item.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}