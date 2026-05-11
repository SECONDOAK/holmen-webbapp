import { LogOut, Play } from "lucide-react";
import { HolmenModal, HolmenModalFooter } from "./HolmenModal";
import ForestButton from "./ForestButton";

interface LogoutChoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSimulateLogout: () => void;
  onRealLogout: () => void;
}

export default function LogoutChoiceModal({
  open,
  onOpenChange,
  onSimulateLogout,
  onRealLogout,
}: LogoutChoiceModalProps) {
  return (
    <HolmenModal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Logga ut"
      description="Välj hur du vill logga ut."
    >
      <div className="flex flex-col gap-3">
        <ForestButton
          variant="white"
          className="w-full"
          onClick={() => {
            onOpenChange(false);
            onSimulateLogout();
          }}
        >
          <Play className="h-4 w-4" />
          Simulera utloggning av användare
        </ForestButton>
        <ForestButton
          variant="primary"
          className="w-full"
          onClick={() => {
            onOpenChange(false);
            onRealLogout();
          }}
        >
          <LogOut className="h-4 w-4" />
          Logga ut från prototypen
        </ForestButton>
      </div>
      <HolmenModalFooter>
        <ForestButton variant="white" onClick={() => onOpenChange(false)}>
          Avbryt
        </ForestButton>
      </HolmenModalFooter>
    </HolmenModal>
  );
}
