/**
 * Tipo que define as categorias de usuário do sistema.
 *
 * @typedef {"corretor" | "gestor"} UserType
 * @description
 * - `corretor`: Usuário com permissões de corretor
 * - `gestor`: Usuário com permissões de gestão/administração
 */
export type UserType = "corretor" | "gestor";

/**
 * Tipo que define as abas disponíveis no módulo de autenticação.
 *
 * @typedef {"login" | "register"} AuthTab
 * @description
 * - `login`: Aba de login/entrada no sistema
 * - `register`: Aba de cadastro/registro de novo usuário
 */
export type AuthTab = "login" | "register";

/**
 * Interface que define a estrutura de erros de validação do formulário de login.
 *
 * @interface LoginErrors
 * @property {string} [email] - Mensagem de erro para o campo de e-mail
 * @property {string} [password] - Mensagem de erro para o campo de senha
 * @property {string} [general] - Mensagem de erro geral do formulário
 *
 * @example
 * ```typescript
 * const erros: LoginErrors = {
 *   email: "E-mail inválido",
 *   password: "Senha muito curta",
 *   general: "Credenciais incorretas"
 * };
 * ```
 */
export interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}
