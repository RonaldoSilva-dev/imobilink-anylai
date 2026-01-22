// Cria um componente que exibe os termos e condições para o registro de usuários.
const TermsAndConditions = () => (
  <p className="text-center text-gray-500 text-sm">
    Ao criar uma conta, você concorda com nossos{" "}
    <a
      href="#"
      className="text-blue-500 hover:text-blue-600 hover:underline"
      aria-label="Termos de Uso"
    >
      Termos de Uso
    </a>{" "}
    e{" "}
    <a
      href="#"
      className="text-blue-500 hover:text-blue-600 hover:underline"
      aria-label="Política de Privacidade"
    >
      Política de Privacidade
    </a>
  </p>
);

export default TermsAndConditions;
