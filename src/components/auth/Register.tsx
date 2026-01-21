// Cria um wrapper para o componente de registro, facilitando a importação em outras partes da aplicação.
export { default } from "./Register/index";

// Explicação:
// export { default } = "Exporte o default do módulo"

// from "./Register/index" = "Do arquivo index.tsx dentro da pasta Register"

// Resultado: Quando você importar Register.tsx, na verdade está importando Register/index.tsx
