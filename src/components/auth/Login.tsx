import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";

// Componentes Reutilizáveis
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Register from "./Register";

// Tipos oficiais do projeto
import { TipoUsuario } from "../../Tipos/Registro/TiposRegistro";

const Login: React.FC = () => {
  const { login } = useAuth();
  const { loading: authLoading } = useLoading();

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<TipoUsuario>(TipoUsuario.CORRETOR);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // O método login deve esperar o TipoUsuario agora
      const result = await login(email, password, userType);

      if (!result.success) {
        setErrors({ general: result.error || "Falha na autenticação" });
      }
    } catch (error) {
      setErrors({ general: "Ocorreu um erro inesperado ao entrar." });
    }
  };

  const clearErrors = () => setErrors({});

  // Troca de tela para Registro
  if (activeTab === "register") {
    return <Register onBack={() => setActiveTab("login")} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* CABEÇALHO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏠 Imobilink-Anylai
          </h1>
          <p className="text-gray-500">Sua rede imobiliária inteligente</p>
        </div>

        {/* NAVEGAÇÃO ENTRE LOGIN / CADASTRO */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              clearErrors();
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              activeTab === "login"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              clearErrors();
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              activeTab === "login"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* SELETOR DE PERFIL (Para Login) */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            type="button"
            onClick={() => setUserType(TipoUsuario.CORRETOR)}
            className={`py-3 rounded-lg border-2 transition-all ${
              userType === TipoUsuario.CORRETOR
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-transparent bg-gray-50 text-gray-500"
            }`}
          >
            👨‍💼 Corretor
          </button>
          <button
            type="button"
            onClick={() => setUserType(TipoUsuario.IMOBILIARIA)} // Ajustado para TipoUsuario
            className={`py-3 rounded-lg border-2 transition-all ${
              userType === TipoUsuario.IMOBILIARIA
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-transparent bg-gray-50 text-gray-500"
            }`}
          >
            🏢 Imobiliária
          </button>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(val) => {
              setEmail(val);
              clearErrors();
            }}
            placeholder="seu@email.com"
            required
            error={errors.email}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(val) => {
              setPassword(val);
              clearErrors();
            }}
            placeholder="Sua senha"
            required
            error={errors.password}
          />

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {errors.general}
            </div>
          )}

          {/* DICA DE DEMO */}
          <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded border border-dashed border-gray-200">
            <strong>Dica:</strong> Use o email correspondente ao perfil
            selecionado (senha: 123456).
          </div>

          <Button
            type="submit"
            loading={authLoading}
            className="w-full py-3"
            variant="primary" // Adicionado variant para consistência
          >
            {authLoading ? "Entrando..." : "Entrar na Conta"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
