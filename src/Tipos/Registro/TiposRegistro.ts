/**
 * @file TiposRegistro.ts
 * @description Arquivo principal de exportação para tipos do sistema de registro
 * Re-exporta todos os enums, constantes, interfaces e tipos dos módulos especializados
 *
 * @version 1.0.0
 */

import {
  CAMPOS_OBRIGATORIOS_POR_PERFIL,
  COMPRIMENTO_CAMPOS,
  DESCRICOES_PERFIL,
  DICAS_SENHA,
  MASCARAS,
  MENSAGENS_ERRO,
  OPCOES_EXPERIENCIA,
  OPCOES_NIVEL_ACESSO,
  OPCOES_PERFIL,
  PLACEHOLDERS,
  REGEX_VALIDACAO,
  TIPO_DOCUMENTO_POR_PERFIL,
} from "./ConstantesRegistro";
import {
  NivelExperiencia,
  StatusConta,
  TipoDocumento,
  TipoUsuario,
} from "./EnumsRegistro";
import {
  IFormularioRegistro,
  IRegistroProps,
  IUsuarioRegistrado,
} from "./InterfacesRegistro";

// ============================================================================
// RE-EXPORTAÇÕES DE MÓDULOS ESPECIALIZADOS
// ============================================================================

// Enums
export {
  TipoUsuario,
  NivelExperiencia,
  TipoDocumento,
  StatusConta,
} from "./EnumsRegistro";

// Constantes
export {
  OPCOES_PERFIL,
  OPCOES_EXPERIENCIA,
  OPCOES_NIVEL_ACESSO,
  COMPRIMENTO_CAMPOS,
  REGEX_VALIDACAO,
  MENSAGENS_ERRO,
  CAMPOS_OBRIGATORIOS_POR_PERFIL,
  TIPO_DOCUMENTO_POR_PERFIL,
  MASCARAS,
  PLACEHOLDERS,
  DICAS_SENHA,
  DESCRICOES_PERFIL,
} from "./ConstantesRegistro";

// Interfaces
export type {
  IFormularioRegistro,
  IErroValidacao,
  IResultadoRegistro,
  IUsuarioRegistrado,
  IEstadoFormularioRegistro,
  IConfiguracaoRegistro,
  IRegistroProps,
  IPropsComDadosFormulario,
  IPropsSeletorTipoUsuario,
  IPropsCampoCondicional,
  IPropsCampoDocumento,
  IPropsSucessoRegistro,
  IFuncaoValidacaoCampo,
  IFuncaoFormatacaoCampo,
  IConfiguracaoCampo,
  IEventoMudancaCampo,
  IEventoSubmissaoFormulario,
} from "./InterfacesRegistro";

// ============================================================================
// TIPOS UTILITÁRIOS (definidos aqui por serem genéricos)
// ============================================================================

/**
 * Tipo que mapeia erros por campo do formulário
 * @type TErrosFormulario
 * @example { name: 'Nome é obrigatório', email: 'Email inválido' }
 */
export type TErrosFormulario = Record<string, string>;

/**
 * Tipo para função de callback de mudança de campo
 * @type TCallbackMudancaCampo
 */
export type TCallbackMudancaCampo = (
  campo: keyof IFormularioRegistro,
  valor: string,
) => void;

/**
 * Tipo para função de validação de formulário
 * @type TValidarFormulario
 */
export type TValidarFormulario = (
  dados: IFormularioRegistro,
) => TErrosFormulario;

/**
 * Tipo para função de formatação de valores
 * @type TFormatadorValor
 */
export type TFormatadorValor = (valor: string) => string;

/**
 * Tipo que define quais campos são obrigatórios para cada perfil
 * @type TCamposObrigatoriosPorPerfil
 */
export type TCamposObrigatoriosPorPerfil = {
  [K in TipoUsuario]?: Array<keyof IFormularioRegistro>;
};

/**
 * Tipo para opções de seleção genéricas
 * @type TOpcaoSelecao
 */
export type TOpcaoSelecao<T = string> = {
  valor: T;
  texto: string;
  descricao?: string;
  desabilitado?: boolean;
};

/**
 * Tipo para resultado de operações assíncronas
 * @type TResultadoOperacao
 */
export type TResultadoOperacao<T = any> = {
  sucesso: boolean;
  dados?: T;
  erro?: string;
  codigoErro?: string;
};

// ============================================================================
// TYPE GUARDS (funções de verificação de tipo)
// ============================================================================

/**
 * Verifica se um valor é um TipoUsuario válido
 * @param {any} valor - Valor a ser verificado
 * @returns {valor is TipoUsuario}
 */
export const isTipoUsuario = (valor: any): valor is TipoUsuario => {
  return Object.values(TipoUsuario).includes(valor);
};

/**
 * Verifica se um valor é um NivelExperiencia válido
 * @param {any} valor - Valor a ser verificado
 * @returns {valor is NivelExperiencia}
 */
export const isNivelExperiencia = (valor: any): valor is NivelExperiencia => {
  return Object.values(NivelExperiencia).includes(valor);
};

/**
 * Verifica se um objeto é um IFormularioRegistro válido
 * @param {any} obj - Objeto a ser verificado
 * @returns {obj is IFormularioRegistro}
 */
export const isFormularioRegistro = (obj: any): obj is IFormularioRegistro => {
  return (
    obj &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string" &&
    typeof obj.confirmPassword === "string" &&
    isTipoUsuario(obj.userType)
  );
};

// ============================================================================
// EXPORTAÇÃO PADRÃO (para importação conveniente)
// ============================================================================

/**
 * Objeto padrão que agrupa todas as exportações
 * Útil para importação com alias: import T from './TiposRegistro'
 */
const TiposRegistro = {
  // Enums
  TipoUsuario,
  NivelExperiencia,
  TipoDocumento,
  StatusConta,

  // Constantes
  OPCOES_PERFIL,
  OPCOES_EXPERIENCIA,
  OPCOES_NIVEL_ACESSO,
  COMPRIMENTO_CAMPOS,
  REGEX_VALIDACAO,
  MENSAGENS_ERRO,
  CAMPOS_OBRIGATORIOS_POR_PERFIL,
  TIPO_DOCUMENTO_POR_PERFIL,
  MASCARAS,
  PLACEHOLDERS,
  DICAS_SENHA,
  DESCRICOES_PERFIL,

  // Type Guards
  isTipoUsuario,
  isNivelExperiencia,
  isFormularioRegistro,
};

export default TiposRegistro;

// ============================================================================
// ALIASES DE TIPO PARA COMPATIBILIDADE (opcional)
// ============================================================================

/**
 * @deprecated Use IFormularioRegistro instead
 * @alias IFormularioRegistro
 */
export type RegisterData = IFormularioRegistro;

/**
 * @deprecated Use IUsuarioRegistrado instead
 * @alias IUsuarioRegistrado
 */
export type RegisteredUser = IUsuarioRegistrado;

/**
 * @deprecated Use IRegistroProps instead
 * @alias IRegistroProps
 */
export type RegisterProps = IRegistroProps;
// NO FINAL DO ARQUIVO TiposRegistro.ts, ADICIONE:

// ============================================================================
// UTILITÁRIOS PARA O HOOK (adicionar)
// ============================================================================

/**
 * Tipo para retorno do hook useFormularioRegistro
 * @type THookFormularioRegistro
 */
export type THookFormularioRegistro = {
  dados: IFormularioRegistro;
  erros: Record<string, string>;
  enviado: boolean;
  atualizarCampo: (
    campo: keyof IFormularioRegistro,
    valor: string | boolean | NivelExperiencia | TipoUsuario,
  ) => void;
  validar: () => boolean;
  resetar: () => void;
  setEnviado: (enviado: boolean) => void;
};

/**
 * Tipo para função de atualização de campo
 * Compatível com o hook useFormularioRegistro
 * @type TAtualizarCampo
 */
export type TAtualizarCampo = THookFormularioRegistro["atualizarCampo"];

/**
 * Tipo para função de validação
 * Compatível com o hook useFormularioRegistro
 * @type TValidarFormularioHook
 */
export type TValidarFormularioHook = THookFormularioRegistro["validar"];
