import { useState } from 'react';
import { Palette, ChevronLeft, Copy, Check, TreePine, Calendar, FileText, Bell, MapPin, Users, ArrowRight, Phone, Mail, AlertCircle, ArrowLeft, BookOpenCheck, ChartNoAxesCombined, CheckCircle, ChevronDown, ChevronRight, ChevronUp, Database, ExternalLink, FileSignature, GripVertical, Info, LandPlot, LayoutDashboard, Loader2, LogOut, MapPinned, MapPinPlus, MessageCircle, Minus, MoreHorizontal, Pencil, Pentagon, Play, Plus, Receipt, RefreshCw, Ruler, Search, Send, Settings, Share, SlidersHorizontal, Trash2, Trees, User, UserCog, X } from 'lucide-react';
import { Footer } from '../components/Footer';
import ForestButton from '../components/ForestButton';
import { HolmenInput } from '../components/HolmenInput';
import { HolmenCheckbox } from '../components/HolmenCheckbox';
import { CustomSwitch } from '../components/CustomSwitch';
import { ActionCard } from '../components/ActionCard';
import ContactCard from '../components/ContactCard';
import { HolmenIcon, holmenIconNames } from '../components/HolmenIcon';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface DesignLibraryPageProps {
  onBack: () => void;
}

// Section wrapper
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

// Sub-section inside a card
function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] uppercase tracking-[0.5px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

// Color swatch
function ColorSwatch({ name, value, textColor = 'white' }: { name: string; value: string; textColor?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex flex-col gap-[6px] items-start cursor-pointer group"
    >
      <div
        className="w-full h-[56px] md:h-[64px] border border-[#e4e4e4] flex items-center justify-center transition-transform group-hover:scale-[1.02]"
        style={{ backgroundColor: value }}
      >
        {copied ? (
          <Check className="w-4 h-4" style={{ color: textColor }} strokeWidth={2} />
        ) : (
          <Copy className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: textColor }} strokeWidth={2} />
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {name}
        </p>
        <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {value}
        </p>
      </div>
    </button>
  );
}

// Breakpoint indicator
function BreakpointIndicator() {
  return (
    <div className="w-full bg-[#f0f4f8] border border-[#d0dce8] px-[16px] py-[10px] flex items-center gap-[8px]">
      <div className="flex items-center gap-[6px]">
        <div className="w-2 h-2 rounded-full bg-[#1e3856] md:bg-[#c0c0c0]" />
        <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#1e3856] md:text-[#999]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Mobile
        </span>
      </div>
      <div className="flex items-center gap-[6px]">
        <div className="w-2 h-2 rounded-full bg-[#c0c0c0] md:bg-[#1e3856]" />
        <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#999] md:text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Desktop (md: 768px+)
        </span>
      </div>
    </div>
  );
}

const CONTACT_IMAGE = "https://images.unsplash.com/photo-1694119533251-589712cacb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmb3Jlc3RyeSUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjUzNzUxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function DesignLibraryPage({ onBack }: DesignLibraryPageProps) {
  // State for interactive demos
  const [checkboxA, setCheckboxA] = useState(false);
  const [checkboxB, setCheckboxB] = useState(true);
  const [checkboxC, setCheckboxC] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">

          {/* Page Header */}
          <div className="w-full">
            <button
              onClick={onBack}
              className="flex items-center gap-[6px] mb-[16px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5 text-[#1e3856]" strokeWidth={2} />
              <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Adminverktyg
              </span>
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1e3856] rounded-lg p-2.5">
                <Palette className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Designbibliotek
              </h1>
            </div>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666] ml-[52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Alla komponenter i Holmen Min Skog, samlade med varianter och breakpoints.
            </p>
          </div>

          <BreakpointIndicator />

          {/* ==================== COLORS ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="Färgpalett" description="Holmens brandfärger. Använd CSS-variabler (--h-blue-1 ... --h-brown-6) eller motsvarande hex.">
                <SubSection label="Primära (H_*_1 / H_*_2)">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] w-full">
                    <ColorSwatch name="H_Blue_1 · --h-blue-1" value="#1E3856" />
                    <ColorSwatch name="H_Blue_2 · --h-blue-2" value="#38E6D4" textColor="#0F233B" />
                    <ColorSwatch name="H_Green_1 · --h-green-1" value="#597340" />
                    <ColorSwatch name="H_Green_2 · --h-green-2" value="#E0FF61" textColor="#32412A" />
                    <ColorSwatch name="H_Red_1 · --h-red-1" value="#8F3857" />
                    <ColorSwatch name="H_Red_2 · --h-red-2" value="#F580C9" textColor="#5F283F" />
                    <ColorSwatch name="H_Brown_1 · --h-brown-1" value="#663336" />
                    <ColorSwatch name="H_Brown_2 · --h-brown-2" value="#FF6E2E" textColor="#3E2427" />
                  </div>
                </SubSection>
                <SubSection label="Sekundära (H_*_3 → H_*_6)">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] w-full">
                    <ColorSwatch name="H_Blue_3 · --h-blue-3" value="#0F233B" />
                    <ColorSwatch name="H_Blue_4 · --h-blue-4" value="#7DB5B3" textColor="#0F233B" />
                    <ColorSwatch name="H_Blue_5 · --h-blue-5" value="#B2E8E8" textColor="#0F233B" />
                    <ColorSwatch name="H_Blue_6 · --h-blue-6" value="#E4F5F5" textColor="#0F233B" />

                    <ColorSwatch name="H_Green_3 · --h-green-3" value="#32412A" />
                    <ColorSwatch name="H_Green_4 · --h-green-4" value="#C4D987" textColor="#32412A" />
                    <ColorSwatch name="H_Green_5 · --h-green-5" value="#D9F7D1" textColor="#32412A" />
                    <ColorSwatch name="H_Green_6 · --h-green-6" value="#F2FBEE" textColor="#32412A" />

                    <ColorSwatch name="H_Red_3 · --h-red-3" value="#5F283F" />
                    <ColorSwatch name="H_Red_4 · --h-red-4" value="#D68A78" textColor="#5F283F" />
                    <ColorSwatch name="H_Red_5 · --h-red-5" value="#FFD7E7" textColor="#5F283F" />
                    <ColorSwatch name="H_Red_6 · --h-red-6" value="#FCF0F5" textColor="#5F283F" />

                    <ColorSwatch name="H_Brown_3 · --h-brown-3" value="#3E2427" />
                    <ColorSwatch name="H_Brown_4 · --h-brown-4" value="#CC8C52" textColor="#3E2427" />
                    <ColorSwatch name="H_Brown_5 · --h-brown-5" value="#FAD2AF" textColor="#3E2427" />
                    <ColorSwatch name="H_Brown_6 · --h-brown-6" value="#FAEEE0" textColor="#3E2427" />
                  </div>
                </SubSection>
                <SubSection label="Neutrala / Bakgrunder">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-[12px] w-full">
                    <ColorSwatch name="White" value="#ffffff" textColor="#021c20" />
                    <ColorSwatch name="Background" value="#f7f7f7" textColor="#021c20" />
                    <ColorSwatch name="Border" value="#e4e4e4" textColor="#021c20" />
                    <ColorSwatch name="Checkbox Border" value="#D4D4D4" textColor="#021c20" />
                    <ColorSwatch name="Text Primary" value="rgba(2,28,32,0.9)" />
                    <ColorSwatch name="Text Secondary" value="rgba(2,28,32,0.8)" />
                  </div>
                </SubSection>
              </Section>
            </div>
          </div>

          {/* ==================== TYPOGRAPHY ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="Typografi" description="IBM Plex Sans. Type-skala: 12 / 14 / 16 / 20 / 24 / 32. Inga off-scale storlekar.">
                <div className="flex flex-col gap-[16px] w-full">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px] border-b border-[#e4e4e4] pb-[12px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Sidrubrik (h1)
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Bold 24px / md:32px &middot; #1e3856</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px] border-b border-[#e4e4e4] pb-[12px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[20px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Sektionsrubrik (h2)
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>SemiBold 20px (lg) &middot; rgba(2,28,32,0.9)</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px] border-b border-[#e4e4e4] pb-[12px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Korttitel / Modaltitel
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>SemiBold 16px (base) &middot; #021c20</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px] border-b border-[#e4e4e4] pb-[12px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Brödtext
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Regular 16px (base) &middot; var(--text-primary)</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px] border-b border-[#e4e4e4] pb-[12px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Subtitel / Beskrivning / Metadata
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Regular 14px (sm) &middot; var(--text-secondary)</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px] border-b border-[#e4e4e4] pb-[12px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#1e3856] uppercase tracking-[0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Chip / Tag
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Medium 12px (xs) uppercase &middot; #1e3856</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[4px] md:gap-[16px]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-[#1e3856] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Knapptext
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Bold 14px (sm) uppercase &middot; #1e3856</span>
                  </div>
                </div>
              </Section>
            </div>
          </div>

          {/* ==================== BUTTONS ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="Knappar (ForestButton)" description="Fyra varianter i två storlekar. Alla knappar har uppercase text och IBM Plex Sans Bold. Disabled-läget ger opacity 50% oavsett variant.">
                <SubSection label="Default storlek">
                  <div className="flex flex-wrap gap-[12px] items-start w-full">
                    <ForestButton variant="primary">Primary</ForestButton>
                    <ForestButton variant="secondary">Secondary</ForestButton>
                    <ForestButton variant="white">White</ForestButton>
                    <ForestButton variant="danger">Danger</ForestButton>
                  </div>
                </SubSection>

                <SubSection label="Small storlek">
                  <div className="flex flex-wrap gap-[12px] items-start w-full">
                    <ForestButton variant="primary" size="small">Primary</ForestButton>
                    <ForestButton variant="secondary" size="small">Secondary</ForestButton>
                    <ForestButton variant="white" size="small">White</ForestButton>
                    <ForestButton variant="danger" size="small">Danger</ForestButton>
                  </div>
                </SubSection>

                <SubSection label="Disabled (opacity 50%)">
                  <div className="flex flex-wrap gap-[12px] items-start w-full">
                    <ForestButton variant="primary" disabled>Primary</ForestButton>
                    <ForestButton variant="secondary" disabled>Secondary</ForestButton>
                    <ForestButton variant="white" disabled>White</ForestButton>
                    <ForestButton variant="danger" disabled>Danger</ForestButton>
                  </div>
                </SubSection>

                <SubSection label="Med ikon">
                  <div className="flex flex-wrap gap-[12px] items-start w-full">
                    <ForestButton variant="primary">
                      <TreePine className="w-4 h-4" strokeWidth={2} />
                      Med ikon
                    </ForestButton>
                    <ForestButton variant="white">
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      Visa mer
                    </ForestButton>
                  </div>
                </SubSection>

                <SubSection label="Full bredd (responsivt)">
                  <div className="flex flex-col gap-[12px] w-full max-w-[480px]">
                    <ForestButton variant="primary" className="w-full">Full bredd</ForestButton>
                    <ForestButton variant="white" className="w-full">Full bredd sekundär</ForestButton>
                  </div>
                </SubSection>
              </Section>
            </div>
          </div>

          {/* ==================== INPUTS ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="Inputfält (HolmenInput)" description="Fyrkantig input med 2px border, 48px höjd. Focus-state visar #1e3856 border.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                  <HolmenInput
                    id="demo-email"
                    label="E-postadress"
                    type="email"
                    placeholder="namn@example.com"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <HolmenInput
                    id="demo-phone"
                    label="Telefonnummer"
                    type="tel"
                    placeholder="073 123 45 67"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                  <HolmenInput
                    id="demo-filled"
                    label="Med förifyllt värde"
                    value="John Doe"
                    readOnly
                  />
                  <HolmenInput
                    id="demo-disabled"
                    label="Inaktiverat"
                    value="Kan inte redigeras"
                    disabled
                  />
                </div>
              </Section>
            </div>
          </div>

          {/* ==================== CHECKBOXES, RADIO, SWITCHES ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="Checkboxar, Radio & Switchar" description="Fyrkantiga checkboxar och runda radioknappar i Holmen-stil.">
                <SubSection label="HolmenCheckbox">
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="flex items-start gap-3">
                      <HolmenCheckbox
                        id="cb-demo-a"
                        checked={checkboxA}
                        onCheckedChange={setCheckboxA}
                        className="mt-0.5"
                      />
                      <label htmlFor="cb-demo-a" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[24px] text-[var(--text-primary)] cursor-pointer" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Avmarkerad checkbox
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <HolmenCheckbox
                        id="cb-demo-b"
                        checked={checkboxB}
                        onCheckedChange={setCheckboxB}
                        className="mt-0.5"
                      />
                      <label htmlFor="cb-demo-b" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[24px] text-[var(--text-primary)] cursor-pointer" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Markerad checkbox
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <HolmenCheckbox
                        id="cb-demo-c"
                        checked={checkboxC}
                        onCheckedChange={setCheckboxC}
                        disabled
                        className="mt-0.5"
                      />
                      <label htmlFor="cb-demo-c" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[24px] text-[#999] cursor-not-allowed" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Inaktiverad checkbox
                      </label>
                    </div>
                  </div>
                </SubSection>

                <div className="w-full border-t border-[#e4e4e4]" />

                <SubSection label="Radio Buttons">
                  <div className="flex flex-col gap-[16px] w-full">
                    {[
                      { value: 'option1', label: 'Alternativ ett' },
                      { value: 'option2', label: 'Alternativ två' },
                      { value: 'option3', label: 'Alternativ tre (inaktiverad)', disabled: true },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center gap-3">
                        <button
                          type="button"
                          role="radio"
                          aria-checked={radioValue === opt.value}
                          disabled={opt.disabled}
                          onClick={() => !opt.disabled && setRadioValue(opt.value)}
                          className={`
                            shrink-0 size-[20px] rounded-full border-2 flex items-center justify-center transition-colors duration-150 outline-none
                            focus-visible:ring-2 focus-visible:ring-[#1e3856]/40 focus-visible:ring-offset-1
                            ${radioValue === opt.value ? 'border-[#1e3856]' : 'border-[#D4D4D4]'}
                            ${opt.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#1e3856]'}
                          `}
                        >
                          {radioValue === opt.value && (
                            <div className="size-[10px] rounded-full bg-[#1e3856]" />
                          )}
                        </button>
                        <span
                          className={`font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[24px] ${opt.disabled ? 'text-[#999]' : 'text-[var(--text-primary)]'}`}
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {opt.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </SubSection>

                <div className="w-full border-t border-[#e4e4e4]" />

                <SubSection label="CustomSwitch">
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="flex items-center gap-[12px]">
                      <CustomSwitch checked={switchA} onCheckedChange={setSwitchA} />
                      <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-primary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {switchA ? 'På' : 'Av'}
                      </span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <CustomSwitch checked={switchB} onCheckedChange={setSwitchB} />
                      <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-primary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {switchB ? 'På' : 'Av'}
                      </span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <CustomSwitch checked={false} onCheckedChange={() => {}} disabled />
                      <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#999]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Inaktiverad
                      </span>
                    </div>
                  </div>
                </SubSection>
              </Section>
            </div>
          </div>

          {/* ==================== ACTION CARDS ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="ActionCard" description="Flexibelt kort med ikon/datumblock, titel, beskrivning, metadata och knappar. Anpassar sig automatiskt i responsiva layouter.">

                <SubSection label="Med ikon + beskrivning + knappar (standard)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <ActionCard
                      icon={<TreePine className="w-5 h-5 text-[#1e3856]" strokeWidth={2} />}
                      iconBackgroundColor="#e4f5f5"
                      title="Skogsbruksplan"
                      description="Din skogsbruksplan är klar och redo att hämtas. Klicka för att ladda ner den senaste versionen."
                      buttons={[
                        { label: 'Ladda ner', variant: 'primary' },
                        { label: 'Visa detaljer', variant: 'white' },
                      ]}
                    />
                    <ActionCard
                      icon={<Bell className="w-5 h-5 text-[#663336]" strokeWidth={2} />}
                      iconBackgroundColor="#fce8e8"
                      title="Ny notifiering"
                      description="Du har en ny avisering angående avverkning på fastigheten Granberg 1:5."
                      buttons={[
                        { label: 'Visa', variant: 'primary' },
                      ]}
                    />
                  </div>
                </SubSection>

                {/* removed: dateBlock subsection - not used in the app */}

                <SubSection label="Med metadata (rad-layout)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <ActionCard
                      icon={<FileText className="w-5 h-5 text-[#1e3856]" strokeWidth={2} />}
                      title="Kontrakt #2024-0451"
                      metadata={['Gallring', '45 ha', '2026-04-01']}
                      buttons={[
                        { label: 'Öppna', variant: 'primary' },
                      ]}
                    />
                  </div>
                </SubSection>

                <SubSection label="Borderless (kompakt lista)">
                  <div className="border border-[#e4e4e4] w-full max-w-[480px]">
                    <ActionCard
                      icon={<MapPin className="w-5 h-5 text-[#4a7c59]" strokeWidth={2} />}
                      iconBackgroundColor="#e4f5e9"
                      title="Granberg 1:5"
                      description="Senast uppdaterad 2026-02-15"
                      borderless
                    />
                    <div className="border-t border-[#e4e4e4]" />
                    <ActionCard
                      icon={<MapPin className="w-5 h-5 text-[#4a7c59]" strokeWidth={2} />}
                      iconBackgroundColor="#e4f5e9"
                      title="Karsvik 3:12"
                      description="Senast uppdaterad 2026-01-20"
                      borderless
                    />
                    <div className="border-t border-[#e4e4e4]" />
                    <ActionCard
                      icon={<MapPin className="w-5 h-5 text-[#4a7c59]" strokeWidth={2} />}
                      iconBackgroundColor="#e4f5e9"
                      title="Norrland 7:8"
                      description="Senast uppdaterad 2025-12-01"
                      borderless
                    />
                  </div>
                </SubSection>
              </Section>
            </div>
          </div>

          {/* ==================== CONTACT CARDS ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="ContactCard" description="Kontaktkort i fyra varianter: stor (med contactInfo-knappar), card, popup och menu.">

                <SubSection label="Stor variant (med contactInfo-knappar och halsning)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <ContactCard
                      name="Anna Lindgren"
                      title="Virkesköpare Hudiksvall / Ljusdal"
                      image={CONTACT_IMAGE}
                      description="&laquo;Hej John! Tveka inte att höra av dig om du har frågor om din skog.&raquo;"
                      contactInfo={[
                        { icon: 'material-symbols:phone-iphone', label: '010-452 53 00' },
                        { icon: 'material-symbols:mail-outline', label: 'Maila Anna' },
                      ]}
                    />
                    <ContactCard
                      name="Erik Johansson"
                      title="Skogsradgivare Region Mitt"
                      image={CONTACT_IMAGE}
                      contactInfo={[
                        { icon: 'material-symbols:phone-iphone', label: '010-452 54 00' },
                        { icon: 'material-symbols:mail-outline', label: 'Maila Erik' },
                      ]}
                    />
                    <ContactCard
                      name="Kundtjänst"
                      title="Holmen Skog AB"
                      icon={<Users className="w-6 h-6" strokeWidth={2} />}
                      description="&laquo;Vi finns här för att svara på dina frågor.&raquo;"
                      contactInfo={[
                        { icon: 'material-symbols:phone-iphone', label: '010-452 50 00' },
                        { icon: 'material-symbols:mail-outline', label: 'Maila oss' },
                      ]}
                    />
                  </div>
                </SubSection>

                <SubSection label="Card variant (Mer-sidan / kontaktsida)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <ContactCard
                      variant="card"
                      name="Anna Lindgren"
                      role="Virkesköpare"
                      image={CONTACT_IMAGE}
                      phone="010-452 53 00"
                      email="anna.lindgren@holmen.com"
                      description="Hej! Jag hjalper dig med allt som ror virkesaffarer."
                    />
                    <ContactCard
                      variant="card"
                      name="Erik Johansson"
                      role="Skogsradgivare"
                      image={CONTACT_IMAGE}
                      phone="010-452 54 00"
                      email="erik.johansson@holmen.com"
                    />
                  </div>
                </SubSection>

                <SubSection label="Card utan bild (med ikon)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <ContactCard
                      variant="card"
                      name="Kundtjanst"
                      role="Holmen Skog AB"
                      icon={<Users className="w-6 h-6" />}
                      phone="010-452 50 00"
                      email="kundtjanst@holmen.com"
                    />
                  </div>
                </SubSection>

                <SubSection label="Menu variant (kartpanel / drawer)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <div className="border border-[#e4e4e4]">
                      <ContactCard
                        variant="menu"
                        name="Anna Lindgren"
                        role="Virkesköpare"
                        region="Hudiksvall"
                        image={CONTACT_IMAGE}
                        email="anna.lindgren@holmen.com"
                      />
                    </div>
                  </div>
                </SubSection>

                <SubSection label="Popup variant (header-popover)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
                    <div className="border border-[#e4e4e4] bg-white">
                      <ContactCard
                        variant="popup"
                        name="Anna Lindgren"
                        image={CONTACT_IMAGE}
                        email="anna.lindgren@holmen.com"
                        description="Hej John! Tveka inte att höra av dig om du har frågor."
                      />
                    </div>
                  </div>
                </SubSection>

                <SubSection label="User-access variant (användarbehörigheter)">
                  <div className="flex flex-col gap-[16px] w-full">
                    <ContactCard
                      variant="user-access"
                      icon="JD"
                      name="Jane Doe"
                      role="jane.doe@holmen.com"
                      statusText="Åtkomst beviljad."
                      onDelete={() => alert('Ta bort åtkomst')}
                    />
                    <ContactCard
                      variant="user-access"
                      icon="ES"
                      name="Erik Svensson"
                      role="erik.svensson@holmen.com"
                      statusText="Du har läsrättigheter."
                    />
                    <ContactCard
                      variant="user-access"
                      icon="L"
                      name="lina@example.se"
                      role="Inbjudan väntar på svar"
                      statusText="Inbjudan skickad"
                      statusDate="2026-05-06"
                      pending
                      onResend={() => alert('Skicka inbjudan igen')}
                      onDelete={() => alert('Ta bort inbjudan')}
                    />
                  </div>
                  <p className="text-[14px] text-[var(--text-secondary)] mt-2">
                    Tre lägen: beviljad åtkomst (med kebab-meny), inkommande
                    läsrättighet (utan delete) och pending invite (vit cirkel
                    med initial från e-post + Skicka igen-alternativ i menyn).
                  </p>
                </SubSection>
              </Section>
            </div>
          </div>

          {/* ==================== BREAKPOINT GUIDE ==================== */}
          <div className="bg-white w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] relative">
            <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="p-[16px] md:p-[24px] flex flex-col gap-[24px]">
              <Section title="Breakpoints" description="Responsiva brytpunkter som anvands genom hela appen.">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-[#1e3856]">
                        <th className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] py-[10px] pr-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>Prefix</th>
                        <th className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] py-[10px] pr-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>Min-width</th>
                        <th className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] py-[10px]" style={{ fontVariationSettings: "'wdth' 100" }}>Anvandning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { prefix: '(default)', width: '0px', usage: 'Mobil-forst basvy, single-column layout, p-[16px]' },
                        { prefix: 'md:', width: '768px', usage: 'Desktop: multi-column grids, p-[24px], större rubriker' },
                        { prefix: 'lg:', width: '1024px', usage: 'Sidebar synlig, bredare sidopaneler' },
                        { prefix: 'xl:', width: '1280px', usage: 'Max-width constrainer för innehåll' },
                      ].map((row) => (
                        <tr key={row.prefix} className="border-b border-[#e4e4e4]">
                          <td className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] py-[10px] pr-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>{row.prefix}</td>
                          <td className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-primary)] py-[10px] pr-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>{row.width}</td>
                          <td className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)] py-[10px]" style={{ fontVariationSettings: "'wdth' 100" }}>{row.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubSection label="Padding-monster">
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex items-center gap-[12px]">
                      <code className="bg-[#f0f4f8] px-[8px] py-[2px] font-mono text-[12px] text-[#1e3856]">p-[16px] md:p-[24px]</code>
                      <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Kortsektioner</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <code className="bg-[#f0f4f8] px-[8px] py-[2px] font-mono text-[12px] text-[#1e3856]">px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px]</code>
                      <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Sidinnehall</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <code className="bg-[#f0f4f8] px-[8px] py-[2px] font-mono text-[12px] text-[#1e3856]">py-[24px] md:py-[40px]</code>
                      <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>Sidvertikalt</span>
                    </div>
                  </div>
                </SubSection>
              </Section>

              <Section title="Ikoner (Lucide)" description="Alla ikoner som används i appen. Från lucide-react-biblioteket.">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-[16px]">
                  {[
                    { icon: AlertCircle, name: 'AlertCircle' },
                    { icon: ArrowLeft, name: 'ArrowLeft' },
                    { icon: ArrowRight, name: 'ArrowRight' },
                    { icon: Bell, name: 'Bell' },
                    { icon: BookOpenCheck, name: 'BookOpenCheck' },
                    { icon: Calendar, name: 'Calendar' },
                    { icon: ChartNoAxesCombined, name: 'ChartNoAxesCombined' },
                    { icon: Check, name: 'Check' },
                    { icon: CheckCircle, name: 'CheckCircle' },
                    { icon: ChevronDown, name: 'ChevronDown' },
                    { icon: ChevronLeft, name: 'ChevronLeft' },
                    { icon: ChevronRight, name: 'ChevronRight' },
                    { icon: ChevronUp, name: 'ChevronUp' },
                    { icon: Copy, name: 'Copy' },
                    { icon: Database, name: 'Database' },
                    { icon: ExternalLink, name: 'ExternalLink' },
                    { icon: FileSignature, name: 'FileSignature' },
                    { icon: FileText, name: 'FileText' },
                    { icon: GripVertical, name: 'GripVertical' },
                    { icon: Info, name: 'Info' },
                    { icon: LandPlot, name: 'LandPlot' },
                    { icon: LayoutDashboard, name: 'LayoutDashboard' },
                    { icon: Loader2, name: 'Loader2' },
                    { icon: LogOut, name: 'LogOut' },
                    { icon: Mail, name: 'Mail' },
                    { icon: MapPin, name: 'MapPin' },
                    { icon: MapPinned, name: 'MapPinned' },
                    { icon: MapPinPlus, name: 'MapPinPlus' },
                    { icon: MessageCircle, name: 'MessageCircle' },
                    { icon: Minus, name: 'Minus' },
                    { icon: MoreHorizontal, name: 'MoreHorizontal' },
                    { icon: Palette, name: 'Palette' },
                    { icon: Pencil, name: 'Pencil' },
                    { icon: Pentagon, name: 'Pentagon' },
                    { icon: Phone, name: 'Phone' },
                    { icon: Play, name: 'Play' },
                    { icon: Plus, name: 'Plus' },
                    { icon: Receipt, name: 'Receipt' },
                    { icon: RefreshCw, name: 'RefreshCw' },
                    { icon: Ruler, name: 'Ruler' },
                    { icon: Search, name: 'Search' },
                    { icon: Send, name: 'Send' },
                    { icon: Settings, name: 'Settings' },
                    { icon: Share, name: 'Share' },
                    { icon: SlidersHorizontal, name: 'SlidersHorizontal' },
                    { icon: Trash2, name: 'Trash2' },
                    { icon: TreePine, name: 'TreePine' },
                    { icon: Trees, name: 'Trees' },
                    { icon: User, name: 'User' },
                    { icon: UserCog, name: 'UserCog' },
                    { icon: Users, name: 'Users' },
                    { icon: X, name: 'X' },
                  ].map(({ icon: Icon, name }) => {
                    const lucideToHolmen: Record<string, string> = {
                      'TreePine': 'Barrtrad',
                      'Trees': 'Lovtrad',
                      'User': 'Manniska',
                      'Users': 'Grupp',
                      'ArrowLeft': 'Pil1',
                      'ArrowRight': 'Pil5',
                    };
                    const hasMatch = name in lucideToHolmen;
                    return (
                      <div key={name} className={`flex flex-col items-center gap-[8px] p-[12px] border-2 transition-colors ${hasMatch ? 'border-[#D9381E] bg-red-50' : 'border-[#ededed] hover:border-[#1e3856]'}`}>
                        <Icon size={24} className="text-[#1e3856]" />
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-[var(--text-secondary)] text-center leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>{name}</span>
                        {hasMatch && <span className="text-[9px] text-[#D9381E] font-medium">→ {lucideToHolmen[name]}</span>}
                      </div>
                    );
                  })}
                </div>
              </Section>

              <Section title="Holmen Ikoner" description={'Holmens egna ikoner. Använd HolmenIcon med name och size-prop — samma API som Lucide.'}>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-[16px]">
                  {holmenIconNames.map((name) => {
                    const holmenToLucide: Record<string, string> = {
                      'Barrtrad': 'TreePine',
                      'Lovtrad': 'Trees',
                      'Manniska': 'User',
                      'Grupp': 'Users',
                      'Pil1': 'ArrowLeft',
                      'Pil5': 'ArrowRight',
                    };
                    const hasMatch = name in holmenToLucide;
                    return (
                      <div key={name} className={`flex flex-col items-center gap-[8px] p-[12px] border-2 transition-colors ${hasMatch ? 'border-[#2E7D32] bg-green-50' : 'border-[#ededed] hover:border-[#1e3856]'}`}>
                        <HolmenIcon name={name} size={28} color="#1e3856" />
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-[var(--text-secondary)] text-center leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>{name.replace(/_/g, ' ')}</span>
                        {hasMatch && <span className="text-[9px] text-[#2E7D32] font-medium">← {holmenToLucide[name]}</span>}
                      </div>
                    );
                  })}
                </div>
              </Section>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}