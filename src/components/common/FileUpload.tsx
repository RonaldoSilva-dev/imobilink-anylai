import React, { useRef, useState } from "react";
import Button from "./Button";

// Interface para definir as props do componente
interface FileUploadProps {
  // Label exibida para o usuário
  label: string;
  // Tipos de arquivo aceitos (ex: "image/*", ".pdf")
  accept: string;
  // URL atual do arquivo (para preview)
  currentFileUrl?: string;
  // Função chamada quando arquivo é selecionado
  onFileSelect: (file: File) => void;
  // Função chamada para remover arquivo
  onFileRemove: () => void;
  // Texto de ajuda para o usuário
  helperText?: string;
  // Se está em estado de loading
  loading?: boolean;
}

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
  loading = false
}) => {
  // Referência para o input file hidden
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Estado para preview do arquivo selecionado
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Estado para arquivo selecionado
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Estado para erros de validação
  const [error, setError] = useState<string | null>(null);

  /**
   * Valida o tipo do arquivo baseado no accept
   * @param file - Arquivo a ser validado
   * @returns boolean - Se o arquivo é válido
   */
  const validateFileType = (file: File): boolean => {
    // Verifica se é imagem
    if (accept.includes("image/*") && file.type.startsWith("image/")) {
      return true;
    }
    // Verifica se é PDF
    if ((accept.includes(".pdf") || accept.includes("application/pdf")) && file.type === "application/pdf") {
      return true;
    }
    // Verifica se é DOC/DOCX
    if ((accept.includes(".doc") || accept.includes(".docx")) && 
        (file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      return true;
    }
    // Verifica extensão específica
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (accept.includes(`.${fileExtension}`)) {
      return true;
    }
    return false;
  };

  /**
   * Valida o tamanho do arquivo
   * @param file - Arquivo a ser validado
   * @returns boolean - Se o tamanho é válido
   */
  const validateFileSize = (file: File): boolean => {
    // Limite de 5MB para imagens, 10MB para documentos
    const maxSize = file.type.startsWith("image/") ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    return file.size <= maxSize;
  };

  /**
   * Handler quando arquivo é selecionado
   * @param event - Evento do input file
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Resetar erro anterior
    setError(null);

    // Validar tipo do arquivo
    if (!validateFileType(file)) {
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
  };

  /**
   * Handler para remover arquivo
   */
  const handleRemoveFile = () => {
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
  };

  /**
   * Handler para clicar no botão de upload
   * Abre o dialog de seleção de arquivo
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Determinar se há arquivo para mostrar (selecionado ou atual)
  const hasFile = selectedFile || currentFileUrl;
  
  // Determinar tipo de arquivo para ícone
  const fileType = selectedFile?.type || (currentFileUrl ? "document" : null);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {/* Label do campo */}
      <label style={{
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: "500",
        color: "#374151"
      }}>
        {label}
      </label>

      {/* Área de Upload e Preview */}
      <div style={{
        border: error ? "2px dashed #ef4444" : "2px dashed #d1d5db",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        transition: "all 0.2s ease"
      }}>
        {/* Preview de Imagem */}
        {(previewUrl || (currentFileUrl && accept.includes("image/*"))) && (
          <div style={{ marginBottom: "1rem" }}>
            <img 
              src={previewUrl || currentFileUrl} 
              alt="Preview" 
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb"
              }}
            />
          </div>
        )}

        {/* Preview de Documento (PDF, DOC, etc) */}
        {hasFile && !previewUrl && fileType && !fileType.startsWith("image/") && (
          <div style={{ 
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.375rem",
            border: "1px solid #e5e7eb"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {fileType === "application/pdf" ? "📄" : "📝"}
            </div>
            <p style={{ margin: 0, color: "#374151", fontWeight: "500" }}>
              {selectedFile?.name || "Documento anexado"}
            </p>
            <p style={{ margin: "0.25rem 0 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
              {fileType === "application/pdf" ? "Arquivo PDF" : 
               fileType.includes("word") ? "Documento Word" : "Documento"}
            </p>
            {selectedFile && (
              <p style={{ margin: "0.25rem 0 0 0", color: "#9ca3af", fontSize: "0.75rem" }}>
                Tamanho: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>
        )}

        {/* Mensagem quando não há arquivo */}
        {!hasFile && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem", color: "#9ca3af" }}>
              {accept.includes("image/*") ? "🖼️" : "📁"}
            </div>
            <p style={{ margin: 0, color: "#6b7280" }}>
              {accept.includes("image/*") ? "Nenhuma imagem selecionada" : "Nenhum documento selecionado"}
            </p>
          </div>
        )}

        {/* Botões de Ação */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
          onChange={handleFileChange}
          accept={accept}
          style={{ display: "none" }}
        />

        {/* Texto de Ajuda */}
        {helperText && !error && (
          <p style={{ 
            margin: "1rem 0 0 0", 
            color: "#6b7280", 
            fontSize: "0.875rem" 
          }}>
            {helperText}
          </p>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <p style={{ 
            margin: "1rem 0 0 0", 
            color: "#ef4444", 
            fontSize: "0.875rem",
            fontWeight: "500"
          }}>
            ⚠️ {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;