import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrototypeLogin from "./components/PrototypeLogin";
import { Loader2 } from "lucide-react";

function AuthGate() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3856]" />
      </div>
    );
  }

  if (!session) {
    return <PrototypeLogin />;
  }

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AuthGate />
  </AuthProvider>
);
