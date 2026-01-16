/**
 * Formata um CPF no padrão brasileiro.
 *
 * @param cpf - CPF (com ou sem formatação)
 * @returns CPF formatado: 000.000.000-00
 *
 * @example
 * formatarCPF("12345678900")      // "123.456.789-00"
 * formatarCPF("123.456.789-00")   // "123.456.789-00"
 */
export function formatarCPF(cpf: string): string {
  // Remove tudo que não é número
  const apenasNumeros = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (apenasNumeros.length === 11) {
    return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9)}`;
  }

  // Retorna original se não puder formatar
  return cpf;
}

/**
 * Remove a formatação do CPF, deixando apenas números.
 *
 * @param cpf - CPF formatado
 * @returns Apenas números
 *
 * @example
 * removerFormatacaoCPF("123.456.789-00") // "12345678900"
 */
export function removerFormatacaoCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

/**
 * Valida se um CPF tem formato válido.
 * Apenas valida formato, NÃO valida dígitos verificadores.
 *
 * @param cpf - CPF a validar
 * @returns true se formato válido
 *
 * @example
 * validarFormatoCPF("12345678900")      // true
 * validarFormatoCPF("123.456.789-00")   // true
 * validarFormatoCPF("123")              // false
 */
export function validarFormatoCPF(cpf: string): boolean {
  const apenasNumeros = cpf.replace(/\D/g, "");
  return apenasNumeros.length === 11;
}

/**
 * Valida CPF completo (formato E dígitos verificadores).
 *
 * @param cpf - CPF a validar
 * @returns true se CPF válido
 *
 * @example
 * validarCPF("529.982.247-25") // true (CPF de exemplo válido)
 * validarCPF("111.111.111-11") // false (CPF inválido)
 */
export function validarCPF(cpf: string): boolean {
  // Remove formatação
  const numeros = removerFormatacaoCPF(cpf);

  // Verifica se tem 11 dígitos
  if (numeros.length !== 11) return false;

  // Verifica se não é sequência repetida
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  // Calcula primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  // Verifica primeiro dígito
  if (digito1 !== parseInt(numeros.charAt(9))) return false;

  // Calcula segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica segundo dígito
  return digito2 === parseInt(numeros.charAt(10));
}

/**
 * Gera um CPF válido para testes.
 *
 * @returns CPF válido formatado
 *
 * @example
 * gerarCPFValido() // "123.456.789-09"
 */
export function gerarCPFValido(): string {
  // Gera 9 números aleatórios
  let numeros = "";
  for (let i = 0; i < 9; i++) {
    numeros += Math.floor(Math.random() * 10);
  }

  // Calcula primeiro dígito
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  numeros += digito1;

  // Calcula segundo dígito
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  numeros += digito2;

  return formatarCPF(numeros);
}

// Exporta tudo como objeto padrão também
export default {
  formatar: formatarCPF,
  removerFormatacao: removerFormatacaoCPF,
  validarFormato: validarFormatoCPF,
  validar: validarCPF,
  gerarValido: gerarCPFValido,
};
