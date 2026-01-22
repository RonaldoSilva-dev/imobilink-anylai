// Cria um arquivo de tipos TypeScript para o componente de registro, definindo as interfaces e tipos necessários.
export type UserType = "corretor" | "gestor";
export type ExperienceLevel =
  | "less-1"
  | "1-3"
  | "3-5"
  | "5-10"
  | "more-10"
  | "";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  phone?: string;
  experience?: ExperienceLevel;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SuccessData {
  name: string;
  userType: UserType;
}

export interface RegisterProps {
  onBack: () => void;
}
