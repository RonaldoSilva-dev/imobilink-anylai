// Cria um formulário para coletar informações pessoais do usuário durante o registro, incluindo nome, email, telefone e experiência (se aplicável).
import Input from "../../common/Input";
import ExperienceSelect from "./ExperienceSelect";
import { RegisterFormData, FormErrors } from "./types";

interface PersonalInfoFormProps {
  formData: RegisterFormData;
  errors: FormErrors;
  onFieldChange: (field: keyof RegisterFormData, value: string) => void;
  formatPhone: (value: string) => string;
}

const PersonalInfoForm = ({
  formData,
  errors,
  onFieldChange,
  formatPhone,
}: PersonalInfoFormProps) => (
  <div className="mb-6">
    <h3 className="text-gray-700 font-medium mb-4">Informações Pessoais</h3>

    <Input
      label="Nome Completo"
      value={formData.name}
      onChange={(value) => onFieldChange("name", value)}
      placeholder="Seu nome completo"
      required
      error={errors.name}
      className="mb-4"
    />

    <Input
      label="Email"
      type="email"
      value={formData.email}
      onChange={(value) => onFieldChange("email", value)}
      placeholder="seu@email.com"
      required
      error={errors.email}
      className="mb-4"
    />

    <Input
      label="Telefone"
      value={formData.phone || ""}
      onChange={(value) => onFieldChange("phone", formatPhone(value))}
      placeholder="(11) 99999-9999"
      error={errors.phone}
      className="mb-4"
    />

    {formData.userType === "corretor" && (
      <ExperienceSelect
        value={formData.experience || ""}
        onChange={(value) => onFieldChange("experience", value)}
        error={errors.experience}
      />
    )}
  </div>
);

export default PersonalInfoForm;
