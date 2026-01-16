// __testes__/teste-simples.js
console.log("🧪 Teste Simples dos Tipos (dentro de __testes__)\n");

const path = require("path");
const fs = require("fs");

// Caminho relativo: estamos em __testes__, subir um nível e entrar em src
const caminhoTipos = path.join(
  __dirname,
  "..",
  "src",
  "Tipos",
  "Registro",
  "TiposRegistro.ts",
);

console.log(`📁 Tentando importar de: ${caminhoTipos}`);

// Verificar se o arquivo existe
if (fs.existsSync(caminhoTipos)) {
  console.log("✅ Arquivo encontrado!");

  // Ler e mostrar um pouco do conteúdo
  const conteudo = fs.readFileSync(caminhoTipos, "utf8");
  console.log(`📄 Tamanho: ${conteudo.length} caracteres`);

  // Extrair primeiras linhas
  const primeirasLinhas = conteudo.split("\n").slice(0, 10).join("\n");
  console.log("\n📝 Primeiras 10 linhas:");
  console.log(primeirasLinhas);

  // Tentar importar dinamicamente
  try {
    // Usar require com caminho absoluto
    const tipos = require(
      path.join(__dirname, "..", "src", "Tipos", "Registro", "TiposRegistro"),
    );
    console.log("\n🎉 IMPORT BEM SUCEDIDO!");
    console.log("TipoUsuario:", tipos.TipoUsuario);
  } catch (error) {
    console.error("\n❌ ERRO ao importar:", error.message);
    console.log(
      "\n💡 Possível solução: O arquivo pode não estar exportando como CommonJS",
    );

    // Verificar se é ES module
    if (conteudo.includes("export default") || conteudo.includes("export {")) {
      console.log(
        "⚠️ Parece ser ES Module. Talvez precise compilar com tsc primeiro.",
      );
    }
  }
} else {
  console.error("❌ Arquivo NÃO encontrado!");
  console.log("Procurando em:", caminhoTipos);

  // Listar estrutura
  console.log("\n📁 Estrutura atual:");
  const listar = (dir, indent = "") => {
    const itens = fs.readdirSync(dir);
    itens.forEach((item) => {
      const fullPath = path.join(dir, item);
      const isDir = fs.statSync(fullPath).isDirectory();
      console.log(`${indent}${isDir ? "📁" : "📄"} ${item}`);
      if (isDir && item !== "node_modules") {
        listar(fullPath, indent + "  ");
      }
    });
  };

  listar(path.join(__dirname, ".."));
}

console.log("\n🎯 Teste concluído!");
