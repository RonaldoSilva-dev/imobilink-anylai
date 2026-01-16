/**
 * @file Register.tsx
 * @description Componente de registro que utiliza o hook useFormularioRegistro
 * para gerenciamento de estado, validação e formatação do formulário.
 * Componente principal da funcionalidade de cadastro de usuários.
 *
 * @version 2.0.0
 * @since 2024
 */

import React, { useState } from "react";

// Contextos para autenticação e estado de carregamento
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";

// Componentes de UI reutilizáveis
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

// Hook personalizado para gerenciamento do formulário
import { useFormularioRegistro } from "../../Logica/Hooks/useFormularioRegistro";

// Tipos e enums para tipagem segura
import {
  TipoUsuario,
  NivelExperiencia,
} from "../../Tipos/Registro/TiposRegistro";

/**
 * Interface que define as propriedades do componente Register
 * @interface RegisterProps
 * @property {() => void} onBack - Função callback executada ao clicar no botão "Voltar"
 */
interface RegisterProps {
  onBack: () => void;
}

/**
 * Componente principal de registro de usuários
 * Gerencia todo o fluxo de criação de conta, desde a coleta de dados
 * até a confirmação de sucesso do cadastro.
 *
 * @component
 * @param {RegisterProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de registro renderizado
 *
 * @example
 * <Register onBack={() => navigate('/login')} />
 */
const Register: React.FC<RegisterProps> = ({ onBack }) => {
  // 🔧 CONTEXTOS
  /**
   * Função de registro do contexto de autenticação
   * Responsável por enviar os dados para a API
   * @type {Function}
   */
  const { register } = useAuth();

  /**
   * Estado de carregamento global da aplicação
   * @type {boolean}
   */
  const { loading } = useLoading();

  // 📝 HOOK PERSONALIZADO PARA FORMULÁRIO
  /**
   * Hook personalizado que gerencia todo o estado do formulário
   * Inclui dados, erros, validação e funções de atualização
   * @type {Object}
   * @property {IFormularioRegistro} dados - Dados atuais do formulário
   * @property {Record<string, string>} erros - Erros de validação por campo
   * @property {Function} atualizarCampo - Atualiza um campo específico
   * @property {Function} validar - Valida todos os campos do formulário
   * @property {boolean} enviado - Indica se o formulário foi submetido
   * @property {Function} setEnviado - Altera o estado de envio
   */
  const { dados, erros, atualizarCampo, validar, enviado, setEnviado } =
    useFormularioRegistro();

  // 📊 ESTADOS LOCAIS DO COMPONENTE
  /**
   * Estado que controla se o registro foi bem-sucedido
   * @type {boolean}
   */
  const [success, setSuccess] = useState(false);

  /**
   * Estado que armazena os dados do usuário após registro bem-sucedido
   * @type {{name: string, userType: TipoUsuario} | null}
   */
  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    userType: TipoUsuario;
  } | null>(null);

  // 🎛️ HANDLERS E FUNÇÕES

  /**
   * Processa o envio do formulário de registro
   * Valida os dados usando o hook e envia para a API
   *
   * @async
   * @param {React.FormEvent} e - Evento de submit do formulário
   * @returns {Promise<void>}
   *
   * @throws {Error} Se ocorrer um erro durante o registro
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(false);

    // Valida o formulário usando a função do hook
    if (validar()) {
      setEnviado(true);

      try {
        // Envia os dados para a API através do contexto de autenticação
        const result = await register(dados);

        if (result.success) {
          // Registro bem-sucedido - atualiza estados
          setRegisteredUser({
            name: dados.name,
            userType: dados.userType,
          });
          setSuccess(true);
        } else {
          // Registro falhou - reativa o formulário
          setEnviado(false);
          // Em produção, aqui seria tratado o erro de forma específica
        }
      } catch (error) {
        setEnviado(false);
        console.error("Erro ao registrar:", error);
      }
    }
  };

  /**
   * Renderiza campos condicionais baseados no tipo de usuário selecionado
   * Cada tipo de usuário tem campos específicos obrigatórios
   *
   * @returns {JSX.Element | null} Campos condicionais ou null se não houver
   */
  const renderCampoCondicional = () => {
    // Apenas corretores têm campo de experiência
    if (dados.userType === TipoUsuario.CORRETOR) {
      return (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Experiência no Mercado
          </label>
          <select
            value={dados.experience || ""}
            onChange={(e) =>
              atualizarCampo("experience", e.target.value as NivelExperiencia)
            }
            className={`w-full p-3 border rounded-lg bg-white text-black ${
              erros.experience
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            } focus:outline-none focus:ring-2 focus:border-blue-500 transition-colors`}
          >
            <option value="">Selecione sua experiência</option>
            <option value="less-1">Menos de 1 ano</option>
            <option value="1-3">1-3 anos</option>
            <option value="3-5">3-5 anos</option>
            <option value="5-10">5-10 anos</option>
            <option value="more-10">Mais de 10 anos</option>
          </select>
          {erros.experience && (
            <p className="text-red-600 text-sm mt-1">{erros.experience}</p>
          )}
        </div>
      );
    }

    return null;
  };

  // 🎉 RENDERIZAÇÃO CONDICIONAL - TELA DE SUCESSO
  /**
   * Exibe tela de confirmação após registro bem-sucedido
   * Substitui o formulário por uma mensagem de sucesso
   */
  if (success && registeredUser) {
    const tipoTexto =
      registeredUser.userType === TipoUsuario.CORRETOR ? "Corretor" : "Gestor";

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-emerald-600 text-2xl font-bold mb-4">
            Conta Criada com Sucesso!
          </h2>
          <p className="text-gray-500 mb-8">
            Bem-vindo(a) ao Dlogg LinkImobili,{" "}
            <strong className="font-semibold">{registeredUser.name}</strong>!
          </p>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg mb-8">
            <p className="text-emerald-800 text-sm m-0">
              ✅ Sua conta como{" "}
              <strong className="font-bold">{tipoTexto}</strong> foi criada com
              sucesso!
            </p>
          </div>

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
  /**
   * Renderiza o formulário principal de registro
   * Inclui todos os campos necessários e validação em tempo real
   */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* CABEÇALHO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏠 Criar Conta
          </h1>
          <p className="text-gray-600">Junte-se à nossa rede imobiliária</p>
        </div>

        {/* SELEÇÃO DE TIPO DE USUÁRIO */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-2 rounded-lg">
          <button
            type="button"
            onClick={() => atualizarCampo("userType", TipoUsuario.CORRETOR)}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              dados.userType === TipoUsuario.CORRETOR
                ? "bg-blue-600 text-white shadow-md"
                : "bg-transparent text-gray-500 hover:bg-gray-200"
            }`}
          >
            👨‍💼 Sou Corretor
          </button>

          <button
            type="button"
            onClick={() => atualizarCampo("userType", TipoUsuario.GESTOR)}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              dados.userType === TipoUsuario.GESTOR
                ? "bg-blue-600 text-white shadow-md"
                : "bg-transparent text-gray-500 hover:bg-gray-200"
            }`}
          >
            👩‍💼 Sou Gestor
          </button>
        </div>

        {/* FORMULÁRIO PRINCIPAL */}
        <form onSubmit={handleSubmit}>
          {/* SEÇÃO: INFORMAÇÕES PESSOAIS */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-4">
              Informações Pessoais
            </h3>

            <Input
              label="Nome Completo"
              value={dados.name}
              onChange={(value) => atualizarCampo("name", value)}
              placeholder="Seu nome completo"
              required
              error={erros.name}
              className="mb-4"
            />

            <Input
              label="Email"
              type="email"
              value={dados.email}
              onChange={(value) => atualizarCampo("email", value)}
              placeholder="seu@email.com"
              required
              error={erros.email}
              className="mb-4"
            />

            <Input
              label="Telefone"
              value={dados.phone || ""}
              onChange={(value) => atualizarCampo("phone", value)}
              placeholder="(11) 99999-9999"
              error={erros.phone}
              className="mb-4"
            />

            {/* CAMPOS CONDICIONAIS */}
            {renderCampoCondicional()}
          </div>

          {/* SEÇÃO: SEGURANÇA */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-4">Segurança</h3>

            <Input
              label="Senha"
              type="password"
              value={dados.password}
              onChange={(value) => atualizarCampo("password", value)}
              placeholder="Crie uma senha forte"
              required
              error={erros.password}
              className="mb-4"
            />

            <Input
              label="Confirmar Senha"
              type="password"
              value={dados.confirmPassword}
              onChange={(value) => atualizarCampo("confirmPassword", value)}
              placeholder="Digite a senha novamente"
              required
              error={erros.confirmPassword}
              className="mb-4"
            />

            {/* DICAS DE SEGURANÇA */}
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

          {/* BOTÕES DE AÇÃO */}
          <div className="flex gap-4 mb-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="flex-1 hover:bg-gray-200 transition-colors"
            >
              ← Voltar
            </Button>

            <Button
              type="submit"
              loading={enviado || loading}
              className="flex-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all"
            >
              {enviado || loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </div>

          {/* TERMOS E CONDIÇÕES */}
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

/**
 * Exportação padrão do componente Register
 * @default
 */
export default Register;
