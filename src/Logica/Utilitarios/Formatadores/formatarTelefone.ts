/**
 * Formata um número de telefone brasileiro.
 *
 * @param telefone - Número de telefone (com ou sem formatação)
 * @returns Telefone formatado no padrão brasileiro
 *
 * @example
 * formatarTelefone("11999999999")    // "(11) 99999-9999"
 * formatarTelefone("1133334444")     // "(11) 3333-4444"
 * formatarTelefone("(11)999999999")  // "(11) 99999-9999"
 */
export function formatarTelefone(telefone: string): string {
  // Remove tudo que não é número
  const apenasNumeros = telefone.replace(/\D/g, "");

  // Verifica se tem quantidade válida de dígitos
  if (apenasNumeros.length === 11) {
    // Celular: 11 99999-9999
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
  }

  if (apenasNumeros.length === 10) {
    // Fixo: 11 3333-4444
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
  }

  // Retorna original se não puder formatar
  return telefone;
}

/**
 * Remove a formatação do telefone, deixando apenas números.
 * Útil para salvar no banco de dados.
 *
 * @param telefone - Telefone formatado
 * @returns Apenas números
 *
 * @example
 * removerFormatacaoTelefone("(11) 99999-9999") // "11999999999"
 */
export function removerFormatacaoTelefone(telefone: string): string {
  return telefone.replace(/\D/g, "");
}

/**
 * Valida se um telefone é brasileiro válido.
 *
 * @param telefone - Telefone a validar
 * @returns true se válido
 *
 * @example
 * validarTelefone("11999999999")    // true
 * validarTelefone("113333")         // false
 */
export function validarTelefone(telefone: string): boolean {
  const apenasNumeros = telefone.replace(/\D/g, "");
  return apenasNumeros.length === 10 || apenasNumeros.length === 11;
}

/**
 * Detecta se um telefone é celular.
 *
 * @param telefone - Telefone a verificar
 * @returns true se for celular
 *
 * @example
 * isCelular("11999999999") // true
 * isCelular("1133334444")  // false
 */
export function isCelular(telefone: string): boolean {
  const apenasNumeros = telefone.replace(/\D/g, "");
  return apenasNumeros.length === 11;
}

/**
 * Detecta se um telefone é fixo.
 *
 * @param telefone - Telefone a verificar
 * @returns true se for fixo
 *
 * @example
 * isFixo("1133334444")     // true
 * isFixo("11999999999")    // false
 */
export function isFixo(telefone: string): boolean {
  const apenasNumeros = telefone.replace(/\D/g, "");
  return apenasNumeros.length === 10;
}

// Exporta tudo como objeto padrão também
export default {
  formatar: formatarTelefone,
  removerFormatacao: removerFormatacaoTelefone,
  validar: validarTelefone,
  isCelular,
  isFixo,
};
