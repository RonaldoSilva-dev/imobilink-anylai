// Dashboard temporário para Gestor
import { useAuth } from "../../contexts/AuthContext";
const GestorDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-blue-600 text-2xl font-bold mb-2">
            📊 Área do Gestor
          </h1>
          <p className="text-gray-500">
            Bem-vindo(a), <strong>{user?.name}</strong>! ({user?.email})
          </p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 
                     transition-colors cursor-pointer"
        >
          🚪 Sair
        </button>
      </div>
      <p className="text-gray-700">Dashboard do Gestor em desenvolvimento...</p>
    </div>
  );
};
export default GestorDashboard;
