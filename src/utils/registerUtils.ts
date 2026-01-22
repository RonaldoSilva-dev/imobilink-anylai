// Cria um arquivo de utilitários TypeScript para o componente de registro, incluindo funções de validação e formatação.

import { FormErrors, RegisterFormData } from "../types/registerTypes";

export const validateForm = (formData: RegisterFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Nome completo é obrigatório";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Nome deve ter pelo menos 2 caracteres";
  }

  if (!formData.email) {
    errors.email = "Email é obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email inválido";
  }

  if (!formData.password) {
    errors.password = "Senha é obrigatória";
  } else if (formData.password.length < 6) {
    errors.password = "Senha deve ter pelo menos 6 caracteres";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirme sua senha";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem";
  }

  if (formData.phone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.phone)) {
    errors.phone = "Telefone inválido (use: (11) 99999-9999)";
  }

  return errors;
};

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
};
