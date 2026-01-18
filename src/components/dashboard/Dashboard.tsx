import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

/**
 * Componente Dashboard
 *
 * Componente principal que serve como página inicial para usuários autenticados.
 * Fornece navegação para diferentes seções da aplicação baseado no tipo de usuário.
 *
 * @componente
 * @example
 * return (
 *   <Dashboard />
 * )
 */
const Dashboard: React.FC = () => {
  /**
   * Hook do contexto de autenticação
   * @returns {Object} Estado e métodos de autenticação
   * @property {Object} user - Objeto do usuário atual com nome, email, etc.
   * @property {Function} logout - Função para deslogar o usuário atual
   */
  const { user, logout } = useAuth();

  /**
   * Hook de navegação do React Router
   * @returns {Function} Função navigate para roteamento programático
   */
  const navigate = useNavigate();

  /**
   * Manipula o processo de logout do usuário
   * - Chama a função logout do contexto de autenticação
   * - Navega o usuário para a página de login
   *
   * @function handleLogout
   * @returns {void}
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Container principal com altura total da viewport e fundo
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Container de conteúdo com largura máxima e centralização */}
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com saudação e botão de sair */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-2">
              🏠 Dlogg Platform
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Bem-vindo, <span className="font-semibold">{user?.name}</span>!
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="danger"
            className="w-full sm:w-auto"
          >
            Sair
          </Button>
        </header>

        {/* Grid de cards de navegação */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card do Dashboard do Corretor */}
          <article
            className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-100 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => navigate("/corretor/dashboard")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/corretor/dashboard")
            }
            aria-label="Acessar Dashboard do Corretor"
          >
            {/* Ícone do card */}
            <div className="text-5xl mb-4" aria-hidden="true">
              📊
            </div>

            {/* Título do card */}
            <h2 className="text-gray-800 text-xl font-semibold mb-4">
              Dashboard do Corretor
            </h2>

            {/* Descrição do card */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Acesse sua área profissional completa com métricas, matches e
              gestão de imóveis.
            </p>

            {/* Botão de ação */}
            <Button
              variant="primary"
              className="w-full group-hover:bg-blue-600 transition-colors"
              aria-label="Acessar Dashboard do Corretor"
            >
              Acessar Dashboard
            </Button>
          </article>

          {/* Card do Perfil */}
          <article
            className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-100 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => navigate("/corretor/profile")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/corretor/profile")
            }
            aria-label="Acessar Perfil do Corretor"
          >
            {/* Ícone do card */}
            <div className="text-5xl mb-4" aria-hidden="true">
              👤
            </div>

            {/* Título do card */}
            <h2 className="text-gray-800 text-xl font-semibold mb-4">
              Meu Perfil
            </h2>

            {/* Descrição do card */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Gerencie suas informações profissionais, especializações e
              certificados.
            </p>

            {/* Botão de ação */}
            <Button
              variant="secondary"
              className="w-full group-hover:bg-gray-700 transition-colors"
              aria-label="Editar Perfil do Corretor"
            >
              Editar Perfil
            </Button>
          </article>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
