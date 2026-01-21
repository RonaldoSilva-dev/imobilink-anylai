// Cria um formulário para coletar informações de segurança do usuário durante o registro, incluindo campos para senha e confirmação de senha, com dicas para criar uma senha segura.
import Input from "../../common/Input";
import { RegisterFormData, FormErrors } from "./types";

interface SecurityInfoFormProps {
  formData: RegisterFormData;
  errors: FormErrors;
  onFieldChange: (field: keyof RegisterFormData, value: string) => void;
}

const SecurityInfoForm = ({
  formData,
  errors,
  onFieldChange,
}: SecurityInfoFormProps) => (
  <div className="mb-6">
    <h3 className="text-gray-700 font-medium mb-4">Segurança</h3>

    <Input
      label="Senha"
      type="password"
      value={formData.password}
      onChange={(value) => onFieldChange("password", value)}
      placeholder="Crie uma senha forte"
      required
      error={errors.password}
      className="mb-4"
    />

    <Input
      label="Confirmar Senha"
      type="password"
      value={formData.confirmPassword}
      onChange={(value) => onFieldChange("confirmPassword", value)}
      placeholder="Digite a senha novamente"
      required
      error={errors.confirmPassword}
      className="mb-4"
    />

    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <p className="text-blue-800 font-medium text-sm mb-2">
        Dicas para senha segura:
      </p>
      <ul className="text-blue-700 text-sm space-y-1">
        <li>• Pelo menos 6 caracteres</li>
        <li>• Letras maiúsculas e minúsculas</li>
        <li>• Pelo menos um número</li>
      </ul>
    </div>
  </div>
);

export default SecurityInfoForm;
