import { useState } from "react";
import { X, Check, Send, ChevronDown, ChevronUp, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HolmenCheckbox } from "./HolmenCheckbox";
import ForestButton from "./ForestButton";
import imgDaniel from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";

export interface Buyer {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
}

const BUYERS: Buyer[] = [
  {
    id: "daniel",
    name: "Daniel Larsson",
    role: "Virkesköpare Hudiksvall / Ljusdal",
    phone: "070-123 45 67",
    email: "daniel.larsson@holmen.com",
    image: "",
  },
  {
    id: "erika",
    name: "Erika Holgersson",
    role: "Virkesköpare Sundsvall / Härnösand",
    phone: "070-234 56 78",
    email: "erika.holgersson@holmen.com",
    image:
      "https://images.unsplash.com/photo-1643892055607-192cf75e93f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGZvcmVzdHJ5JTIwd29ya2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjU1NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "lars",
    name: "Lars Bergström",
    role: "Virkesköpare Gävle / Sandviken",
    phone: "070-345 67 89",
    email: "lars.bergstrom@holmen.com",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMG91dGRvb3IlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzM2MDAwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: "sofia",
    name: "Sofia Lindqvist",
    role: "Virkesköpare Uppsala / Enköping",
    phone: "070-456 78 90",
    email: "sofia.lindqvist@holmen.com",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTczNjAwMDAwMHww&ixlib=rb-4.1.0&q=80&w=400",
  },
];

export interface ShareNoteData {
  id: string;
  title: string;
  type?: string;
  department: string;
  color: string;
  date: string;
  comment?: string;
}

interface ShareNoteModalProps {
  note: ShareNoteData;
  onClose: () => void;
}

type ModalStep = "share" | "confirm";

function BuyerAvatar({ buyer, size = 40 }: { buyer: Buyer; size?: number }) {
  const cls = `object-cover rounded-full border border-[#e4e4e4]`;
  const style = { width: size, height: size, borderRadius: "50%", flexShrink: 0 };
  if (buyer.id === "daniel") {
    return (
      <ImageWithFallback
        src={imgDaniel}
        alt={buyer.name}
        className={cls}
        style={style}
      />
    );
  }
  return (
    <img src={buyer.image} alt={buyer.name} className={cls} style={style} />
  );
}

export function ShareNoteModal({ note, onClose }: ShareNoteModalProps) {
  const [selectedBuyerIds, setSelectedBuyerIds] = useState<Set<string>>(
    new Set([BUYERS[0].id])
  );
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<ModalStep>("share");
  const [listOpen, setListOpen] = useState(false);

  const toggleBuyer = (id: string) => {
    setSelectedBuyerIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedBuyers = BUYERS.filter((b) => selectedBuyerIds.has(b.id));
  const canSend = selectedBuyerIds.size > 0;

  const handleSend = () => {
    if (!canSend) return;
    setStep("confirm");
  };

  // Summary label for trigger button
  const selectionLabel = () => {
    if (selectedBuyerIds.size === 0) return "Välj mottagare…";
    if (selectedBuyerIds.size === 1) return selectedBuyers[0].name;
    return `${selectedBuyerIds.size} mottagare valda`;
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative z-10 bg-white w-full max-w-[440px] mx-4 shadow-2xl overflow-visible"
        style={{ borderRadius: 0 }}
      >
        {step === "share" ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e4e4e4]">
              <div>
                <h2
                  className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[18px] text-[#1e3856]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Dela anteckning
                </h2>
                <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                  Välj mottagare nedan
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Note preview */}
            <div className="mx-6 mt-5 mb-5 bg-[#f7f7f7] px-4 py-3 flex items-start gap-3 border border-[#e4e4e4]">
              {note.type && (
                <span
                  style={{
                    fontSize: "10px",
                    background: note.color === '#5F283F' || note.color === '#D9381E' ? '#FF6E2E' : note.color,
                    padding: "3px 8px",
                    color: "white",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {(note.type === "Vindfäll" || note.type === "Vindfälle" || note.type === "Viltskada") ? "Skogsskada" : note.type}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] leading-[20px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {note.title}
                </p>
                <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                  {note.department} · {note.date}
                </p>
              </div>
            </div>

            {/* Buyer selection — collapsible dropdown */}
            <div className="px-6 relative">
              <label
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] text-[#1e3856] uppercase tracking-wide mb-2 block"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Välj mottagare
              </label>

              {/* Trigger */}
              <button
                type="button"
                onClick={() => setListOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-3 border-2 border-[#ededed] px-4 py-3 bg-white hover:bg-[#fafafa] transition-colors focus:outline-none focus:border-[#1e3856]"
                style={{ borderRadius: 0 }}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {selectedBuyerIds.size === 0 ? (
                    <Users size={16} strokeWidth={2} className="text-gray-400 shrink-0" />
                  ) : (
                    /* Stacked avatars */
                    <div className="flex items-center shrink-0" style={{ gap: -4 }}>
                      {selectedBuyers.slice(0, 3).map((b, i) => (
                        <div
                          key={b.id}
                          style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}
                          className="relative"
                        >
                          <BuyerAvatar buyer={b} size={24} />
                        </div>
                      ))}
                    </div>
                  )}
                  <span
                    className={`font-['IBM_Plex_Sans',sans-serif] text-[14px] truncate ${
                      selectedBuyerIds.size === 0 ? "text-gray-400" : "text-[#021c20]"
                    }`}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {selectionLabel()}
                  </span>
                </div>
                {listOpen ? (
                  <ChevronUp size={18} strokeWidth={2} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={18} strokeWidth={2} className="text-gray-400 shrink-0" />
                )}
              </button>

              {/* Dropdown list — absolute positioned */}
              {listOpen && (
                <div className="absolute left-6 right-6 z-20 border-2 border-t-0 border-[#ededed] divide-y divide-[#e4e4e4] shadow-lg bg-white max-h-[192px] overflow-y-auto">
                  {BUYERS.map((buyer) => {
                    const isSelected = selectedBuyerIds.has(buyer.id);
                    return (
                      <div
                        key={buyer.id}
                        onClick={() => toggleBuyer(buyer.id)}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors select-none ${
                          isSelected ? "bg-[#f0f4f8]" : "bg-white hover:bg-[#fafafa]"
                        }`}
                      >
                        <HolmenCheckbox
                          checked={isSelected}
                        />
                        <BuyerAvatar buyer={buyer} size={36} />
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                          >
                            {buyer.name}
                          </p>
                          <p
                            className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                          >
                            {buyer.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Validation note */}
              {selectedBuyerIds.size === 0 && (
                <p className="text-[12px] text-red-500 mt-1.5">
                  Välj minst en mottagare för att skicka.
                </p>
              )}
            </div>

            {/* Optional message */}
            <div className="px-6 mt-5">
              <label
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] text-[#1e3856] uppercase tracking-wide mb-2 block"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Meddelande{" "}
                <span className="normal-case tracking-normal font-normal text-[var(--text-secondary)]">
                  (valfritt)
                </span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Lägg till ett meddelande..."
                rows={3}
                className="w-full border-2 border-[#ededed] focus:border-[#1e3856] px-3 py-2.5 text-[14px] font-['IBM_Plex_Sans',sans-serif] text-[#021c20] placeholder:text-gray-400 resize-none outline-none transition-colors"
                style={{ fontVariationSettings: "'wdth' 100", borderRadius: 0 }}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-5 mt-2 flex gap-3">
              <ForestButton
                variant="white"
                onClick={onClose}
                className="flex-1"
              >
                Avbryt
              </ForestButton>
              <ForestButton
                variant="primary"
                onClick={handleSend}
                disabled={!canSend}
                className="flex-[2] flex items-center justify-center gap-2"
              >
                Skicka
              </ForestButton>
            </div>
          </>
        ) : (
          /* ── Confirmation step ── */
          <div className="flex flex-col items-center px-6 pt-6 pb-5 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={18} strokeWidth={2} />
            </button>
            <div className="size-16 bg-[#e4f5f5] flex items-center justify-center mb-4">
              <Check size={28} strokeWidth={2.5} className="text-[#1e3856]" />
            </div>

            <h2
              className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[20px] text-[#1e3856] mb-2"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Anteckning delad
            </h2>

            {/* Buyer chips */}
            <div className="mt-5 flex flex-col gap-2 w-full">
              {selectedBuyers.map((buyer) => (
                <div
                  key={buyer.id}
                  className="flex items-center gap-3 bg-[#f7f7f7] border border-[#e4e4e4] px-4 py-2.5"
                >
                  <BuyerAvatar buyer={buyer} size={32} />
                  <div className="text-left flex-1">
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {buyer.name}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {buyer.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <ForestButton
              variant="primary"
              onClick={onClose}
              className="mt-6 w-full"
            >
              Stäng
            </ForestButton>
          </div>
        )}
      </div>
    </div>
  );
}