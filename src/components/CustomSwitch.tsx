interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CustomSwitch({ checked, onCheckedChange, disabled = false }: CustomSwitchProps) {
  return (
    <div 
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${checked ? 'bg-[#1e3856]' : 'bg-gray-300'}`}
    >
      <div 
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : ''
        }`}
      />
    </div>
  );
}
