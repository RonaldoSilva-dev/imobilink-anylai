/**
 * @file Register.tsx
 * @description Componente de registro otimizado e corrigido.
 */

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useFormularioRegistro } from "../../Logica/Hooks/useFormularioRegistro";

import {
  TipoUsuario,
  OPCOES_PERFIL,
  OPCOES_EXPERIENCIA,
  NivelExperiencia,
} from "../../Tipos/Registro/TiposRegistro";

interface IRegisterProps {
  onBack: () => void;
}

const Register: React.FC<IRegisterProps> = ({ onBack }) => {
  const { register } = useAuth();
  const { loading: authLoading } = useLoading();

  const { dados, erros, atualizarCampo, validar, enviado, setEnviado } =
    useFormularioRegistro();

  const [success, setSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    userType: TipoUsuario;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Primeiro validamos localmente
    if (!validar()) return;

    // Ativamos o estado de envio ANTES do try/catch
    setEnviado(true);

    try {
      // Limpeza de dados: Remove strings vazias de campos opcionais
      const formatarCampoOpcional = (valor?: string) =>
        valor?.trim() === "" ? undefined : valor;

      const dadosParaEnviar = {
        name: dados.name.trim(),
        email: dados.email.trim().toLowerCase(),
        password: dados.password,
        confirmPassword: dados.confirmPassword,
        userType: dados.userType,
        phone: formatarCampoOpcional(dados.phone),
        experience:
          dados.userType === TipoUsuario.CORRETOR
            ? dados.experience
            : undefined,
        creci: formatarCampoOpcional(dados.creci),
        cnpj: formatarCampoOpcional(dados.cnpj),
        cpf: formatarCampoOpcional(dados.cpf),
        companyName: formatarCampoOpcional(dados.companyName),
        acceptTerms: dados.acceptTerms,
      };

      const result = await register(dadosParaEnviar);

      if (result?.success) {
        setRegisteredUser({
          name: dados.name,
          userType: dados.userType,
        });
        setSuccess(true);
      } else {
        // Se a API retornar erro, liberamos o botão para nova tentativa
        setEnviado(false);
        // O ideal aqui é que o hook ou um Toast mostre o erro retornado (result.error)
      }
    } catch (error) {
      setEnviado(false);
      console.error("Erro crítico ao registrar:", error);
    }
  };

  const renderCamposCondicionais = () => {
    // Verificação de segurança para o tipo de usuário
    if (!dados.userType) return null;

    return (
      <div className="mb-6 space-y-4">
        {/* CORRETOR */}
        {dados.userType === TipoUsuario.CORRETOR && (
          <>
            <div className="mb-4">
              {/* O htmlFor deve ser igual ao id do select */}
              <label
                htmlFor="experience-select"
                className="block text-gray-700 font-medium mb-2"
              >
                Experiência no Mercado
              </label>

              <select
                id="experience-select" // Adicione o ID aqui
                value={dados.experience || ""}
                onChange={(e) =>
                  atualizarCampo(
                    "experience",
                    e.target.value as NivelExperiencia,
                  )
                }
                className={`w-full p-3 border rounded-lg bg-white text-black transition-all ${
                  erros.experience ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione sua experiência</option>
                {OPCOES_EXPERIENCIA.map((opcao) => (
                  <option key={opcao.valor} value={opcao.valor}>
                    {opcao.texto}
                  </option>
                ))}
              </select>
              {erros.experience && (
                <p className="text-red-600 text-sm mt-1">{erros.experience}</p>
              )}
            </div>
            <Input
              label="Número do CRECI"
              value={dados.creci || ""}
              onChange={(value) => atualizarCampo("creci", value)}
              placeholder="Ex: 123456"
              error={erros.creci}
            />
          </>
        )}

        {/* EMPRESAS */}
        {(dados.userType === TipoUsuario.IMOBILIARIA ||
          dados.userType === TipoUsuario.INCORPORADORA) && (
          <>
            <Input
              label="CNPJ"
              value={dados.cnpj || ""}
              onChange={(value) => atualizarCampo("cnpj", value)}
              placeholder="00.000.000/0001-00"
              error={erros.cnpj}
            />
            <Input
              label="Razão Social"
              value={dados.companyName || ""}
              onChange={(value) => atualizarCampo("companyName", value)}
              placeholder="Nome da empresa"
              error={erros.companyName}
            />
          </>
        )}

        {/* PESSOA FÍSICA */}
        {(dados.userType === TipoUsuario.CLIENTE ||
          dados.userType === TipoUsuario.PROPRIETARIO) && (
          <Input
            label="CPF"
            value={dados.cpf || ""}
            onChange={(value) => atualizarCampo("cpf", value)}
            placeholder="000.000.000-00"
            error={erros.cpf}
          />
        )}
      </div>
    );
  };

  if (success && registeredUser) {
    const perfil = OPCOES_PERFIL.find(
      (o) => o.valor === registeredUser.userType,
    );

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-emerald-600 text-2xl font-bold mb-4">
            Conta Criada!
          </h2>
          <p className="text-gray-600 mb-6">
            Bem-vindo, <strong>{registeredUser.name}</strong>.
          </p>
          <div className="p-4 bg-emerald-50 rounded-lg mb-8 text-sm text-emerald-800">
            Conta de <strong>{perfil?.texto}</strong> ativada.
          </div>
          <Button
            onClick={() => window.location.reload()}
            variant="success"
            className="w-full"
          >
            Ir para Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🏠 Criar Conta</h1>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">
            Seu perfil
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {OPCOES_PERFIL.map((opcao) => (
              <button
                key={opcao.valor}
                type="button"
                onClick={() => atualizarCampo("userType", opcao.valor)}
                className={`p-3 rounded-lg border-2 text-sm transition-all ${
                  dados.userType === opcao.valor
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <strong>{opcao.texto}</strong>
              </button>
            ))}
          </div>
          {erros.userType && (
            <p className="text-red-600 text-sm mt-2">{erros.userType}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={dados.name}
            onChange={(v) => atualizarCampo("name", v)}
            error={erros.name}
            required
          />
          <Input
            label="Email"
            type="email"
            value={dados.email}
            onChange={(v) => atualizarCampo("email", v)}
            error={erros.email}
            required
          />

          {renderCamposCondicionais()}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Senha"
              type="password"
              value={dados.password}
              onChange={(v) => atualizarCampo("password", v)}
              error={erros.password}
              required
            />
            <Input
              label="Confirmar"
              type="password"
              value={dados.confirmPassword}
              onChange={(v) => atualizarCampo("confirmPassword", v)}
              error={erros.confirmPassword}
              required
            />
          </div>

          <label className="flex items-start gap-2 py-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dados.acceptTerms || false}
              onChange={(e) => atualizarCampo("acceptTerms", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-xs text-gray-600">
              Li e aceito os{" "}
              <a href="#" className="text-blue-600 underline">
                Termos de Uso
              </a>
              .
            </span>
          </label>
          {erros.acceptTerms && (
            <p className="text-red-600 text-xs">{erros.acceptTerms}</p>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              loading={enviado || authLoading}
              disabled={enviado || authLoading}
              className="flex-[2]"
            >
              Criar Conta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
