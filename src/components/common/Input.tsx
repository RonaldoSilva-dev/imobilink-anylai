import React, { useState } from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  isDark?: boolean;
  className?: string;
  disabled?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  isDark = false,
  className = "",
  disabled = false,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Preparar props do input para evitar a expressão direta
  const inputProps: any = {
    type: isPassword && showPassword ? "text" : type,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value),
    placeholder,
    required,
    disabled,
    className: `
      w-full px-3 py-2 rounded-lg border text-base transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${
        error
          ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500"
          : isDark
            ? "border-gray-600 focus:border-blue-500"
            : "border-gray-300 focus:border-blue-500"
      }
      ${
        isDark
          ? disabled
            ? "bg-gray-700 text-gray-400"
            : "bg-gray-800 text-white"
          : disabled
            ? "bg-gray-100 text-gray-500"
            : "bg-white text-gray-900"
      }
      ${disabled ? "cursor-not-allowed opacity-70" : ""}
      ${isPassword ? "pr-10" : ""}
    `,
  };

  // Adicionar aria-invalid apenas se houver erro
  if (error) {
    inputProps["aria-invalid"] = "true";
  }

  return (
    <div className={`mb-6 ${className}`}>
      {/* Label */}
      <label
        className={`block mb-2 font-medium ${isDark ? "text-gray-300" : "text-gray-700"} ${disabled ? "text-gray-400" : ""}`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Container do input com botão de senha */}
      <div className="relative">
        <input {...inputProps} />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} transition-colors`}
            disabled={disabled}
            title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Texto de ajuda */}
      {helperText && !error && (
        <p
          className={`text-sm mt-1 ${disabled ? "text-gray-400" : isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
