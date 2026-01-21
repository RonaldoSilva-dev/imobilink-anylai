/**
 * Componente de cabeçalho para a página/tela de login.
 *
 * Este componente renderiza o cabeçalho visual da interface de autenticação,
 * exibindo o logotipo/marca e slogan da aplicação.
 *
 * @component
 * @example
 * ```tsx
 * // Uso básico em uma página de login
 * import LoginHeader from './LoginHeader';
 *
 * const LoginPage = () => (
 *   <div className="login-page">
 *     <LoginHeader />
 *     {/* Resto do formulário de login *\/}
 *   </div>
 * );
 * ```
 *
 * @returns {JSX.Element} Componente React contendo o cabeçalho estilizado
 *
 * @remarks
 * - Utiliza classes do Tailwind CSS para estilização
 * - Componente puramente visual (sem estado ou lógica de negócio)
 * - Responsivo por padrão (devido ao Tailwind)
 * - Ícone de emoji utilizado como placeholder para logotipo
 */
const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* 
        Título principal da aplicação
        - text-2xl: Tamanho de fonte grande
        - font-bold: Peso de fonte em negrito
        - text-gray-800: Cor cinza escuro para bom contraste
        - mb-2: Margem inferior de 0.5rem (8px) para espaçamento
      */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        🏠 Imobilink-Anylai
      </h1>

      {/* 
        Slogan ou descrição da aplicação
        - text-gray-600: Cor cinza médio para hierarquia visual
        - Sem margem extra (herda do container pai)
      */}
      <p className="text-gray-600">Sua rede imobiliária inteligente</p>
    </div>
  );
};

export default LoginHeader;
