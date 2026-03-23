import { MessageCircle, LayoutDashboard, Trees, ChartNoAxesCombined } from 'lucide-react';
import svgPaths from '../imports/svg-b657te3gpb';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function Icon({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <LayoutDashboard className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: '#1E3856' }} />
    </div>
  );
}

function Icon1({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <Trees className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: '#021C20' }} />
    </div>
  );
}

function Icon2({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <ChartNoAxesCombined className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: '#021C20' }} />
    </div>
  );
}

function Icon3({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24" style={{ opacity: active ? 1 : 0.5 }}>
        <rect height="10" rx="4" stroke="#021C20" strokeWidth="2" width="8" x="11.9998" y="2.60547" />
        <path d="M9 7L20.5 7" stroke="#021C20" strokeLinecap="round" strokeWidth="2" />
        <path d={svgPaths.p16d34100} stroke="#021C20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.p2470da00} stroke="#021C20" strokeLinecap="round" strokeWidth="2" />
        <path d="M6 12.5V15.5" stroke="#021C20" strokeLinecap="round" strokeWidth="2" />
        <path d="M19 20V21.5" stroke="#021C20" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Icon4({ active }: { active?: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <MessageCircle className="w-6 h-6" strokeWidth={2} style={{ opacity: active ? 1 : 0.5, color: '#021C20' }} />
    </div>
  );
}

function MenuItem({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <div 
      className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px] cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div aria-hidden="true" className={`absolute border-solid inset-0 pointer-events-none ${active ? 'border-[#1e3856] border-[0px_0px_3px]' : 'border-[#e4e4e4] border-[0px_0px_1px]'}`} />
      {icon}
      <p className={`font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content] ${active ? 'opacity-100' : 'opacity-60'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
        {label}
      </p>
    </div>
  );
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="bg-white h-full relative shrink-0 z-[95]" data-name="Side menu 2">
      <div className="content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit]">
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
          <MenuItem 
            icon={<Icon active={currentPage === 'overview'} />} 
            label="Start" 
            active={currentPage === 'overview'}
            onClick={() => onNavigate('overview')}
          />
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
          <MenuItem 
            icon={<Icon1 active={currentPage === 'properties'} />} 
            label="Fastigheter" 
            active={currentPage === 'properties'}
            onClick={() => onNavigate('properties')}
          />
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
          <MenuItem 
            icon={<Icon2 active={currentPage === 'economy'} />} 
            label="Ekonomi" 
            active={currentPage === 'economy'}
            onClick={() => onNavigate('economy')}
          />
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
          <MenuItem 
            icon={<Icon3 active={currentPage === 'services'} />} 
            label="Tjänster" 
            active={currentPage === 'services'}
            onClick={() => onNavigate('services')}
          />
        </div>
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
          <MenuItem 
            icon={<Icon4 active={currentPage === 'more'} />} 
            label="Kontakt" 
            active={currentPage === 'more'}
            onClick={() => onNavigate('more')}
          />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}