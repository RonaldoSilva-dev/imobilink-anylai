// Exportação principal do componente
export { default } from "./FileUpload";

// Exportação dos tipos para uso externo
export type { FileUploadProps } from "./FileUpload.types";

// Exportações opcionais dos utilitários e subcomponentes (se necessário)
export {
  validateFileType,
  validateFileSize,
  validateFile,
  formatFileSize,
  getFileIcon,
  getFileTypeDescription,
} from "./FileUpload.utils";

export { default as FilePreview } from "./FilePreview";
export { useFileUpload } from "./FileUpload.hooks";
