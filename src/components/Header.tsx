import { User, Users, LogOut, Check, Settings, Palette } from "lucide-react";
import imgImage from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgLogo from "figma:asset/76f526957f18da0df0f0887cfaf15d095ade02ce.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useProfile } from "../contexts/ProfileContext";
import ContactCard from "./ContactCard";
import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Custom hook for click-outside detection.
 * Closes the dropdown when clicking outside the container ref.
 */
function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;
    
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    // Use setTimeout to avoid the click that opened the menu from immediately closing it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick, true);
      document.addEventListener('keydown', handleKeyDown);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onClose, isOpen]);
}

/* ===== Virkesköpare Contact Popover (Desktop) ===== */
function ContactPopover({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="box-border content-stretch flex gap-[8px] items-center pl-[6px] pr-[16px] py-[6px] relative shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="pointer-events-none relative rounded-[1000px] size-[40px]" data-name="image">
              <ImageWithFallback alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={imgImage} />
              <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[1000px]" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-center leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            Din virkesköpare
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[#cbced4]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Daniel Larsson
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-[380px] bg-white p-0 overflow-hidden shadow-lg border border-[#e4e4e4] z-[9999]">
          {/* Arrow pointing up */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white" />
          </div>
          <div className="flex flex-col">
            <ContactCard
              name="Daniel Larsson"
              role="Virkesköpare Hudiksvall / Ljusdal"
              phone="123 456 78 90"
              email="daniel.larsson@holmen.com"
              image={imgImage}
              description="Hej, jag heter Daniel. Hör av dig om du har frågor om din skog, virkesaffärer eller om du vill veta mer om hur Holmen kan hjälpa dig."
              variant="popup"
            />
            {/* Footer */}
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate?.('more');
              }}
              className="border-t border-[#e4e4e4] px-6 py-3 w-full text-center font-['IBM_Plex_Sans',sans-serif] font-medium text-[14px] text-[#1e3856] hover:bg-[#f7f7f7] focus:outline-none transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Visa alla kontakter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Mobile Contact Popover ===== */
function MobileContactPopover({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="relative cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="pointer-events-none relative rounded-[1000px] size-[40px]" data-name="image">
          <ImageWithFallback alt="Virkesköpare" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={imgImage} />
          <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[1000px]" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-[calc(100vw-32px)] max-w-[380px] bg-white p-0 overflow-hidden shadow-lg border border-[#e4e4e4] z-[9999]">
          {/* Arrow pointing up */}
          <div className="absolute -top-3 left-[30px]">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white" />
          </div>
          <div className="flex flex-col">
            <ContactCard
              name="Daniel Larsson"
              role="Virkesköpare Hudiksvall / Ljusdal"
              phone="123 456 78 90"
              email="daniel.larsson@holmen.com"
              image={imgImage}
              description="Hej, jag heter Daniel. Hör av dig om du har frågor om din skog, virkesaffärer eller om du vill veta mer om hur Holmen kan hjälpa dig."
              variant="popup"
            />
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate?.('more');
              }}
              className="border-t border-[#e4e4e4] px-6 py-3 w-full text-center font-['IBM_Plex_Sans',sans-serif] font-medium text-[14px] text-[#1e3856] hover:bg-[#f7f7f7] focus:outline-none transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Visa alla kontakter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Desktop User Profile Dropdown ===== */
function DesktopUserDropdown({ onNavigate, onLogout }: { onNavigate?: (page: string) => void; onLogout?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentProfile, availableProfiles, switchProfile, loggedInUser } = useProfile();

  const close = useCallback(() => {
    setIsOpen(false);
    setShowProfileSwitcher(false);
  }, []);
  useClickOutside(containerRef, close, isOpen);

  const handleProfileSwitch = (profileId: string) => {
    if (profileId !== currentProfile.id) {
      switchProfile(profileId);
      setTimeout(() => {
        setShowProfileSwitcher(false);
        setIsOpen(false);
      }, 1000);
    }
  };

  const handleNavigate = (page: string) => {
    setIsOpen(false);
    setShowProfileSwitcher(false);
    onNavigate?.(page);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <div
        className="content-stretch flex gap-[8px] items-center relative rounded-[100px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {/* Name & email */}
        <div className="content-stretch flex flex-col items-end leading-[normal] relative shrink-0 text-[14px] text-nowrap whitespace-pre">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0 text-white" style={{ fontVariationSettings: "'wdth' 100" }}>{loggedInUser.name}</p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[#cbced4]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {loggedInUser.email}
          </p>
        </div>
        {/* Avatar */}
        <div className="relative rounded-full size-[40px] shrink-0 bg-[#1e3856] flex items-center justify-center border border-white">
          <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
            {loggedInUser.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-[320px] bg-white shadow-md z-[9999] border border-[#e4e4e4]">
          {!showProfileSwitcher ? (
            <div className="flex flex-col">
              <button
                onClick={() => handleNavigate('account')}
                className="px-4 py-3 border-b border-[#e4e4e4] text-left w-full hover:bg-[#f7f7f7] transition-colors cursor-pointer font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Mitt konto
              </button>
              <button
                onClick={() => setShowProfileSwitcher(true)}
                className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Växla konto
              </button>
              <button
                onClick={() => handleNavigate('admin-tools')}
                className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Adminverktyg
              </button>
              <button
                onClick={() => handleNavigate('design-library')}
                className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Designbibliotek
              </button>
              <button
                className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
                onClick={handleLogout}
              >
                Logga ut
              </button>
            </div>
          ) : (
            <ProfileSwitcherPanel
              availableProfiles={availableProfiles}
              currentProfile={currentProfile}
              loggedInUser={loggedInUser}
              onProfileSwitch={handleProfileSwitch}
              onBack={() => setShowProfileSwitcher(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ===== Mobile User Profile Dropdown ===== */
function MobileUserDropdown({ onNavigate, onLogout }: { onNavigate?: (page: string) => void; onLogout?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentProfile, availableProfiles, switchProfile, loggedInUser } = useProfile();

  const close = useCallback(() => {
    setIsOpen(false);
    setShowProfileSwitcher(false);
  }, []);
  useClickOutside(containerRef, close, isOpen);

  const handleProfileSwitch = (profileId: string) => {
    if (profileId !== currentProfile.id) {
      switchProfile(profileId);
      setTimeout(() => {
        setShowProfileSwitcher(false);
        setIsOpen(false);
      }, 1000);
    }
  };

  const handleNavigate = (page: string) => {
    setIsOpen(false);
    setShowProfileSwitcher(false);
    onNavigate?.(page);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <div
        className="content-stretch flex gap-[8px] items-center relative rounded-[100px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="relative rounded-full size-[40px] shrink-0 bg-[#1e3856] flex items-center justify-center border border-white">
          <span className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
            {currentProfile.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-[320px] bg-white shadow-md z-[9999] border border-[#e4e4e4]">
          {!showProfileSwitcher ? (
            <>
              {/* Header with user info */}
              <div className="px-4 py-3 border-b border-[#e4e4e4]">
                <div className="flex items-center gap-3">
                  <div className="relative rounded-full size-[40px] shrink-0 bg-[#1e3856] flex items-center justify-center">
                    <span className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {loggedInUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {loggedInUser.name}
                    </p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {loggedInUser.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="flex flex-col">
                <button
                  onClick={() => handleNavigate('account')}
                  className="px-4 py-3 border-b border-[#e4e4e4] text-left w-full hover:bg-[#f7f7f7] transition-colors cursor-pointer font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Mitt konto
                </button>
                <button
                  onClick={() => setShowProfileSwitcher(true)}
                  className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Växla konto
                </button>
                <button
                  onClick={() => handleNavigate('admin-tools')}
                  className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Adminverktyg
                </button>
                <button
                  onClick={() => handleNavigate('design-library')}
                  className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Designbibliotek
                </button>
                <button
                  className="px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer text-left w-full font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  onClick={handleLogout}
                >
                  Logga ut
                </button>
              </div>
            </>
          ) : (
            <ProfileSwitcherPanel
              availableProfiles={availableProfiles}
              currentProfile={currentProfile}
              loggedInUser={loggedInUser}
              onProfileSwitch={handleProfileSwitch}
              onBack={() => setShowProfileSwitcher(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ===== Shared Profile Switcher Panel ===== */
function ProfileSwitcherPanel({
  availableProfiles,
  currentProfile,
  loggedInUser,
  onProfileSwitch,
  onBack,
}: {
  availableProfiles: any[];
  currentProfile: any;
  loggedInUser: any;
  onProfileSwitch: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#e4e4e4]">
        <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Växla konto
        </p>
        <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Välj vilket konto du vill visa
        </p>
      </div>

      {/* Profile list */}
      <div className="flex flex-col">
        {availableProfiles.map((profile: any) => {
          const isActive = currentProfile.id === profile.id;
          return (
            <button
              key={profile.id}
              onClick={() => onProfileSwitch(profile.id)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] last:border-b-0"
            >
              {isActive ? (
                <div className="rounded-full size-[40px] shrink-0 bg-[#1e3856] flex items-center justify-center">
                  <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {profile.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              ) : (
                <div className="rounded-full size-[40px] shrink-0 border border-[#e4e4e4] flex items-center justify-center">
                  <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {profile.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <p className={`font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] ${isActive ? 'text-[#1e3856]' : 'text-[#021c20]'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
                    {profile.name}
                  </p>
                  {!profile.isOwn && (
                    <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[11px] text-[#666666] bg-[#f0f0f0] px-2 py-0.5" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Delas med dig
                    </span>
                  )}
                </div>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[13px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {profile.email}
                </p>
              </div>
              {isActive && <Check className="h-5 w-5 text-[#1e3856] shrink-0" strokeWidth={2.5} />}
            </button>
          );
        })}
      </div>

      {/* Back button */}
      <div className="border-t border-[#e4e4e4]">
        <button
          onClick={onBack}
          className="w-full px-4 py-3 text-left hover:bg-[#f7f7f7] transition-colors font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {'\u2190'} Tillbaka
        </button>
      </div>
    </div>
  );
}

/* ===== Vertical Separator ===== */
function VerticalSeparator() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="bg-[#e4e4e4] h-[32px] opacity-50 shrink-0 w-px" />
    </div>
  );
}

/* ===== Main Header ===== */
interface HeaderProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function Header({ onNavigate, onLogout }: HeaderProps) {
  return (
    <div className="bg-[#1e3856] box-border content-stretch flex items-center justify-between px-[16px] md:px-[40px] py-[10px] relative self-stretch shrink-0 w-full z-[100]" data-name="Header">
      {/* Mobile Layout - Virkesköpare button on left */}
      <div className="md:hidden flex items-center justify-start shrink-0">
        <MobileContactPopover onNavigate={onNavigate} />
      </div>

      {/* Desktop Logo (left side on desktop) */}
      <div className="hidden md:block h-[21px] relative shrink-0 w-[140px] cursor-pointer" data-name="image" onClick={() => onNavigate?.('overview')}>
        <ImageWithFallback alt="Holmen" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
      </div>

      {/* Mobile Logo (center on mobile) */}
      <div className="md:hidden flex-1 flex items-center justify-center cursor-pointer" onClick={() => onNavigate?.('overview')}>
        <div className="h-[21px] relative w-[140px]" data-name="image">
          <ImageWithFallback alt="Holmen" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
        </div>
      </div>

      {/* Mobile User Icon (right side on mobile) */}
      <div className="md:hidden flex items-center justify-end shrink-0">
        <MobileUserDropdown onNavigate={onNavigate} onLogout={onLogout} />
      </div>

      {/* Desktop right side: Virkesköpare + separator + User dropdown */}
      <div className="hidden md:flex items-center gap-[16px]">
        <ContactPopover onNavigate={onNavigate} />
        <VerticalSeparator />
        <DesktopUserDropdown onNavigate={onNavigate} onLogout={onLogout} />
      </div>
    </div>
  );
}
