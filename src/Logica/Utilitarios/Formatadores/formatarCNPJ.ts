/**
 * Formata um CNPJ no padrão brasileiro.
 *
 * @param cnpj - CNPJ (com ou sem formatação)
 * @returns CNPJ formatado: 00.000.000/0000-00
 *
 * @example
 * formatarCNPJ("12345678000199")        // "12.345.678/0001-99"
 * formatarCNPJ("12.345.678/0001-99")    // "12.345.678/0001-99"
 */
export function formatarCNPJ(cnpj: string): string {
  // Remove tudo que não é número
  const apenasNumeros = cnpj.replace(/\D/g, "");

  // Verifica se tem 14 dígitos
  if (apenasNumeros.length === 14) {
    return `${apenasNumeros.slice(0, 2)}.${apenasNumeros.slice(2, 5)}.${apenasNumeros.slice(5, 8)}/${apenasNumeros.slice(8, 12)}-${apenasNumeros.slice(12)}`;
  }

  // Retorna original se não puder formatar
  return cnpj;
}

/**
 * Remove a formatação do CNPJ, deixando apenas números.
 *
 * @param cnpj - CNPJ formatado
 * @returns Apenas números
 *
 * @example
 * removerFormatacaoCNPJ("12.345.678/0001-99") // "12345678000199"
 */
export function removerFormatacaoCNPJ(cnpj: string): string {
  return cnpj.replace(/\D/g, "");
}

/**
 * Valida se um CNPJ tem formato válido.
 * Apenas valida formato, NÃO valida dígitos verificadores.
 *
 * @param cnpj - CNPJ a validar
 * @returns true se formato válido
 *
 * @example
 * validarFormatoCNPJ("12345678000199")      // true
 * validarFormatoCNPJ("12.345.678/0001-99")  // true
 * validarFormatoCNPJ("123")                 // false
 */
export function validarFormatoCNPJ(cnpj: string): boolean {
  const apenasNumeros = cnpj.replace(/\D/g, "");
  return apenasNumeros.length === 14;
}

/**
 * Valida CNPJ completo (formato E dígitos verificadores).
 *
 * @param cnpj - CNPJ a validar
 * @returns true se CNPJ válido
 *
 * @example
 * validarCNPJ("11.222.333/0001-81") // true (CNPJ de exemplo válido)
 * validarCNPJ("11.111.111/1111-11") // false (CNPJ inválido)
 */
export function validarCNPJ(cnpj: string): boolean {
  // Remove formatação
  const numeros = removerFormatacaoCNPJ(cnpj);

  // Verifica se tem 14 dígitos
  if (numeros.length !== 14) return false;

  // Verifica se não é sequência repetida
  if (/^(\d)\1{13}$/.test(numeros)) return false;

  // Peso para primeiro dígito
  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(numeros.charAt(i)) * peso1[i];
  }

  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  // Verifica primeiro dígito
  if (digito1 !== parseInt(numeros.charAt(12))) return false;

  // Peso para segundo dígito
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(numeros.charAt(i)) * peso2[i];
  }

  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica segundo dígito
  return digito2 === parseInt(numeros.charAt(13));
}

/**
 * Gera um CNPJ válido para testes.
 *
 * @returns CNPJ válido formatado
 *
 * @example
 * gerarCNPJValido() // "12.345.678/0001-99"
 */
export function gerarCNPJValido(): string {
  // Gera 12 números aleatórios
  let numeros = "";
  for (let i = 0; i < 12; i++) {
    numeros += Math.floor(Math.random() * 10);
  }

  // Peso para primeiro dígito
  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula primeiro dígito
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(numeros.charAt(i)) * peso1[i];
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  numeros += digito1;

  // Peso para segundo dígito
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula segundo dígito
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(numeros.charAt(i)) * peso2[i];
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  numeros += digito2;

  return formatarCNPJ(numeros);
}

// Exporta tudo como objeto padrão também
export default {
  formatar: formatarCNPJ,
  removerFormatacao: removerFormatacaoCNPJ,
  validarFormato: validarFormatoCNPJ,
  validar: validarCNPJ,
  gerarValido: gerarCNPJValido,
};
