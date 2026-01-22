import Login from "../components/auth/login/Login";
import CorretorDashboard from "../components/dashboard/CorretorDashboard";
import GestorDashboard from "../components/dashboard/GestorDashboard";
import { useAuth } from "../contexts/authContext";

const AppRouter: React.FC = () => {
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
export default AppRouter;
