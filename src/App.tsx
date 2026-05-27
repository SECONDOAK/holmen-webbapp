import './styles/globals.css';
import { useState, useEffect } from 'react';
import { ProfileProvider, useProfile } from './contexts/ProfileContext';
import Header from './components/Header';
import { ProfileBanner } from './components/ProfileBanner';
import Sidebar from './components/Sidebar';
import BottomNavigation from './components/BottomNavigation';
import OverviewPage from './pages/OverviewPage';
import PropertiesPage from './pages/PropertiesPage';
import EconomyPage from './pages/EconomyPage';
import EconomyOverviewPage from './pages/EconomyOverviewPage';
import ContractsPageV2 from './pages/ContractsPageV2';
import ServicesPage from './pages/ServicesPage';
import MorePage from './pages/MorePage';
import AccountPage from './pages/AccountPage';
import AdminToolsPage from './pages/AdminToolsPage';
import DatabaseToolsPage from './pages/DatabaseToolsPage';
import UserTestingPage from './pages/UserTestingPage';
import DesignLibraryPage from './pages/DesignLibraryPage';
import ContractsPage from './pages/ContractsPage';
import ContractDetailPage from './pages/ContractDetailPage';
import InvoicesPage from './pages/InvoicesPage';
import AnnualStatementPage from './pages/AnnualStatementPage';
import DocumentsPage from './pages/DocumentsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import AllNewsPage from './pages/AllNewsPage';
import UserSwitchLoadingScreen from './components/UserSwitchLoadingScreen';
import LogoutLoadingScreen from './components/LogoutLoadingScreen';
import LogoutChoiceModal from './components/LogoutChoiceModal';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import OnboardingFlow from './pages/OnboardingFlow';
import { Toaster } from './components/ui/sonner';
import { getArticleById } from './data/newsArticles';
import { seedMissingData, resetDatabase } from './utils/resetDatabase';
import { projectId, publicAnonKey } from './utils/supabase/info';

console.log('[APP] ========== APP MODULE LOADED ==========');
console.log('[APP] Timestamp:', new Date().toISOString());

/**
 * Pages that are deep-linkable via URL hash (e.g. `#contracts`).
 * Special pages with extra state (news-article needs an ID,
 * database-tools/user-testing/design-library are admin sub-pages)
 * are intentionally omitted — they fall back to overview on direct
 * hash navigation.
 */
const HASH_LINKABLE_PAGES = new Set<string>([
  'overview',
  'properties',
  'economy',
  'contracts',
  'contracts-legacy',
  'invoices',
  'annual-statement',
  'documents',
  'services',
  'more',
  'account',
  'admin-tools',
  'all-news',
]);

/**
 * Pages that should mark the "Ekonomi" sidebar/bottom-nav item as
 * active. Shared between Sidebar (desktop) and BottomNavigation
 * (mobile via its own isActive() helper).
 */
export const ECONOMY_PAGES = new Set<string>([
  'economy',
  'contracts',
  'contracts-legacy',
  'invoices',
  'annual-statement',
  'documents',
  'contract-detail',
]);

/**
 * Parsar URL-hashen till en sida + ev. parameter. Stödjer både plain
 * sidor (`#contracts`) och kontrakts­detalj-rutten (`#contract/c1`).
 */
function parseHash(): { page: string | null; contractId?: string } {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { page: null };

  if (hash.startsWith('contract/')) {
    const id = hash.slice('contract/'.length);
    if (id) return { page: 'contract-detail', contractId: id };
  }

  if (HASH_LINKABLE_PAGES.has(hash)) return { page: hash };
  return { page: null };
}

function pageFromHash(): string | null {
  return parseHash().page;
}

// Migrate departments to add siteIndex
const migrateSiteIndex = async () => {
  try {
    console.log('[MIGRATION] Starting siteIndex migration from frontend...');
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/migrate-site-index`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }
    );
    
    const data = await response.json();
    console.log('[MIGRATION] Result:', data);
    
    if (data.success) {
      console.log(`[MIGRATION] ✅ Successfully migrated ${data.updated} of ${data.total} departments`);
      alert(`Migration complete! Updated ${data.updated} departments with siteIndex. Please reload the page (F5).`);
    } else {
      console.error('[MIGRATION] ❌ Migration failed:', data);
      alert('Migration failed. Check console for details.');
    }
    
    return data;
  } catch (error) {
    console.error('[MIGRATION] ❌ Error during migration:', error);
    alert('Migration error. Check console for details.');
    return { error: String(error) };
  }
};

// Expose database utilities to window for debugging
if (typeof window !== 'undefined') {
  (window as any).seedMissingData = seedMissingData;
  (window as any).resetDatabase = resetDatabase;
  (window as any).migrateSiteIndex = migrateSiteIndex;
  console.log('[APP] resetDatabase() available in console for debugging');
  console.log('[APP] Database utilities available:');
  console.log('[APP]   - seedMissingData() - Safe: adds missing data without deleting');
  console.log('[APP]   - resetDatabase() - Destructive: clears all data');
  console.log('[APP]   - migrateSiteIndex() - Safe: adds siteIndex to existing departments');
}

function AppContent() {
  console.log('[APP] AppContent rendering');
  const initialHash = parseHash();
  const [currentPage, setCurrentPage] = useState(() => initialHash.page ?? 'overview');
  const [previousPage, setPreviousPage] = useState('overview');
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    initialHash.contractId ?? null,
  );
  const [isMobile, setIsMobile] = useState(false);
  const { isSwitchingProfile, isSwitchingUser } = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Start as logged in for existing users
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true); // Start as completed
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { signOut } = useAuth();
  console.log('[APP] isSwitchingProfile:', isSwitchingProfile);
  console.log('[APP] isSwitchingUser:', isSwitchingUser);

  useEffect(() => {
    console.log('[APP] AppContent mounted');
    
    // Reset body overflow to prevent blocking interactions after reload
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';

    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setCurrentPage(customEvent.detail);
      setCurrentArticleId(null); // Reset article when navigating away
      // Reset property selection when navigating away from properties
      if (customEvent.detail !== 'properties') {
        setSelectedPropertyId(null);
      }
      // Lämna kontrakts­detaljen när vi navigerar bort
      if (customEvent.detail !== 'contract-detail') {
        setSelectedContractId(null);
      }
    };

    const handleOpenContract = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSelectedContractId(customEvent.detail);
      setCurrentPage('contract-detail');
    };

    const handleNavigateToArticle = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setCurrentArticleId(customEvent.detail);
      setPreviousPage(currentPage); // Save the current page before navigating to article
      setCurrentPage('news-article');
    };

    const handleSelectProperty = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSelectedPropertyId(customEvent.detail);
      setCurrentPage('properties');
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Suppress CSS access errors from external libraries
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || '';
      // Filter out CSS stylesheet access errors
      if (errorMessage.includes('cssRules') || errorMessage.includes('CSSStyleSheet')) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Sync hash -> state when the user hits back/forward or pastes a
    // deep link. The state -> hash direction is handled by the
    // separate useEffect below.
    const handleHashChange = () => {
      const parsed = parseHash();
      if (parsed.page === 'contract-detail' && parsed.contractId) {
        setSelectedContractId(parsed.contractId);
        setCurrentPage('contract-detail');
        return;
      }
      const next = parsed.page ?? 'overview';
      setCurrentPage((curr) => (curr === next ? curr : next));
      if (next !== 'contract-detail') setSelectedContractId(null);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('navigate', handleNavigate);
    window.addEventListener('navigateToArticle', handleNavigateToArticle);
    window.addEventListener('selectProperty', handleSelectProperty);
    window.addEventListener('openContract', handleOpenContract);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('navigate', handleNavigate);
      window.removeEventListener('navigateToArticle', handleNavigateToArticle);
      window.removeEventListener('selectProperty', handleSelectProperty);
      window.removeEventListener('openContract', handleOpenContract);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      console.error = originalConsoleError; // Restore original console.error
    };
  }, []);

  // Sync state -> hash so each top-level page has its own URL and
  // browser back/forward works. Skip pages that aren't deep-linkable
  // (news-article needs an article id; admin sub-pages aren't shareable).
  useEffect(() => {
    if (currentPage === 'contract-detail') {
      if (!selectedContractId) return;
      const desired = `#contract/${selectedContractId}`;
      if (window.location.hash !== desired) {
        window.history.pushState(null, '', desired);
      }
      return;
    }
    if (!HASH_LINKABLE_PAGES.has(currentPage)) return;
    const desired = `#${currentPage}`;
    if (window.location.hash !== desired) {
      window.history.pushState(null, '', desired);
    }
  }, [currentPage, selectedContractId]);

  // Show loading screen when switching users
  if (isSwitchingProfile || isSwitchingUser) {
    return <UserSwitchLoadingScreen />;
  }

  // Show loading screen when logging out
  if (isLoggingOut) {
    return <LogoutLoadingScreen />;
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      setIsLoggedIn(false);
      setHasCompletedOnboarding(false);
    }, 2000);
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLoginComplete={() => setIsLoggedIn(true)} />;
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'properties':
        return <PropertiesPage initialPropertyId={selectedPropertyId} />;
      case 'economy':
        return <EconomyOverviewPage />;
      case 'contracts':
        return <ContractsPageV2 />;
      case 'contract-detail':
        return (
          <ContractDetailPage
            contractId={selectedContractId ?? ''}
            onBack={() => setCurrentPage('contracts')}
          />
        );
      case 'contracts-legacy':
        return <ContractsPage />;
      case 'invoices':
        return <InvoicesPage />;
      case 'annual-statement':
        return <AnnualStatementPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'services':
        return <ServicesPage />;
      case 'more':
        return <MorePage />;
      case 'account':
        return <AccountPage />;
      case 'admin-tools':
        return <AdminToolsPage />;
      case 'database-tools':
        return <DatabaseToolsPage onBack={() => setCurrentPage('admin-tools')} />;
      case 'user-testing':
        return <UserTestingPage onBack={() => setCurrentPage('admin-tools')} />;
      case 'design-library':
        return <DesignLibraryPage onBack={() => setCurrentPage('admin-tools')} />;
      case 'all-news':
        return (
          <AllNewsPage 
            onBack={() => setCurrentPage('overview')}
            onArticleClick={(articleId) => {
              setCurrentArticleId(articleId);
              setPreviousPage('all-news'); // Save that we came from all-news
              setCurrentPage('news-article');
            }}
          />
        );
      case 'news-article':
        if (currentArticleId) {
          const article = getArticleById(currentArticleId);
          if (article) {
            return (
              <NewsArticlePage 
                article={article} 
                onBack={() => {
                  setCurrentPage(previousPage); // Go back to the page we came from
                  setCurrentArticleId(null);
                }} 
              />
            );
          }
        }
        return <OverviewPage />;
      default:
        return <OverviewPage />;
    }
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div className="bg-[#f7f7f7] relative h-full flex flex-col overflow-x-hidden">
        {currentPage !== 'properties' && (
          <div className="fixed top-0 left-0 right-0 z-[100]">
            <Header onNavigate={setCurrentPage} onLogout={() => setShowLogoutModal(true)} />
            <ProfileBanner />
          </div>
        )}
        <div className={`flex-1 overflow-y-auto ${currentPage !== 'properties' ? 'pt-[72px] pb-[83px]' : 'pb-[83px]'}`}>
          {renderPage()}
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-[100]">
          <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
        <Toaster richColors />
        <LogoutChoiceModal
          open={showLogoutModal}
          onOpenChange={setShowLogoutModal}
          onSimulateLogout={handleLogout}
          onRealLogout={signOut}
        />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="bg-[#f7f7f7] relative h-full flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Header onNavigate={setCurrentPage} onLogout={() => setShowLogoutModal(true)} />
        <ProfileBanner />
      </div>
      <div className="flex flex-1 pt-[72px] overflow-hidden">
        <div className="fixed top-[72px] left-0 bottom-0 z-[95]">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
        <div className="ml-[100px] flex-1 overflow-y-auto">
          {renderPage()}
        </div>
      </div>
      <Toaster richColors />
      <LogoutChoiceModal
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        onSimulateLogout={handleLogout}
        onRealLogout={signOut}
      />
    </div>
  );
}

export default function App() {
  console.log('[APP] Main App component rendering');
  
  try {
    return (
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    );
  } catch (error) {
    console.error('[APP] Fatal error in App:', error);
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Fel uppstod</h1>
          <p className="text-gray-700 mb-4">Ett oväntat fel har inträffat.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ladda om sidan
          </button>
        </div>
      </div>
    );
  }
}