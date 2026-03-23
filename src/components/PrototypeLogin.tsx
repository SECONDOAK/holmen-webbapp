import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Loader2, Mail, CheckCircle } from "lucide-react";

export default function PrototypeLogin() {
  const { signInWithMagicLink, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3856]" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error } = await signInWithMagicLink(email);

    if (error) {
      if (error.message.includes("Signups not allowed") || error.message.includes("not allowed")) {
        setError("Du har inte blivit inbjuden till prototypen. Kontakta projektansvarig.");
      } else {
        setError(error.message);
      }
      setSubmitting(false);
    } else {
      setSent(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-[400px] mx-4 bg-white p-8 shadow-lg">
        {!sent ? (
          <>
            <h1
              className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] text-[#1e3856] mb-2"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Prototyp-inloggning
            </h1>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666] mb-6"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Ange din e-postadress för att få en inloggningslänk.
            </p>

            <form onSubmit={handleSubmit}>
              <label
                className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[13px] text-[#1e3856] block mb-1"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                E-postadress
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="namn@exempel.se"
                className="w-full h-[48px] px-4 border-2 border-[#e4e4e4] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] focus:border-[#1e3856] focus:outline-none transition-colors"
                style={{ fontVariationSettings: "'wdth' 100" }}
              />

              {error && (
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[13px] text-red-500 mt-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-[48px] mt-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] uppercase tracking-[0.5px] flex items-center justify-center gap-2 hover:bg-[#2a4d6e] transition-colors disabled:opacity-50"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    SKICKA INLOGGNINGSLÄNK
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2
              className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[20px] text-[#1e3856] mb-2"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Kolla din e-post!
            </h2>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Vi har skickat en inloggningslänk till{" "}
              <strong className="text-[#1e3856]">{email}</strong>.
              <br />
              Klicka på länken i mejlet för att logga in.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="mt-6 font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#1e3856] underline hover:no-underline"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Ange en annan e-postadress
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
