/**
 * @file EnumsRegistro.ts
 * @description Enumerações para o sistema de registro
 * Contém todas as enumerações relacionadas a tipos de usuário, documentos, experiência, etc.
 *
 * @version 1.0.0
 */

// ============================================================================
// TIPOS DE USUÁRIO
// ============================================================================

/**
 * Enum que representa todos os tipos de usuário disponíveis no sistema
 * @enum {string}
 * @readonly
 */
export enum TipoUsuario {
  /** Corretor de imóveis (profissional individual) */
  CORRETOR = "corretor",

  /** Imobiliária (empresa com vários corretores) */
  IMOBILIARIA = "imobiliaria",

  /** Incorporadora (construtora/desenvolvedora) */
  INCORPORADORA = "incorporadora",

  /** Cliente (comprador/locatário) */
  CLIENTE = "cliente",

  /** Proprietário (vendedor/locador) */
  PROPRIETARIO = "proprietario",

  /** Administrador do sistema (acesso total) */
  ADMINISTRADOR = "administrador",
}

/**
 * Enum que representa os níveis de experiência profissional
 * Aplicável principalmente a corretores
 * @enum {string}
 * @readonly
 */
export enum NivelExperiencia {
  /** Menos de 1 ano de experiência */
  MENOS_DE_1_ANO = "less-1",

  /** De 1 a 3 anos de experiência */
  DE_1_A_3_ANOS = "1-3",

  /** De 3 a 5 anos de experiência */
  DE_3_A_5_ANOS = "3-5",

  /** De 5 a 10 anos de experiência */
  DE_5_A_10_ANOS = "5-10",

  /** Mais de 10 anos de experiência */
  MAIS_DE_10_ANOS = "more-10",
}

/**
 * Enum para tipos de documento (pessoa física/jurídica)
 * @enum {string}
 * @readonly
 */
export enum TipoDocumento {
  /** Cadastro de Pessoa Física */
  CPF = "cpf",

  /** Cadastro Nacional de Pessoa Jurídica */
  CNPJ = "cnpj",
}

/**
 * Enum para status de conta do usuário
 * @enum {string}
 * @readonly
 */
export enum StatusConta {
  /** Conta criada mas não confirmada */
  PENDENTE = "pendente",

  /** Conta ativa e validada */
  ATIVA = "ativa",

  /** Conta suspensa temporariamente */
  SUSPENSA = "suspensa",

  /** Conta desativada permanentemente */
  DESATIVADA = "desativada",
}
