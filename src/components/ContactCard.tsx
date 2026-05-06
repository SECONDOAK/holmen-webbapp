import { Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ForestButton from './ForestButton';
import { KebabMenu, KebabMenuItem } from './KebabMenu';
import { HolmenModal, HolmenModalFooter } from './HolmenModal';
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
  properties?: string[];
  variant?: 'popup' | 'card' | 'menu' | 'user-access';
  contactInfo?: Array<{ icon: string; label: string }>;
  className?: string;
  onNavigateToContacts?: () => void;
  // For user-access variant
  statusText?: string;
  statusDate?: string;
  onDelete?: () => void;
  onResend?: () => void;
  pending?: boolean;
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
  properties,
  variant = 'card',
  contactInfo,
  className,
  onNavigateToContacts,
  statusText,
  statusDate,
  onDelete,
  onResend,
  pending
}: ContactCardProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
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
                <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] leading-[22px] relative shrink-0 text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {name}
                </p>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] relative shrink-0 text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {title}
                </p>
              </div>

              {/* Description */}
              {description && (
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[16px] text-[#021c20] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
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
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-white text-[14px] text-center uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
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
                <div className="flex-1 content-stretch flex flex-col gap-[8px] items-start justify-center">
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] leading-[22px] relative shrink-0 text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {name}
                    </p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] relative shrink-0 text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {title}
                    </p>
                  </div>
                  {description && (
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[16px] relative shrink-0 text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
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
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-white text-[14px] text-center uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
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
            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.5] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {name}
            </p>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Virkesköpare Hudiksvall / Ljusdal
            </p>
          </div>

          {description && (
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] leading-[1.5] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {description}
            </p>
          )}

          <div className="content-stretch flex flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <Phone className="w-4 h-4 text-[#1e3856]" />
              <a href="tel:010-45253 00" className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                010-452 53 00
              </a>
            </div>
            <div className="flex items-center gap-[8px]">
              <Mail className="w-4 h-4 text-[#1e3856]" />
              <a href={`mailto:${email}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Menu variant - same layout as popup (sans greeting), white background.
  if (variant === 'menu') {
    return (
      <div className={`bg-white flex gap-[16px] p-5 ${className || ''}`}>
        {/* Profile Image */}
        <img
          src={image}
          alt={name}
          className="w-[64px] h-[64px] rounded-full object-cover shrink-0"
        />

        {/* Contact Info */}
        <div className="content-stretch flex flex-col gap-[12px] grow min-w-0">
          <div className="content-stretch flex flex-col gap-[4px]">
            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.5] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {name}
            </p>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {role}{region ? ` • ${region}` : ''}
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <Phone className="w-4 h-4 text-[#1e3856] shrink-0" />
              <a href="tel:010-45253 00" className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#0f6bb6] hover:underline truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
                010-452 53 00
              </a>
            </div>
            <div className="flex items-center gap-[8px]">
              <Mail className="w-4 h-4 text-[#1e3856] shrink-0" />
              <a href={`mailto:${email}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#0f6bb6] hover:underline truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
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
      <div className={`flex gap-[16px] items-start p-[16px] bg-[#f7f7f7] border border-[var(--border-gray)] ${className}`}>
        {/* Profile Image or Icon */}
        {icon ? (
          <div
            className={`w-[64px] h-[64px] rounded-full flex items-center justify-center shrink-0 ${
              pending ? 'bg-white border border-[#e4e4e4]' : 'bg-[#1e3856]'
            }`}
          >
            <span
              className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[20px] ${
                pending ? 'text-[#021c20]' : 'text-white'
              }`}
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
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#021c20]"
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
          {statusText && (
            <p
              className={`font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] mt-1 ${pending ? 'text-[var(--text-secondary)]' : 'text-green-600'}`}
              style={{
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {statusText}{statusDate ? ` ${statusDate}` : ''}
            </p>
          )}
        </div>

        {/* Action Menu */}
        {(onResend || onDelete) && (() => {
          const menuItems: KebabMenuItem[] = [];
          if (onResend) menuItems.push({ label: 'Skicka inbjudan igen', onClick: onResend });
          if (onDelete) menuItems.push({
            label: pending ? 'Ta bort inbjudan' : 'Ta bort åtkomst',
            onClick: () => setConfirmDeleteOpen(true),
          });
          return <KebabMenu items={menuItems} />;
        })()}

        {onDelete && (
          <HolmenModal
            isOpen={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
            title={pending ? 'Ta bort inbjudan' : 'Ta bort åtkomst'}
          >
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[var(--text-primary)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {pending
                ? `Är du säker på att du vill ta bort inbjudan till ${name}?`
                : `Är du säker på att du vill ta bort ${name}s åtkomst?`}
            </p>
            <HolmenModalFooter>
              <ForestButton variant="white" onClick={() => setConfirmDeleteOpen(false)}>
                Avbryt
              </ForestButton>
              <ForestButton
                variant="danger"
                onClick={() => {
                  setConfirmDeleteOpen(false);
                  onDelete();
                }}
              >
                Ta bort
              </ForestButton>
            </HolmenModalFooter>
          </HolmenModal>
        )}
      </div>
    );
  }

  // Card variant - with gray background and border (for More page)
  return (
    <div className={`bg-[#f7f7f7] box-border content-stretch flex gap-[16px] p-[20px] relative ${className}`}>
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
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.5] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {name}
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {role}
          </p>
        </div>

        {properties && properties.length > 0 && (
          <div className="flex flex-wrap gap-[6px]">
            {properties.map((property) => (
              <span
                key={property}
                className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#1e3856] bg-white border border-[#e4e4e4] px-[8px] py-[2px] cursor-default select-none uppercase tracking-[0.5px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {property}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {description}
          </p>
        )}

        <div className="content-stretch flex flex-col gap-[8px]">
          {phone && (
            <div className="flex items-center gap-[8px]">
              <Phone className="w-4 h-4 text-[#1e3856]" />
              <a href={`tel:${phone?.replace(/\s/g, '')}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {phone}
              </a>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-[8px]">
              <Mail className="w-4 h-4 text-[#1e3856]" />
              <a href={`mailto:${email}`} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[#0f6bb6] hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}