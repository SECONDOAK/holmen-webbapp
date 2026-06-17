import { useState, useEffect, useRef } from "react";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";
import ForestButton from "../components/ForestButton";
import { useProfile } from "../contexts/ProfileContext";
import { toast } from "sonner@2.0.3";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";
import {
  AlertTriangle,
  UserPlus,
  Key,
  Check,
  Trash2,
} from "lucide-react";
import { Footer } from "../components/Footer";
import {
  HolmenModal,
  HolmenModalFooter,
  HolmenModalWarningIcon,
} from "../components/HolmenModal";
import { HolmenInput } from "../components/HolmenInput";
import ContactCard from "../components/ContactCard";
import { invitesApi, type InvitePermission } from "../utils/invitesApi";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({
  label,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <button onClick={onClick} className="relative shrink-0">
        {isActive && (
          <div
            aria-hidden="true"
            className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none"
          />
        )}
        <div className="flex flex-col items-center size-full">
          <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
            <p
              className={`font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre ${!isActive ? "opacity-60" : ""}`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {label}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

// Skeleton components for loading states
function FormFieldSkeleton() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Skeleton className="h-[14px] w-[120px] rounded-none" />
      <Skeleton className="h-[48px] w-full rounded-none" />
    </div>
  );
}

function ProfileCardSkeleton({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
      <div
        aria-hidden="true"
        className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
      />

      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </h2>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {description}
        </p>
      </div>

      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        {/* Förnamn + Efternamn row */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full md:flex-1">
            <Skeleton className="h-[14px] w-[80px] rounded-none" />
            <Skeleton className="h-[48px] w-full rounded-none" />
          </div>
          <div className="flex flex-col gap-[8px] w-full md:flex-1">
            <Skeleton className="h-[14px] w-[90px] rounded-none" />
            <Skeleton className="h-[48px] w-full rounded-none" />
          </div>
        </div>

        {/* Telefonnummer */}
        <FormFieldSkeleton />

        {/* E-postadress + Personnummer row */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full md:flex-1">
            <Skeleton className="h-[14px] w-[110px] rounded-none" />
            <Skeleton className="h-[48px] w-full rounded-none" />
          </div>
          <div className="flex flex-col gap-[8px] w-full md:flex-1">
            <Skeleton className="h-[14px] w-[115px] rounded-none" />
            <Skeleton className="h-[48px] w-full rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "access"
  >("profile");
  const { loggedInUser } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] =
    useState(true);
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  // Access control modals
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  // Pending invites — shown in the access list with a Resend / Delete affordance.
  const [pendingInvites, setPendingInvites] = useState<
    Array<{ id: string; email: string; invitedDate: string; entities: string[]; permission: InvitePermission }>
  >([]);

  const [invitePermission, setInvitePermission] = useState<InvitePermission>('full-read');
  const [permissionDropdownOpen, setPermissionDropdownOpen] = useState(false);
  const permissionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!permissionDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (permissionDropdownRef.current && !permissionDropdownRef.current.contains(e.target as Node)) {
        setPermissionDropdownOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [permissionDropdownOpen]);

  const permissionOptions: Array<{ id: InvitePermission; label: string; description: string }> = [
    {
      id: 'full-read',
      label: 'Full läsbehörighet',
      description: 'Personen kan se hela din skogsförvaltning — fastighet, ekonomi, kontrakt, anteckningar.',
    },
    {
      id: 'overview',
      label: 'Fastighetsöversikt',
      description: 'Personen kan bara se fastighet och skogsbruksplan — inget om ekonomi, kontrakt eller anteckningar.',
    },
  ];

  // Visningskategorier som rollen kan se. Statisk lista — inte längre
  // valbar via checkboxar utan styrs helt av vilken roll man väljer.
  type VisibilityArea = {
    id: string;
    label: string;
  };
  const allVisibilityAreas: VisibilityArea[] = [
    { id: 'see-fastighet', label: 'Fastighet & skogsbruksplan' },
    { id: 'see-anteckningar', label: 'Anteckningar' },
    { id: 'see-kontrakt', label: 'Kontrakt & avräkningar' },
    { id: 'see-fakturor', label: 'Fakturor & utbetalningar' },
  ];
  const roleIncludes: Record<InvitePermission, string[]> = {
    'full-read': ['see-fastighet', 'see-anteckningar', 'see-kontrakt', 'see-fakturor'],
    'overview': ['see-fastighet'],
  };

  // Available entities the user can grant access to in the invite flow.
  const inviteEntityOptions = [
    { id: "privat", label: "John Doe (privatperson)" },
    { id: "foretag", label: "Holmen Skog AB (företag)" },
  ];
  const [selectedInviteEntities, setSelectedInviteEntities] = useState<string[]>([
    "privat",
  ]);
  const [entityDropdownOpen, setEntityDropdownOpen] = useState(false);
  const entityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!entityDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (entityDropdownRef.current && !entityDropdownRef.current.contains(e.target as Node)) {
        setEntityDropdownOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [entityDropdownOpen]);

  // Load pending invites for current user
  useEffect(() => {
    if (!loggedInUser) return;
    let cancelled = false;
    invitesApi.list(String(loggedInUser.id)).then((list) => {
      if (cancelled) return;
      setPendingInvites(
        list.map((inv) => ({
          id: inv.id,
          email: inv.email,
          invitedDate: inv.invitedDate,
          entities: inv.entities || [],
          // Bakåtkompat: gamla värden 'read'/'write' mappas till 'full-read'.
          permission:
            (inv as any).permission === 'overview' ? 'overview' : 'full-read',
        })),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [loggedInUser?.id]);

  // Remove access states
  const [showRemoveAccessDialog, setShowRemoveAccessDialog] =
    useState(false);
  const [accessToRemove, setAccessToRemove] = useState<{
    id: string;
    name: string;
    type: "shared" | "granted";
  } | null>(null);

  // Contact Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [personnummer, setPersonnummer] =
    useState("19850315-1234");

  // Original Contact Information (for detecting changes)
  const [originalFirstName, setOriginalFirstName] =
    useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");

  // Notifications

  const [contactConsent, setContactConsent] = useState(false);
  const [consentEmail, setConsentEmail] = useState(false);
  const [consentSms, setConsentSms] = useState(false);
  const [isSavingConsent, setIsSavingConsent] = useState(false);
  const [notifyForestProperties, setNotifyForestProperties] =
    useState(false);
  const [notifyRegisteredAddress, setNotifyRegisteredAddress] =
    useState(false);

  // Check if contact info has changes
  const hasContactChanges =
    firstName !== originalFirstName ||
    lastName !== originalLastName ||
    phone !== originalPhone;

  // Load user data on mount
  useEffect(() => {
    if (loggedInUser) {
      loadUserData();
    }
  }, [loggedInUser]);

  const loadUserData = async () => {
    if (!loggedInUser) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/user/${loggedInUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Split name into first and last name
        const fullName = data.name || loggedInUser.name;
        const nameParts = fullName.split(" ");
        const first = nameParts[0] || "";
        const last = nameParts.slice(1).join(" ") || "";

        setFirstName(first);
        setLastName(last);
        setEmail(data.email || loggedInUser.email);
        setPhone(data.phone || "");
        setContactConsent(
          data.notifications?.contactConsent || false,
        );

        // Set original values for comparison
        setOriginalFirstName(first);
        setOriginalLastName(last);
        setOriginalEmail(data.email || loggedInUser.email);
        setOriginalPhone(data.phone || "");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Access control handlers
  const todayIso = () => new Date().toISOString().slice(0, 10);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = inviteEmail.trim();
    if (!email || !loggedInUser) return;
    if (selectedInviteEntities.length === 0) {
      toast.error("Välj minst en entitet att bjuda in till");
      return;
    }
    const invite = {
      id: `invite-${Date.now()}`,
      userId: String(loggedInUser.id),
      email,
      invitedDate: todayIso(),
      entities: [...selectedInviteEntities],
      permission: invitePermission,
    };
    // Optimistic update
    setPendingInvites((prev) => [
      ...prev.filter((p) => p.email !== email),
      { id: invite.id, email, invitedDate: invite.invitedDate, entities: invite.entities, permission: invite.permission },
    ]);
    setInviteEmail("");
    setSelectedInviteEntities(["privat"]);
    setInvitePermission('full-read');
    setShowInviteModal(false);
    try {
      await invitesApi.upsert(invite);
      toast.success(`Inbjudan skickad till ${email}`);
    } catch (error) {
      toast.error("Kunde inte spara inbjudan");
      console.error(error);
    }
  };

  const handleResendInvite = async (email: string) => {
    if (!loggedInUser) return;
    const existing = pendingInvites.find((p) => p.email === email);
    if (!existing) return;
    const newDate = todayIso();
    setPendingInvites((prev) =>
      prev.map((p) => (p.email === email ? { ...p, invitedDate: newDate } : p)),
    );
    try {
      await invitesApi.upsert({
        id: existing.id,
        userId: String(loggedInUser.id),
        email,
        invitedDate: newDate,
        entities: existing.entities,
        permission: existing.permission,
      });
      toast.success(`Inbjudan skickad igen till ${email}`);
    } catch (error) {
      toast.error("Kunde inte uppdatera inbjudan");
      console.error(error);
    }
  };

  const handleRemovePendingInvite = async (id: string) => {
    if (!loggedInUser) return;
    setPendingInvites((prev) => prev.filter((p) => p.id !== id));
    try {
      await invitesApi.remove(String(loggedInUser.id), id);
      toast.success("Inbjudan borttagen");
    } catch (error) {
      toast.error("Kunde inte ta bort inbjudan");
      console.error(error);
    }
  };

  const handleRemoveAccess = () => {
    if (!accessToRemove) return;

    if (accessToRemove.type === "shared") {
      console.log(
        "Ta bort min åtkomst till:",
        accessToRemove.name,
      );
      toast.success(
        `Din åtkomst till ${accessToRemove.name}s profil har tagits bort`,
      );
    } else {
      console.log("Ta bort åtkomst för:", accessToRemove.name);
      toast.success(
        `${accessToRemove.name}s åtkomst till din profil har tagits bort`,
      );
    }

    setShowRemoveAccessDialog(false);
    setAccessToRemove(null);
  };

  // Mock data for access control
  const sharedAccounts =
    loggedInUser?.email === "john.doe@holmen.com"
      ? [
          {
            id: "2",
            name: "Jane Doe",
            email: "jane.doe@holmen.com",
            accessLevel: "Kan läsa och ändra",
            grantedDate: "2025-11-15",
          },
        ]
      : loggedInUser?.email === "jane.doe@holmen.com"
        ? [] // Jane Doe har inte åtkomst till någon annans fastigheter
        : [];

  const usersWithAccess =
    loggedInUser?.email === "jane.doe@holmen.com"
      ? [
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@holmen.com",
            grantedDate: "2025-11-15",
            status: "active" as const,
          },
        ]
      : loggedInUser?.email === "john.doe@holmen.com"
        ? [] // John Doe har inte gett åtkomst till sina fastigheter till någon
        : [];

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[960px] mx-auto">
          {/* Page Title */}
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
            <h1
              className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Mina sidor
            </h1>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Hantera ditt konto och dina uppgifter
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="content-stretch flex gap-[12px] md:gap-[24px] items-center relative w-full overflow-x-auto">
            <TabButton
              label="Konto"
              isActive={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <TabButton
              label="Aviseringar"
              isActive={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            />
            <TabButton
              label="Användarbehörigheter"
              isActive={activeTab === "access"}
              onClick={() => setActiveTab("access")}
            />
          </div>

          {/* Tab Content */}
          {activeTab === "profile" &&
            (isInitialLoading ? (
              // Show skeleton while loading
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <ProfileCardSkeleton
                  title="Konto"
                  description="Uppdatera din kontaktinformation"
                />
              </div>
            ) : (
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                {/* Konto Card */}
                <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                  <div
                    aria-hidden="true"
                    className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
                  />

                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <h2
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Kontouppgifter
                    </h2>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Uppdatera dina kontouppgifter i Min skog
                    </p>
                  </div>

                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    {/* First Name + Last Name Fields – side by side */}
                    <div className="flex flex-col md:flex-row gap-[16px] w-full">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:flex-1">
                        <HolmenInput
                          id="firstName"
                          label="Förnamn"
                          type="text"
                          value={firstName}
                          onChange={(e) =>
                            setFirstName(e.target.value)
                          }
                        />
                      </div>

                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:flex-1">
                        <HolmenInput
                          id="lastName"
                          label="Efternamn"
                          type="text"
                          value={lastName}
                          onChange={(e) =>
                            setLastName(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                      <HolmenInput
                        id="phone"
                        label="Telefonnummer"
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value)
                        }
                      />
                    </div>

                    {/* Email + Personnummer Fields – side by side at bottom */}
                    <div className="flex flex-col md:flex-row gap-[16px] w-full">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:flex-1">
                        <HolmenInput
                          id="email"
                          label="E-postadress"
                          type="email"
                          value={email}
                          disabled
                        />
                      </div>

                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:flex-1">
                        <HolmenInput
                          id="personnummer"
                          label="Personnummer"
                          type="text"
                          value={personnummer}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  {hasContactChanges && (
                    <>
                      <Separator className="bg-[#e4e4e4]" />
                      <div className="content-stretch flex flex-row gap-[16px] items-stretch relative shrink-0 w-full">
                        <ForestButton
                          variant="white"
                          className="flex-1"
                          onClick={() => {
                            setFirstName(originalFirstName);
                            setLastName(originalLastName);
                            setPhone(originalPhone);
                          }}
                        >
                          Avbryt
                        </ForestButton>
                        <ForestButton
                          variant="primary"
                          className="flex-1"
                          onClick={async () => {
                            if (!loggedInUser) return;
                            setIsLoading(true);
                            try {
                              const fullName =
                                `${firstName} ${lastName}`.trim();
                              const response = await fetch(
                                `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/user/${loggedInUser.id}`,
                                {
                                  method: "PUT",
                                  headers: {
                                    Authorization: `Bearer ${publicAnonKey}`,
                                    "Content-Type":
                                      "application/json",
                                  },
                                  body: JSON.stringify({
                                    name: fullName,
                                    email: originalEmail,
                                    phone,
                                  }),
                                },
                              );
                              if (response.ok) {
                                toast.success(
                                  "Uppgifter sparade",
                                );
                                setOriginalFirstName(firstName);
                                setOriginalLastName(lastName);
                                setOriginalPhone(phone);
                              } else {
                                toast.error(
                                  "Kunde inte spara ändringar",
                                );
                              }
                            } catch (error) {
                              console.error(
                                "Error saving contact info:",
                                error,
                              );
                              toast.error("Ett fel uppstod");
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                          disabled={isLoading}
                        >
                          Spara
                        </ForestButton>
                      </div>
                    </>
                  )}
                </div>

                {/* Kunduppgifter Card */}
                <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                  <div
                    aria-hidden="true"
                    className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
                  />

                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <h2
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Kunduppgifter
                    </h2>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Kontrollera att dina kunduppgifter som är
                      registrerade hos Holmen stämmer.
                    </p>
                  </div>

                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    {/* Kundnummer + Personnummer/Org.Nummer */}
                    <div className="flex flex-col md:flex-row gap-[16px] w-full">
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Kundnummer
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          18702179
                        </span>
                      </div>
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Personnummer/Org.Nummer
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          19550101-1212
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-[#e4e4e4]" />

                    {/* Förnamn + Efternamn */}
                    <div className="flex flex-col md:flex-row gap-[16px] w-full">
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Förnamn
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          {firstName || "John"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Efternamn
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          {lastName || "Doe"}
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-[#e4e4e4]" />

                    {/* Folkbokföringsadress */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        Folkbokföringsadress
                      </span>
                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        Munketorps Väg 12
                      </span>
                    </div>

                    {/* Postnummer + Postort */}
                    <div className="flex flex-col md:flex-row gap-[16px] w-full">
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Postnummer
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          123 45
                        </span>
                      </div>
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Postort
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Sundsvall
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-[#e4e4e4]" />

                    {/* Telefonnummer + Mobiltelefonnummer */}
                    <div className="flex flex-col md:flex-row gap-[16px] w-full">
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Telefonnummer
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          070-123 45 67
                        </span>
                      </div>
                      <div className="flex flex-col gap-[4px] w-full md:flex-1">
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          Mobiltelefonnummer
                        </span>
                        <span
                          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)] opacity-50"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          —
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-[#e4e4e4]" />

                    {/* E-postadress */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        E-postadress
                      </span>
                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        {email || loggedInUser?.email || "—"}
                      </span>
                    </div>
                  </div>

                  <Separator className="bg-[#e4e4e4]" />

                  {/* Info text */}
                  <div className="flex items-start gap-[12px] w-full bg-[var(--h-blue-6)] border border-[var(--h-blue-5)] p-[16px] md:p-[20px]">
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] leading-relaxed"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      För att uppdatera dina kunduppgifter,
                      vänligen kontakta din virkesköpare.
                    </p>
                  </div>
                </div>

                {/* Avsluta mitt konto */}
                <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                  <div
                    aria-hidden="true"
                    className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
                  />

                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <h2
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Avsluta mitt konto
                    </h2>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      När du tar bort ditt konto raderas dina
                      uppgifter från Min Skog. Åtgärden kan inte
                      återkallas.
                    </p>
                  </div>

                  <ForestButton
                    variant="danger"
                    className="w-full md:w-auto md:self-start"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Avsluta mitt konto
                  </ForestButton>
                </div>
              </div>
            ))}

          {activeTab === "notifications" && (
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
              {/* Combined notifications card */}
              <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                <div
                  aria-hidden="true"
                  className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
                />
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <h2
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Nyheter och event
                  </h2>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Håll dig uppdaterad om nyheter, event och
                    erbjudanden från Holmen. Ange om du vill ha
                    information om lokala event och nyheter i
                    närheten av din skogsfastighet och/eller din
                    folkbokföringsadress.
                  </p>
                </div>

                <div className="content-stretch flex flex-col gap-[0px] items-start relative shrink-0 w-full">
                  {/* Checkbox: Near forest properties */}
                  <button
                    type="button"
                    onClick={() =>
                      setNotifyForestProperties(
                        !notifyForestProperties,
                      )
                    }
                    className="flex items-start gap-[12px] w-full py-[14px] cursor-pointer transition-colors"
                    role="checkbox"
                    aria-checked={notifyForestProperties}
                    aria-label="Nära mina skogsfastigheter"
                  >
                    <div
                      className={`size-[20px] border-2 flex items-center justify-center shrink-0 mt-[2px] transition-colors ${notifyForestProperties ? "bg-[#1e3856] border-[#1e3856]" : "bg-white border-[#D4D4D4]"}`}
                    >
                      {notifyForestProperties && (
                        <Check
                          className="size-[14px] text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] text-left"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Jag vill ha information om nyheter och
                      event i närheten av{" "}
                      <span className="font-semibold">
                        mina skogsfastigheter
                      </span>
                    </span>
                  </button>

                  {/* Checkbox: Near registered address */}
                  <button
                    type="button"
                    onClick={() =>
                      setNotifyRegisteredAddress(
                        !notifyRegisteredAddress,
                      )
                    }
                    className="flex items-start gap-[12px] w-full py-[14px] cursor-pointer transition-colors"
                    role="checkbox"
                    aria-checked={notifyRegisteredAddress}
                    aria-label="Nära min folkbokföringsadress"
                  >
                    <div
                      className={`size-[20px] border-2 flex items-center justify-center shrink-0 mt-[2px] transition-colors ${notifyRegisteredAddress ? "bg-[#1e3856] border-[#1e3856]" : "bg-white border-[#D4D4D4]"}`}
                    >
                      {notifyRegisteredAddress && (
                        <Check
                          className="size-[14px] text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] text-left"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Jag vill ha information om nyheter och
                      event i närheten av{" "}
                      <span className="font-semibold">
                        min folkbokföringsadress
                      </span>
                    </span>
                  </button>
                </div>

                <Separator className="bg-[#e4e4e4]" />

                {/* Utskick / Consent */}
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <h3
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Samtycke till utskick
                  </h3>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Vill du bli uppdaterad om event, nyheter och
                    erbjudanden från Holmen? Välj hur du vill ta
                    emot informationen.
                  </p>
                </div>

                <div className="content-stretch flex flex-col gap-[0px] items-start relative shrink-0 w-full">
                  {/* Checkbox: Email consent */}
                  <button
                    type="button"
                    onClick={() =>
                      setConsentEmail(!consentEmail)
                    }
                    disabled={isSavingConsent}
                    className="flex items-start gap-[12px] w-full py-[14px] cursor-pointer transition-colors"
                    role="checkbox"
                    aria-checked={consentEmail}
                  >
                    <div
                      className={`size-[20px] border-2 flex items-center justify-center shrink-0 mt-[2px] transition-colors ${consentEmail ? "bg-[#1e3856] border-[#1e3856]" : "bg-white border-[#D4D4D4]"}`}
                    >
                      {consentEmail && (
                        <Check
                          className="size-[14px] text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] text-left"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Jag samtycker till att Holmen skickar
                      information om event, nyheter och
                      erbjudanden{" "}
                      <span className="font-semibold">
                        via e-post
                      </span>
                    </span>
                  </button>

                  {/* Checkbox: SMS consent */}
                  <button
                    type="button"
                    onClick={() => setConsentSms(!consentSms)}
                    disabled={isSavingConsent}
                    className="flex items-start gap-[12px] w-full py-[14px] cursor-pointer transition-colors"
                    role="checkbox"
                    aria-checked={consentSms}
                  >
                    <div
                      className={`size-[20px] border-2 flex items-center justify-center shrink-0 mt-[2px] transition-colors ${consentSms ? "bg-[#1e3856] border-[#1e3856]" : "bg-white border-[#D4D4D4]"}`}
                    >
                      {consentSms && (
                        <Check
                          className="size-[14px] text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] text-left"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Jag samtycker till att Holmen skickar
                      information om event, nyheter och
                      erbjudanden{" "}
                      <span className="font-semibold">
                        via sms
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "access" && (
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
              {/* Användare med åtkomst till mina fastigheter */}
              <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                <div
                  aria-hidden="true"
                  className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none"
                />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[12px] md:gap-[16px] relative shrink-0 w-full overflow-hidden">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative min-w-0 flex-1">
                    <h2
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Användare med åtkomst till mina
                      fastigheter
                    </h2>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Användare du har beviljat läsrättigheter
                      till dina fastigheter. För att ge dem full
                      behörighet att agera å dina vägnar krävs
                      en fullmakt. Kontakta din virkesköpare för
                      mer information.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="bg-[#1e3856] hover:bg-[#152b40] text-white px-[20px] py-[10px] transition-colors flex items-center justify-center gap-2 shrink-0 w-full md:w-auto whitespace-nowrap"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] uppercase"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Bjud in användare
                    </span>
                  </button>
                </div>

                {usersWithAccess.length > 0 || pendingInvites.length > 0 ? (
                  <div className="w-full flex flex-col gap-[16px]">
                    {usersWithAccess.map((accessUser) => (
                      <ContactCard
                        key={accessUser.id}
                        variant="user-access"
                        icon={accessUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                        name={accessUser.name}
                        role={accessUser.email}
                        statusText="Åtkomst beviljad."
                        onDelete={() => {
                          toast.success(
                            `${accessUser.name}s åtkomst till din profil har tagits bort`,
                          );
                        }}
                      />
                    ))}
                    {pendingInvites.map((invite) => (
                      <ContactCard
                        key={invite.id}
                        variant="user-access"
                        icon={(invite.email.split('@')[0]?.[0] || '').toUpperCase()}
                        name={invite.email}
                        role="Inbjudan väntar på svar"
                        statusText="Inbjudan skickad"
                        statusDate={invite.invitedDate}
                        pending
                        onResend={() => handleResendInvite(invite.email)}
                        onDelete={() => handleRemovePendingInvite(invite.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center py-8">
                    <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Du har inte beviljat åtkomst till någon
                      ännu
                    </p>
                  </div>
                )}
              </div>

              {/* Fastigheter jag har åtkomst till */}
              <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                <div
                  aria-hidden="true"
                  className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none"
                />

                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <h2
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[rgba(2,28,32,0.9)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Användare vars fastigheter jag har åtkomst
                    till
                  </h2>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Användare som givit dig behörighet att se
                    deras fastigheter i Min skog.
                  </p>
                </div>

                {sharedAccounts.length > 0 ? (
                  <div className="w-full flex flex-col gap-[16px]">
                    {sharedAccounts.map((account) => (
                      <ContactCard
                        key={account.id}
                        variant="user-access"
                        icon={account.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                        name={account.name}
                        role={account.email}
                        statusText="Du har läsrättigheter."
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center py-8">
                    <Key className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Ingen har beviljat dig åtkomst till sina
                      fastigheter
                    </p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-[var(--h-blue-6)] border border-[var(--h-blue-5)] p-[16px] md:p-[24px]">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] mb-2"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  Om användarbehörigheter
                </p>
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] leading-relaxed"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  Du kan ge andra användare åtkomst till dina
                  fastigheter med läsrättigheter. Läsrättigheter
                  innebär att de kan se allt som rör
                  skogsfastigheterna så som åtgärder, kontrakt
                  och skogsbruksplaner, samt göra anteckningar.
                </p>
              </div>
            </div>
          )}

          {/* Delete Account Dialog */}
          <HolmenModal
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            title="Avsluta mitt konto"
          >
            <div className="space-y-4">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-primary)] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                När du tar bort ditt konto raderas all data
                permanent, inklusive dina personliga
                anteckningar och information om din eller dina
                skogsfastigheter i Min Skog. Åtgärden kan inte
                ångras.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 space-y-2">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-red-800"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                  }}
                >
                  Följande kommer att raderas permanent:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[14px] text-red-800 font-['IBM_Plex_Sans',sans-serif]">
                  <li>Ditt användarkonto</li>
                  <li>Alla personliga anteckningar</li>
                  <li>
                    All information om dina skogsfastigheter
                  </li>
                  <li>Alla sparade inställningar</li>
                </ul>
              </div>
            </div>

            <HolmenModalFooter>
              <ForestButton
                variant="white"
                onClick={() => setShowDeleteDialog(false)}
              >
                Avbryt
              </ForestButton>
              <ForestButton
                variant="danger"
                onClick={() => {
                  toast.success("Konto avslutat (demo)");
                  setShowDeleteDialog(false);
                }}
              >
                Avsluta konto
              </ForestButton>
            </HolmenModalFooter>
          </HolmenModal>

          {/* Invite User Modal */}
          <HolmenModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            title="Bjud in användare"
            description="Ange e-postadressen till den person du vill ge åtkomst till dina skogsfastigheter."
          >
            <form
              onSubmit={handleInvite}
              className="flex flex-col gap-4"
            >
              <HolmenInput
                id="invite-email"
                label="E-postadress"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="exempel@email.com"
                required
              />

              {/* Entitet-väljare (multi-select) */}
              <div className="flex flex-col gap-[8px] w-full">
                <label
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Bjud in till
                </label>
                <div className="relative" ref={entityDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setEntityDropdownOpen((p) => !p)}
                    className="w-full h-[48px] px-[16px] py-[12px] bg-white border-2 border-[#ededed] flex items-center justify-between font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)] hover:border-[#d4d4d4] focus:border-[#1e3856] outline-none transition-colors"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className={selectedInviteEntities.length === 0 ? "text-[#999]" : ""}>
                      {selectedInviteEntities.length === 0
                        ? "Välj entitet"
                        : selectedInviteEntities.length === inviteEntityOptions.length
                          ? "Alla entiteter"
                          : selectedInviteEntities
                              .map(
                                (id) =>
                                  inviteEntityOptions.find((o) => o.id === id)?.label || id,
                              )
                              .join(", ")}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={`shrink-0 transition-transform ${entityDropdownOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#021c20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {entityDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20">
                      {inviteEntityOptions.map((opt) => {
                        const checked = selectedInviteEntities.includes(opt.id);
                        return (
                          <label
                            key={opt.id}
                            className="flex items-center gap-[12px] px-[16px] py-[10px] hover:bg-[#f7f7f7] cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setSelectedInviteEntities((prev) =>
                                  checked
                                    ? prev.filter((id) => id !== opt.id)
                                    : [...prev, opt.id],
                                )
                              }
                              className="w-[16px] h-[16px] accent-[#1e3856]"
                            />
                            <span
                              className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]"
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              {opt.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Behörighet (single-select) */}
              <div className="flex flex-col gap-[8px] w-full">
                <label
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Behörighet
                </label>
                <div className="relative" ref={permissionDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setPermissionDropdownOpen((p) => !p)}
                    className="w-full h-[48px] px-[16px] py-[12px] bg-white border-2 border-[#ededed] flex items-center justify-between font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)] hover:border-[#d4d4d4] focus:border-[#1e3856] outline-none transition-colors"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span>
                      {permissionOptions.find((o) => o.id === invitePermission)?.label || 'Välj behörighet'}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={`shrink-0 transition-transform ${permissionDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#021c20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {permissionDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20">
                      {permissionOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setInvitePermission(opt.id);
                            setPermissionDropdownOpen(false);
                          }}
                          className={`w-full px-[16px] py-[10px] text-left hover:bg-[#f7f7f7] cursor-pointer font-['IBM_Plex_Sans',sans-serif] text-[14px] ${invitePermission === opt.id ? 'font-semibold text-[#1e3856]' : 'font-normal text-[#021c20]'}`}
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Statisk visning av vad rollen innehåller — ingen
                    individuell checkbox-toggling längre eftersom rollerna
                    är fördefinierade preset. */}
                <div className="flex flex-col gap-[4px] mt-[12px]">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)] mb-[6px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Personen kan se:
                  </p>
                  {allVisibilityAreas.map((area) => {
                    const included = roleIncludes[invitePermission].includes(area.id);
                    return (
                      <div
                        key={area.id}
                        className="flex items-center gap-[10px] py-[4px]"
                      >
                        {included ? (
                          <Check
                            className="size-[16px] text-[#1e3856] shrink-0"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <span className="size-[16px] shrink-0 flex items-center justify-center">
                            <span className="block w-[10px] h-[2px] bg-[#021c20] opacity-25" />
                          </span>
                        )}
                        <span
                          className={`font-['IBM_Plex_Sans',sans-serif] text-[14px] ${
                            included ? 'text-[#021c20]' : 'text-[#021c20] opacity-40 line-through'
                          }`}
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {area.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <HolmenModalFooter>
                <ForestButton
                  type="button"
                  variant="white"
                  onClick={() => setShowInviteModal(false)}
                >
                  Avbryt
                </ForestButton>
                <ForestButton type="submit" variant="primary">
                  Bjud in
                </ForestButton>
              </HolmenModalFooter>
            </form>
          </HolmenModal>

          {/* Remove Access Modal */}
          <HolmenModal
            isOpen={showRemoveAccessDialog}
            onClose={() => {
              setShowRemoveAccessDialog(false);
              setAccessToRemove(null);
            }}
            title="Ta bort åtkomst"
          >
            <div>
              {accessToRemove?.type === "shared" ? (
                <div className="space-y-3">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-primary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Är du säker på att du vill ta bort din
                    åtkomst till{" "}
                    <span className="font-semibold">
                      {accessToRemove.name}s
                    </span>{" "}
                    konto?
                  </p>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Du kommer inte längre kunna se eller hantera
                    deras fastigheter, anteckningar eller
                    skogsbruksplan.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-primary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    Är du säker på att du vill ta bort{" "}
                    <span className="font-semibold">
                      {accessToRemove?.name}s
                    </span>{" "}
                    åtkomst till ditt konto?
                  </p>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[var(--text-secondary)]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    De kommer inte längre kunna se eller hantera
                    dina fastigheter, anteckningar eller
                    skogsbruksplan.
                  </p>
                </div>
              )}
            </div>

            <HolmenModalFooter>
              <ForestButton
                variant="secondary"
                onClick={() => {
                  setShowRemoveAccessDialog(false);
                  setAccessToRemove(null);
                }}
              >
                Avbryt
              </ForestButton>
              <ForestButton
                variant="danger"
                onClick={handleRemoveAccess}
              >
                Ta bort åtkomst
              </ForestButton>
            </HolmenModalFooter>
          </HolmenModal>
        </div>
      </div>
      <Footer />
    </div>
  );
}