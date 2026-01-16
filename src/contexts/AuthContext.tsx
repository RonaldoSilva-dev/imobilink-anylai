/**
 * @file AuthContext.tsx
 * @description Contexto de autenticação para gerenciamento de usuários
 * Suporta todos os tipos de usuário definidos em Tipos/Registro/
 * Implementa login, registro e logout com validação completa
 *
 * @version 2.0.0
 */

import React from "react";
import { useLoading } from "./LoadingContext";
import {
  TipoUsuario,
  IFormularioRegistro,
  IUsuarioRegistrado,
  StatusConta,
} from "../Tipos/Registro/TiposRegistro";

/**
 * Interface que representa um usuário autenticado no sistema
 * @interface IUsuarioAutenticado
 * @extends IUsuarioRegistrado
 */
interface IUsuarioAutenticado extends IUsuarioRegistrado {
  token?: string; // Token JWT para autenticação
  refreshToken?: string; // Token para renovação
}

/**
 * Interface para o contexto de autenticação
 * @interface IAuthContextType
 */
interface IAuthContextType {
  /** Usuário atualmente autenticado ou null se não autenticado */
  user: IUsuarioAutenticado | null;

  /** Função para realizar login */
  login: (
    email: string,
    password: string,
    userType: TipoUsuario,
  ) => Promise<{ success: boolean; error?: string }>;

  /** Função para registrar novo usuário */
  register: (userData: IFormularioRegistro) => Promise<{
    success: boolean;
    error?: string;
    user?: IUsuarioAutenticado;
  }>;

  /** Função para realizar logout */
  logout: () => void;

  /** Indica se há um usuário autenticado */
  isAuthenticated: boolean;

  /** Atualiza os dados do usuário autenticado */
  updateUser: (userData: Partial<IUsuarioAutenticado>) => void;
}

// Criação do contexto com tipo seguro
const AuthContext = React.createContext<IAuthContextType | undefined>(
  undefined,
);

/**
 * Array de usuários mockados para simulação (em produção viria de uma API)
 * @type {IUsuarioAutenticado[]}
 */
let mockUsers: IUsuarioAutenticado[] = [
  {
    id: "1",
    email: "corretor@exemplo.com",
    name: "João Silva",
    userType: TipoUsuario.CORRETOR,
    status: StatusConta.ATIVA,
    creci: "CRECI/SP-123456",
    phone: "(11) 99999-9999",
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "mock-jwt-token-corretor",
  },
  {
    id: "2",
    email: "gestor@exemplo.com",
    name: "Maria Santos",
    userType: TipoUsuario.ADMINISTRADOR,
    status: StatusConta.ATIVA,
    phone: "(11) 98888-8888",
    createdAt: new Date(),
    updatedAt: new Date(),
    token: "mock-jwt-token-gestor",
  },
];

/**
 * Provider do contexto de autenticação
 * Gerencia estado global de autenticação e fornece funções para manipulação
 *
 * @component
 * @param {Object} props - Propriedades do provider
 * @param {React.ReactNode} props.children - Componentes filhos
 * @returns {JSX.Element} Provider do contexto de autenticação
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<IUsuarioAutenticado | null>(null);
  const { setLoading } = useLoading();

  /**
   * Realiza login de um usuário
   * Valida credenciais e tipo de usuário
   *
   * @async
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @param {TipoUsuario} userType - Tipo de usuário esperado
   * @returns {Promise<{ success: boolean; error?: string }>} Resultado da operação
   */
  const login = async (
    email: string,
    password: string,
    userType: TipoUsuario,
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Validações básicas
      if (!email || !password) {
        setLoading(false);
        return { success: false, error: "Email e senha são obrigatórios" };
      }

      if (!email.includes("@")) {
        setLoading(false);
        return { success: false, error: "Email inválido" };
      }

      if (password.length < 6) {
        setLoading(false);
        return {
          success: false,
          error: "Senha deve ter pelo menos 6 caracteres",
        };
      }

      // Busca usuário no mock (em produção seria consulta à API)
      const foundUser = mockUsers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.userType === userType,
      );

      if (!foundUser) {
        setLoading(false);
        return {
          success: false,
          error: "Usuário não encontrado ou tipo incorreto",
        };
      }

      // Verifica senha (em produção seria hash comparison)
      if (password !== "123456") {
        // Senha padrão para mock
        setLoading(false);
        return { success: false, error: "Senha incorreta" };
      }

      // Verifica status da conta
      if (foundUser.status !== StatusConta.ATIVA) {
        setLoading(false);
        return {
          success: false,
          error: "Conta não está ativa. Entre em contato com o suporte.",
        };
      }

      // Atualiza data de último acesso
      foundUser.updatedAt = new Date();

      // Define usuário como autenticado
      setUser(foundUser);

      // Em produção, salvaria token no localStorage
      localStorage.setItem("auth_token", foundUser.token || "");
      localStorage.setItem("user_id", foundUser.id);

      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: "Erro interno do sistema. Tente novamente mais tarde.",
      };
    }
  };

  /**
   * Registra um novo usuário no sistema
   * Valida dados e cria conta do usuário
   *
   * @async
   * @param {IFormularioRegistro} userData - Dados completos do formulário de registro
   * @returns {Promise<{ success: boolean; error?: string; user?: IUsuarioAutenticado }>} Resultado do registro
   */
  const register = async (
    userData: IFormularioRegistro,
  ): Promise<{
    success: boolean;
    error?: string;
    user?: IUsuarioAutenticado;
  }> => {
    setLoading(true);

    try {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validações básicas
      if (
        !userData.email ||
        !userData.password ||
        !userData.name ||
        !userData.confirmPassword
      ) {
        setLoading(false);
        return {
          success: false,
          error: "Todos os campos obrigatórios devem ser preenchidos",
        };
      }

      if (!userData.email.includes("@")) {
        setLoading(false);
        return { success: false, error: "Email inválido" };
      }

      if (userData.password.length < 6) {
        setLoading(false);
        return {
          success: false,
          error: "Senha deve ter pelo menos 6 caracteres",
        };
      }

      if (userData.password !== userData.confirmPassword) {
        setLoading(false);
        return { success: false, error: "As senhas não coincidem" };
      }

      // Verifica se email já está cadastrado
      if (
        mockUsers.find(
          (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
        )
      ) {
        setLoading(false);
        return { success: false, error: "Email já cadastrado" };
      }

      // Validações específicas por tipo de usuário
      if (userData.userType === TipoUsuario.CORRETOR && !userData.creci) {
        setLoading(false);
        return { success: false, error: "CRECI é obrigatório para corretores" };
      }

      if (
        (userData.userType === TipoUsuario.IMOBILIARIA ||
          userData.userType === TipoUsuario.INCORPORADORA) &&
        !userData.cnpj
      ) {
        setLoading(false);
        return { success: false, error: "CNPJ é obrigatório" };
      }

      if (
        (userData.userType === TipoUsuario.CLIENTE ||
          userData.userType === TipoUsuario.PROPRIETARIO) &&
        !userData.cpf
      ) {
        setLoading(false);
        return { success: false, error: "CPF é obrigatório" };
      }

      // Cria novo usuário - APENAS CAMPOS QUE EXISTEM EM IUsuarioRegistrado
      const newUser: IUsuarioAutenticado = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        status: StatusConta.ATIVA,
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: userData.phone || undefined,
        creci: userData.creci || undefined,
        cnpj: userData.cnpj || undefined,
        cpf: userData.cpf || undefined,
        accessLevel: userData.accessLevel || undefined,
        emailVerifiedAt: undefined,
        profileImage: undefined,
        // 🔧 GARANTIR TOKEN SEMPRE DEFINIDO
        token: `mock-jwt-token-${userData.userType}-${Date.now()}`,
        refreshToken: `mock-refresh-token-${userData.userType}-${Date.now()}`,
      };

      // Adiciona ao array de usuários mockados
      mockUsers = [...mockUsers, newUser];

      // 🔧 SALVAR NO LOCALSTORAGE COM VALIDAÇÃO
      if (newUser.token && newUser.id) {
        localStorage.setItem("auth_token", newUser.token);
        localStorage.setItem("user_id", newUser.id);
        if (newUser.refreshToken) {
          localStorage.setItem("refresh_token", newUser.refreshToken);
        }
      } else {
        console.warn("Token ou ID não definidos para salvar no localStorage");
      }

      // Define usuário como autenticado
      setUser(newUser);

      setLoading(false);
      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        error: "Erro interno do sistema. Tente novamente mais tarde.",
      };
    }
  };

  /**
   * Realiza logout do usuário atual
   * Limpa estado e localStorage
   */
  const logout = () => {
    // Limpa localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");

    // Limpa estado
    setUser(null);
  };

  /**
   * Atualiza dados do usuário autenticado
   *
   * @param {Partial<IUsuarioAutenticado>} userData - Dados a serem atualizados
   */
  const updateUser = (userData: Partial<IUsuarioAutenticado>) => {
    if (user) {
      const updatedUser = { ...user, ...userData, updatedAt: new Date() };
      setUser(updatedUser);

      // Atualiza no mock (em produção seria chamada à API)
      mockUsers = mockUsers.map((u) => (u.id === user.id ? updatedUser : u));
    }
  };

  // Valor do contexto
  const value: IAuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizado para usar o contexto de autenticação
 * Garante que o contexto seja usado dentro de um AuthProvider
 *
 * @throws {Error} Se usado fora de um AuthProvider
 * @returns {IAuthContextType} Contexto de autenticação
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

/**
 * Hook para verificar autenticação em componentes
 * Retorna informações sobre estado de autenticação
 *
 * @returns {Object} Informações de autenticação
 */
export const useAuthCheck = () => {
  const { isAuthenticated, user } = useAuth();

  return {
    isAuthenticated,
    user,
    isCorretor: user?.userType === TipoUsuario.CORRETOR,
    isGestor: user?.userType === TipoUsuario.ADMINISTRADOR,
    isImobiliaria: user?.userType === TipoUsuario.IMOBILIARIA,
    isCliente: user?.userType === TipoUsuario.CLIENTE,
    isProprietario: user?.userType === TipoUsuario.PROPRIETARIO,
    isAdmin: user?.userType === TipoUsuario.ADMINISTRADOR,
  };
};
