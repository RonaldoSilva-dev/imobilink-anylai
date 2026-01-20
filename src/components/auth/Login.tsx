import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Register from "./Register";

const Login: React.FC = () => {
  const { login } = useAuth();
  const { loading } = useLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"corretor" | "gestor">("corretor");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = await login(email, password, userType);

    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  // Função utilitária para classes condicionais
  const getTabClass = (tab: "login" | "register") => {
    const baseClass =
      "flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200";
    if (activeTab === tab) {
      return `${baseClass} bg-blue-500 text-white`;
    }
    return `${baseClass} text-gray-500 hover:text-gray-700`;
  };

  const getUserTypeClass = (type: "corretor" | "gestor") => {
    const baseClass =
      "flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200";
    if (userType === type) {
      return `${baseClass} bg-blue-500 text-white`;
    }
    return `${baseClass} text-gray-500 hover:text-gray-700`;
  };

  // Se estiver na aba de registro, mostrar o componente Register
  if (activeTab === "register") {
    return <Register onBack={() => setActiveTab("login")} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🏠 Imobilink-Anylai
          </h1>
          <p className="text-gray-600">Sua rede imobiliária inteligente</p>
        </div>

        {/* Tabs Login/Registro */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              clearErrors();
            }}
            className={getTabClass("login")}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              clearErrors();
            }}
            className={getTabClass("register")}
          >
            Cadastrar
          </button>
        </div>

        {/* Seletor de Tipo de Usuário */}
        <div className="flex gap-2 bg-gray-100 p-2 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setUserType("corretor")}
            className={getUserTypeClass("corretor")}
          >
            👨‍💼 Corretor
          </button>
          <button
            type="button"
            onClick={() => setUserType("gestor")}
            className={getUserTypeClass("gestor")}
          >
            👩‍💼 Gestor
          </button>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
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
            onChange={(value) => {
              setPassword(value);
              clearErrors();
            }}
            placeholder="Sua senha"
            required
            error={errors.password}
          />

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm mb-4">
              {errors.general}
            </div>
          )}

          <div className="text-sm text-gray-500 mb-4">
            <strong>Demo:</strong> Use "corretor@exemplo.com" ou
            "gestor@exemplo.com" com senha "123456"
          </div>

          <Button type="submit" loading={loading} className="w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
