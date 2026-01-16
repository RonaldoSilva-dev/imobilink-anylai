import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "corretor" | "gestor";
  phone?: string;
  experience?: string;
}

interface RegisterProps {
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const { register } = useAuth();
  const { loading } = useLoading();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "corretor",
    phone: "",
    experience: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    userType: string;
  } | null>(null);

  const handleChange = (field: keyof RegisterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (formData.phone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Telefone inválido (use: (11) 99999-9999)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    const result = await register(formData);

    if (result.success) {
      setRegisteredUser({
        name: formData.name,
        userType: formData.userType,
      });
      setSuccess(true);
    } else {
      setErrors({ general: result.error || "Erro ao criar conta" });
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  if (success && registeredUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "3rem 2rem",
            borderRadius: "1rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ color: "#10b981", margin: "0 0 1rem 0" }}>
            Conta Criada com Sucesso!
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
            Bem-vindo(a) ao Dlogg LinkImobili,{" "}
            <strong>{registeredUser.name}</strong>!
          </p>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <p style={{ color: "#065f46", margin: 0, fontSize: "0.875rem" }}>
              ✅ Sua conta como{" "}
              <strong>
                {registeredUser.userType === "corretor" ? "Corretor" : "Gestor"}
              </strong>{" "}
              foi criada com sucesso!
            </p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            variant="success"
            style={{ width: "100%" }}
          >
            Continuar para o Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
            🏠 Criar Conta
          </h1>
          <p style={{ color: "#666", margin: 0 }}>
            Junte-se à nossa rede imobiliária
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            backgroundColor: "#f3f4f6",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <button
            type="button"
            onClick={() => handleChange("userType", "corretor")}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor:
                formData.userType === "corretor" ? "#3b82f6" : "transparent",
              color: formData.userType === "corretor" ? "white" : "#6b7280",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            👨‍💼 Sou Corretor
          </button>
          <button
            type="button"
            onClick={() => handleChange("userType", "gestor")}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor:
                formData.userType === "gestor" ? "#3b82f6" : "transparent",
              color: formData.userType === "gestor" ? "white" : "#6b7280",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            👩‍💼 Sou Gestor
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                color: "#374151",
                margin: "0 0 1rem 0",
                fontSize: "1rem",
              }}
            >
              Informações Pessoais
            </h3>

            <Input
              label="Nome Completo"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Seu nome completo"
              required
              error={errors.name}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="seu@email.com"
              required
              error={errors.email}
            />

            <Input
              label="Telefone"
              value={formData.phone || ""}
              onChange={(value) => handleChange("phone", formatPhone(value))}
              placeholder="(11) 99999-9999"
              error={errors.phone}
            />

            {formData.userType === "corretor" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Experiência no Mercado
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: errors.experience
                      ? "1px solid #ef4444"
                      : "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontSize: "1rem",
                  }}
                >
                  <option value="">Selecione sua experiência</option>
                  <option value="less-1">Menos de 1 ano</option>
                  <option value="1-3">1-3 anos</option>
                  <option value="3-5">3-5 anos</option>
                  <option value="5-10">5-10 anos</option>
                  <option value="more-10">Mais de 10 anos</option>
                </select>
                {errors.experience && (
                  <p
                    style={{
                      color: "#ef4444",
                      fontSize: "0.875rem",
                      margin: "0.25rem 0 0 0",
                    }}
                  >
                    {errors.experience}
                  </p>
                )}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                color: "#374151",
                margin: "0 0 1rem 0",
                fontSize: "1rem",
              }}
            >
              Segurança
            </h3>

            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
              placeholder="Crie uma senha forte"
              required
              error={errors.password}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleChange("confirmPassword", value)}
              placeholder="Digite a senha novamente"
              required
              error={errors.confirmPassword}
            />

            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                fontSize: "0.75rem",
                color: "#64748b",
              }}
            >
              <strong>Dicas para senha segura:</strong>
              <ul style={{ margin: "0.5rem 0 0 0", paddingLeft: "1rem" }}>
                <li>Pelo menos 6 caracteres</li>
                <li>Letras maiúsculas e minúsculas</li>
                <li>Pelo menos um número</li>
              </ul>
            </div>
          </div>

          {errors.general && (
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "0.375rem",
                color: "#dc2626",
                marginBottom: "1rem",
                fontSize: "0.875rem",
              }}
            >
              {errors.general}
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              style={{ flex: 1 }}
            >
              ← Voltar
            </Button>
            <Button type="submit" loading={loading} style={{ flex: 2 }}>
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            Ao criar uma conta, você concorda com nossos{" "}
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>
              Política de Privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
