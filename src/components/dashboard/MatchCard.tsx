// src/components/dashboard/MatchCard.tsx
import React from "react";
import Button from "../common/Button";

// Reusa a interface que já existe (ou cria se não tiver)
export interface EmpresaMatch {
  id: string;
  nome: string;
  tipo: "imobiliaria" | "construtora";
  cidade: string;
  estado: string;
  especialidades: string[];
  avaliacao: number;
  totalAvaliacoes: number;
  fotoUrl: string;
  matchScore: number;
  status: "pendente" | "ativo" | "recusado" | "desativado";
  dataMatch: string;
  ultimaInteracao: string;
}

interface MatchCardProps {
  match: EmpresaMatch;
  showActions?: boolean;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onDeactivate?: (id: string) => void;
  onReactivate?: (id: string) => void;
  onChat?: (id: string) => void;
  compact?: boolean;
  className?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  showActions = true,
  onAccept,
  onDecline,
  onDeactivate,
  onReactivate,
  onChat,
  compact = false,
  className = "",
}) => {
  // Configurações baseadas no status
  const statusConfig = {
    ativo: {
      label: "Ativo",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-800",
      icon: "✅",
    },
    pendente: {
      label: "Pendente",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      icon: "⏳",
    },
    recusado: {
      label: "Recusado",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      icon: "❌",
    },
    desativado: {
      label: "Desativado",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      icon: "🔴",
    },
  };

  const config = statusConfig[match.status];

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article
      className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md ${className}`}
      aria-label={`Match com ${match.nome} - ${config.label}`}
    >
      {/* Lado esquerdo: Informações da empresa */}
      <div className="flex items-start gap-3 md:gap-4 flex-1">
        {/* Ícone do tipo */}
        <div
          className={`p-3 md:p-4 rounded-lg text-2xl md:text-3xl flex-shrink-0 ${
            match.tipo === "imobiliaria" ? "bg-blue-50" : "bg-emerald-50"
          }`}
          aria-hidden="true"
        >
          {match.tipo === "imobiliaria" ? "🏢" : "🏗️"}
        </div>

        {/* Detalhes */}
        <div className="flex-1">
          {/* Cabeçalho com nome e status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <h3 className="text-gray-900 text-base md:text-lg font-semibold">
              {match.nome}
            </h3>
            <span
              className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${config.bgColor} ${config.textColor} self-start sm:self-center`}
              aria-label={`Status: ${config.label}`}
            >
              <span aria-hidden="true" className="mr-1">
                {config.icon}
              </span>
              {config.label}
            </span>
          </div>

          {/* Informações principais */}
          {!compact && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm text-gray-600 mb-2">
              <div>
                <strong className="text-gray-700">Localização:</strong>
                <br />
                {match.cidade} - {match.estado}
              </div>
              <div>
                <strong className="text-gray-700">Especialidades:</strong>
                <br />
                {match.especialidades.join(", ")}
              </div>
              <div>
                <strong className="text-gray-700">Avaliação:</strong>
                <br />
                {match.avaliacao} ⭐ ({match.totalAvaliacoes})
              </div>
              <div>
                <strong className="text-gray-700">Match Score:</strong>
                <br />
                {match.matchScore}%
              </div>
            </div>
          )}

          {/* Informações secundárias */}
          {!compact && (
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <div>
                <strong>Match em:</strong> {formatDate(match.dataMatch)}
              </div>
              <div>
                <strong>Última interação:</strong>{" "}
                {formatDate(match.ultimaInteracao)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lado direito: Ações */}
      {showActions && (
        <div className="flex flex-col gap-2 md:gap-3 w-full lg:w-auto mt-3 lg:mt-0">
          {match.status === "pendente" && onAccept && onDecline && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => onAccept(match.id)}
                variant="success"
                size={compact ? "small" : "medium"}
                className="flex-1"
                aria-label={`Aceitar match com ${match.nome}`}
              >
                <span aria-hidden="true">✓</span> Aceitar
              </Button>
              <Button
                onClick={() => onDecline(match.id)}
                variant="danger"
                size={compact ? "small" : "medium"}
                className="flex-1"
                aria-label={`Recusar match com ${match.nome}`}
              >
                <span aria-hidden="true">✗</span> Recusar
              </Button>
            </div>
          )}

          {match.status === "ativo" && (
            <div className="flex flex-col sm:flex-row gap-2">
              {onChat && (
                <Button
                  onClick={() => onChat(match.id)}
                  variant="primary"
                  size={compact ? "small" : "medium"}
                  className="flex-1"
                  aria-label={`Abrir chat com ${match.nome}`}
                >
                  <span aria-hidden="true">💬</span> Chat
                </Button>
              )}
              {onDeactivate && (
                <Button
                  onClick={() => onDeactivate(match.id)}
                  variant="danger"
                  size={compact ? "small" : "medium"}
                  className="flex-1"
                  aria-label={`Desativar match com ${match.nome}`}
                >
                  <span aria-hidden="true">🔴</span> Desativar
                </Button>
              )}
            </div>
          )}

          {(match.status === "recusado" || match.status === "desativado") &&
            onReactivate && (
              <Button
                onClick={() => onReactivate(match.id)}
                variant="secondary"
                size={compact ? "small" : "medium"}
                aria-label={`Reativar match com ${match.nome}`}
              >
                <span aria-hidden="true">↻</span> Reativar
              </Button>
            )}

          {/* Informação adicional para compact mode */}
          {compact && (
            <div className="text-xs text-gray-500 text-center">
              Match: {match.matchScore}% • {match.cidade}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default MatchCard;
