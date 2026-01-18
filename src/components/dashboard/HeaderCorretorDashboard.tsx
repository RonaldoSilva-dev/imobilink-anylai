// src/components/dashboard/HeaderCorretorDashboard.tsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../common/Button";

interface HeaderCorretorDashboardProps {
  onLogout: () => void;
}

export const HeaderCorretorDashboard: React.FC<
  HeaderCorretorDashboardProps
> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white py-4 px-4 md:px-8 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-blue-600 text-xl md:text-2xl font-bold">
            🏠 Dlogg LinkImobili
          </h1>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
            Área do Corretor
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-gray-700">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <Button
            onClick={onLogout}
            variant="danger"
            className="px-4 py-2 text-sm"
          >
            🚪 Sair
          </Button>
        </div>
      </div>
    </header>
  );
};
