/**
 * @file useFormularioRegistro.ts
 * @description Hook personalizado para gerenciar o estado do formulário de registro
 * Centraliza lógica de estado, validação e formatação dos dados de registro
 * Compatível com IFormularioRegistro da pasta Tipos/Registro/
 *
 * @version 2.0.0
 */

import { useState, useCallback, useEffect } from "react";
import {
  IFormularioRegistro,
  TipoUsuario,
  NivelExperiencia,
  TipoDocumento,
  THookFormularioRegistro,
} from "../../Tipos/Registro/TiposRegistro";
import { validarFormulario } from "../Utilitarios/Validadores/validarFormularioRegistro";
import { formatarTelefone } from "../Utilitarios/Formatadores/formatarTelefone";

/**
 * Estado inicial completo compatível com IFormularioRegistro
 * Inclui todos os campos definidos na interface
 * @constant
 */
const ESTADO_INICIAL: IFormularioRegistro = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: TipoUsuario.CORRETOR,
  phone: "",
  experience: undefined,
  creci: "",
  cnpj: "",
  cpf: "",
  companyName: "",
  stateRegistration: "",
  website: "",
  accessLevel: "",
  documentType: undefined,
  documentNumber: "",
  acceptTerms: false,
};

/**
 * Hook personalizado para gerenciar o estado do formulário de registro.
 * Compatível com todos os tipos definidos em Tipos/Registro/
 * Implementa estado, validação, formatação e reset do formulário
 *
 * @returns {THookFormularioRegistro} Objeto contendo estado e funções do formulário
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
export function useFormularioRegistro(): THookFormularioRegistro {
  /**
   * Estado que armazena os dados do formulário completo
   * @type {IFormularioRegistro}
   */
  const [dados, setDados] = useState<IFormularioRegistro>(ESTADO_INICIAL);

  /**
   * Estado que armazena os erros de validação por campo
   * @type {Record<string, string>}
   */
  const [erros, setErros] = useState<Record<string, string>>({});

  /**
   * Estado que indica se o formulário foi submetido
   * @type {boolean}
   */
  const [enviado, setEnviado] = useState(false);

  /**
   * Atualiza um campo específico do formulário
   * Suporta todos os tipos definidos em IFormularioRegistro
   * Aplica formatação automática para campos como telefone
   * Limpa o erro do campo quando ele é editado
   *
   * @param {keyof IFormularioRegistro} campo - Nome do campo a ser atualizado
   * @param {string | boolean | NivelExperiencia | TipoUsuario | TipoDocumento} valor - Novo valor do campo
   *
   * @example
   * atualizarCampo('email', 'joao@email.com');
   * atualizarCampo('phone', '11999999999'); // Será formatado automaticamente
   * atualizarCampo('acceptTerms', true);
   * atualizarCampo('experience', NivelExperiencia.DE_1_A_3_ANOS);
   * atualizarCampo('userType', TipoUsuario.IMOBILIARIA);
   */
  const atualizarCampo = useCallback(
    (
      campo: keyof IFormularioRegistro,
      valor: string | boolean | NivelExperiencia | TipoUsuario | TipoDocumento,
    ) => {
      setDados((prev) => {
        const novosDados = { ...prev, [campo]: valor };

        // Formatação automática para telefone
        if (campo === "phone" && typeof valor === "string" && valor) {
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
   * Valida o formulário atual usando validarFormulario
   * Atualiza o estado de erros e retorna se o formulário é válido
   * Compatível com validações definidas para IFormularioRegistro
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
   * Reseta o formulário para o estado inicial completo
   * Limpa todos os dados e erros
   *
   * @example
   * resetar(); // Volta formulário para estado inicial completo
   */
  const resetar = useCallback(() => {
    setDados(ESTADO_INICIAL);
    setErros({});
    setEnviado(false);
  }, []);

  return {
    /** Dados atuais do formulário completo */
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
 * Hook para gerenciar validação em tempo real de um campo
 * Útil para mostrar erros enquanto o usuário digita (debounce)
 * Pode ser usado independentemente ou com useFormularioRegistro
 *
 * @param {string} valor - Valor atual do campo
 * @param {(valor: string) => string | null} validarCampo - Função de validação do campo
 * @param {number} [delay=500] - Delay em milissegundos para validação (debounce)
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

  /**
   * Efeito para validação com debounce
   * Aplica delay para evitar validações a cada tecla pressionada
   * Limpa timeout anterior se valor mudar antes do delay completar
   */
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
