import React from "react";
import { AuthProvider } from "./contexts/authContext";
import { LoadingProvider } from "./contexts/loadingContext";
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
