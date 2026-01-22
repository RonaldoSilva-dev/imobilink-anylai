// Exportação principal do componente
export { default } from "./FileUpload";

// Exportação dos tipos para uso externo
export type { FileUploadProps } from "../../types/fileUploadTypes";

// Exportações opcionais dos utilitários
export {
  validateFileType,
  validateFileSize,
  validateFile,
  formatFileSize,
  getFileIcon,
  getFileTypeDescription,
} from "../../utils/fileUploadUtils";

// Exportação do FilePreview
export { default as FilePreview } from "./FilePreview";

// Exportação do hook
export { useFileUpload } from "../../hooks/useFileUpload";
