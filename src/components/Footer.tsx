import imgHolmenLogo from "figma:asset/76f526957f18da0df0f0887cfaf15d095ade02ce.png";

export function Footer() {
  return (
    <footer className="bg-[#1e3856] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-8">
          {/* Logo */}
          <div className="mb-8 text-center md:text-left">
            <img 
              src={imgHolmenLogo} 
              alt="Holmen" 
              className="h-5 brightness-0 invert inline-block md:inline"
            />
          </div>

          {/* Information links */}
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-x-8 md:gap-y-2 items-center md:items-start">
              <a 
                href="https://www.holmen.com/sv/om-holmen/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-white hover:text-white/80 transition-colors" 
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Om Holmen
              </a>
              <a 
                href="https://www.holmen.com/sv/hallbarhet/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-white hover:text-white/80 transition-colors" 
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Hållbarhet
              </a>
              <a href="#faq" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-white hover:text-white/80 transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                Frågor & svar
              </a>
              <a href="#kontakt" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-white hover:text-white/80 transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                Kontakt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-white/60" style={{ fontVariationSettings: "'wdth' 100" }}>
              © {new Date().getFullYear()} Holmen AB. Alla rättigheter förbehållna.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-white/60 hover:text-white transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                Integritetspolicy
              </a>
              <a href="#" className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-white/60 hover:text-white transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                Användarvillkor
              </a>
              <a href="#" className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-white/60 hover:text-white transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}