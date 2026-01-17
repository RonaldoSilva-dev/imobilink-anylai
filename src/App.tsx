import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import LoadingBar from "./components/common/LoadingBar";
import AppRouter from "./routers/AppRouter";

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <LoadingBar />
        <AppRouter />
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
