/**
 * Formata um CRECI no padrão brasileiro.
 *
 * @param creci - CRECI (com ou sem formatação)
 * @returns CRECI formatado: CRECI/UF-000000
 *
 * @example
 * formatarCRECI("SP123456")    // "CRECI/SP-123456"
 * formatarCRECI("MG987654")    // "CRECI/MG-987654"
 */
export function formatarCRECI(creci: string): string {
  // Remove espaços e deixa maiúsculo
  const texto = creci.toUpperCase().replace(/\s/g, "");

  // Tenta extrair UF (2 letras) e número
  const match = texto.match(/^([A-Z]{2})?(\d+)$/);

  if (match) {
    const [, uf = "", numero = ""] = match;

    // Se não tem UF, retorna apenas número
    if (!uf) return numero;

    // Formata: CRECI/UF-NÚMERO
    return `CRECI/${uf}-${numero}`;
  }

  // Se já estiver formatado ou formato diferente, retorna original
  return creci;
}

/**
 * Remove a formatação do CRECI, deixando apenas UF e números.
 *
 * @param creci - CRECI formatado
 * @returns UF + Números (ex: "SP123456")
 *
 * @example
 * removerFormatacaoCRECI("CRECI/SP-123456") // "SP123456"
 */
export function removerFormatacaoCRECI(creci: string): string {
  // Remove "CRECI/", hífens, espaços, deixa maiúsculo
  return creci
    .toUpperCase()
    .replace(/CRECI\/?/gi, "")
    .replace(/-/g, "")
    .replace(/\s/g, "");
}

/**
 * Valida se um CRECI tem formato básico válido.
 *
 * @param creci - CRECI a validar
 * @returns true se formato básico válido
 *
 * @example
 * validarFormatoCRECI("SP123456")          // true
 * validarFormatoCRECI("CRECI/SP-123456")   // true
 * validarFormatoCRECI("123")               // false (sem UF)
 */
export function validarFormatoCRECI(creci: string): boolean {
  const texto = removerFormatacaoCRECI(creci);

  // Deve ter pelo menos 2 letras (UF) e números
  return /^[A-Z]{2}\d+$/.test(texto);
}

/**
 * Extrai a UF do CRECI.
 *
 * @param creci - CRECI formatado ou não
 * @returns UF (2 letras) ou string vazia
 *
 * @example
 * extrairUFCRECI("CRECI/SP-123456") // "SP"
 * extrairUFCRECI("SP123456")        // "SP"
 */
export function extrairUFCRECI(creci: string): string {
  const texto = removerFormatacaoCRECI(creci);
  const match = texto.match(/^([A-Z]{2})/);
  return match ? match[1] : "";
}

/**
 * Extrai o número do CRECI.
 *
 * @param creci - CRECI formatado ou não
 * @returns Apenas números do CRECI
 *
 * @example
 * extrairNumeroCRECI("CRECI/SP-123456") // "123456"
 * extrairNumeroCRECI("SP123456")        // "123456"
 */
export function extrairNumeroCRECI(creci: string): string {
  const texto = removerFormatacaoCRECI(creci);
  const match = texto.match(/\d+/g);
  return match ? match.join("") : "";
}

// Exporta tudo como objeto padrão também
export default {
  formatar: formatarCRECI,
  removerFormatacao: removerFormatacaoCRECI,
  validarFormato: validarFormatoCRECI,
  extrairUF: extrairUFCRECI,
  extrairNumero: extrairNumeroCRECI,
};
