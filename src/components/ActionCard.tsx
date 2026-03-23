import React, { ReactNode, useState } from 'react';
import ForestButton from './ForestButton';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';

interface DateBlockProps {
  month: string;
  day: string;
  year: string;
  monthColor?: string;
  backgroundColor?: string;
}

interface ActionCardButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'white' | 'danger';
  onClick?: () => void;
}

interface ActionCardProps {
  // Header section
  icon?: ReactNode;
  iconBackgroundColor?: string;
  dateBlock?: DateBlockProps;
  title: string;
  tooltipText?: string;
  
  // Content section
  description?: string | ReactNode;
  metadata?: Array<string | { text: string; link?: boolean }>;
  
  // Actions
  buttons?: ActionCardButton[];
  
  // Optional custom content
  customContent?: ReactNode;
  
  // Styling
  className?: string;
  borderless?: boolean;
  titleSize?: string;
}

export function ActionCard({
  icon,
  iconBackgroundColor = '#e4f5f5',
  dateBlock,
  title,
  tooltipText,
  description,
  metadata,
  buttons,
  customContent,
  className = '',
  borderless = false,
  titleSize,
}: ActionCardProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className={`bg-white relative h-full ${borderless ? '' : 'shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]'} ${className}`}>
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] w-full">
        {/* Header with icon/date and title */}
        <div className="relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[var(--border-gray)] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className={`box-border content-stretch flex ${borderless ? 'gap-3' : 'gap-[16px]'} items-center ${borderless ? '' : 'justify-center'} ${borderless ? 'px-[16px] py-[12px]' : 'px-[16px] py-[12px] md:px-[24px] md:py-[16px]'} relative w-full`}>
              {/* Icon or Date Block */}
              {dateBlock ? (
                <div 
                  className="relative shrink-0 size-[100px] z-[2]" 
                  style={{ backgroundColor: dateBlock.backgroundColor || '#e4f5f5' }}
                >
                  <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-1/2 translate-y-[-50%]">
                    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold items-center leading-[normal] relative shrink-0 text-center text-nowrap uppercase whitespace-pre">
                      <p 
                        className="relative shrink-0 text-[14px]" 
                        style={{ 
                          fontVariationSettings: "'wdth' 100",
                          color: dateBlock.monthColor || '#663336'
                        }}
                      >
                        {dateBlock.month}
                      </p>
                      <p 
                        className="relative shrink-0 text-[#0f233b] text-[40px]" 
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {dateBlock.day}
                      </p>
                      <p 
                        className="relative shrink-0 text-[#0f233b] text-[14px]" 
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {dateBlock.year}
                      </p>
                    </div>
                  </div>
                </div>
              ) : icon ? (
                <div 
                  className="content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]"
                  style={{ backgroundColor: iconBackgroundColor }}
                >
                  {icon}
                </div>
              ) : null}
              
              {/* Title */}
              <div className={`basis-0 flex items-center gap-1 font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold grow leading-[22px] min-h-px min-w-px relative shrink-0 text-[#021c20] ${titleSize || 'text-[16px] md:text-[18px]'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
                <span>{title}</span>
                {tooltipText && (
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
            </div>
          </div>
        </div>

        {/* Content section */}
        {customContent ? (
          customContent
        ) : (
          <div className="relative shrink-0 w-full">
            <div className="size-full">
              <div className={`box-border content-stretch flex flex-col gap-[16px] items-start ${borderless ? 'p-[16px]' : 'p-[16px] md:p-[24px]'} relative w-full`}>
                {/* Description or Metadata */}
                {metadata && metadata.length > 0 ? (
                  <div className="content-stretch flex gap-[12px] min-h-[64px] items-start relative shrink-0 w-full">
                    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start justify-end min-h-px min-w-px relative shrink-0">
                      <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full">
                        {metadata.map((item, index) => {
                          const isString = typeof item === 'string';
                          const showDivider = index < metadata.length - 1 && isString;
                          
                          return (
                            <div key={index} className="flex items-center gap-[8px]">
                              {isString ? (
                                <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[rgba(2,28,32,0.9)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  {item}
                                </p>
                              ) : (
                                <p 
                                  className={`font-['IBM_Plex_Sans:${item.link ? 'Medium' : 'SemiBold'}',sans-serif] font-${item.link ? 'medium' : 'semibold'} leading-${item.link ? '[normal]' : '[22px]'} relative shrink-0 text-[16px] ${item.link ? 'text-[#0f6bb6]' : 'text-[rgba(2,28,32,0.9)]'} text-nowrap whitespace-pre`}
                                  style={{ fontVariationSettings: "'wdth' 100" }}
                                >
                                  {item.text}
                                </p>
                              )}
                              {showDivider && (
                                <div className="bg-[#e4e4e4] h-[24px] shrink-0 w-px" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : description ? (
                  typeof description === 'string' ? (
                    dateBlock ? (
                      <div className="relative shrink-0 w-full">
                        <div className="flex flex-row items-center size-full">
                          <div className="basis-0 box-border content-stretch flex flex-col gap-[12px] grow items-start max-h-[192px] min-h-px min-w-px pb-0 pt-px px-0 relative shrink-0 text-[#021c20]">
                            <p className="-webkit-box font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                              {description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal min-h-[64px] leading-[normal] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {description}
                      </p>
                    )
                  ) : (
                    description
                  )
                ) : null}

                {/* Buttons */}
                {buttons && buttons.length > 0 && (
                  <div className={`content-stretch flex flex-col ${borderless ? '' : 'lg:flex-row lg:flex-wrap'} gap-[16px] items-start relative shrink-0 w-full`}>
                    {buttons.map((button, index) => (
                      <ForestButton
                        key={index}
                        variant={button.variant || 'primary'}
                        onClick={button.onClick}
                        className="w-full lg:w-auto"
                      >
                        {button.label}
                      </ForestButton>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {!borderless && <div aria-hidden="true" className="absolute border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />}
    </div>
  );
}

export default ActionCard;