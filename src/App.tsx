import React from "react";
import { LoadingProvider } from "./contexts/loadingContext";
import LoadingBar from "./components/common/LoadingBar";
import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./contexts/authContext";

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
