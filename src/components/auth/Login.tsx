import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useLoading } from "../../contexts/LoadingContext"
import Input from "../../components/common/Input"
import Button from "../../components/common/Button"
import Register from "./Register"

const Login: React.FC = () => {
  const { login } = useAuth()
  const { loading } = useLoading()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"corretor" | "gestor">("corretor")
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = await login(email, password, userType)
    
    if (!result.success) {
      setErrors({ general: result.error })
    }
  }

  const clearErrors = () => {
    setErrors({})
  }

  // Se estiver na aba de registro, mostrar o componente Register
  if (activeTab === "register") {
    return <Register onBack={() => setActiveTab("login")} />
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
            🏠 Dlogg Linkimobili
          </h1>
          <p style={{ color: "#666", margin: 0 }}>
            Sua rede imobiliária inteligente
          </p>
        </div>

        {/* Tabs Login/Registro */}
        <div style={{ 
          display: "flex", 
          marginBottom: "1.5rem",
          backgroundColor: "#f3f4f6",
          padding: "0.25rem",
          borderRadius: "0.5rem"
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab("login"); clearErrors() }}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: activeTab === "login" ? "#3b82f6" : "transparent",
              color: activeTab === "login" ? "white" : "#6b7280",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("register"); clearErrors() }}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: activeTab === "register" ? "#3b82f6" : "transparent",
              color: activeTab === "register" ? "white" : "#6b7280",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            Cadastrar
          </button>
        </div>

        {/* Seletor de Tipo de Usuário */}
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          marginBottom: "1.5rem",
          backgroundColor: "#f3f4f6",
          padding: "0.5rem",
          borderRadius: "0.5rem"
        }}>
          <button
            type="button"
            onClick={() => setUserType("corretor")}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: userType === "corretor" ? "#3b82f6" : "transparent",
              color: userType === "corretor" ? "white" : "#6b7280",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            👨‍💼 Corretor
          </button>
          <button
            type="button"
            onClick={() => setUserType("gestor")}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: userType === "gestor" ? "#3b82f6" : "transparent",
              color: userType === "gestor" ? "white" : "#6b7280",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
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
            onChange={(value) => { setEmail(value); clearErrors() }}
            placeholder="seu@email.com"
            required
            error={errors.email}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(value) => { setPassword(value); clearErrors() }}
            placeholder="Sua senha"
            required
            error={errors.password}
          />

          {errors.general && (
            <div style={{
              padding: "0.75rem",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "0.375rem",
              color: "#dc2626",
              marginBottom: "1rem",
              fontSize: "0.875rem"
            }}>
              {errors.general}
            </div>
          )}

          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
            <strong>Demo:</strong> Use "corretor@exemplo.com" ou "gestor@exemplo.com" com senha "123456"
          </div>

          <Button
            type="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login