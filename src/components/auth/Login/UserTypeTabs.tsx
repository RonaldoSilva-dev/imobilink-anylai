import { UserType } from "../../../types/authTypes";

/**
 * Propriedades aceitas pelo componente `UserTypeTabs`.
 *
 * @interface UserTypeTabsProps
 * @property {UserType} userType - Tipo de usuário atualmente selecionado
 * @property {(type: UserType) => void} onUserTypeChange - Callback chamado quando o tipo de usuário é alterado
 */
interface UserTypeTabsProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

/**
 * Componente de seleção de tipo de usuário para formulários de cadastro/registro.
 *
 * Este componente permite ao usuário escolher entre diferentes tipos de perfis
 * ("Corretor" ou "Gestor") durante o processo de cadastro. A opção ativa é destacada
 * visualmente com emojis representativos.
 *
 * @component
 * @param {UserTypeTabsProps} props - Propriedades do componente
 * @param {UserType} props.userType - Tipo de usuário atualmente selecionado
 * @param {Function} props.onUserTypeChange - Função chamada ao selecionar um tipo
 *
 * @example
 * ```tsx
 * // Exemplo de uso em formulário de cadastro
 * import { useState } from 'react';
 * import UserTypeTabs from './UserTypeTabs';
 *
 * const RegisterForm = () => {
 *   const [userType, setUserType] = useState<UserType>('corretor');
 *
 *   return (
 *     <form>
 *       {/* Outros campos do formulário *\/}
 *       <UserTypeTabs
 *         userType={userType}
 *         onUserTypeChange={setUserType}
 *       />
 *       {/* Resto do formulário *\/}
 *     </form>
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} Componente React com botões de seleção de tipo de usuário
 *
 * @remarks
 * - Utilizado principalmente em formulários de cadastro
 * - Cada tipo de usuário tem permissões e funcionalidades diferentes no sistema
 * - A escolha afeta o fluxo posterior do cadastro e as permissões do usuário
 */
const UserTypeTabs = ({ userType, onUserTypeChange }: UserTypeTabsProps) => {
  /**
   * Determina as classes CSS para um botão de tipo de usuário baseado no seu estado.
   *
   * @private
   * @param {UserType} type - O tipo de usuário para o qual determinar as classes
   * @returns {string} String de classes CSS do Tailwind
   *
   * @example
   * ```tsx
   * // Para o tipo ativo:
   * getUserTypeClass("corretor") // Retorna: "flex-1 py-3 px-4 ... bg-blue-500 text-white"
   *
   * // Para o tipo inativo:
   * getUserTypeClass("gestor") // Retorna: "flex-1 py-3 px-4 ... text-gray-500 hover:text-gray-700"
   * ```
   */
  const getUserTypeClass = (type: UserType) => {
    // Classes base comuns a ambos os estados
    const baseClass =
      "flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200";

    // Retorna classes condicionais baseadas no tipo selecionado
    return userType === type
      ? `${baseClass} bg-blue-500 text-white` // Estilo para tipo ativo
      : `${baseClass} text-gray-500 hover:text-gray-700`; // Estilo para tipo inativo
  };

  return (
    // Container principal dos botões de tipo de usuário
    // - flex gap-2: Layout flexível com espaçamento de 0.5rem entre botões
    // - bg-gray-100: Fundo cinza claro para contraste
    // - p-2: Padding interno para espaçamento
    // - rounded-lg: Cantos arredondados
    // - mb-6: Margem inferior para separar de elementos seguintes
    <div className="flex gap-2 bg-gray-100 p-2 rounded-lg mb-6">
      {/* 
        Botão para selecionar tipo "Corretor"
        - type="button": Previne comportamento de submit em formulários
        - onClick: Chama onUserTypeChange com "corretor" quando clicado
        - getUserTypeClass("corretor"): Aplica estilos condicionais
        - 👨‍💼 Emoji: Representa visualmente o perfil de corretor
      */}
      <button
        type="button"
        onClick={() => onUserTypeChange("corretor")}
        className={getUserTypeClass("corretor")}
      >
        👨‍💼 Corretor
      </button>

      {/* 
        Botão para selecionar tipo "Gestor"
        - type="button": Previne comportamento de submit em formulários
        - onClick: Chama onUserTypeChange com "gestor" quando clicado
        - getUserTypeClass("gestor"): Aplica estilos condicionais
        - 👩‍💼 Emoji: Representa visualmente o perfil de gestor
      */}
      <button
        type="button"
        onClick={() => onUserTypeChange("gestor")}
        className={getUserTypeClass("gestor")}
      >
        👩‍💼 Gestor
      </button>
    </div>
  );
};

export default UserTypeTabs;
