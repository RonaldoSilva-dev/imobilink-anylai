import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  // Classes base
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  // Variantes
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
  };

  // Tamanhos
  const sizes = {
    small: "px-3 py-1.5 text-sm min-h-9",
    medium: "px-4 py-2 text-base min-h-11",
    large: "px-6 py-3 text-lg min-h-14",
  };

  // Largura
  const width = fullWidth ? "w-full" : "";

  // Classe final
  const buttonClass = `${baseClasses} ${variants[variant]} ${sizes[size]} ${width} ${className}`;

  // 🔥 CORREÇÃO CRÍTICA: Desabilita se loading OU disabled
  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClass}
      disabled={isDisabled} // 🔥 APLICA O DISABLED AQUI
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export default Button;
