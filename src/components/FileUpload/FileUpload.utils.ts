// FileUpload.utils.ts - VERSÃO COMPLETA E CORRETA

/**
 * Valida o tipo do arquivo baseado no accept
 * @returns boolean - true se válido, false se inválido
 */
export const validateFileType = (file: File, accept: string): boolean => {
  if (accept.includes("image/*") && file.type.startsWith("image/")) {
    return true;
  }

  if (
    (accept.includes(".pdf") || accept.includes("application/pdf")) &&
    file.type === "application/pdf"
  ) {
    return true;
  }

  if (
    (accept.includes(".doc") || accept.includes(".docx")) &&
    (file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
  ) {
    return true;
  }

  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
  if (accept.includes(`.${fileExtension}`)) {
    return true;
  }

  return false;
};

/**
 * Valida o tamanho do arquivo
 * @returns boolean - true se válido, false se inválido
 */
export const validateFileSize = (file: File): boolean => {
  const maxSize = file.type.startsWith("image/")
    ? 5 * 1024 * 1024
    : 10 * 1024 * 1024;

  return file.size <= maxSize;
};

/**
 * Valida um arquivo (tipo e tamanho) - ✅ FUNÇÃO ADICIONADA
 * @returns string - mensagem de erro ou null se válido
 */
export const validateFile = (file: File, accept: string): string | null => {
  if (!validateFileType(file, accept)) {
    return `Tipo de arquivo não suportado. Tipos aceitos: ${accept}`;
  }

  if (!validateFileSize(file)) {
    const maxSize = file.type.startsWith("image/") ? "5MB" : "10MB";
    return `Arquivo muito grande. Tamanho máximo: ${maxSize}`;
  }

  return null; // Arquivo válido
};

/**
 * Formata o tamanho do arquivo para string legível
 */
export const formatFileSize = (bytes: number): string => {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
};

/**
 * Retorna o ícone apropriado para o tipo de arquivo
 */
export const getFileIcon = (fileType: string): string => {
  if (fileType === "application/pdf") return "📄";
  if (fileType.includes("word") || fileType.includes("document")) return "📝";
  return "📁";
};

/**
 * Retorna a descrição do tipo de arquivo
 */
export const getFileTypeDescription = (fileType: string): string => {
  if (fileType === "application/pdf") return "Arquivo PDF";
  if (fileType.includes("word")) return "Documento Word";
  return "Documento";
};
