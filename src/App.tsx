import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import Login from "./components/auth/Login";
import LoadingBar from "./components/common/LoadingBar";
import CorretorDashboard from "./components/dashboard/CorretorDashboard";

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return user?.type === "corretor" ? (
    <CorretorDashboard />
  ) : (
    <GestorDashboard />
  );
};

// ✅ CORREÇÃO: Exportar como default
const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <LoadingBar />
        <AppContent />
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
