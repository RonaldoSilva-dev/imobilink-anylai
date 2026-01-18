import React from "react";
import Button from "../common/Button";

interface WelcomeSectionProps {
  userName?: string;
  onProfileClick: () => void;
  onSearchClick?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName,
  onProfileClick,
  onSearchClick = () => console.log("Buscar empreendimentos"),
}) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-6 md:mb-8">
      <h2 className="text-gray-900 text-xl md:text-2xl font-semibold mb-3 md:mb-4">
        👋 Bem-vindo, {userName}!
      </h2>
      <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">
        Sua jornada no Imobilink-Anylai começa aqui. Encontre os melhores
        empreendimentos e faça matches com construtoras que combinam com seu
        perfil.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          onClick={onProfileClick}
          className="flex items-center gap-2"
        >
          👤 Completar Meu Perfil
        </Button>
        <Button
          variant="secondary"
          onClick={onSearchClick}
          className="flex items-center gap-2"
        >
          💼 Buscar Empreendimentos
        </Button>
      </div>
    </div>
  );
};
