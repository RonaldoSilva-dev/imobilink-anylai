import React from "react";
import Button from "../common/Button";

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  variant: "primary" | "secondary" | "danger" | "success";
  onClick?: () => void;
};

interface QuickActionsProps {
  title?: string;
  actions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
  className?: string;
}

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    id: "cadastrar-imovel",
    label: "Cadastrar Imóvel",
    icon: "📋",
    variant: "primary",
  },
  {
    id: "novo-cliente",
    label: "Novo Cliente",
    icon: "👥",
    variant: "secondary",
  },
  {
    id: "buscar-matches",
    label: "Buscar Matches",
    icon: "🤝",
    variant: "secondary",
  },
  {
    id: "gerar-relatorio",
    label: "Gerar Relatório",
    icon: "📊",
    variant: "secondary",
  },
];

export const QuickActions: React.FC<QuickActionsProps> = ({
  title = "🚀 Ações Rápidas",
  actions = DEFAULT_ACTIONS,
  onActionClick,
  className = "",
}) => {
  const handleClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (onActionClick) {
      onActionClick(action.id);
    } else {
      console.log(`Ação clicada: ${action.label}`);
    }
  };

  return (
    <section
      className={`bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200 ${className}`}
    >
      <h2 className="text-gray-800 text-lg md:text-xl font-semibold mb-4 md:mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            onClick={() => handleClick(action)}
            className="justify-center text-sm md:text-base flex items-center gap-2"
            aria-label={action.label}
          >
            <span aria-hidden="true">{action.icon}</span>
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
};
