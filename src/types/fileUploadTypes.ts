export interface FileUploadProps {
  label: string;
  accept: string;
  currentFileUrl?: string;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  helperText?: string;
  loading?: boolean;
  className?: string;
}

export interface FilePreviewProps {
  previewUrl?: string | null;
  currentFileUrl?: string;
  selectedFile?: File | null;
  accept: string;
  onRemove?: () => void;
}
