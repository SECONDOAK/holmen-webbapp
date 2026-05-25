import React from 'react';

interface ForestButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'danger';
  size?: 'default' | 'small';
  children: React.ReactNode;
}

export default function ForestButton({ 
  variant = 'primary',
  size = 'default',
  children, 
  className = '',
  disabled,
  ...props 
}: ForestButtonProps) {
  // Höjderna är låsta så knapparna alltid linjerar med inputfält:
  //   default = 48px (matchar HolmenInput)
  //   small   = 36px (kompakt-variant)
  const sizeStyles = {
    default: "h-[48px] px-[32px] text-[14px] leading-[25.5px]",
    small: "h-[36px] px-[20px] text-[14px] leading-[20px]"
  };

  const baseStyles = "box-border content-stretch flex items-center justify-center gap-2 cursor-pointer transition-colors border-2 font-['IBM_Plex_Sans',sans-serif] font-bold text-center uppercase";

  const variantStyles = {
    primary: "bg-[#1e3856] text-white border-[#1e3856] hover:bg-[#2a4a6a] hover:border-[#2a4a6a]",
    secondary: "bg-[#e4f5f5] text-[#0f233b] border-[#e4f5f5] hover:bg-[#d0ebeb] hover:border-[#d0ebeb]",
    white: "bg-white text-[#1e3856] border-[#ededed] hover:bg-gray-50",
    danger: "bg-[#ff4d4f] text-white border-[#ff4d4f] hover:bg-[#ff7875] hover:border-[#ff7875]"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      style={{ fontVariationSettings: "'wdth' 100" }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}