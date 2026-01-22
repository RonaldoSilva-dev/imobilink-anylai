// Cria um componente de tela de sucesso para exibir uma mensagem após o registro bem-sucedido do usuário.
import { SuccessData } from "../../../types/registerTypes";
import Button from "../../common/Button";

interface SuccessScreenProps {
  userData: SuccessData;
}

const SuccessScreen = ({ userData }: SuccessScreenProps) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg w-full max-w-md text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-emerald-600 text-2xl font-semibold mb-4">
        Conta Criada com Sucesso!
      </h2>
      <p className="text-gray-500 mb-8">
        Bem-vindo(a) a Imobilink-Anylai,{" "}
        <strong className="text-gray-700">{userData.name}</strong>!
      </p>
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg mb-8">
        <p className="text-emerald-800 text-sm">
          ✅ Sua conta como{" "}
          <strong className="font-semibold">
            {userData.userType === "corretor" ? "Corretor" : "Gestor"}
          </strong>{" "}
          foi criada com sucesso!
        </p>
      </div>
      <Button
        onClick={() => window.location.reload()}
        variant="success"
        className="w-full"
      >
        Continuar para o Dashboard
      </Button>
    </div>
  </div>
);

export default SuccessScreen;
