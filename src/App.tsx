import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import Login from "./components/auth/Login";
import LoadingBar from "./components/common/LoadingBar";
import CorretorDashboard from "./components/dashboard/CorretorDashboard";

// Dashboard temporário para Gestor
const GestorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "2rem" 
      }}>
        <div>
          <h1 style={{ color: "#2563eb", margin: "0 0 0.5rem 0" }}>
            📊 Área do Gestor
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Bem-vindo, <strong>{user?.name}</strong>! ({user?.email})
          </p>
        </div>
        <button 
          onClick={logout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer"
          }}
        >
          🚪 Sair
        </button>
      </div>
      <p>Dashboard do Gestor em desenvolvimento...</p>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return user?.type === "corretor" ? <CorretorDashboard /> : <GestorDashboard />;
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