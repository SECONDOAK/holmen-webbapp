import { Phone, Mail, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ForestButton from './ForestButton';
import svgPaths from '../imports/svg-7zwf4k3sqm';

export interface ContactCardProps {
  name: string;
  role?: string;
  title?: string;
  region?: string;
  phone?: string;
  email?: string;
  image?: string;
  icon?: React.ReactNode;
  description?: string;
  variant?: 'popup' | 'card' | 'menu' | 'user-access';
  contactInfo?: Array<{ icon: string; label: string }>;
  className?: string;
  onNavigateToContacts?: () => void;
  // For user-access variant
  statusText?: string;
  statusDate?: string;
  onDelete?: () => void;
}

export default function ContactCard({
  name,
  role,
  title,
  region,
  phone,
  email,
  image,
  icon,
  description,
  variant = 'card',
  contactInfo,
  className,
  onNavigateToContacts,
  statusText,
  statusDate,
  onDelete
}: ContactCardProps) {
  // Overview/homepage variant - large image with green action buttons
  if (contactInfo) {
    return (
      <div className={`bg-white relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] h-full ${className || ''}`}>
        <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
            {/* Mobile/narrow: Vertical layout with image, name, title first */}
            <div className="lg:hidden content-stretch flex flex-col gap-[16px] items-center text-center relative shrink-0 w-full">
              {/* Image centered */}
              {icon ? (
                <div className="w-[140px] h-[140px] rounded-full bg-[#1e3856] flex items-center justify-center shrink-0 text-white">
                  {icon}
                </div>
              ) : (
                <div className="pointer-events-none relative rounded-[1000px] shrink-0 size-[140px]" data-name="image">
                  <img alt={name} className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={image} />
                  <div aria-hidden="true" className="absolute border border-neutral-300 border-solid inset-0 rounded-[1000px]" />
                </div>
              )}
              
              {/* Name and title */}
              <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
                <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[18px] leading-[22px] relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {name}
                </p>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {title}
                </p>
              </div>
              
              {/* Description */}
              {description && (
                <p className="font-['IBM_Plex_Sans:Italic',sans-serif] font-normal italic leading-[normal] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {description}
                </p>
              )}
              
              {/* Contact buttons */}
              <div className="content-start flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-[#1e3856] hover:bg-[#2a4a6a] transition-colors cursor-pointer w-full">
                    <div className="overflow-clip size-full">
                      <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
                        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
                          {info.icon === 'material-symbols:phone-iphone' ? (
                            <Phone className="w-6 h-6 shrink-0 text-white" strokeWidth={2} />
                          ) : (
                            <Mail className="w-6 h-6 shrink-0 text-white" strokeWidth={2} />
                          )}
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-white text-[15px] text-center uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {info.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop/wide: Horizontal layout (original) */}
            <div className="hidden lg:flex content-stretch flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="flex gap-[16px] items-start w-full">
                {icon ? (
                  <div className="w-[140px] h-[140px] rounded-full bg-[#1e3856] flex items-center justify-center shrink-0 text-white">
                    {icon}
                  </div>
                ) : (
                  <div className="pointer-events-none relative rounded-[1000px] shrink-0 size-[140px]" data-name="image">
                    <img alt={name} className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={image} />
                    <div aria-hidden="true" className="absolute border border-neutral-300 border-solid inset-0 rounded-[1000px]" />
                  </div>
                )}
                <div className="flex-1 content-stretch flex flex-col gap-[8px] items-start justify-center text-[16px]">
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
                    <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[18px] leading-[22px] relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {name}
                    </p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {title}
                    </p>
                  </div>
                  {description && (
                    <p className="font-['IBM_Plex_Sans:Italic',sans-serif] font-normal italic leading-[normal] relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {description}
                    </p>
                  )}
                </div>
              </div>
              <div className="content-start flex flex-row gap-[12px] items-start relative shrink-0 w-full">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-[#1e3856] hover:bg-[#2a4a6a] transition-colors cursor-pointer flex-1">
                    <div className="min-w-inherit overflow-clip rounded-[inherit] size-full">
                      <div className="box-border content-stretch flex flex-col gap-[10px] items-start min-w-inherit px-[16px] py-[8px] relative w-full">
                        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
                          {info.icon === 'material-symbols:phone-iphone' ? (
                            <Phone className="w-6 h-6 shrink-0 text-white" strokeWidth={2} />
                          ) : (
                            <Mail className="w-6 h-6 shrink-0 text-white" strokeWidth={2} />
                          )}
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-white text-[15px] text-center uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {info.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'popup') {
    // Navbar popup variant - similar to card layout but without background/border
    return (
      <div className="flex gap-[16px] p-5">
        {/* Profile Image */}
        <img 
          src={image} 
          alt={name}
          className="w-[64px] h-[64px] rounded-full object-cover shrink-0"
        />

        {/* Contact Info */}
        <div className="content-stretch flex flex-col gap-[12px] grow">
          <div className="content-stretch flex flex-col gap-[4px]">
            <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[18px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {name}
            </p>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Virkesköpare Hudiksvall / Ljusdal
            </p>
          </div>

          {description && (
            <p className="font-['IBM_Plex_Sans:Italic',sans-serif] font-normal italic text-[13px] leading-[1.5] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {description}
            </p>
          )}

          <div className="content-stretch flex flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <Phone className="w-4 h-4 text-[#1e3856]" />
              <a href="tel:010-45253 00" className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                010-452 53 00
              </a>
            </div>
            <div className="flex items-center gap-[8px]">
              <Mail className="w-4 h-4 text-[#1e3856]" />
              <a href={`mailto:${email}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Menu variant - white background, no border (for map drawer/menu)
  if (variant === 'menu') {
    return (
      <div className={`bg-white box-border content-stretch flex gap-[16px] p-[16px] relative w-full ${className}`}>
        {/* Profile Image */}
        <img 
          src={image} 
          alt={name}
          className="w-[64px] h-[64px] rounded-full object-cover shrink-0"
        />

        {/* Contact Info */}
        <div className="content-stretch flex flex-col gap-[12px] grow">
          <div className="content-stretch flex flex-col gap-[4px]">
            <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {name}
            </p>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {role}{region ? ` • ${region}` : ''}
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <Phone className="w-4 h-4 text-[#1e3856]" />
              <a href="tel:010-45253 00" className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                010-452 53 00
              </a>
            </div>
            <div className="flex items-center gap-[8px]">
              <Mail className="w-4 h-4 text-[#1e3856]" />
              <a href={`mailto:${email}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User-access variant - for user permissions list
  if (variant === 'user-access') {
    return (
      <div className={`flex gap-[16px] items-start p-[16px] border-b border-[#e4e4e4] last:border-b-0 ${className}`}>
        {/* Profile Image or Icon */}
        {icon ? (
          <div className="w-[64px] h-[64px] rounded-full bg-[#1e3856] flex items-center justify-center shrink-0">
            <span
              className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-white text-[20px]"
              style={{
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {icon}
            </span>
          </div>
        ) : (
          <img 
            src={image} 
            alt={name}
            className="w-[64px] h-[64px] rounded-full object-cover shrink-0"
          />
        )}

        {/* User Info */}
        <div className="flex-1">
          <p
            className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[16px] text-[#021c20]"
            style={{
              fontVariationSettings: "'wdth' 100",
            }}
          >
            {name}
          </p>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)]"
            style={{
              fontVariationSettings: "'wdth' 100",
            }}
          >
            {role}
          </p>
          {statusText && statusDate && (
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-green-600 mt-1"
              style={{
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {statusText} {statusDate}
            </p>
          )}
        </div>

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 transition-colors shrink-0"
            title="Ta bort åtkomst"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  // Card variant - with gray background and border (for More page)
  return (
    <div className={`bg-[#f7f7f7] box-border content-stretch flex gap-[16px] p-[20px] relative hover:bg-[#efefef] transition-colors ${className}`}>
      <div aria-hidden="true" className="absolute border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
      
      {/* Profile Image or Icon */}
      {icon ? (
        <div className="w-[64px] h-[64px] rounded-full bg-[#1e3856] flex items-center justify-center shrink-0 text-white">
          {icon}
        </div>
      ) : (
        <img 
          src={image} 
          alt={name}
          className="w-[64px] h-[64px] rounded-full object-cover shrink-0"
        />
      )}

      {/* Contact Info */}
      <div className="content-stretch flex flex-col gap-[12px] grow">
        <div className="content-stretch flex flex-col gap-[4px]">
          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[18px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {name}
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {role}
          </p>
          {description && (
            <p className="font-['IBM_Plex_Sans:Italic',sans-serif] font-normal italic leading-[normal] text-[14px] text-[#021c20] mt-[4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="content-stretch flex flex-col gap-[8px]">
          {phone && (
            <div className="flex items-center gap-[8px]">
              <Phone className="w-4 h-4 text-[#1e3856]" />
              <a href={`tel:${phone?.replace(/\s/g, '')}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {phone}
              </a>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-[8px]">
              <Mail className="w-4 h-4 text-[#1e3856]" />
              <a href={`mailto:${email}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}