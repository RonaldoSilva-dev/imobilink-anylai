import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Button from "../common/Button";
import CorretorProfile from "../profile/CorretorProfile";
import { HeaderCorretorDashboard } from "./HeaderCorretorDashboard";
import { WelcomeSection } from "./WelcomeSection";
import { DashboardTabs, type DashboardTab } from "./DashboardTabs";

type DashboardView = "main" | "profile";

// Interfaces para o sistema de match
interface EmpresaMatch {
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

interface MetricasDashboard {
  totalMatches: number;
  matchesAtivos: number;
  matchesPendentes: number;
  taxaAceitacao: number;
  imoveisCadastrados: number;
  clientesAtivos: number;
  avaliacaoMedia: number;
}

const CorretorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { loading, setLoading } = useLoading();
  const [currentView, setCurrentView] = useState<DashboardView>("main");
  const [abaAtiva, setAbaAtiva] = useState<DashboardTab>("overview");

  const [metricas, setMetricas] = useState<MetricasDashboard>({
    totalMatches: 0,
    matchesAtivos: 0,
    matchesPendentes: 0,
    taxaAceitacao: 0,
    imoveisCadastrados: 0,
    clientesAtivos: 0,
    avaliacaoMedia: 0,
  });

  const [matches, setMatches] = useState<EmpresaMatch[]>([]);

  // Função para voltar ao dashboard principal
  const handleBackToDashboard = () => {
    console.log("Voltando para o dashboard");
    setCurrentView("main");
  };

  // Carregar dados do dashboard
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);

      // Simular carregamento de dados
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Dados mockados para demonstração
      const mockMetricas: MetricasDashboard = {
        totalMatches: 12,
        matchesAtivos: 8,
        matchesPendentes: 2,
        taxaAceitacao: 75,
        imoveisCadastrados: 24,
        clientesAtivos: 15,
        avaliacaoMedia: 4.7,
      };

      const mockMatches: EmpresaMatch[] = [
        {
          id: "1",
          nome: "Imobiliária São Paulo",
          tipo: "imobiliaria",
          cidade: "São Paulo",
          estado: "SP",
          especialidades: ["Residencial", "Comercial"],
          avaliacao: 4.8,
          totalAvaliacoes: 124,
          fotoUrl: "",
          matchScore: 92,
          status: "ativo",
          dataMatch: "2024-01-15",
          ultimaInteracao: "2024-01-20",
        },
        {
          id: "2",
          nome: "Construtora Alpha",
          tipo: "construtora",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          especialidades: ["Lançamentos", "Alto Padrão"],
          avaliacao: 4.5,
          totalAvaliacoes: 89,
          fotoUrl: "",
          matchScore: 85,
          status: "ativo",
          dataMatch: "2024-01-10",
          ultimaInteracao: "2024-01-18",
        },
        {
          id: "3",
          nome: "Imobiliária Beta",
          tipo: "imobiliaria",
          cidade: "Belo Horizonte",
          estado: "MG",
          especialidades: ["Comercial", "Corporativo"],
          avaliacao: 4.2,
          totalAvaliacoes: 67,
          fotoUrl: "",
          matchScore: 78,
          status: "pendente",
          dataMatch: "2024-01-22",
          ultimaInteracao: "2024-01-22",
        },
        {
          id: "4",
          nome: "Construtora Gamma",
          tipo: "construtora",
          cidade: "Curitiba",
          estado: "PR",
          especialidades: ["Econômico", "Médio Padrão"],
          avaliacao: 4.6,
          totalAvaliacoes: 156,
          fotoUrl: "",
          matchScore: 88,
          status: "ativo",
          dataMatch: "2024-01-05",
          ultimaInteracao: "2024-01-19",
        },
      ];

      setMetricas(mockMetricas);
      setMatches(mockMatches);
      setLoading(false);
    };

    if (currentView === "main") {
      loadDashboardData();
    }
  }, [setLoading, currentView]);

  // Aceitar match
  const aceitarMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId ? { ...match, status: "ativo" } : match,
      ),
    );
    console.log(`✅ Match aceito: ${matchId}`);
  };

  // Recusar match
  const recusarMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId ? { ...match, status: "recusado" } : match,
      ),
    );
    console.log(`❌ Match recusado: ${matchId}`);
  };

  // Desativar match (remover match ativo)
  const desativarMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId ? { ...match, status: "desativado" } : match,
      ),
    );
    console.log(`🔴 Match desativado: ${matchId}`);
  };

  // Filtrar matches por status
  const matchesAtivos = matches.filter((match) => match.status === "ativo");
  const matchesPendentes = matches.filter(
    (match) => match.status === "pendente",
  );

  // Se a view atual for profile, mostrar o componente de perfil
  if (currentView === "profile") {
    return <CorretorProfile onBack={handleBackToDashboard} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center gap-4">
        <div className="text-4xl">📊</div>
        <div className="text-gray-700 text-lg">Carregando Dashboard...</div>
      </div>
    );
  }

  // View principal do dashboard
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <HeaderCorretorDashboard onLogout={logout} />
      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <WelcomeSection
          userName={user?.name}
          onProfileClick={() => setCurrentView("profile")}
        />
        <DashboardTabs activeTab={abaAtiva} onTabChange={setAbaAtiva} />
        {/* Conteúdo das Abas */}
        {abaAtiva === "overview" && (
          <div className="space-y-6 md:space-y-8">
            {/* Stats Grid - Métricas Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Card Total Matches */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-3xl md:text-4xl mb-2">🤝</div>
                <h3 className="text-gray-900 font-medium mb-1 text-sm md:text-base">
                  Total Matches
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  {metricas.matchesAtivos} ativos • {metricas.matchesPendentes}{" "}
                  pendentes
                </p>
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  {metricas.totalMatches}
                </div>
              </div>

              {/* Card Imóveis Cadastrados */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-3xl md:text-4xl mb-2">🏠</div>
                <h3 className="text-gray-900 font-medium mb-1 text-sm md:text-base">
                  Imóveis
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  Cadastrados no portfólio
                </p>
                <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                  {metricas.imoveisCadastrados}
                </div>
              </div>

              {/* Card Clientes Ativos */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-3xl md:text-4xl mb-2">👥</div>
                <h3 className="text-gray-900 font-medium mb-1 text-sm md:text-base">
                  Clientes
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  Ativos no sistema
                </p>
                <div className="text-3xl md:text-4xl font-bold text-amber-600">
                  {metricas.clientesAtivos}
                </div>
              </div>

              {/* Card Avaliação Média */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-3xl md:text-4xl mb-2">⭐</div>
                <h3 className="text-gray-900 font-medium mb-1 text-sm md:text-base">
                  Avaliação
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  Média de satisfação
                </p>
                <div className="text-3xl md:text-4xl font-bold text-purple-600">
                  {metricas.avaliacaoMedia}/5
                </div>
              </div>
            </div>

            {/* Seção de Matches Recentes */}
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <h2 className="text-gray-800 text-lg md:text-xl font-semibold">
                  🤝 Matches Recentes
                </h2>
                <Button
                  onClick={() => setAbaAtiva("matches")}
                  variant="secondary"
                  size="small"
                  className="text-xs md:text-sm"
                >
                  Ver Todos
                </Button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {matches.slice(0, 3).map((match) => (
                  <div
                    key={match.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`
                          p-2 md:p-3 rounded-lg text-xl md:text-2xl
                          ${
                            match.tipo === "imobiliaria"
                              ? "bg-blue-50"
                              : "bg-emerald-50"
                          }
                        `}
                      >
                        {match.tipo === "imobiliaria" ? "🏢" : "🏗️"}
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-medium mb-1 text-sm md:text-base">
                          {match.nome}
                        </h4>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {match.cidade} - {match.estado} •{" "}
                          {match.especialidades.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mt-2 sm:mt-0">
                      <div className="text-right">
                        <div
                          className={`
                            px-2 md:px-3 py-1 rounded-full text-xs font-medium
                            ${
                              match.status === "ativo"
                                ? "bg-emerald-100 text-emerald-800"
                                : match.status === "pendente"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          `}
                        >
                          {match.status === "ativo"
                            ? "Ativo"
                            : match.status === "pendente"
                              ? "Pendente"
                              : "Recusado"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Match: {match.matchScore}%
                        </div>
                      </div>

                      {match.status === "pendente" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => aceitarMatch(match.id)}
                            variant="success"
                            size="small"
                            className="px-2 py-1 text-xs"
                          >
                            ✓
                          </Button>
                          <Button
                            onClick={() => recusarMatch(match.id)}
                            variant="danger"
                            size="small"
                            className="px-2 py-1 text-xs"
                          >
                            ×
                          </Button>
                        </div>
                      )}

                      {match.status === "ativo" && (
                        <Button
                          onClick={() => desativarMatch(match.id)}
                          variant="secondary"
                          size="small"
                          className="text-xs"
                        >
                          Desativar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-gray-800 text-lg md:text-xl font-semibold mb-4 md:mb-6">
                🚀 Ações Rápidas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <Button
                  variant="primary"
                  className="justify-center text-sm md:text-base"
                >
                  📋 Cadastrar Imóvel
                </Button>
                <Button
                  variant="secondary"
                  className="justify-center text-sm md:text-base"
                >
                  👥 Novo Cliente
                </Button>
                <Button
                  variant="secondary"
                  className="justify-center text-sm md:text-base"
                >
                  🤝 Buscar Matches
                </Button>
                <Button
                  variant="secondary"
                  className="justify-center text-sm md:text-base"
                >
                  📊 Gerar Relatório
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Aba Matches */}
        {abaAtiva === "matches" && (
          <div>
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-gray-800 text-lg md:text-2xl font-semibold mb-4 md:mb-6">
                🤝 Sistema de Matches
              </h2>

              {/* Filtros */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
                <Button
                  variant={
                    matchesPendentes.length > 0 ? "primary" : "secondary"
                  }
                  size="small"
                  className="text-xs md:text-sm"
                >
                  Pendentes ({matchesPendentes.length})
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  className="text-xs md:text-sm"
                >
                  Ativos ({matchesAtivos.length})
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  className="text-xs md:text-sm"
                >
                  Todos ({matches.length})
                </Button>
              </div>

              {/* Lista de Matches */}
              <div className="space-y-4 md:space-y-6">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start gap-3 md:gap-4 flex-1">
                      <div
                        className={`
                          p-3 md:p-4 rounded-lg text-2xl md:text-3xl flex-shrink-0
                          ${
                            match.tipo === "imobiliaria"
                              ? "bg-blue-50"
                              : "bg-emerald-50"
                          }
                        `}
                      >
                        {match.tipo === "imobiliaria" ? "🏢" : "🏗️"}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-2 md:mb-3">
                          <h3 className="text-gray-900 text-base md:text-lg font-semibold">
                            {match.nome}
                          </h3>
                          <span
                            className={`
                              px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium self-start sm:self-center
                              ${
                                match.status === "ativo"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : match.status === "pendente"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            `}
                          >
                            {match.status === "ativo"
                              ? "Ativo"
                              : match.status === "pendente"
                                ? "Pendente"
                                : match.status === "recusado"
                                  ? "Recusado"
                                  : "Desativado"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm text-gray-600 mb-2">
                          <div>
                            <strong className="text-gray-700">
                              Localização:
                            </strong>
                            <br />
                            {match.cidade} - {match.estado}
                          </div>
                          <div>
                            <strong className="text-gray-700">
                              Especialidades:
                            </strong>
                            <br />
                            {match.especialidades.join(", ")}
                          </div>
                          <div>
                            <strong className="text-gray-700">
                              Avaliação:
                            </strong>
                            <br />
                            {match.avaliacao} ⭐ ({match.totalAvaliacoes})
                          </div>
                          <div>
                            <strong className="text-gray-700">
                              Match Score:
                            </strong>
                            <br />
                            {match.matchScore}%
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">
                          Match realizado em:{" "}
                          {new Date(match.dataMatch).toLocaleDateString(
                            "pt-BR",
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3 w-full lg:w-auto mt-3 lg:mt-0">
                      {match.status === "pendente" && (
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          <Button
                            onClick={() => aceitarMatch(match.id)}
                            variant="success"
                            className="flex-1 lg:flex-none text-sm"
                          >
                            Aceitar Match
                          </Button>
                          <Button
                            onClick={() => recusarMatch(match.id)}
                            variant="danger"
                            className="flex-1 lg:flex-none text-sm"
                          >
                            Recusar
                          </Button>
                        </div>
                      )}

                      {match.status === "ativo" && (
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 md:gap-3">
                          <Button
                            variant="primary"
                            size="small"
                            className="text-sm"
                          >
                            💬 Chat
                          </Button>
                          <Button
                            onClick={() => desativarMatch(match.id)}
                            variant="danger"
                            size="small"
                            className="text-sm"
                          >
                            Desativar Match
                          </Button>
                        </div>
                      )}

                      {(match.status === "recusado" ||
                        match.status === "desativado") && (
                        <Button
                          variant="secondary"
                          size="small"
                          className="text-sm"
                        >
                          Reativar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Abas Futuras */}
        {(abaAtiva === "imoveis" ||
          abaAtiva === "clientes" ||
          abaAtiva === "relatorios") && (
          <div className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-200 text-center">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">
              {abaAtiva === "imoveis"
                ? "🏠"
                : abaAtiva === "clientes"
                  ? "👥"
                  : "📋"}
            </div>
            <h2 className="text-gray-900 text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              {abaAtiva === "imoveis"
                ? "Gestão de Imóveis"
                : abaAtiva === "clientes"
                  ? "Gestão de Clientes"
                  : "Relatórios e Analytics"}
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">
              Esta funcionalidade está em desenvolvimento e será implementada em
              breve!
            </p>
            <Button
              onClick={() => setAbaAtiva("overview")}
              variant="primary"
              className="mx-auto"
            >
              Voltar para o Dashboard
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CorretorDashboard;
