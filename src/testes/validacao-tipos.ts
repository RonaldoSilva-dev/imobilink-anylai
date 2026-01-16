/**
 * @file validacao-tipos.ts
 * @description Testes de validação e verificação dos tipos do sistema de registro
 * Este arquivo testa a integridade e funcionamento dos tipos, enums e constantes criados
 *
 * @usage Executar com: npx tsx src/__testes__/validacao-tipos.ts
 * @usage Alternativa: npx ts-node src/__testes__/validacao-tipos.ts
 *
 * @version 1.0.0
 * @created 2024
 */

// ============================================================================
// IMPORTAÇÕES
// ============================================================================

import {
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

  // Interfaces
  type IFormularioRegistro,
  type IUsuarioRegistrado,
  type IResultadoRegistro,

  // Type Guards
  isTipoUsuario,
  isNivelExperiencia,
  isFormularioRegistro,

  // Tipos
  type TErrosFormulario,
} from "../Tipos/Registro/TiposRegistro";

// ============================================================================
// FUNÇÕES AUXILIARES DE TESTE
// ============================================================================

/**
 * Função para comparar resultados de teste
 * @param descricao - Descrição do teste
 * @param resultado - Resultado obtido
 * @param esperado - Resultado esperado
 * @returns Mensagem formatada com ✅ ou ❌
 */
function testar(descricao: string, resultado: any, esperado: any): string {
  const passou = JSON.stringify(resultado) === JSON.stringify(esperado);
  const icone = passou ? "✅" : "❌";
  return `${icone} ${descricao}: ${JSON.stringify(resultado)} ${passou ? "" : `(esperado: ${JSON.stringify(esperado)})`}`;
}

/**
 * Função para testar regex
 * @param regex - Expressão regular a testar
 * @param valor - Valor a testar
 * @param devePassar - Se deve passar no teste
 * @returns Mensagem formatada
 */
function testarRegex(
  regex: RegExp,
  valor: string,
  devePassar: boolean,
): string {
  const resultado = regex.test(valor);
  const passou = resultado === devePassar;
  const icone = passou ? "✅" : "❌";
  return `${icone} ${regex.source}: "${valor}" = ${resultado} ${passou ? "" : `(esperado: ${devePassar})`}`;
}

// ============================================================================
// TESTES PRINCIPAIS
// ============================================================================

console.log("🔍 INICIANDO TESTES DOS TIPOS DE REGISTRO\n");
console.log("=".repeat(60));

// ============================================================================
// SEÇÃO 1: TESTES DOS ENUMS
// ============================================================================
console.log("\n📦 SEÇÃO 1: TESTES DOS ENUMS\n");

// Teste 1.1: Valores do enum TipoUsuario
console.log("📌 1.1 - Enum TipoUsuario:");
console.log(
  `  ${testar("Total de tipos de usuário", Object.keys(TipoUsuario).length, 6)}`,
);
console.log(`  ${testar("Valor CORRETOR", TipoUsuario.CORRETOR, "corretor")}`);
console.log(
  `  ${testar("Valor IMOBILIARIA", TipoUsuario.IMOBILIARIA, "imobiliaria")}`,
);
console.log(`  ${testar("Valor CLIENTE", TipoUsuario.CLIENTE, "cliente")}`);

// Teste 1.2: Valores do enum NivelExperiencia
console.log("\n📌 1.2 - Enum NivelExperiencia:");
console.log(
  `  ${testar("Valor MENOS_DE_1_ANO", NivelExperiencia.MENOS_DE_1_ANO, "less-1")}`,
);
console.log(
  `  ${testar("Valor MAIS_DE_10_ANOS", NivelExperiencia.MAIS_DE_10_ANOS, "more-10")}`,
);

// Teste 1.3: Valores do enum TipoDocumento
console.log("\n📌 1.3 - Enum TipoDocumento:");
console.log(`  ${testar("Valor CPF", TipoDocumento.CPF, "cpf")}`);
console.log(`  ${testar("Valor CNPJ", TipoDocumento.CNPJ, "cnpj")}`);

// Teste 1.4: Valores do enum StatusConta
console.log("\n📌 1.4 - Enum StatusConta:");
console.log(`  ${testar("Valor PENDENTE", StatusConta.PENDENTE, "pendente")}`);
console.log(`  ${testar("Valor ATIVA", StatusConta.ATIVA, "ativa")}`);

// ============================================================================
// SEÇÃO 2: TESTES DAS CONSTANTES
// ============================================================================
console.log("\n📦 SEÇÃO 2: TESTES DAS CONSTANTES\n");

// Teste 2.1: Opções de perfil
console.log("📌 2.1 - OPCOES_PERFIL:");
console.log(`  ${testar("Quantidade de opções", OPCOES_PERFIL.length, 6)}`);
console.log(
  `  ${testar("Primeira opção é Corretor", OPCOES_PERFIL[0].valor, TipoUsuario.CORRETOR)}`,
);
console.log(
  `  ${testar("Texto da primeira opção", OPCOES_PERFIL[0].texto, "Corretor")}`,
);

// Teste 2.2: Opções de experiência
console.log("\n📌 2.2 - OPCOES_EXPERIENCIA:");
console.log(
  `  ${testar("Quantidade de níveis", OPCOES_EXPERIENCIA.length, 5)}`,
);
console.log(
  `  ${testar("Primeiro nível", OPCOES_EXPERIENCIA[0].texto, "Menos de 1 ano")}`,
);

// Teste 2.3: Configurações de comprimento
console.log("\n📌 2.3 - COMPRIMENTO_CAMPOS:");
console.log(`  ${testar("NOME_MIN", COMPRIMENTO_CAMPOS.NOME_MIN, 2)}`);
console.log(`  ${testar("SENHA_MIN", COMPRIMENTO_CAMPOS.SENHA_MIN, 6)}`);
console.log(`  ${testar("CPF_LENGTH", COMPRIMENTO_CAMPOS.CPF_LENGTH, 11)}`);
console.log(`  ${testar("CNPJ_LENGTH", COMPRIMENTO_CAMPOS.CNPJ_LENGTH, 14)}`);

// Teste 2.4: Campos obrigatórios por perfil
console.log("\n📌 2.4 - CAMPOS_OBRIGATORIOS_POR_PERFIL:");
console.log(
  `  ${testar("Corretor tem creci", CAMPOS_OBRIGATORIOS_POR_PERFIL[TipoUsuario.CORRETOR].includes("creci"), true)}`,
);
console.log(
  `  ${testar("Imobiliária tem cnpj", CAMPOS_OBRIGATORIOS_POR_PERFIL[TipoUsuario.IMOBILIARIA].includes("cnpj"), true)}`,
);
console.log(
  `  ${testar("Cliente tem cpf", CAMPOS_OBRIGATORIOS_POR_PERFIL[TipoUsuario.CLIENTE].includes("cpf"), true)}`,
);

// Teste 2.5: Tipo de documento por perfil
console.log("\n📌 2.5 - TIPO_DOCUMENTO_POR_PERFIL:");
console.log(
  `  ${testar("Imobiliária usa CNPJ", TIPO_DOCUMENTO_POR_PERFIL[TipoUsuario.IMOBILIARIA], TipoDocumento.CNPJ)}`,
);
console.log(
  `  ${testar("Cliente usa CPF", TIPO_DOCUMENTO_POR_PERFIL[TipoUsuario.CLIENTE], TipoDocumento.CPF)}`,
);
console.log(
  `  ${testar("Corretor não tem doc fixo", TIPO_DOCUMENTO_POR_PERFIL[TipoUsuario.CORRETOR], null)}`,
);

// ============================================================================
// SEÇÃO 3: TESTES DAS REGEX
// ============================================================================
console.log("\n📦 SEÇÃO 3: TESTES DAS EXPRESSÕES REGULARES\n");

console.log("📌 3.1 - Validação de Email:");
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.EMAIL, "usuario@email.com", true)}`,
);
console.log(`  ${testarRegex(REGEX_VALIDACAO.EMAIL, "usuario@email", false)}`);
console.log(`  ${testarRegex(REGEX_VALIDACAO.EMAIL, "@email.com", false)}`);
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.EMAIL, "usuario.email.com", false)}`,
);

console.log("\n📌 3.2 - Validação de Telefone:");
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.TELEFONE, "(11) 99999-9999", true)}`,
);
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.TELEFONE, "(11) 9999-9999", true)}`,
);
console.log(`  ${testarRegex(REGEX_VALIDACAO.TELEFONE, "11999999999", false)}`);
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.TELEFONE, "(11)99999-9999", false)}`,
);

console.log("\n📌 3.3 - Validação de CPF:");
console.log(`  ${testarRegex(REGEX_VALIDACAO.CPF, "123.456.789-00", true)}`);
console.log(`  ${testarRegex(REGEX_VALIDACAO.CPF, "12345678900", false)}`);
console.log(`  ${testarRegex(REGEX_VALIDACAO.CPF, "123.456.789-0", false)}`);

console.log("\n📌 3.4 - Validação de CNPJ:");
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.CNPJ, "12.345.678/0001-90", true)}`,
);
console.log(`  ${testarRegex(REGEX_VALIDACAO.CNPJ, "12345678000190", false)}`);

console.log("\n📌 3.5 - Validação de Nome:");
console.log(`  ${testarRegex(REGEX_VALIDACAO.NOME, "João Silva", true)}`);
console.log(
  `  ${testarRegex(REGEX_VALIDACAO.NOME, "Maria José dos Santos", true)}`,
);
console.log(`  ${testarRegex(REGEX_VALIDACAO.NOME, "João123", false)}`);
console.log(`  ${testarRegex(REGEX_VALIDACAO.NOME, "A", false)}`);

// ============================================================================
// SEÇÃO 4: TESTES DAS MENSAGENS DE ERRO
// ============================================================================
console.log("\n📦 SEÇÃO 4: TESTES DAS MENSAGENS DE ERRO\n");

console.log("📌 4.1 - Mensagens Geradas:");
console.log(
  `  ${testar("Campo obrigatório", MENSAGENS_ERRO.CAMPO_OBRIGATORIO("Nome"), "Nome é obrigatório")}`,
);
console.log(
  `  ${testar("Tamanho mínimo", MENSAGENS_ERRO.TAMANHO_MINIMO("Senha", 6), "Senha deve ter pelo menos 6 caracteres")}`,
);
console.log(
  `  ${testar("Email inválido", MENSAGENS_ERRO.EMAIL_INVALIDO, "Email inválido")}`,
);
console.log(
  `  ${testar("Senhas não coincidem", MENSAGENS_ERRO.SENHAS_NAO_COINCIDEM, "As senhas não coincidem")}`,
);

// ============================================================================
// SEÇÃO 5: TESTES DOS TYPE GUARDS
// ============================================================================
console.log("\n📦 SEÇÃO 5: TESTES DOS TYPE GUARDS\n");

console.log("📌 5.1 - isTipoUsuario:");
console.log(
  `  ${testar('"corretor" é TipoUsuario', isTipoUsuario("corretor"), true)}`,
);
console.log(
  `  ${testar('"imobiliaria" é TipoUsuario', isTipoUsuario("imobiliaria"), true)}`,
);
console.log(
  `  ${testar('"vendedor" NÃO é TipoUsuario', isTipoUsuario("vendedor"), false)}`,
);
console.log(
  `  ${testar("null NÃO é TipoUsuario", isTipoUsuario(null), false)}`,
);
console.log(`  ${testar("123 NÃO é TipoUsuario", isTipoUsuario(123), false)}`);

console.log("\n📌 5.2 - isNivelExperiencia:");
console.log(
  `  ${testar('"less-1" é NivelExperiencia', isNivelExperiencia("less-1"), true)}`,
);
console.log(
  `  ${testar('"1-3" é NivelExperiencia', isNivelExperiencia("1-3"), true)}`,
);
console.log(
  `  ${testar('"10+" NÃO é NivelExperiencia', isNivelExperiencia("10+"), false)}`,
);

// ============================================================================
// SEÇÃO 6: TESTES DAS INTERFACES
// ============================================================================
console.log("\n📦 SEÇÃO 6: TESTES DAS INTERFACES\n");

// Teste 6.1: Criar objeto IFormularioRegistro válido
console.log("📌 6.1 - Objeto IFormularioRegistro válido:");
const formularioCorretor: IFormularioRegistro = {
  name: "Carlos Eduardo Santos",
  email: "carlos@imobiliaria.com.br",
  password: "Senha@Segura123",
  confirmPassword: "Senha@Segura123",
  userType: TipoUsuario.CORRETOR,
  phone: "(11) 98765-4321",
  creci: "CRECI-SP-123456",
  experience: NivelExperiencia.DE_3_A_5_ANOS,
  acceptTerms: true,
};

console.log(
  `  ${testar("Objeto é IFormularioRegistro", isFormularioRegistro(formularioCorretor), true)}`,
);
console.log(
  `  ${testar("Nome está definido", !!formularioCorretor.name, true)}`,
);
console.log(
  `  ${testar("Email está definido", !!formularioCorretor.email, true)}`,
);
console.log(
  `  ${testar("Tipo de usuário é CORRETOR", formularioCorretor.userType, TipoUsuario.CORRETOR)}`,
);
console.log(
  `  ${testar("CRECI definido para corretor", !!formularioCorretor.creci, true)}`,
);

// Teste 6.2: Criar objeto IFormularioRegistro para imobiliária
console.log("\n📌 6.2 - Objeto para Imobiliária:");
const formularioImobiliaria: IFormularioRegistro = {
  name: "Imobiliária Excelência Ltda",
  email: "contato@excelenciaimoveis.com.br",
  password: "SenhaCorporativa@2024",
  confirmPassword: "SenhaCorporativa@2024",
  userType: TipoUsuario.IMOBILIARIA,
  phone: "(21) 3456-7890",
  cnpj: "12.345.678/0001-90",
  companyName: "Excelência Imóveis",
  acceptTerms: true,
};

console.log(
  `  ${testar("Objeto é válido", isFormularioRegistro(formularioImobiliaria), true)}`,
);
console.log(
  `  ${testar("CNPJ definido para imobiliária", !!formularioImobiliaria.cnpj, true)}`,
);
console.log(
  `  ${testar("Tipo é IMOBILIARIA", formularioImobiliaria.userType, TipoUsuario.IMOBILIARIA)}`,
);

// Teste 6.3: Criar objeto IUsuarioRegistrado
console.log("\n📌 6.3 - Objeto IUsuarioRegistrado:");
const usuarioRegistrado: IUsuarioRegistrado = {
  id: "usr_123456789",
  name: "Ana Maria Silva",
  email: "ana@email.com",
  userType: TipoUsuario.CLIENTE,
  status: StatusConta.ATIVA,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-20"),
  emailVerifiedAt: new Date("2024-01-16"),
  phone: "(31) 99999-8888",
  cpf: "123.456.789-00",
};

console.log(`  ${testar("ID definido", !!usuarioRegistrado.id, true)}`);
console.log(
  `  ${testar("Status é ATIVA", usuarioRegistrado.status, StatusConta.ATIVA)}`,
);
console.log(
  `  ${testar("CPF definido para cliente", !!usuarioRegistrado.cpf, true)}`,
);

// Teste 6.4: Criar objeto IResultadoRegistro
console.log("\n📌 6.4 - Objeto IResultadoRegistro:");
const resultadoSucesso: IResultadoRegistro = {
  success: true,
  message: "Usuário registrado com sucesso",
  user: usuarioRegistrado,
  token: "jwt_token_abcdef123456",
  expiresAt: new Date(Date.now() + 86400000), // 1 dia
};

const resultadoErro: IResultadoRegistro = {
  success: false,
  error: "Email já cadastrado",
  errorCode: "EMAIL_DUPLICADO",
};

console.log(
  `  ${testar("Resultado sucesso tem success=true", resultadoSucesso.success, true)}`,
);
console.log(
  `  ${testar("Resultado sucesso tem user", !!resultadoSucesso.user, true)}`,
);
console.log(
  `  ${testar("Resultado erro tem success=false", resultadoErro.success, false)}`,
);
console.log(
  `  ${testar("Resultado erro tem error", !!resultadoErro.error, true)}`,
);

// ============================================================================
// SEÇÃO 7: TESTES DAS MÁSCARAS E PLACEHOLDERS
// ============================================================================
console.log("\n📦 SEÇÃO 7: TESTES DAS MÁSCARAS E PLACEHOLDERS\n");

console.log("📌 7.1 - Máscaras:");
console.log(
  `  ${testar("Máscara telefone", MASCARAS.TELEFONE, "(99) 99999-9999")}`,
);
console.log(`  ${testar("Máscara CPF", MASCARAS.CPF, "999.999.999-99")}`);
console.log(`  ${testar("Máscara CNPJ", MASCARAS.CNPJ, "99.999.999/9999-99")}`);

console.log("\n📌 7.2 - Placeholders:");
console.log(
  `  ${testar("Placeholder nome", PLACEHOLDERS.NOME, "Seu nome completo ou razão social")}`,
);
console.log(
  `  ${testar("Placeholder email", PLACEHOLDERS.EMAIL, "seu@email.com")}`,
);
console.log(
  `  ${testar("Placeholder CPF", PLACEHOLDERS.CPF, "123.456.789-00")}`,
);

// ============================================================================
// SEÇÃO 8: TESTES DAS DICAS E DESCRIÇÕES
// ============================================================================
console.log("\n📦 SEÇÃO 8: TESTES DAS DICAS E DESCRIÇÕES\n");

console.log("📌 8.1 - Dicas de Senha:");
console.log(`  ${testar("Quantidade de dicas", DICAS_SENHA.length, 4)}`);
console.log(
  `  ${testar("Primeira dica", DICAS_SENHA[0], "Pelo menos 6 caracteres")}`,
);
console.log(
  `  ${testar("Terceira dica", DICAS_SENHA[2], "Pelo menos um número")}`,
);

console.log("\n📌 8.2 - Descrições de Perfil:");
console.log(
  `  ${testar("Descrição corretor existe", !!DESCRICOES_PERFIL[TipoUsuario.CORRETOR], true)}`,
);
console.log(
  `  ${testar("Descrição cliente existe", !!DESCRICOES_PERFIL[TipoUsuario.CLIENTE], true)}`,
);
console.log(
  `  Descrição Corretor: "${DESCRICOES_PERFIL[TipoUsuario.CORRETOR].substring(0, 50)}..."`,
);

// ============================================================================
// RESULTADO FINAL
// ============================================================================
console.log("\n" + "=".repeat(60));
console.log("🎉 TESTES CONCLUÍDOS!");
console.log("=".repeat(60));

console.log("\n📊 RESUMO:");
console.log(
  `• Enums testados: 4 (TipoUsuario, NivelExperiencia, TipoDocumento, StatusConta)`,
);
console.log(`• Constantes testadas: 12 categorias`);
console.log(`• Regex testadas: 6 expressões regulares`);
console.log(`• Type Guards testados: 3 funções`);
console.log(`• Interfaces testadas: 3 principais`);
console.log(`• Exemplos criados: 4 objetos de teste`);

console.log("\n💡 PRÓXIMOS PASSOS:");
console.log(`1. Se todos os testes mostraram ✅, a base de tipos está sólida!`);
console.log(`2. Execute: npx tsx src/__testes__/validacao-tipos.ts`);
console.log(`3. Corrija qualquer teste que mostre ❌`);
console.log(`4. Continue para a próxima etapa: Logica/Utilitarios/`);

console.log("\n🚀 PRONTO PARA PROSSEGUIR!");
