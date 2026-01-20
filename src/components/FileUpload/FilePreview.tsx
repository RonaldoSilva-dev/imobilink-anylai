import React from "react";
import {
  getFileIcon,
  getFileTypeDescription,
  formatFileSize,
} from "./FileUpload.utils";

interface FilePreviewProps {
  previewUrl?: string | null;
  currentFileUrl?: string;
  selectedFile?: File | null;
  accept: string;
  fileType?: string | null;
  hasFile: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  previewUrl,
  currentFileUrl,
  selectedFile,
  accept,
  fileType,
  hasFile,
}) => {
  // Preview de Imagem
  if (previewUrl || (currentFileUrl && accept.includes("image/*"))) {
    return (
      <div className="mb-4">
        <img
          src={previewUrl || currentFileUrl}
          alt="Preview"
          className="max-w-[200px] max-h-[200px] rounded border border-gray-200 mx-auto"
        />
      </div>
    );
  }

  // Preview de Documento (PDF, DOC, etc)
  if (hasFile && fileType && !fileType.startsWith("image/")) {
    return (
      <div className="mb-4 p-4 bg-gray-100 rounded border border-gray-200">
        <div className="text-3xl mb-2">{getFileIcon(fileType)}</div>
        <p className="m-0 text-gray-700 font-medium">
          {selectedFile?.name || "Documento anexado"}
        </p>
        <p className="mt-1 mb-0 text-gray-600 text-sm">
          {getFileTypeDescription(fileType)}
        </p>
        {selectedFile && (
          <p className="mt-1 mb-0 text-gray-500 text-xs">
            Tamanho: {formatFileSize(selectedFile.size)}
          </p>
        )}
      </div>
    );
  }

  // Mensagem quando não há arquivo
  if (!hasFile) {
    return (
      <div className="mb-4">
        <div className="text-4xl mb-2 text-gray-400">
          {accept.includes("image/*") ? "🖼️" : "📁"}
        </div>
        <p className="m-0 text-gray-600">
          {accept.includes("image/*")
            ? "Nenhuma imagem selecionada"
            : "Nenhum documento selecionado"}
        </p>
      </div>
    );
  }

  return null;
};

export default FilePreview;
