import imgLogo from 'figma:asset/76f526957f18da0df0f0887cfaf15d095ade02ce.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ForestButton from './ForestButton';

interface PublicHeaderProps {
  onLogin: () => void;
}

/**
 * Publik header för landningssidan — tunn variant av `Header.tsx` utan
 * profil-meny eller virkesköpar-info. Enda interaktiva element är
 * Logga in-knappen.
 *
 * Mörk navy bakgrund (#1e3856) som matchar inloggad-headern så hela
 * appen känns visuellt sammanhållen. Logotypen är vit-på-transparent
 * och fungerar därför direkt utan invert.
 */
export default function PublicHeader({ onLogin }: PublicHeaderProps) {
  return (
    <header className="bg-[#1e3856] sticky top-0 z-50 w-full">
      <div className="max-w-[1200px] mx-auto h-[64px] md:h-[72px] flex items-center justify-between px-[16px] md:px-[40px]">
        {/* Logo — Holmen-märket (vit-på-transparent). Samma fasta storlek
            som inloggad-headern: 140×21px så proportionerna är identiska. */}
        <div className="h-[21px] relative w-[140px] shrink-0">
          <ImageWithFallback
            src={imgLogo}
            alt="Holmen"
            className="absolute inset-0 max-w-none object-cover size-full pointer-events-none"
          />
        </div>

        <ForestButton variant="white" size="small" onClick={onLogin}>
          Logga in
        </ForestButton>
      </div>
    </header>
  );
}
