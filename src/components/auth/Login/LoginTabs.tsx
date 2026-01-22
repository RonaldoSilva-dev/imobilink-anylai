import { AuthTab } from "../../../types/authTypes";

/**
 * Propriedades aceitas pelo componente `LoginTabs`.
 *
 * @interface LoginTabsProps
 * @property {AuthTab} activeTab - Aba atualmente selecionada
 * @property {(tab: AuthTab) => void} onTabChange - Callback chamado quando o usuário troca de aba
 */
interface LoginTabsProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

/**
 * Componente de abas para alternar entre login e cadastro.
 *
 * Este componente renderiza duas abas (Entrar e Cadastrar) que permitem ao usuário
 * alternar entre os modos de autenticação. A aba ativa é destacada visualmente.
 *
 * @component
 * @param {LoginTabsProps} props - Propriedades do componente
 * @param {AuthTab} props.activeTab - Aba atualmente ativa
 * @param {Function} props.onTabChange - Função chamada ao clicar em uma aba
 *
 * @example
 * ```tsx
 * // Exemplo de uso controlado
 * import { useState } from 'react';
 * import LoginTabs from './LoginTabs';
 *
 * const AuthForm = () => {
 *   const [activeTab, setActiveTab] = useState<AuthTab>('login');
 *
 *   return (
 *     <div>
 *       <LoginTabs
 *         activeTab={activeTab}
 *         onTabChange={setActiveTab}
 *       />
 *       {/* Renderiza formulário baseado na aba ativa *\/}
 *     </div>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} Componente React com abas de navegação estilizadas
 */
const LoginTabs = ({ activeTab, onTabChange }: LoginTabsProps) => {
  /**
   * Determina as classes CSS para uma aba baseada no seu estado.
   *
   * @private
   * @param {AuthTab} tab - A aba para a qual determinar as classes
   * @returns {string} String de classes CSS do Tailwind
   *
   * @example
   * ```tsx
   * // Para a aba ativa:
   * getTabClass("login") // Retorna: "flex-1 py-3 px-4 ... bg-blue-500 text-white"
   *
   * // Para a aba inativa:
   * getTabClass("register") // Retorna: "flex-1 py-3 px-4 ... text-gray-500 hover:text-gray-700"
   * ```
   */
  const getTabClass = (tab: AuthTab) => {
    // Classes base comuns a ambas os estados
    const baseClass =
      "flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200";

    // Retorna classes condicionais baseadas no estado da aba
    return activeTab === tab
      ? `${baseClass} bg-blue-500 text-white` // Estilo para aba ativa
      : `${baseClass} text-gray-500 hover:text-gray-700`; // Estilo para aba inativa
  };

  return (
    // Container principal das abas
    // - bg-gray-100: Fundo cinza claro para contraste
    // - p-1: Padding interno para criar efeito de "encaixe"
    // - rounded-lg: Cantos arredondados
    // - mb-6: Margem inferior para espaçamento com elementos seguintes
    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
      {/* 
        Botão da aba "Entrar" (Login)
        - type="button": Previne comportamento padrão de submit
        - onClick: Chama onTabChange com "login" quando clicado
        - getTabClass("login"): Aplica estilos condicionais
      */}
      <button
        type="button"
        onClick={() => onTabChange("login")}
        className={getTabClass("login")}
      >
        Entrar
      </button>

      {/* 
        Botão da aba "Cadastrar" (Register)
        - type="button": Previne comportamento padrão de submit
        - onClick: Chama onTabChange com "register" quando clicado
        - getTabClass("register"): Aplica estilos condicionais
      */}
      <button
        type="button"
        onClick={() => onTabChange("register")}
        className={getTabClass("register")}
      >
        Cadastrar
      </button>
    </div>
  );
};

export default LoginTabs;
