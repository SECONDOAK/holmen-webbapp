import { useProfile } from '../contexts/ProfileContext';
import { Check } from 'lucide-react';

interface UserSwitcherProps {
  onClose?: () => void;
}

export default function UserSwitcher({ onClose }: UserSwitcherProps) {
  const { currentProfile, availableProfiles, switchProfile } = useProfile();

  const handleUserSwitch = (userId: string) => {
    if (userId !== currentProfile.id) {
      switchProfile(userId);
      onClose?.();
      // Reload the page to reset all state
      window.location.reload();
    }
  };

  return (
    <div className="bg-white overflow-hidden rounded-none relative border-none shadow-lg w-[320px]">
      <div className="flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e4e4e4]">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Växla profil
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666] mt-1" style={{ fontVariationSettings: "'wdth' 100" }}>
            Välj vilken profil du vill visa
          </p>
        </div>

        {/* User list */}
        <div className="flex flex-col">
          {availableProfiles.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSwitch(user.id)}
              className="flex items-center gap-3 px-6 py-4 hover:bg-[#f7f7f7] transition-colors cursor-pointer border-b border-[#e4e4e4] last:border-b-0"
            >
              {/* Avatar circle with initials */}
              <div className="relative rounded-full size-[48px] shrink-0 bg-[#1e3856] flex items-center justify-center">
                <span className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[18px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              {/* User info */}
              <div className="flex-1 flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {user.name}
                  </p>
                  {!user.isOwn && (
                    <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-[#666666] bg-[#f0f0f0] px-2 py-0.5 rounded-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Delas med dig
                    </span>
                  )}
                </div>
              </div>

              {/* Check mark for current user */}
              {currentProfile.id === user.id && (
                <div className="shrink-0">
                  <Check className="h-6 w-6 text-[#1e3856]" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Info footer */}
        <div className="px-6 py-4 bg-[#f7f7f7] border-t border-[#e4e4e4]">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-[#666666] leading-[1.5]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Fastigheter och data är separata för varje profil.
          </p>
        </div>
      </div>
    </div>
  );
}