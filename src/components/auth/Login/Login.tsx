import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { useLoading } from "../../../contexts/loadingContext";
import Register from "../register/Register";
import LoginHeader from "./LoginHeader";
import LoginTabs from "./LoginTabs";
import UserTypeTabs from "./UserTypeTabs";
import LoginForm from "./LoginForm";
import { AuthTab, LoginErrors, UserType } from "../../../types/authTypes";

const Login: React.FC = () => {
  const { login } = useAuth();
  const { loading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("corretor");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

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

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
    clearErrors();
  };

  // Se estiver na aba de registro, mostrar o componente Register
  if (activeTab === "register") {
    return <Register onBack={() => handleTabChange("login")} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <LoginHeader />
        <LoginTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <UserTypeTabs userType={userType} onUserTypeChange={setUserType} />
        <LoginForm
          email={email}
          password={password}
          errors={errors}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onClearErrors={clearErrors}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
