import { useProfile } from '../contexts/ProfileContext';
import { AlertCircle, X } from 'lucide-react';

export function ProfileBanner() {
  const { currentProfile, loggedInUser, switchProfile } = useProfile();
  
  // Only show banner when viewing someone else's profile
  if (currentProfile.isOwn) {
    return null;
  }
  
  const handleSwitchBack = () => {
    // Switch back to own profile
    switchProfile(loggedInUser.id);
  };
  
  return (
    <div className="bg-[#fff3cd] border-b border-[#e4e4e4] px-[16px] md:px-[40px] py-[12px] relative w-full z-[99]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-[#856404] shrink-0" />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] md:text-[15px] text-[#856404]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Du visar {currentProfile.name}s profil
          </p>
        </div>
        <button
          onClick={handleSwitchBack}
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] md:text-[14px] text-[#856404] hover:text-[#533f03] underline whitespace-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Växla till min profil
        </button>
      </div>
    </div>
  );
}