/**
 * Shared tab strip for the Ekonomi section. Renders five tabs:
 * Översikt · Kontrakt · Kontrakt (Gammal) · Fakturor · Årsbesked
 *
 * Navigates by dispatching the custom 'navigate' event (the app's
 * routing mechanism). The currently active tab gets a 3px bottom
 * border in brand blue (#1e3856); inactive tabs use opacity-60.
 */

interface EconomyTabBarProps {
  activePath:
    | 'economy'
    | 'contracts'
    | 'contracts-legacy'
    | 'invoices'
    | 'annual-statement'
    | 'documents';
}

const tabs: { name: string; path: EconomyTabBarProps['activePath'] }[] = [
  { name: 'Översikt', path: 'economy' },
  { name: 'Kontrakt', path: 'contracts' },
  { name: 'Kontrakt (Gammal)', path: 'contracts-legacy' },
  { name: 'Fakturor', path: 'invoices' },
  { name: 'Årsbesked', path: 'annual-statement' },
  { name: 'Dokument', path: 'documents' },
];

export default function EconomyTabBar({ activePath }: EconomyTabBarProps) {
  const handleTabClick = (path: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  };

  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 overflow-x-auto w-full">
      {tabs.map((tab) => {
        const isActive = tab.path === activePath;
        return (
          <div
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={`cursor-pointer relative shrink-0 ${
              isActive ? '' : 'opacity-60 hover:opacity-80'
            }`}
          >
            {isActive && (
              <div
                aria-hidden="true"
                className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none"
              />
            )}
            <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {tab.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
