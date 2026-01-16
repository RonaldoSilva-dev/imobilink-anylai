/**
 * @file ConstantesRegistro.ts
 * @description Constantes e configurações para o sistema de registro
 * Contém arrays de opções, mensagens padrão, configurações de validação, etc.
 *
 * @version 1.0.0
 */
import { IFormularioRegistro } from "./InterfacesRegistro";

import { TipoUsuario, NivelExperiencia, TipoDocumento } from "./EnumsRegistro";

// ============================================================================
// OPÇÕES PARA FORMULÁRIOS
// ============================================================================

/**
 * Array de opções para seleção de perfil no formulário
 * Mapeia cada TipoUsuario para um texto amigável
 * @constant
 */
export const OPCOES_PERFIL: Array<{
  valor: TipoUsuario;
  texto: string;
  descricao?: string;
}> = [
  {
    valor: TipoUsuario.CORRETOR,
    texto: "Corretor",
    descricao: "Profissional autônomo ou vinculado a imobiliária",
  },
  {
    valor: TipoUsuario.IMOBILIARIA,
    texto: "Imobiliária",
    descricao: "Empresa com vários corretores e imóveis",
  },
  {
    valor: TipoUsuario.INCORPORADORA,
    texto: "Incorporadora",
    descricao: "Construtora ou desenvolvedora de imóveis",
  },
  {
    valor: TipoUsuario.CLIENTE,
    texto: "Cliente",
    descricao: "Busca imóveis para comprar ou alugar",
  },
  {
    valor: TipoUsuario.PROPRIETARIO,
    texto: "Proprietário",
    descricao: "Possui imóveis para vender ou alugar",
  },
  {
    valor: TipoUsuario.ADMINISTRADOR,
    texto: "Administrador",
    descricao: "Acesso total ao sistema (interno)",
  },
];

/**
 * Array de opções para o campo de experiência
 * @constant
 */
export const OPCOES_EXPERIENCIA: Array<{
  valor: NivelExperiencia;
  texto: string;
}> = [
  { valor: NivelExperiencia.MENOS_DE_1_ANO, texto: "Menos de 1 ano" },
  { valor: NivelExperiencia.DE_1_A_3_ANOS, texto: "1-3 anos" },
  { valor: NivelExperiencia.DE_3_A_5_ANOS, texto: "3-5 anos" },
  { valor: NivelExperiencia.DE_5_A_10_ANOS, texto: "5-10 anos" },
  { valor: NivelExperiencia.MAIS_DE_10_ANOS, texto: "Mais de 10 anos" },
];

/**
 * Array de opções para nível de acesso (administradores)
 * @constant
 */
export const OPCOES_NIVEL_ACESSO: Array<{ valor: string; texto: string }> = [
  { valor: "super", texto: "Super Administrador" },
  { valor: "moderador", texto: "Moderador" },
  { valor: "visualizador", texto: "Apenas Visualização" },
];

// ============================================================================
// CONFIGURAÇÕES DE VALIDAÇÃO
// ============================================================================

/**
 * Comprimento mínimo e máximo para campos de texto
 * @constant
 */
export const COMPRIMENTO_CAMPOS = {
  NOME_MIN: 2,
  NOME_MAX: 100,
  SENHA_MIN: 6,
  SENHA_MAX: 50,
  EMAIL_MAX: 100,
  TELEFONE_MIN: 10,
  TELEFONE_MAX: 11,
  CRECI_MIN: 3,
  CRECI_MAX: 20,
  CPF_LENGTH: 11,
  CNPJ_LENGTH: 14,
} as const;

/**
 * Regex para validação de formatos
 * @constant
 */
export const REGEX_VALIDACAO = {
  // Email básico
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Telefone brasileiro: (11) 99999-9999 ou (11) 9999-9999
  TELEFONE: /^\(\d{2}\) \d{4,5}-\d{4}$/,

  // CPF: 123.456.789-00
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

  // CNPJ: 12.345.678/0001-90
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,

  // CRECI: pode conter letras, números e hífen
  CRECI: /^[A-Za-z0-9-]{3,20}$/,

  // Apenas números (para limpeza de máscaras)
  APENAS_NUMEROS: /^\d+$/,

  // Nome: aceita letras, espaços e acentos
  NOME: /^[A-Za-zÀ-ÿ\s]{2,100}$/,
} as const;

// ============================================================================
// MENSAGENS DE ERRO PADRÃO
// ============================================================================

/**
 * Mensagens de erro padrão para validação
 * @constant
 */
export const MENSAGENS_ERRO = {
  // Genéricas
  CAMPO_OBRIGATORIO: (campo: string) => `${campo} é obrigatório`,
  CAMPO_INVALIDO: (campo: string) => `${campo} inválido`,
  TAMANHO_MINIMO: (campo: string, min: number) =>
    `${campo} deve ter pelo menos ${min} caracteres`,
  TAMANHO_MAXIMO: (campo: string, max: number) =>
    `${campo} deve ter no máximo ${max} caracteres`,

  // Específicas
  EMAIL_INVALIDO: "Email inválido",
  SENHA_CURTA: `Senha deve ter pelo menos ${COMPRIMENTO_CAMPOS.SENHA_MIN} caracteres`,
  SENHAS_NAO_COINCIDEM: "As senhas não coincidem",
  TELEFONE_INVALIDO: "Telefone inválido (use: (11) 99999-9999)",
  CPF_INVALIDO: "CPF inválido (use: 123.456.789-00)",
  CNPJ_INVALIDO: "CNPJ inválido (use: 12.345.678/0001-90)",
  CRECI_INVALIDO: "CRECI inválido (3-20 caracteres, letras, números ou hífen)",
  NOME_INVALIDO: "Nome inválido (apenas letras e espaços)",
} as const;

// ============================================================================
// CAMPOS OBRIGATÓRIOS POR PERFIL
// ============================================================================

/**
 * Define quais campos são obrigatórios para cada tipo de usuário
 * Campos base (obrigatórios para todos): name, email, password, confirmPassword
 * Campos específicos por perfil são adicionados condicionalmente
 * @constant
 */
export const CAMPOS_OBRIGATORIOS_POR_PERFIL: Record<
  TipoUsuario,
  Array<keyof IFormularioRegistro>
> = {
  [TipoUsuario.CORRETOR]: [
    "name",
    "email",
    "password",
    "confirmPassword",
    "creci",
  ],
  [TipoUsuario.IMOBILIARIA]: [
    "name",
    "email",
    "password",
    "confirmPassword",
    "cnpj",
  ],
  [TipoUsuario.INCORPORADORA]: [
    "name",
    "email",
    "password",
    "confirmPassword",
    "cnpj",
  ],
  [TipoUsuario.CLIENTE]: [
    "name",
    "email",
    "password",
    "confirmPassword",
    "cpf",
  ],
  [TipoUsuario.PROPRIETARIO]: [
    "name",
    "email",
    "password",
    "confirmPassword",
    "cpf",
  ],
  [TipoUsuario.ADMINISTRADOR]: ["name", "email", "password", "confirmPassword"],
};

/**
 * Mapeia tipo de usuário para tipo de documento esperado
 * @constant
 */
export const TIPO_DOCUMENTO_POR_PERFIL: Record<
  TipoUsuario,
  TipoDocumento | null
> = {
  [TipoUsuario.CORRETOR]: null, // Corretor usa CRECI, não CPF/CNPJ
  [TipoUsuario.IMOBILIARIA]: TipoDocumento.CNPJ,
  [TipoUsuario.INCORPORADORA]: TipoDocumento.CNPJ,
  [TipoUsuario.CLIENTE]: TipoDocumento.CPF,
  [TipoUsuario.PROPRIETARIO]: TipoDocumento.CPF,
  [TipoUsuario.ADMINISTRADOR]: null, // Admin pode não precisar de documento
};

// ============================================================================
// MÁSCARAS DE FORMATAÇÃO
// ============================================================================

/**
 * Máscaras para formatação de campos
 * @constant
 */
export const MASCARAS = {
  TELEFONE: "(99) 99999-9999",
  CPF: "999.999.999-99",
  CNPJ: "99.999.999/9999-99",
  CRECI: "AAAA-999999",
} as const;

/**
 * Placeholders para campos do formulário
 * @constant
 */
export const PLACEHOLDERS = {
  NOME: "Seu nome completo ou razão social",
  EMAIL: "seu@email.com",
  SENHA: "Crie uma senha forte",
  CONFIRMAR_SENHA: "Digite a senha novamente",
  TELEFONE: "(11) 99999-9999",
  CPF: "123.456.789-00",
  CNPJ: "12.345.678/0001-90",
  CRECI: "CRECI-123456",
  EXPERIENCIA: "Selecione sua experiência",
  NIVEL_ACESSO: "Selecione o nível de acesso",
} as const;

// ============================================================================
// DICAS E INFORMAÇÕES
// ============================================================================

/**
 * Dicas para criação de senha segura
 * @constant
 */
export const DICAS_SENHA = [
  "Pelo menos 6 caracteres",
  "Letras maiúsculas e minúsculas",
  "Pelo menos um número",
  "Pelo menos um caractere especial (@$!%*?&)",
] as const;

/**
 * Descrições explicativas para cada tipo de perfil
 * @constant
 */
export const DESCRICOES_PERFIL: Record<TipoUsuario, string> = {
  [TipoUsuario.CORRETOR]:
    "Profissionais que atuam na intermediação de negócios imobiliários. Necessário CRECI ativo.",
  [TipoUsuario.IMOBILIARIA]:
    "Empresas do setor imobiliário com CNPJ ativo. Podem ter múltiplos corretores vinculados.",
  [TipoUsuario.INCORPORADORA]:
    "Empresas de construção e desenvolvimento de empreendimentos imobiliários.",
  [TipoUsuario.CLIENTE]:
    "Pessoas buscando imóveis para comprar ou alugar. Acesso ao catálogo completo.",
  [TipoUsuario.PROPRIETARIO]:
    "Possuidores de imóveis que desejam anunciar para venda ou locação.",
  [TipoUsuario.ADMINISTRADOR]:
    "Acesso total ao sistema para gestão de usuários, imóveis e configurações.",
};
