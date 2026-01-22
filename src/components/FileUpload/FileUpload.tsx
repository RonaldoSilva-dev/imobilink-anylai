import React from "react";
import Button from "../common/Button";
import { FileUploadProps } from "../../types/fileUploadTypes";
import { useFileUpload } from "../../hooks/useFileUpload";
import FilePreview from "./FilePreview";

/**
 * Componente de Upload de Arquivo com Preview
 * - Suporta imagens e PDF
 * - Validação de tipo de arquivo
 * - Preview visual
 * - Remoção de arquivo
 */
const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  currentFileUrl,
  onFileSelect,
  onFileRemove,
  helperText,
  loading = false,
}) => {
  const {
    fileInputRef,
    previewUrl,
    selectedFile,
    error,
    handleFileChange,
    handleRemoveFile,
    handleUploadClick,
  } = useFileUpload({
    accept,
    onFileSelect,
    onFileRemove,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files?.[0]);
  };

  // Determinar se há arquivo para mostrar (selecionado ou atual) - AGORA COMO BOOLEANO
  const hasFile = !!(selectedFile || currentFileUrl); // Adicione !! para converter para boolean

  // Determinar tipo de arquivo para ícone
  const fileType = selectedFile?.type || (currentFileUrl ? "document" : null);

  return (
    <div className="mb-6">
      {/* Label do campo */}
      <label className="block mb-2 font-medium text-gray-700">{label}</label>

      {/* Área de Upload e Preview */}
      <div
        className={`
        border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 transition-all duration-200
        ${error ? "border-red-500" : "border-gray-300"}
      `}
      >
        {/* Componente de Preview */}
        <FilePreview
          previewUrl={previewUrl}
          currentFileUrl={currentFileUrl}
          selectedFile={selectedFile}
          accept={accept}
          fileType={fileType}
          hasFile={hasFile}
        />

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-center flex-wrap">
          {/* Botão de Selecionar Arquivo */}
          <Button
            type="button"
            onClick={handleUploadClick}
            variant="secondary"
            loading={loading}
          >
            {hasFile ? "🔄 Alterar Arquivo" : "📁 Selecionar Arquivo"}
          </Button>

          {/* Botão de Remover (só aparece se há arquivo) */}
          {hasFile && (
            <Button
              type="button"
              onClick={handleRemoveFile}
              variant="danger"
              disabled={loading}
            >
              🗑️ Remover
            </Button>
          )}
        </div>

        {/* Input File Hidden */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept={accept}
          className="hidden"
          aria-label={`Upload de ${label.toLowerCase()}`}
          title={label}
        />

        {/* Texto de Ajuda */}
        {helperText && !error && (
          <p className="mt-4 mb-0 text-gray-600 text-sm">{helperText}</p>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <p className="mt-4 mb-0 text-red-500 text-sm font-medium">
            ⚠️ {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
