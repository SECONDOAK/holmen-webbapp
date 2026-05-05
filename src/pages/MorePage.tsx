import { useState } from 'react';
import { ChevronUp, ChevronDown, Phone, Mail, User } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import { useProfile } from '../contexts/ProfileContext';
import { Footer } from '../components/Footer';
import { faqCategories, type FAQItem } from '../data/faqData';

function FAQAnswer({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines between paragraphs
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Bullet list items (• )
    if (line.trim().startsWith('\u2022')) {
      const bulletItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('\u2022')) {
        bulletItems.push(lines[i].trim().replace(/^\u2022\s*/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-[20px] mt-[8px] space-y-[4px]">
          {bulletItems.map((item, idx) => (
            <li key={idx} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] text-[16px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list items (1. )
    if (/^\d+\.\s/.test(line.trim())) {
      const numberedItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        numberedItems.push(lines[i].trim().replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal pl-[20px] mt-[8px] space-y-[4px]">
          {numberedItems.map((item, idx) => (
            <li key={idx} className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] text-[16px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {item}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${elements.length}`} className={`font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] text-[16px] text-[rgba(2,28,32,0.9)] ${elements.length > 0 ? 'mt-[8px]' : ''}`} style={{ fontVariationSettings: "'wdth' 100" }}>
        {line}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="relative w-full">
      <div 
        className="bg-white box-border content-stretch flex items-center justify-between px-[24px] py-[20px] cursor-pointer hover:bg-[#f7f7f7] transition-colors relative w-full"
        onClick={onToggle}
      >
        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[16px] text-[#021c20] pr-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {item.question}
        </p>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#1e3856] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#1e3856] shrink-0" />
        )}
      </div>
      {isOpen && (
        <div className="bg-white box-border content-stretch flex flex-col px-[24px] pb-[28px] pt-[8px] relative w-full">
          <FAQAnswer text={item.answer} />
        </div>
      )}
      <div aria-hidden="true" className="absolute border-b border-[var(--border-gray)] border-solid bottom-0 left-0 right-0 pointer-events-none" />
    </div>
  );
}

const contacts = [
  {
    name: 'Daniel Larsson',
    role: 'Virkesköpare Hudiksvall / Ljusdal',
    phone: '070-123 45 67',
    email: 'daniel.larsson@holmen.com',
    image: 'https://images.unsplash.com/photo-1614744025915-36948e9847a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmb3Jlc3RlciUyMG1hbnxlbnwxfHx8fDE3Njc3OTI4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Kontakta mig för personlig rådgivning kring din skog eller när det är dags för en virkesaffär.'
  },
  {
    name: 'Erika Holgersson',
    role: 'Virkesekonom',
    phone: '070-234 56 78',
    email: 'erika.holgersson@holmen.com',
    description: 'Kontakta mig när du har frågor om slutredovisning, årsbesked, fakturor och utbetalningar eller vill ändra utbetalningsuppgifter.'
  }
];

export default function MorePage() {
  const { loggedInUser } = useProfile();
  const [openFAQKeys, setOpenFAQKeys] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  const PREVIEW_COUNT = 3;

  // Place "Holmen" filter chip and section last
  const orderedCategories = [...faqCategories].sort((a, b) => {
    if (a.id === 'holmen') return 1;
    if (b.id === 'holmen') return -1;
    return 0;
  });

  const toggleFAQ = (key: string) => {
    setOpenFAQKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleCategoryCollapsed = (categoryId: string) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const getCategoryItemCount = (category: typeof faqCategories[0]) =>
    category.sections.reduce((s, sec) => s + sec.items.length, 0);

  const filteredCategories = activeCategory === 'all'
    ? orderedCategories
    : orderedCategories.filter(c => c.id === activeCategory);

  const totalFAQCount = orderedCategories.reduce((sum, cat) =>
    sum + cat.sections.reduce((s, sec) => s + sec.items.length, 0), 0
  );

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Kontakt
          </p>

          {/* Dina kontakter */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
            
            <div className="content-stretch flex flex-col gap-[8px] relative shrink-0 w-full">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Mina kontakter
              </p>
              <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Ring eller skriv ett meddelande. Vi är snabba på att svara. För att vi ska kunna hjälpa dig på bästa sätt, välj den kontakt som passar ditt ärende.
              </p>
            </div>

            {/* Kontaktkort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
              {contacts.map((contact, index) => (
                <ContactCard 
                  key={index}
                  name={contact.name}
                  role={contact.role}
                  phone={contact.phone}
                  email={contact.email}
                  image={contact.image}
                  icon={!contact.image ? <User className="w-7 h-7" strokeWidth={2} /> : undefined}
                  description={contact.description}
                  variant="card"
                />
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start px-0 py-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
            
            <div className="content-stretch flex flex-col gap-[8px] relative shrink-0 w-full px-[16px] md:px-0">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Vanliga frågor
              </p>
              <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Här hittar du svar på de vanligaste frågorna om virkesförsäljning, skogsbruk och Holmens tjänster.
              </p>
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-[8px] w-full px-[16px] md:px-0">
              <button
                onClick={() => { setActiveCategory('all'); setOpenFAQKeys(new Set()); }}
                className={`px-[16px] py-[8px] text-[14px] font-['IBM_Plex_Sans',sans-serif] font-medium transition-colors border ${
                  activeCategory === 'all'
                    ? 'bg-[#1e3856] text-white border-[#1e3856]'
                    : 'bg-white text-[#021c20] border-[#e4e4e4] hover:bg-[#f7f7f7]'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Alla ({totalFAQCount})
              </button>
              {orderedCategories.map((cat) => {
                const count = cat.sections.reduce((s, sec) => s + sec.items.length, 0);
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setOpenFAQKeys(new Set()); }}
                    className={`px-[16px] py-[8px] text-[14px] font-['IBM_Plex_Sans',sans-serif] font-medium transition-colors border ${
                      activeCategory === cat.id
                        ? 'bg-[#1e3856] text-white border-[#1e3856]'
                        : 'bg-white text-[#021c20] border-[#e4e4e4] hover:bg-[#f7f7f7]'
                    }`}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* FAQ items by category */}
            <div className="content-stretch flex flex-col relative w-full">
              {filteredCategories.map((category) => {
                const totalItems = getCategoryItemCount(category);
                const isExpanded = expandedCategories.has(category.id) || activeCategory !== 'all';
                const isCollapsed = activeCategory === 'all' && collapsedCategories.has(category.id);
                const limit = isExpanded ? Infinity : PREVIEW_COUNT;
                let rendered = 0;

                return (
                  <div key={category.id} className="w-full">
                    {/* Category heading – show only in "Alla" mode, click to collapse */}
                    {activeCategory === 'all' && (
                      <button
                        type="button"
                        onClick={() => toggleCategoryCollapsed(category.id)}
                        className="w-full px-[24px] py-[16px] bg-[#f7f7f7] border-b border-[#e4e4e4] flex items-center justify-between hover:bg-[#efefef] transition-colors cursor-pointer text-left"
                      >
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[15px] text-[#1e3856] uppercase tracking-[0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {category.name}
                        </p>
                        <span className="flex items-center gap-[10px]">
                          <span className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[13px] text-[rgba(2,28,32,0.5)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {totalItems} frågor
                          </span>
                          {isCollapsed ? (
                            <ChevronDown className="w-4 h-4 text-[#1e3856]" />
                          ) : (
                            <ChevronUp className="w-4 h-4 text-[#1e3856]" />
                          )}
                        </span>
                      </button>
                    )}
                    {!isCollapsed && category.sections.map((section, sIdx) => {
                      const itemsToShow = section.items.filter(() => {
                        if (rendered >= limit) return false;
                        rendered++;
                        return true;
                      });
                      if (itemsToShow.length === 0) return null;

                      return (
                        <div key={sIdx} className="w-full">
                          {/* Subcategory heading */}
                          {section.name && (
                            <div className="px-[24px] py-[12px] bg-[#fafafa] border-b border-[var(--border-gray)]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] text-[14px] text-[rgba(2,28,32,0.6)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                {section.name}
                              </p>
                            </div>
                          )}
                          {itemsToShow.map((item, iIdx) => {
                            const origIdx = section.items.indexOf(item);
                            const key = `${category.id}-${sIdx}-${origIdx}`;
                            return (
                              <FAQAccordion
                                key={key}
                                item={item}
                                isOpen={openFAQKeys.has(key)}
                                onToggle={() => toggleFAQ(key)}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                    {/* Show more / show less button */}
                    {!isCollapsed && activeCategory === 'all' && totalItems > PREVIEW_COUNT && (
                      <button
                        onClick={() => toggleCategoryExpand(category.id)}
                        className="w-full px-[24px] py-[14px] flex items-center justify-center gap-[6px] bg-white hover:bg-[#f7f7f7] transition-colors border-b border-[#e4e4e4] cursor-pointer"
                      >
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[14px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {isExpanded ? 'Visa färre' : `Visa alla ${totalItems} frågor`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#1e3856]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#1e3856]" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kontakta supporten */}
          <div id="kontakt" className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
            
            <div className="content-stretch flex flex-col gap-[8px] relative shrink-0 w-full">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Teknisk support
              </p>
              <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[var(--text-secondary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Behöver du hjälp med att använda tjänsten? Vår tekniska support hjälper dig.
              </p>
            </div>

            {/* Support-kontaktkort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
              <ContactCard 
                name="Support via telefon"
                role="Vardagar 08:00-16:00"
                phone="010-452 53 00"
                icon={<Phone className="w-7 h-7" strokeWidth={2} />}
                variant="card"
              />
              <ContactCard 
                name="Support via e-post"
                role="Vi återkommer på din e-postadress."
                email="support@holmen.com"
                icon={<Mail className="w-7 h-7" strokeWidth={2} />}
                variant="card"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}