import Input from "../../common/Input";
import Button from "../../common/Button";
import { LoginErrors } from "../../../types/authTypes";

/**
 * Propriedades aceitas pelo componente `LoginForm`.
 *
 * @interface LoginFormProps
 * @property {string} email - Valor atual do campo de e-mail
 * @property {string} password - Valor atual do campo de senha
 * @property {LoginErrors} errors - Objeto contendo mensagens de erro de validação
 * @property {boolean} loading - Indica se o formulário está em estado de carregamento (submissão)
 * @property {(value: string) => void} onEmailChange - Callback para alteração do valor do e-mail
 * @property {(value: string) => void} onPasswordChange - Callback para alteração do valor da senha
 * @property {() => void} onClearErrors - Callback para limpar mensagens de erro
 * @property {(e: React.FormEvent) => void} onSubmit - Callback para submissão do formulário
 */
interface LoginFormProps {
  email: string;
  password: string;
  errors: LoginErrors;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onClearErrors: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Componente de formulário de login/autenticação.
 *
 * Este componente renderiza um formulário completo para autenticação de usuários,
 * incluindo campos de e-mail e senha, validações, mensagens de erro e credenciais
 * de demonstração para testes.
 *
 * @component
 * @param {LoginFormProps} props - Propriedades do componente
 * @param {string} props.email - Valor atual do e-mail
 * @param {string} props.password - Valor atual da senha
 * @param {LoginErrors} props.errors - Erros de validação
 * @param {boolean} props.loading - Estado de carregamento
 * @param {Function} props.onEmailChange - Handler para alteração de e-mail
 * @param {Function} props.onPasswordChange - Handler para alteração de senha
 * @param {Function} props.onClearErrors - Handler para limpar erros
 * @param {Function} props.onSubmit - Handler para submissão do formulário
 *
 * @example
 * ```tsx
 * // Exemplo de uso com gerenciamento de estado
 * import { useState } from 'react';
 * import LoginForm from './LoginForm';
 *
 * const AuthPage = () => {
 *   const [email, setEmail] = useState('');
 *   const [password, setPassword] = useState('');
 *   const [errors, setErrors] = useState<LoginErrors>({});
 *   const [loading, setLoading] = useState(false);
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     setLoading(true);
 *     // Lógica de autenticação
 *     setLoading(false);
 *   };
 *
 *   return (
 *     <LoginForm
 *       email={email}
 *       password={password}
 *       errors={errors}
 *       loading={loading}
 *       onEmailChange={setEmail}
 *       onPasswordChange={setPassword}
 *       onClearErrors={() => setErrors({})}
 *       onSubmit={handleSubmit}
 *     />
 *   );
 * };
 * ```
 *
 * @returns {JSX.Element} Formulário de login com campos de autenticação
 *
 * @remarks
 * - **Credenciais de Demo**: Inclui credenciais pré-definidas para testes rápidos
 * - **Validação em Tempo Real**: Limpa erros ao usuário começar a digitar
 * - **Componentes Reutilizáveis**: Utiliza `Input` e `Button` da pasta `common`
 * - **Acessibilidade**: Campos com `required` e mensagens de erro claras
 */
const LoginForm = ({
  email,
  password,
  errors,
  loading,
  onEmailChange,
  onPasswordChange,
  onClearErrors,
  onSubmit,
}: LoginFormProps) => {
  return (
    // Formulário principal de login
    // onSubmit: Handler para evento de submissão do formulário
    <form onSubmit={onSubmit}>
      {/* 
        Campo de entrada para e-mail
        - label: "Email" - Rótulo do campo
        - type: "email" - Tipo de entrada HTML5 para validação nativa
        - value: email - Valor controlado do componente
        - onChange: Atualiza o e-mail e limpa erros simultaneamente
        - placeholder: "seu@email.com" - Texto de exemplo
        - required: true - Campo obrigatório
        - error: errors.email - Mensagem de erro específica para e-mail
      */}
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(value) => {
          onEmailChange(value);
          onClearErrors(); // Limpa erros ao usuário começar a corrigir
        }}
        placeholder="seu@email.com"
        required
        error={errors.email}
      />

      {/* 
        Campo de entrada para senha
        - label: "Senha" - Rótulo do campo
        - type: "password" - Oculta os caracteres digitados
        - value: password - Valor controlado do componente
        - onChange: Atualiza a senha e limpa erros simultaneamente
        - placeholder: "Sua senha" - Texto de exemplo
        - required: true - Campo obrigatório
        - error: errors.password - Mensagem de erro específica para senha
      */}
      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(value) => {
          onPasswordChange(value);
          onClearErrors(); // Limpa erros ao usuário começar a corrigir
        }}
        placeholder="Sua senha"
        required
        error={errors.password}
      />

      {/* 
        Container de erro geral do formulário
        - Exibido apenas quando errors.general existe
        - p-3: Padding para espaçamento interno
        - bg-red-50: Fundo vermelho muito claro para destaque
        - border border-red-200: Borda vermelha clara
        - rounded-md: Cantos levemente arredondados
        - text-red-600: Texto em vermelho para alerta
        - text-sm: Tamanho de fonte pequeno
        - mb-4: Margem inferior para espaçamento com próximo elemento
      */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-4">
          {errors.general}
        </div>
      )}

      {/* 
        Seção de credenciais de demonstração para testes
        - text-sm: Texto em tamanho pequeno
        - text-gray-500: Cor cinza para hierarquia visual secundária
        - mb-4: Margem inferior para espaçamento
        - strong: Destaque para a palavra "Demo"
        - Credenciais: Fornece dados pré-definidos para facilitar testes
      */}
      <div className="text-sm text-gray-500 mb-4">
        <strong>Demo:</strong> Use "corretor@exemplo.com" ou
        "gestor@exemplo.com" com senha "123456"
      </div>

      {/* 
        Botão de submissão do formulário
        - type: "submit" - Dispara o evento onSubmit do formulário
        - loading: loading - Mostra indicador de carregamento quando true
        - className: "w-full" - Ocupa 100% da largura disponível
        - Texto dinâmico: Mostra "Entrando..." durante loading ou "Entrar" normalmente
      */}
      <Button type="submit" loading={loading} className="w-full">
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;
