// Cria o componente de registro de usuário com formulários, validação e feedback de sucesso.
import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { useLoading } from "../../../contexts/loadingContext";
import Button from "../../common/Button";
import RegisterHeader from "./RegisterHeader";
import PersonalInfoForm from "./PersonalInfoForm";
import SecurityInfoForm from "./SecurityInfoForm";
import SuccessScreen from "./SuccessScreen";
import TermsAndConditions from "./TermsAndConditions";
import UserTypeSelector from "../login/UserTypeTabs";
import {
  FormErrors,
  RegisterFormData,
  RegisterProps,
  SuccessData,
} from "../../../types/registerTypes";
import { formatPhone, validateForm } from "../../../utils/registerUtils";

const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const { register } = useAuth();
  const { loading } = useLoading();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "corretor",
    phone: "",
    experience: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<SuccessData | null>(
    null,
  );

  const handleChange = (
    field: keyof RegisterFormData | string,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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

  if (success && registeredUser) {
    return <SuccessScreen userData={registeredUser} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">
        <RegisterHeader />

        <UserTypeSelector
          userType={formData.userType}
          onUserTypeChange={(type) => handleChange("userType", type)}
        />

        <form onSubmit={handleSubmit}>
          <PersonalInfoForm
            formData={formData}
            errors={errors}
            onFieldChange={handleChange}
            formatPhone={formatPhone}
          />

          <SecurityInfoForm
            formData={formData}
            errors={errors}
            onFieldChange={handleChange}
          />

          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-6">
              {errors.general}
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="flex-1"
            >
              ← Voltar
            </Button>
            <Button type="submit" loading={loading} className="flex-2">
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </div>

          <TermsAndConditions />
        </form>
      </div>
    </div>
  );
};

export default Register;
