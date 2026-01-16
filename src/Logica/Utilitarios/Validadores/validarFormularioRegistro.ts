/**
 * @file validarFormularioRegistro.ts
 * @description Funções de validação para o formulário de registro
 * Valida campos obrigatórios, formatos, regras específicas por perfil
 * Compatível com IFormularioRegistro e utiliza constantes de Tipos/Registro/
 *
 * @version 2.0.0
 */

import {
  IFormularioRegistro,
  TipoUsuario,
  TipoDocumento,
  COMPRIMENTO_CAMPOS,
  REGEX_VALIDACAO,
  MENSAGENS_ERRO,
  CAMPOS_OBRIGATORIOS_POR_PERFIL,
  TIPO_DOCUMENTO_POR_PERFIL,
  isTipoUsuario,
  isNivelExperiencia,
} from "../../../Tipos/Registro/TiposRegistro";

/**
 * Valida o formulário completo de registro
 * Verifica campos obrigatórios, formatos e regras específicas por tipo de usuário
 * Compatível com IFormularioRegistro e constantes do sistema
 *
 * @param {IFormularioRegistro} dados - Dados do formulário a serem validados
 * @returns {Record<string, string>} Objeto com erros por campo (vazio se válido)
 *
 * @example
 * const erros = validarFormulario(dados);
 * if (Object.keys(erros).length === 0) {
 *   // Formulário válido
 * }
 */
export function validarFormulario(
  dados: IFormularioRegistro,
): Record<string, string> {
  const erros: Record<string, string> = {};

  // === VALIDAÇÕES BÁSICAS (para todos os perfis) ===

  // Nome
  if (!dados.name.trim()) {
    erros.name = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("Nome");
  } else if (dados.name.length < COMPRIMENTO_CAMPOS.NOME_MIN) {
    erros.name = MENSAGENS_ERRO.TAMANHO_MINIMO(
      "Nome",
      COMPRIMENTO_CAMPOS.NOME_MIN,
    );
  } else if (dados.name.length > COMPRIMENTO_CAMPOS.NOME_MAX) {
    erros.name = MENSAGENS_ERRO.TAMANHO_MAXIMO(
      "Nome",
      COMPRIMENTO_CAMPOS.NOME_MAX,
    );
  } else if (!REGEX_VALIDACAO.NOME.test(dados.name)) {
    erros.name = MENSAGENS_ERRO.NOME_INVALIDO;
  }

  // Email
  if (!dados.email) {
    erros.email = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("Email");
  } else if (!REGEX_VALIDACAO.EMAIL.test(dados.email)) {
    erros.email = MENSAGENS_ERRO.EMAIL_INVALIDO;
  } else if (dados.email.length > COMPRIMENTO_CAMPOS.EMAIL_MAX) {
    erros.email = MENSAGENS_ERRO.TAMANHO_MAXIMO(
      "Email",
      COMPRIMENTO_CAMPOS.EMAIL_MAX,
    );
  }

  // Senha
  if (!dados.password) {
    erros.password = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("Senha");
  } else if (dados.password.length < COMPRIMENTO_CAMPOS.SENHA_MIN) {
    erros.password = MENSAGENS_ERRO.SENHA_CURTA;
  } else if (dados.password.length > COMPRIMENTO_CAMPOS.SENHA_MAX) {
    erros.password = MENSAGENS_ERRO.TAMANHO_MAXIMO(
      "Senha",
      COMPRIMENTO_CAMPOS.SENHA_MAX,
    );
  }

  // Confirmação de senha
  if (!dados.confirmPassword) {
    erros.confirmPassword = "Confirme sua senha";
  } else if (dados.password !== dados.confirmPassword) {
    erros.confirmPassword = MENSAGENS_ERRO.SENHAS_NAO_COINCIDEM;
  }

  // Tipo de usuário
  if (!dados.userType || !isTipoUsuario(dados.userType)) {
    erros.userType = "Selecione um tipo de perfil válido";
  }

  // === VALIDAÇÕES DE CAMPOS OPCIONAIS (se preenchidos) ===

  // Telefone
  if (
    dados.phone &&
    dados.phone.trim() !== "" &&
    !REGEX_VALIDACAO.TELEFONE.test(dados.phone)
  ) {
    erros.phone = MENSAGENS_ERRO.TELEFONE_INVALIDO;
  }

  // Experiência (se preenchida)
  if (dados.experience && !isNivelExperiencia(dados.experience)) {
    erros.experience = "Selecione uma experiência válida";
  }

  // CRECI (se preenchido)
  if (
    dados.creci &&
    dados.creci.trim() !== "" &&
    !REGEX_VALIDACAO.CRECI.test(dados.creci)
  ) {
    erros.creci = MENSAGENS_ERRO.CRECI_INVALIDO;
  }

  // CNPJ (se preenchido)
  if (
    dados.cnpj &&
    dados.cnpj.trim() !== "" &&
    !REGEX_VALIDACAO.CNPJ.test(dados.cnpj)
  ) {
    erros.cnpj = MENSAGENS_ERRO.CNPJ_INVALIDO;
  }

  // CPF (se preenchido)
  if (
    dados.cpf &&
    dados.cpf.trim() !== "" &&
    !REGEX_VALIDACAO.CPF.test(dados.cpf)
  ) {
    erros.cpf = MENSAGENS_ERRO.CPF_INVALIDO;
  }

  // Aceite dos termos (se campo existir)
  if (dados.acceptTerms === false) {
    erros.acceptTerms = "É necessário aceitar os termos e condições";
  }

  // === VALIDAÇÕES ESPECÍFICAS POR PERFIL ===

  // Campos obrigatórios para o perfil selecionado
  const camposObrigatorios: Array<keyof IFormularioRegistro> =
    CAMPOS_OBRIGATORIOS_POR_PERFIL[dados.userType] || [];

  // Verifica cada campo obrigatório para o perfil
  camposObrigatorios.forEach((campo) => {
    if (campo === "creci" && dados.userType === TipoUsuario.CORRETOR) {
      if (!dados.creci || dados.creci.trim() === "") {
        erros.creci = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("CRECI");
      } else if (!REGEX_VALIDACAO.CRECI.test(dados.creci)) {
        erros.creci = MENSAGENS_ERRO.CRECI_INVALIDO;
      }
    }

    if (
      campo === "cnpj" &&
      (dados.userType === TipoUsuario.IMOBILIARIA ||
        dados.userType === TipoUsuario.INCORPORADORA)
    ) {
      if (!dados.cnpj || dados.cnpj.trim() === "") {
        erros.cnpj = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("CNPJ");
      } else if (!REGEX_VALIDACAO.CNPJ.test(dados.cnpj)) {
        erros.cnpj = MENSAGENS_ERRO.CNPJ_INVALIDO;
      }
    }

    if (
      campo === "cpf" &&
      (dados.userType === TipoUsuario.CLIENTE ||
        dados.userType === TipoUsuario.PROPRIETARIO)
    ) {
      if (!dados.cpf || dados.cpf.trim() === "") {
        erros.cpf = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("CPF");
      } else if (!REGEX_VALIDACAO.CPF.test(dados.cpf)) {
        erros.cpf = MENSAGENS_ERRO.CPF_INVALIDO;
      }
    }
  });

  // Tipo de documento esperado para o perfil
  const tipoDocumentoEsperado = TIPO_DOCUMENTO_POR_PERFIL[dados.userType];

  if (
    tipoDocumentoEsperado === TipoDocumento.CPF &&
    dados.userType !== TipoUsuario.CORRETOR
  ) {
    if (!dados.cpf || dados.cpf.trim() === "") {
      erros.cpf = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("CPF");
    }
  }

  if (tipoDocumentoEsperado === TipoDocumento.CNPJ) {
    if (!dados.cnpj || dados.cnpj.trim() === "") {
      erros.cnpj = MENSAGENS_ERRO.CAMPO_OBRIGATORIO("CNPJ");
    }
  }

  return erros;
}

/**
 * Verifica se não há erros no formulário
 * Função utilitária para verificação rápida
 *
 * @param {Record<string, string>} erros - Objeto de erros do formulário
 * @returns {boolean} true se não há erros, false caso contrário
 *
 * @example
 * if (semErros(erros)) {
 *   // Pode prosseguir com o envio
 * }
 */
export function semErros(erros: Record<string, string>): boolean {
  return Object.keys(erros).length === 0;
}

// Exportação padrão para compatibilidade
export default {
  validar: validarFormulario,
  semErros,
};
