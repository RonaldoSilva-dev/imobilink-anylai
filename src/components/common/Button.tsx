import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large"; // ✅ ADICIONAR ESTA LINHA
  disabled?: boolean;
  loading?: boolean;
  isDark?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium", // ✅ VALOR PADRÃO
  disabled = false,
  loading = false,
  isDark = false,
  style,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: isDark ? "#4f46e5" : "#3b82f6",
          color: "white",
          hoverBackground: isDark ? "#4338ca" : "#2563eb",
        };
      case "secondary":
        return {
          backgroundColor: isDark ? "#6b7280" : "#9ca3af",
          color: "white",
          hoverBackground: isDark ? "#4b5563" : "#6b7280",
        };
      case "danger":
        return {
          backgroundColor: isDark ? "#dc2626" : "#ef4444",
          color: "white",
          hoverBackground: isDark ? "#b91c1c" : "#dc2626",
        };
      case "success":
        return {
          backgroundColor: isDark ? "#059669" : "#10b981",
          color: "white",
          hoverBackground: isDark ? "#047857" : "#059669",
        };
      default:
        return {
          backgroundColor: isDark ? "#4f46e5" : "#3b82f6",
          color: "white",
          hoverBackground: isDark ? "#4338ca" : "#2563eb",
        };
    }
  };

  // ✅ ADICIONAR FUNÇÃO PARA TAMANHOS
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          minHeight: "36px",
        };
      case "large":
        return {
          padding: "1rem 2rem",
          fontSize: "1.125rem",
          minHeight: "52px",
        };
      default: // medium
        return {
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          minHeight: "44px",
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles(); // ✅ USAR TAMANHOS

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        padding: sizeStyles.padding, // ✅ USAR PADDING DO TAMANHO
        backgroundColor: variantStyles.backgroundColor,
        color: variantStyles.color,
        border: "none",
        borderRadius: "0.375rem",
        fontSize: sizeStyles.fontSize, // ✅ USAR FONT SIZE DO TAMANHO
        fontWeight: "500",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        transition: "all 0.2s ease",
        minWidth: "44px",
        minHeight: sizeStyles.minHeight, // ✅ USAR ALTURA MÍNIMA DO TAMANHO
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        ...style,
      }}
      onMouseOver={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = variantStyles.hoverBackground;
        }
      }}
      onMouseOut={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = variantStyles.backgroundColor;
        }
      }}
    >
      {loading && (
        <div
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid transparent",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      {children}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
};

export default Button;
