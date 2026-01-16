/**
 * Valida dados básicos do formulário de registro.
 */

// Tipos locais para não depender de imports
type TipoUsuario =
  | "corretor"
  | "imobiliaria"
  | "incorporadora"
  | "cliente"
  | "proprietario"
  | "administrador";

interface DadosFormulario {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: TipoUsuario;
  phone?: string;
  creci?: string;
  cnpj?: string;
  cpf?: string;
}

export function validarFormulario(
  dados: DadosFormulario,
): Record<string, string> {
  const erros: Record<string, string> = {};

  // Nome
  if (!dados.name?.trim()) {
    erros.name = "Nome é obrigatório";
  } else if (dados.name.length < 2) {
    erros.name = "Nome deve ter pelo menos 2 caracteres";
  }

  // Email
  if (!dados.email?.trim()) {
    erros.email = "Email é obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(dados.email)) {
    erros.email = "Email inválido";
  }

  // Senha
  if (!dados.password) {
    erros.password = "Senha é obrigatória";
  } else if (dados.password.length < 6) {
    erros.password = "Senha deve ter pelo menos 6 caracteres";
  }

  // Confirmar senha
  if (dados.password !== dados.confirmPassword) {
    erros.confirmPassword = "As senhas não coincidem";
  }

  // Telefone (se preenchido)
  if (dados.phone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(dados.phone)) {
    erros.phone = "Telefone inválido (use: (11) 99999-9999)";
  }

  // Validações por tipo
  if (dados.userType === "corretor" && !dados.creci?.trim()) {
    erros.creci = "CRECI é obrigatório para corretores";
  }

  if (
    (dados.userType === "imobiliaria" || dados.userType === "incorporadora") &&
    !dados.cnpj?.trim()
  ) {
    erros.cnpj = "CNPJ é obrigatório";
  }

  if (
    (dados.userType === "cliente" || dados.userType === "proprietario") &&
    !dados.cpf?.trim()
  ) {
    erros.cpf = "CPF é obrigatório";
  }

  return erros;
}

/**
 * Verifica se não há erros.
 */
export function semErros(erros: Record<string, string>): boolean {
  return Object.keys(erros).length === 0;
}

export default {
  validar: validarFormulario,
  semErros,
};
