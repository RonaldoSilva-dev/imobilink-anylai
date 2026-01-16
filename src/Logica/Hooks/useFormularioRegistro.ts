import { useState, useCallback, useEffect } from "react";
import {
  IFormularioRegistro,
  TipoUsuario,
} from "../../Tipos/Registro/TiposRegistro";
import { validarFormulario } from "../Utilitarios/Validadores/validarFormularioRegistro";
import { formatarTelefone } from "../Utilitarios/Formatadores/formatarTelefone";

/**
 * Hook personalizado para gerenciar o estado do formulário de registro.
 *
 * @returns {Object} Objeto contendo:
 * - dados: Estado atual do formulário
 * - erros: Erros de validação por campo
 * - enviado: Se o formulário foi submetido
 * - atualizarCampo: Função para atualizar um campo específico
 * - validar: Função para validar o formulário
 * - resetar: Função para resetar o formulário
 * - setEnviado: Função para marcar como enviado
 *
 * @example
 * const { dados, erros, atualizarCampo, validar } = useFormularioRegistro();
 *
 * // Atualizar um campo
 * atualizarCampo('name', 'João Silva');
 *
 * // Validar formulário
 * const valido = validar();
 *
 * // Resetar formulário
 * resetar();
 */
export function useFormularioRegistro() {
  /**
   * Estado que armazena os dados do formulário.
   * @type {IFormularioRegistro}
   */
  const [dados, setDados] = useState<IFormularioRegistro>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: TipoUsuario.CORRETOR, // Valor padrão: Corretor
  });

  /**
   * Estado que armazena os erros de validação por campo.
   * @type {Record<string, string>}
   */
  const [erros, setErros] = useState<Record<string, string>>({});

  /**
   * Estado que indica se o formulário foi submetido.
   * @type {boolean}
   */
  const [enviado, setEnviado] = useState(false);

  /**
   * Atualiza um campo específico do formulário.
   * Aplica formatação automática para campos como telefone.
   * Limpa o erro do campo quando ele é editado.
   *
   * @param {keyof IFormularioRegistro} campo - Nome do campo a ser atualizado
   * @param {string} valor - Novo valor do campo
   *
   * @example
   * atualizarCampo('email', 'joao@email.com');
   * atualizarCampo('phone', '11999999999'); // Será formatado automaticamente
   */
  const atualizarCampo = useCallback(
    (campo: keyof IFormularioRegistro, valor: string) => {
      setDados((prev) => {
        const novosDados = { ...prev, [campo]: valor };

        // Formatação automática para telefone
        if (campo === "phone" && valor) {
          novosDados.phone = formatarTelefone(valor);
        }

        return novosDados;
      });

      // Limpa erro do campo ao editar
      if (erros[campo]) {
        setErros((prev) => ({ ...prev, [campo]: "" }));
      }
    },
    [erros],
  );

  /**
   * Valida o formulário atual.
   * Atualiza o estado de erros e retorna se o formulário é válido.
   *
   * @returns {boolean} true se o formulário é válido, false caso contrário
   *
   * @example
   * const valido = validar();
   * if (valido) {
   *   // Proceder com envio
   * }
   */
  const validar = useCallback(() => {
    const novosErros = validarFormulario(dados);
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }, [dados]);

  /**
   * Reseta o formulário para o estado inicial.
   * Limpa todos os dados e erros.
   *
   * @example
   * resetar(); // Volta formulário para estado inicial
   */
  const resetar = useCallback(() => {
    setDados({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: TipoUsuario.CORRETOR,
    });
    setErros({});
    setEnviado(false);
  }, []);

  return {
    /** Dados atuais do formulário */
    dados,
    /** Erros de validação por campo */
    erros,
    /** Indica se o formulário foi submetido */
    enviado,
    /** Função para atualizar um campo específico */
    atualizarCampo,
    /** Função para validar o formulário */
    validar,
    /** Função para resetar o formulário */
    resetar,
    /** Função para marcar como enviado */
    setEnviado,
  };
}

/**
 * Hook para gerenciar validação em tempo real de um campo.
 * Útil para mostrar erros enquanto o usuário digita.
 *
 * @param {string} valor - Valor atual do campo
 * @param {(valor: string) => string | null} validarCampo - Função de validação do campo
 * @param {number} [delay=500] - Delay em milissegundos para validação
 *
 * @returns {Object} Objeto contendo:
 * - erro: Mensagem de erro atual (null se válido)
 * - validando: Se está processando validação
 *
 * @example
 * const { erro, validando } = useValidacaoEmTempoReal(
 *   email,
 *   (valor) => validarEmail(valor) ? null : 'Email inválido'
 * );
 */
export function useValidacaoEmTempoReal(
  valor: string,
  validarCampo: (valor: string) => string | null,
  delay: number = 500,
) {
  const [erro, setErro] = useState<string | null>(null);
  const [validando, setValidando] = useState(false);

  // Efeito para validação com debounce
  useEffect(() => {
    if (!valor.trim()) {
      setErro(null);
      return;
    }

    setValidando(true);

    const timeoutId = setTimeout(() => {
      const resultado = validarCampo(valor);
      setErro(resultado);
      setValidando(false);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      setValidando(false);
    };
  }, [valor, validarCampo, delay]);

  return { erro, validando };
}

export default useFormularioRegistro;
