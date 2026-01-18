import React from "react";

export type DashboardTab =
  | "overview"
  | "matches"
  | "imoveis"
  | "clientes"
  | "relatorios";

interface DashboardTabsProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  className?: string;
}

const TAB_CONFIG = [
  { id: "overview" as DashboardTab, label: " Visão Geral", icon: "📈" },
  { id: "matches" as DashboardTab, label: " Matches", icon: "🤝" },
  { id: "imoveis" as DashboardTab, label: " Imóveis", icon: "🏠" },
  { id: "clientes" as DashboardTab, label: " Clientes", icon: "👥" },
  { id: "relatorios" as DashboardTab, label: " Relatórios", icon: "📋" },
] as const;

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <nav
      className={`flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 border-b border-gray-200 pb-3 md:pb-4 ${className}`}
      aria-label="Navegação do dashboard"
    >
      {TAB_CONFIG.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium 
            flex items-center gap-1 md:gap-2 transition-all duration-200 
            whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            ${
              activeTab === tab.id
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }
          `}
          aria-label={`Navegar para ${tab.label}`}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          <span aria-hidden="true">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
