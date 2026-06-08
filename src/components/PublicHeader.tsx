import { useEffect, useRef, useState } from 'react';
import imgLogo from 'figma:asset/76f526957f18da0df0f0887cfaf15d095ade02ce.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ForestButton from './ForestButton';

interface PublicHeaderProps {
  onLogin: () => void;
  /**
   * När true: headern är fixed över sidan, transparent ovanpå hero,
   * får en mörk semi-transparent bakgrund med backdrop-blur när man
   * scrollat förbi hero, och göms automatiskt på scroll ner /
   * visas på scroll upp. Default är false — solid navy bakgrund
   * + sticky-beteende utan auto-hide.
   */
  transparent?: boolean;
}

/**
 * Publik header för landningssidan — tunn variant av `Header.tsx` utan
 * profil-meny eller virkesköpar-info. Enda interaktiva element är
 * Logga in-knappen.
 *
 * Mörk navy bakgrund (#1e3856) som matchar inloggad-headern så hela
 * appen känns visuellt sammanhållen. Logotypen är vit-på-transparent
 * och fungerar därför direkt utan invert.
 *
 * Med `transparent={true}` aktiveras tre beteenden för landningssidan:
 *   1. Initialt transparent ovanpå hero så bilden bleder upp under.
 *   2. När man scrollat förbi hero får headern en mörk semi-transparent
 *      bakgrund med backdrop-blur så innehåll bakom blurras snyggt.
 *   3. Auto-hide: scrollar man neråt göms headern (translate-y-full),
 *      scrollar man uppåt visas den igen. Ger mer visuellt utrymme.
 */
export default function PublicHeader({ onLogin, transparent = false }: PublicHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Auto-hide + scrolled-state är bara meningsfullt i transparent-läget
    // (landningssidan). I inloggat läge kör vi standardbeteendet.
    if (!transparent) return;

    // OBS: globals.css satter html/body/#root till height: 100% vilket
    // gor att body blir scroll-containern istallet for document. Darfor
    // lyssnar vi pa document och laser body.scrollTop med fallback till
    // documentElement.scrollTop / window.scrollY for sakerhets skull.
    const getScrollY = () =>
      document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || 0;

    const handleScroll = () => {
      const y = getScrollY();

      // Aktivera scrolled-state (mörk blur-bg) när man passerat hero-toppen.
      setScrolled(y > 80);

      // Auto-hide: bara aktivera efter att vi scrollat förbi en threshold
      // så headern inte fladdrar när man precis bottnar nere vid hero.
      if (y > 120 && y > lastScrollY.current) {
        setHidden(true);
      } else if (y < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };

    // Lyssna pa bade window och document for att tacka in alla scroll-
    // kontexter (window funkar om document scrollar, scroll-event pa
    // document bubblar fran body i de flesta browsers).
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, [transparent]);

  const positionClasses = transparent
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-[#1e3856]/70 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`
    : 'sticky top-0 z-50 bg-[#1e3856]';
  return (
    <header className={`${positionClasses} w-full`}>
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
