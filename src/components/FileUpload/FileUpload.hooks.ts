import { useState, useRef, useCallback } from "react";
import { validateFileType, validateFileSize } from "./FileUpload.utils";

interface UseFileUploadProps {
  accept: string;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

export const useFileUpload = ({
  accept,
  onFileSelect,
  onFileRemove,
}: UseFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      // Resetar erro anterior
      setError(null);

      // Validar tipo do arquivo
      if (!validateFileType(file, accept)) {
        setError(`Tipo de arquivo não suportado. Tipos aceitos: ${accept}`);
        return;
      }

      // Validar tamanho do arquivo
      if (!validateFileSize(file)) {
        const maxSize = file.type.startsWith("image/") ? "5MB" : "10MB";
        setError(`Arquivo muito grande. Tamanho máximo: ${maxSize}`);
        return;
      }

      // Criar URL para preview (apenas para imagens)
      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        // Para documentos, não criamos preview URL
        setPreviewUrl(null);
      }

      // Atualizar estados e chamar callback
      setSelectedFile(file);
      onFileSelect(file);
    },
    [accept, onFileSelect],
  );

  const handleRemoveFile = useCallback(() => {
    // Limpar preview se existir (apenas para imagens)
    if (previewUrl && selectedFile?.type.startsWith("image/")) {
      URL.revokeObjectURL(previewUrl);
    }

    // Resetar estados
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);

    // Limpar input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Chamar callback de remoção
    onFileRemove();
  }, [previewUrl, selectedFile, onFileRemove]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    fileInputRef,
    previewUrl,
    selectedFile,
    error,
    handleFileChange,
    handleRemoveFile,
    handleUploadClick,
    setError,
  };
};
