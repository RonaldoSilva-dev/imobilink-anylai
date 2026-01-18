import React from "react";
import Button from "../common/Button";

export type FeatureType = "imoveis" | "clientes" | "relatorios" | string;

interface FeaturePlaceholderProps {
  featureType: FeatureType;
  onBack: () => void;
  className?: string;
}

const FEATURE_CONFIG: Record<string, { icon: string; title: string }> = {
  imoveis: {
    icon: "🏠",
    title: "Gestão de Imóveis",
  },
  clientes: {
    icon: "👥",
    title: "Gestão de Clientes",
  },
  relatorios: {
    icon: "📋",
    title: "Relatórios e Analytics",
  },
};

const DEFAULT_CONFIG = {
  icon: "🔧",
  title: "Funcionalidade em Desenvolvimento",
};

export const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({
  featureType,
  onBack,
  className = "",
}) => {
  const config = FEATURE_CONFIG[featureType] || DEFAULT_CONFIG;

  return (
    <div
      className={`bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-200 text-center ${className}`}
    >
      <div className="text-4xl md:text-5xl mb-3 md:mb-4" aria-hidden="true">
        {config.icon}
      </div>

      <h2 className="text-gray-900 text-xl md:text-2xl font-semibold mb-3 md:mb-4">
        {config.title}
      </h2>

      <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">
        Esta funcionalidade está em desenvolvimento e será implementada em
        breve!
      </p>

      <Button
        onClick={onBack}
        variant="primary"
        className="mx-auto"
        aria-label="Voltar para o dashboard principal"
      >
        Voltar para o Dashboard
      </Button>
    </div>
  );
};
