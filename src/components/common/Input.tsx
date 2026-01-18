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
  className,
  disabled = false,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          display: "block",
          marginBottom: "0.5rem",
          fontWeight: "500",
          color: isDark ? "#e5e7eb" : "#374151",
        }}
      >
        {label}
        {required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>

      <div style={{ position: "relative" }}>
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{
            width: "100%",
            padding: "0.75rem",
            paddingRight: isPassword ? "3rem" : "0.75rem",
            border: error
              ? "1px solid #ef4444"
              : `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
            borderRadius: "0.375rem",
            backgroundColor: isDark ? "#374151" : "#fff",
            color: isDark ? "#fff" : "#000",
            fontSize: "1rem",
            transition: "all 0.2s ease",
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              color: isDark ? "#9ca3af" : "#6b7280",
              fontSize: "1rem",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {error && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "0.875rem",
            margin: "0.25rem 0 0 0",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
