import React from "react";

export type StatsCardVariant =
  | "blue"
  | "emerald"
  | "amber"
  | "purple"
  | "red"
  | "indigo"
  | "pink"
  | "gray";

export interface StatsCardProps {
  icon: string;
  title: string;
  description?: string;
  value: string | number;
  variant?: StatsCardVariant;
  trend?: "up" | "down" | "neutral";
  change?: string;
  suffix?: string;
  className?: string;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<StatsCardVariant, string> = {
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
  purple: "text-purple-600",
  red: "text-red-600",
  indigo: "text-indigo-600",
  pink: "text-pink-600",
  gray: "text-gray-600",
};

const TREND_ICONS = {
  up: "↗️",
  down: "↘️",
  neutral: "➡️",
};

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  description,
  value,
  variant = "blue",
  trend,
  change,
  suffix,
  className = "",
  onClick,
}) => {
  const cardClasses = [
    "bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 text-center",
    "transition-all duration-200 hover:shadow-md",
    onClick
      ? "cursor-pointer hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const valueClasses = [
    "text-3xl md:text-4xl font-bold",
    VARIANT_CLASSES[variant],
  ].join(" ");

  // Elemento dinâmico: button se clicável, div se não
  const CardElement = onClick ? "button" : "div";

  return (
    <CardElement
      className={cardClasses}
      onClick={onClick}
      // NÃO use role="button" - button já tem role implícita
      // role={onClick ? 'button' : undefined} ← REMOVA ESTA LINHA
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      aria-label={onClick ? `Ver detalhes de ${title}` : undefined}
    >
      {/* Ícone */}
      <div className="text-3xl md:text-4xl mb-2" aria-hidden="true">
        {icon}
      </div>

      {/* Título */}
      <h3 className="text-gray-900 font-medium mb-1 text-sm md:text-base">
        {title}
      </h3>

      {/* Descrição */}
      {description && (
        <p className="text-gray-500 text-xs md:text-sm mb-2">{description}</p>
      )}

      {/* Valor e informações adicionais */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-2">
          <div className={valueClasses}>{value}</div>

          {/* Tendência e mudança */}
          {(trend || change) && (
            <div
              className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-gray-500"}`}
            >
              {trend && (
                <span className="text-xs" aria-hidden="true">
                  {TREND_ICONS[trend]}
                </span>
              )}
              {change && <span className="font-medium">{change}</span>}
            </div>
          )}
        </div>

        {/* Sufixo */}
        {suffix && <div className="text-gray-500 text-sm mt-1">{suffix}</div>}
      </div>
    </CardElement>
  );
};
