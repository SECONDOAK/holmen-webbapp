import svgPaths from "../imports/svg-vm1sobzh2f";
import { Info } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';

interface StatCardProps {
  label: string;
  value: string;
  showInfoIcon?: boolean;
  iconType?: 'info' | 'question';
  valueColor?: string;
  tooltipText?: string;
}

export default function StatCard({ 
  label, 
  value, 
  showInfoIcon = true, 
  iconType = 'info',
  valueColor = '#32412a',
  tooltipText
}: StatCardProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] md:gap-[8px] items-start px-[14px] py-[12px] md:p-[24px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-start relative w-full">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.25] md:leading-[normal] relative min-w-0 text-[11px] md:text-[12px] text-[#021c20] uppercase tracking-[0.4px] md:tracking-[0.5px] opacity-70 break-words"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {label}
            </p>
            {showInfoIcon && tooltipText && (
              <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen} delayDuration={100}>
                <TooltipTrigger asChild>
                  <button 
                    className="inline-flex items-center justify-center shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTooltipOpen(!isTooltipOpen);
                    }}
                    onMouseEnter={() => setIsTooltipOpen(true)}
                    onMouseLeave={() => setIsTooltipOpen(false)}
                  >
                    <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  align="center" 
                  className="max-w-[280px] z-[9999] text-center"
                  onPointerDownOutside={() => setIsTooltipOpen(false)}
                >
                  {tooltipText}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[18px] md:text-[20px]"
            style={{
              fontVariationSettings: "'wdth' 100",
              color: valueColor
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}