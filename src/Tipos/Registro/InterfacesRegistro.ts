/**
 * @file InterfacesRegistro.ts
 * @description Interfaces TypeScript para o sistema de registro
 * Contém todas as interfaces relacionadas a dados, props, resultados e estados
 *
 * @version 1.0.0
 */

import {
  TipoUsuario,
  NivelExperiencia,
  TipoDocumento,
  StatusConta,
} from "./EnumsRegistro";

// ============================================================================
// INTERFACES DE DADOS PRINCIPAIS
// ============================================================================

/**
 * Interface principal que define a estrutura dos dados do formulário de registro
 * Campos obrigatórios para todos os usuários + campos condicionais por perfil
 *
 * @interface IFormularioRegistro
 *
 * @property {string} name - Nome completo ou razão social
 * @property {string} email - Email para login e comunicação
 * @property {string} password - Senha para acesso ao sistema
 * @property {string} confirmPassword - Confirmação da senha
 * @property {TipoUsuario} userType - Tipo de usuário/perfil selecionado
 *
 * @property {string} [phone] - Telefone para contato (opcional)
 * @property {NivelExperiencia} [experience] - Experiência no mercado (corretores)
 * @property {string} [creci] - Número do CRECI (corretores)
 * @property {string} [cnpj] - CNPJ (imobiliárias e incorporadoras)
 * @property {string} [cpf] - CPF (clientes e proprietários)
 * @property {TipoDocumento} [documentType] - Tipo de documento (CPF ou CNPJ)
 * @property {string} [documentNumber] - Número do documento (sem máscara)
 * @property {string} [accessLevel] - Nível de acesso (administradores)
 * @property {boolean} [acceptTerms] - Aceite dos termos e condições
 * @property {string} [companyName] - Nome da empresa (para PJ)
 * @property {string} [stateRegistration] - Inscrição estadual (opcional)
 * @property {string} [website] - Site ou portfolio (opcional)
 */
export interface IFormularioRegistro {
  // === CAMPOS OBRIGATÓRIOS PARA TODOS OS PERFIS ===
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: TipoUsuario;

  // === CAMPOS OPCIONAIS GERAIS ===
  phone?: string;
  acceptTerms?: boolean;

  // === CAMPOS ESPECÍFICOS POR PERFIL ===

  // Para Corretores
  experience?: NivelExperiencia;
  creci?: string;

  // Para Imobiliárias e Incorporadoras (Pessoa Jurídica)
  cnpj?: string;
  companyName?: string;
  stateRegistration?: string;
  website?: string;

  // Para Clientes e Proprietários (Pessoa Física)
  cpf?: string;

  // Para administração do sistema
  accessLevel?: string;

  // Campos técnicos/utilitários
  documentType?: TipoDocumento;
  documentNumber?: string;
}

/**
 * Interface que representa um erro de validação do formulário
 * Pode ser específico de um campo ou erro geral do formulário
 *
 * @interface IErroValidacao
 *
 * @property {keyof IFormularioRegistro | 'general'} [field] - Campo relacionado ao erro
 * @property {string} message - Mensagem de erro para exibição ao usuário
 * @property {string} [code] - Código interno do erro para tratamento programático
 * @property {string} [severity] - Gravidade do erro ('error', 'warning', 'info')
 */
export interface IErroValidacao {
  field?: keyof IFormularioRegistro | "general";
  message: string;
  code?: string;
  severity?: "error" | "warning" | "info";
}

/**
 * Interface que define o resultado de uma operação de registro
 * Retornada pela API ou função de registro
 *
 * @interface IResultadoRegistro
 *
 * @property {boolean} success - Indica se a operação foi bem-sucedida
 * @property {string} [message] - Mensagem descritiva do resultado
 * @property {string} [error] - Mensagem de erro (apenas se success = false)
 * @property {string} [errorCode] - Código do erro para tratamento interno
 * @property {IUsuarioRegistrado} [user] - Dados do usuário registrado
 * @property {string} [token] - Token de autenticação (JWT)
 * @property {Date} [expiresAt] - Data de expiração do token
 */
export interface IResultadoRegistro {
  success: boolean;
  message?: string;
  error?: string;
  errorCode?: string;
  user?: IUsuarioRegistrado;
  token?: string;
  expiresAt?: Date;
}

/**
 * Interface que representa um usuário registrado com sucesso
 * Dados completos do usuário após registro válido
 *
 * @interface IUsuarioRegistrado
 *
 * @property {string} id - ID único do usuário no sistema
 * @property {string} name - Nome ou razão social
 * @property {string} email - Email de login
 * @property {TipoUsuario} userType - Tipo de perfil do usuário
 * @property {StatusConta} status - Status atual da conta
 * @property {Date} createdAt - Data de criação da conta
 * @property {Date} [updatedAt] - Data da última atualização
 * @property {Date} [emailVerifiedAt] - Data de verificação do email
 * @property {string} [phone] - Telefone cadastrado
 * @property {string} [creci] - CRECI (apenas corretores)
 * @property {string} [cnpj] - CNPJ (apenas PJ)
 * @property {string} [cpf] - CPF (apenas PF)
 * @property {string} [profileImage] - URL da imagem de perfil
 * @property {string} [accessLevel] - Nível de acesso (administradores)
 */
export interface IUsuarioRegistrado {
  id: string;
  name: string;
  email: string;
  userType: TipoUsuario;
  status: StatusConta;
  createdAt: Date;
  updatedAt?: Date;
  emailVerifiedAt?: Date;
  phone?: string;
  creci?: string;
  cnpj?: string;
  cpf?: string;
  profileImage?: string;
  accessLevel?: string;
}

// ============================================================================
// INTERFACES PARA ESTADOS E CONTEXTOS
// ============================================================================

/**
 * Interface para o estado do formulário de registro
 * Usado em hooks e gerenciamento de estado local
 *
 * @interface IEstadoFormularioRegistro
 *
 * @property {IFormularioRegistro} dados - Dados atuais do formulário
 * @property {Record<string, string>} erros - Erros de validação por campo
 * @property {boolean} isLoading - Indica se está carregando/submetendo
 * @property {boolean} isSubmitted - Indica se o formulário foi submetido
 * @property {boolean} isValid - Indica se o formulário é válido
 * @property {IUsuarioRegistrado | null} usuarioRegistrado - Usuário após registro
 */
export interface IEstadoFormularioRegistro {
  dados: IFormularioRegistro;
  erros: Record<string, string>;
  isLoading: boolean;
  isSubmitted: boolean;
  isValid: boolean;
  usuarioRegistrado?: IUsuarioRegistrado | null;
}

/**
 * Interface para configurações do formulário de registro
 * Permite customização do comportamento do formulário
 *
 * @interface IConfiguracaoRegistro
 *
 * @property {boolean} autoFocus - Se deve focar no primeiro campo
 * @property {boolean} mostrarDicas - Se mostra dicas de preenchimento
 * @property {boolean} validarAoDigitar - Se valida campos durante a digitação
 * @property {boolean} confirmarEmail - Se requer confirmação de email
 * @property {boolean} confirmarTelefone - Se requer confirmação de telefone
 * @property {string[]} camposOcultos - Campos que não devem ser exibidos
 * @property {Record<string, any>} valoresPadrao - Valores iniciais dos campos
 */
export interface IConfiguracaoRegistro {
  autoFocus?: boolean;
  mostrarDicas?: boolean;
  validarAoDigitar?: boolean;
  confirmarEmail?: boolean;
  confirmarTelefone?: boolean;
  camposOcultos?: string[];
  valoresPadrao?: Partial<IFormularioRegistro>;
}

// ============================================================================
// INTERFACES PARA PROPS DE COMPONENTES
// ============================================================================

/**
 * Props do componente principal de Registro
 *
 * @interface IRegistroProps
 *
 * @property {() => void} onBack - Callback para voltar à tela anterior
 * @property {(user: IUsuarioRegistrado) => void} [onSuccess] - Callback após sucesso
 * @property {(error: string) => void} [onError] - Callback em caso de erro
 * @property {string} [submitText] - Texto personalizado do botão de submit
 * @property {IConfiguracaoRegistro} [config] - Configurações do formulário
 * @property {React.CSSProperties} [style] - Estilos inline do container
 * @property {string} [className] - Classes CSS do container
 */
export interface IRegistroProps {
  onBack: () => void;
  onSuccess?: (user: IUsuarioRegistrado) => void;
  onError?: (error: string) => void;
  submitText?: string;
  config?: IConfiguracaoRegistro;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Props base para componentes que trabalham com dados do formulário
 *
 * @interface IPropsComDadosFormulario
 *
 * @property {Partial<IFormularioRegistro>} dados - Dados atuais do formulário
 * @property {Record<string, string>} erros - Erros de validação por campo
 * @property {(campo: keyof IFormularioRegistro, valor: string) => void} aoMudarCampo - Handler de mudança
 * @property {(valor: string) => string} [formatarValor] - Função de formatação
 * @property {boolean} [desabilitado] - Se o componente está desabilitado
 * @property {boolean} [somenteLeitura] - Se o componente é somente leitura
 */
export interface IPropsComDadosFormulario {
  dados: Partial<IFormularioRegistro>;
  erros: Record<string, string>;
  aoMudarCampo: (campo: keyof IFormularioRegistro, valor: string) => void;
  formatarValor?: (valor: string) => string;
  desabilitado?: boolean;
  somenteLeitura?: boolean;
}

/**
 * Props específicas para o seletor de tipo de usuário
 *
 * @interface IPropsSeletorTipoUsuario
 *
 * @property {TipoUsuario} valor - Valor atualmente selecionado
 * @property {(valor: TipoUsuario) => void} aoMudar - Handler de mudança
 * @property {boolean} [obrigatorio] - Se o campo é obrigatório
 * @property {boolean} [desabilitado] - Se o campo está desabilitado
 * @property {string} [className] - Classes CSS adicionais
 * @property {string} [label] - Label personalizada
 * @property {string} [ajuda] - Texto de ajuda/descrição
 */
export interface IPropsSeletorTipoUsuario {
  valor: TipoUsuario;
  aoMudar: (valor: TipoUsuario) => void;
  obrigatorio?: boolean;
  desabilitado?: boolean;
  className?: string;
  label?: string;
  ajuda?: string;
}

/**
 * Props para componentes de campos condicionais (exibidos apenas para perfis específicos)
 *
 * @interface IPropsCampoCondicional
 *
 * @property {TipoUsuario} tipoUsuario - Tipo de usuário atual
 * @property {Partial<IFormularioRegistro>} dados - Dados do formulário
 * @property {Record<string, string>} erros - Erros de validação
 * @property {IPropsComDadosFormulario['aoMudarCampo']} aoMudarCampo - Handler de mudança
 * @property {boolean} [desabilitado] - Se o campo está desabilitado
 */
export interface IPropsCampoCondicional {
  tipoUsuario: TipoUsuario;
  dados: Partial<IFormularioRegistro>;
  erros: Record<string, string>;
  aoMudarCampo: IPropsComDadosFormulario["aoMudarCampo"];
  desabilitado?: boolean;
}

/**
 * Props para componente de campo de documento (CPF/CNPJ)
 *
 * @interface IPropsCampoDocumento
 *
 * @property {TipoUsuario} tipoUsuario - Determina o tipo de documento esperado
 * @property {string} [valor] - Valor atual do campo
 * @property {(valor: string, tipo: TipoDocumento) => void} aoMudar - Handler de mudança
 * @property {string} [erro] - Mensagem de erro específica
 * @property {boolean} [obrigatorio] - Se o campo é obrigatório
 */
export interface IPropsCampoDocumento {
  tipoUsuario: TipoUsuario;
  valor?: string;
  aoMudar: (valor: string, tipo: TipoDocumento) => void;
  erro?: string;
  obrigatorio?: boolean;
}

/**
 * Props para componente de sucesso de registro
 *
 * @interface IPropsSucessoRegistro
 *
 * @property {IUsuarioRegistrado} usuario - Dados do usuário registrado
 * @property {() => void} [onContinuar] - Callback para continuar
 * @property {string} [mensagemPersonalizada] - Mensagem adicional
 * @property {boolean} [mostrarDetalhes] - Se mostra detalhes do registro
 */
export interface IPropsSucessoRegistro {
  usuario: IUsuarioRegistrado;
  onContinuar?: () => void;
  mensagemPersonalizada?: string;
  mostrarDetalhes?: boolean;
}

// ============================================================================
// INTERFACES PARA FUNÇÕES E CALLBACKS
// ============================================================================

/**
 * Interface para função de validação de campo
 *
 * @interface IFuncaoValidacaoCampo
 *
 * @property {(nome: string, valor: string, dados: IFormularioRegistro) => string | null} validar - Função de validação
 */
export interface IFuncaoValidacaoCampo {
  validar: (
    nome: keyof IFormularioRegistro,
    valor: string,
    dados: IFormularioRegistro,
  ) => string | null;
}

/**
 * Interface para função de formatação de campo
 *
 * @interface IFuncaoFormatacaoCampo
 *
 * @property {(valor: string) => string} formatar - Função de formatação
 * @property {(valor: string) => string} [desformatar] - Função de remoção de formatação
 */
export interface IFuncaoFormatacaoCampo {
  formatar: (valor: string) => string;
  desformatar?: (valor: string) => string;
}

/**
 * Interface para configuração de campo do formulário
 *
 * @interface IConfiguracaoCampo
 *
 * @property {string} nome - Nome do campo
 * @property {string} label - Label exibida para o usuário
 * @property {string} [placeholder] - Placeholder do campo
 * @property {string} [tipo] - Tipo do campo (text, email, password, etc.)
 * @property {boolean} [obrigatorio] - Se o campo é obrigatório
 * @property {IFuncaoValidacaoCampo} [validacao] - Regras de validação
 * @property {IFuncaoFormatacaoCampo} [formatacao] - Regras de formatação
 * @property {boolean} [visivel] - Se o campo é visível
 * @property {TipoUsuario[]} [perfisVisiveis] - Perfis que podem ver este campo
 */
export interface IConfiguracaoCampo {
  nome: keyof IFormularioRegistro;
  label: string;
  placeholder?: string;
  tipo?: string;
  obrigatorio?: boolean;
  validacao?: IFuncaoValidacaoCampo;
  formatacao?: IFuncaoFormatacaoCampo;
  visivel?: boolean;
  perfisVisiveis?: TipoUsuario[];
}

// ============================================================================
// INTERFACES PARA EVENTOS
// ============================================================================

/**
 * Interface para evento de mudança de campo
 *
 * @interface IEventoMudancaCampo
 *
 * @property {keyof IFormularioRegistro} campo - Campo que foi alterado
 * @property {string} valor - Novo valor do campo
 * @property {string} [valorAnterior] - Valor anterior do campo
 * @property {Event} [eventoNativo] - Evento nativo do DOM (se aplicável)
 */
export interface IEventoMudancaCampo {
  campo: keyof IFormularioRegistro;
  valor: string;
  valorAnterior?: string;
  eventoNativo?: Event;
}

/**
 * Interface para evento de submissão do formulário
 *
 * @interface IEventoSubmissaoFormulario
 *
 * @property {IFormularioRegistro} dados - Dados completos do formulário
 * @property {boolean} valido - Se o formulário é válido
 * @property {Record<string, string>} erros - Erros de validação (se houver)
 * @property {Event} [eventoNativo] - Evento nativo de submit
 */
export interface IEventoSubmissaoFormulario {
  dados: IFormularioRegistro;
  valido: boolean;
  erros: Record<string, string>;
  eventoNativo?: Event;
}
