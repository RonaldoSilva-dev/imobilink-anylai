// 📦 IMPORTAÇÕES
// React e hooks para gerenciamento de estado
import React, { useState } from "react";

// Contextos para autenticação e estado de carregamento
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";

// Componentes reutilizáveis de UI
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

// 🏷️ INTERFACES DE TIPOS
/**
 * Interface que define a estrutura dos dados do formulário de registro
 * @interface RegisterData
 */
interface RegisterData {
  name: string; // Nome completo do usuário
  email: string; // Email para login
  password: string; // Senha do usuário
  confirmPassword: string; // Confirmação da senha
  userType: "corretor" | "gestor"; // Tipo de usuário (enum restrito)
  phone?: string; // Telefone (opcional)
  experience?: string; // Experiência profissional (apenas para corretores)
}

/**
 * Props do componente Register
 * @interface RegisterProps
 */
interface RegisterProps {
  onBack: () => void; // Função callback para voltar à tela anterior
}

// 🎯 COMPONENTE PRINCIPAL
/**
 * Componente de registro para a plataforma Dlogg LinkImobili
 * Permite que corretores e gestores criem uma conta com validação completa
 * @component
 * @param {RegisterProps} props - Props do componente
 * @returns {JSX.Element} Componente de registro
 */
const Register: React.FC<RegisterProps> = ({ onBack }) => {
  // 🔧 CONTEXTOS E HOOKS
  const { register } = useAuth(); // Função de registro do contexto de autenticação
  const { loading } = useLoading(); // Estado de carregamento global

  // 📝 ESTADOS DO COMPONENTE

  /**
   * Estado que armazena os dados do formulário
   * @type {RegisterData}
   */
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "corretor", // Valor padrão: corretor
    phone: "",
    experience: "",
  });

  /**
   * Estado que armazena erros de validação por campo
   * @type {{ [key: string]: string }}
   */
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /**
   * Estado que controla se o registro foi bem-sucedido
   * @type {boolean}
   */
  const [success, setSuccess] = useState(false);

  /**
   * Estado que armazena dados do usuário após registro bem-sucedido
   * @type {{ name: string, userType: string } | null}
   */
  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    userType: string;
  } | null>(null);

  // 🎛️ HANDLERS E FUNÇÕES UTILITÁRIAS

  /**
   * Atualiza um campo específico do formulário e limpa seu erro associado
   * @param {keyof RegisterData} field - Campo a ser atualizado
   * @param {string} value - Novo valor do campo
   */
  const handleChange = (field: keyof RegisterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpa erro do campo se existir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  /**
   * Valida todos os campos do formulário
   * @returns {boolean} True se o formulário for válido, false caso contrário
   */
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação do email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validação da confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    // Validação do telefone (formato brasileiro)
    if (formData.phone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Telefone inválido (use: (11) 99999-9999)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Processa o envio do formulário de registro
   * @param {React.FormEvent} e - Evento de submit do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    // Valida o formulário antes de enviar
    if (!validateForm()) {
      return;
    }

    // Chama a função de registro do contexto
    const result = await register(formData);

    if (result.success) {
      // Registro bem-sucedido
      setRegisteredUser({
        name: formData.name,
        userType: formData.userType,
      });
      setSuccess(true);
    } else {
      // Registro falhou
      setErrors({ general: result.error || "Erro ao criar conta" });
    }
  };

  /**
   * Formata o número de telefone no padrão brasileiro
   * @param {string} value - Valor do telefone sem formatação
   * @returns {string} Telefone formatado
   */
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      // Formato para telefone fixo: (11) 9999-9999
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      // Formato para celular: (11) 99999-9999
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  // 🎉 RENDERIZAÇÃO CONDICIONAL - TELA DE SUCESSO
  /**
   * Exibe tela de confirmação após registro bem-sucedido
   */
  if (success && registeredUser) {
    return (
      // 🔲 CONTAINER PRINCIPAL
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        {/* 🎨 CARD DE SUCESSO */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md text-center">
          {/* 🎊 ÍCONE DE CELEBRAÇÃO */}
          <div className="text-6xl mb-4">🎉</div>

          {/* 📝 TÍTULO E MENSAGEM */}
          <h2 className="text-emerald-600 text-2xl font-bold mb-4">
            Conta Criada com Sucesso!
          </h2>
          <p className="text-gray-500 mb-8">
            Bem-vindo(a) ao Dlogg LinkImobili,{" "}
            <strong className="font-semibold">{registeredUser.name}</strong>!
          </p>

          {/* ✅ BADGE DE CONFIRMAÇÃO */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg mb-8">
            <p className="text-emerald-800 text-sm m-0">
              ✅ Sua conta como{" "}
              <strong className="font-bold">
                {registeredUser.userType === "corretor" ? "Corretor" : "Gestor"}
              </strong>{" "}
              foi criada com sucesso!
            </p>
          </div>

          {/* 🚀 BOTÃO DE AÇÃO */}
          <Button
            onClick={() => window.location.reload()}
            variant="success"
            className="w-full hover:scale-105 transition-transform duration-200"
          >
            Continuar para o Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // 📋 RENDERIZAÇÃO PRINCIPAL - FORMULÁRIO DE CADASTRO
  return (
    // 🖼️ CONTAINER PRINCIPAL (Layout com Tailwind)
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 🎴 CARD DO FORMULÁRIO */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* 🏷️ CABEÇALHO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏠 Criar Conta
          </h1>
          <p className="text-gray-600">Junte-se à nossa rede imobiliária</p>
        </div>

        {/* 👥 SELEÇÃO DE TIPO DE USUÁRIO */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-2 rounded-lg">
          {/* BOTÃO CORRETOR */}
          <button
            type="button"
            onClick={() => handleChange("userType", "corretor")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              formData.userType === "corretor"
                ? "bg-blue-600 text-white shadow-md" // Estilo ativo
                : "bg-transparent text-gray-500 hover:bg-gray-200" // Estilo inativo
            }`}
          >
            👨‍💼 Sou Corretor
          </button>

          {/* BOTÃO GESTOR */}
          <button
            type="button"
            onClick={() => handleChange("userType", "gestor")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              formData.userType === "gestor"
                ? "bg-blue-600 text-white shadow-md" // Estilo ativo
                : "bg-transparent text-gray-500 hover:bg-gray-200" // Estilo inativo
            }`}
          >
            👩‍💼 Sou Gestor
          </button>
        </div>

        {/* 📝 FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          {/* 👤 SEÇÃO: INFORMAÇÕES PESSOAIS */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-4">
              Informações Pessoais
            </h3>

            {/* CAMPO NOME */}
            <Input
              label="Nome Completo"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Seu nome completo"
              required
              error={errors.name}
              className="mb-4"
            />

            {/* CAMPO EMAIL */}
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="seu@email.com"
              required
              error={errors.email}
              className="mb-4"
            />

            {/* CAMPO TELEFONE */}
            <Input
              label="Telefone"
              value={formData.phone || ""}
              onChange={(value) => handleChange("phone", formatPhone(value))}
              placeholder="(11) 99999-9999"
              error={errors.phone}
              className="mb-4"
            />

            {/* CAMPO CONDICIONAL: EXPERIÊNCIA (apenas para corretores) */}
            {formData.userType === "corretor" && (
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Experiência no Mercado
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className={`w-full p-3 border rounded-lg bg-white text-black ${
                    errors.experience
                      ? "border-red-500 focus:ring-red-200" // Estilo com erro
                      : "border-gray-300 focus:ring-blue-200" // Estilo normal
                  } focus:outline-none focus:ring-2 focus:border-blue-500 transition-colors`}
                >
                  <option value="">Selecione sua experiência</option>
                  <option value="less-1">Menos de 1 ano</option>
                  <option value="1-3">1-3 anos</option>
                  <option value="3-5">3-5 anos</option>
                  <option value="5-10">5-10 anos</option>
                  <option value="more-10">Mais de 10 anos</option>
                </select>
                {errors.experience && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 🔐 SEÇÃO: SEGURANÇA */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-4">Segurança</h3>

            {/* CAMPO SENHA */}
            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
              placeholder="Crie uma senha forte"
              required
              error={errors.password}
              className="mb-4"
            />

            {/* CAMPO CONFIRMAR SENHA */}
            <Input
              label="Confirmar Senha"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleChange("confirmPassword", value)}
              placeholder="Digite a senha novamente"
              required
              error={errors.confirmPassword}
              className="mb-4"
            />

            {/* 💡 DICAS DE SEGURANÇA */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800">
              <strong className="font-semibold">
                Dicas para senha segura:
              </strong>
              <ul className="mt-2 ml-4 list-disc">
                <li>Pelo menos 6 caracteres</li>
                <li>Letras maiúsculas e minúsculas</li>
                <li>Pelo menos um número</li>
              </ul>
            </div>
          </div>

          {/* ❌ MENSAGEM DE ERRO GERAL */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
              {errors.general}
            </div>
          )}

          {/* 🎛️ BOTÕES DE AÇÃO */}
          <div className="flex gap-4 mb-4">
            {/* BOTÃO VOLTAR */}
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="flex-1 hover:bg-gray-200 transition-colors"
            >
              ← Voltar
            </Button>

            {/* BOTÃO ENVIAR */}
            <Button
              type="submit"
              loading={loading}
              className="flex-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </div>

          {/* 📜 TERMOS E CONDIÇÕES */}
          <p className="text-center text-gray-500 text-sm">
            Ao criar uma conta, você concorda com nossos{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Termos de Uso
            </a>{" "}
            e{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Política de Privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
