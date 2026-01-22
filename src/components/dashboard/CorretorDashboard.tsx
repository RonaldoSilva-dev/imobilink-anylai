import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { useLoading } from "../../contexts/loadingContext";
import Button from "../common/Button";
import CorretorProfile from "../profile/CorretorProfile";
import { HeaderCorretorDashboard } from "./HeaderCorretorDashboard";
import { WelcomeSection } from "./WelcomeSection";
import { DashboardTabs, type DashboardTab } from "./DashboardTabs";
import { FeaturePlaceholder } from "./FeaturePlaceholder";
import { QuickActions } from "./QuickActions";
import { StatsCard } from "./StatsCard";
import MatchCard, { EmpresaMatch } from "./MatchCard";

type DashboardView = "main" | "profile";

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

  // Reativar match
  const reativarMatch = (matchId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId ? { ...match, status: "ativo" } : match,
      ),
    );
    console.log(`↻ Match reativado: ${matchId}`);
  };

  // Abrir chat
  const abrirChat = (matchId: string) => {
    console.log(`💬 Abrir chat com match: ${matchId}`);
    // Aqui você pode implementar a lógica para abrir o chat
    // Por exemplo: setCurrentChatId(matchId), navegar para página de chat, etc.
  };

  // Filtrar matches por status
  const matchesAtivos = matches.filter((match) => match.status === "ativo");
  const matchesPendentes = matches.filter(
    (match) => match.status === "pendente",
  );

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
        {
          id: "5",
          nome: "Imobiliária Delta",
          tipo: "imobiliaria",
          cidade: "Porto Alegre",
          estado: "RS",
          especialidades: ["Luxo", "Alto Padrão"],
          avaliacao: 4.9,
          totalAvaliacoes: 203,
          fotoUrl: "",
          matchScore: 95,
          status: "desativado",
          dataMatch: "2023-12-10",
          ultimaInteracao: "2024-01-05",
        },
        {
          id: "6",
          nome: "Construtora Omega",
          tipo: "construtora",
          cidade: "Salvador",
          estado: "BA",
          especialidades: ["Popular", "MCMV"],
          avaliacao: 4.3,
          totalAvaliacoes: 78,
          fotoUrl: "",
          matchScore: 72,
          status: "recusado",
          dataMatch: "2024-01-18",
          ultimaInteracao: "2024-01-18",
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
              <StatsCard
                icon="🤝"
                title="Total Matches"
                description={`${metricas.matchesAtivos} ativos • ${metricas.matchesPendentes} pendentes`}
                value={metricas.totalMatches}
                variant="blue"
              />
              {/* Card Imóveis Cadastrados */}
              <StatsCard
                icon="🏠"
                title="Imóveis"
                description="Cadastrados no portifólio"
                value={metricas.imoveisCadastrados}
                variant="emerald"
              />
              {/* Card Clientes Ativos */}
              <StatsCard
                icon="👥"
                title="Clientes"
                description="Ativos no sistema"
                value={metricas.clientesAtivos}
                variant="amber"
              />
              {/* Card Avaliação Média */}
              <StatsCard
                icon="⭐"
                title="Avaliação"
                description="Média de satisfação"
                value={metricas.avaliacaoMedia.toFixed(1)}
                variant="purple"
              />
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
                  <MatchCard
                    key={match.id}
                    match={match}
                    compact={true}
                    showActions={true}
                    onAccept={aceitarMatch}
                    onDecline={recusarMatch}
                    onDeactivate={desativarMatch}
                    onReactivate={reativarMatch}
                    onChat={abrirChat}
                  />
                ))}
              </div>
            </div>

            <QuickActions />
          </div>
        )}

        {/* Aba Matches */}
        {abaAtiva === "matches" && (
          <div className="space-y-6 md:space-y-8">
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
                  onClick={() => {
                    // Aqui você pode implementar filtro por status
                    console.log("Mostrar apenas pendentes");
                  }}
                >
                  Pendentes ({matchesPendentes.length})
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  className="text-xs md:text-sm"
                  onClick={() => {
                    // Aqui você pode implementar filtro por status
                    console.log("Mostrar apenas ativos");
                  }}
                >
                  Ativos ({matchesAtivos.length})
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  className="text-xs md:text-sm"
                  onClick={() => {
                    // Mostrar todos
                    console.log("Mostrar todos");
                  }}
                >
                  Todos ({matches.length})
                </Button>
              </div>

              {/* Lista de Matches usando o componente MatchCard */}
              <div className="space-y-4 md:space-y-6">
                {matches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    compact={false} // Modo completo na aba de matches
                    showActions={true}
                    onAccept={aceitarMatch}
                    onDecline={recusarMatch}
                    onDeactivate={desativarMatch}
                    onReactivate={reativarMatch}
                    onChat={abrirChat}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Outras abas */}
        {(abaAtiva === "imoveis" ||
          abaAtiva === "clientes" ||
          abaAtiva === "relatorios") && (
          <FeaturePlaceholder
            featureType={abaAtiva}
            onBack={() => setAbaAtiva("overview")}
          />
        )}
      </main>
    </div>
  );
};

export default CorretorDashboard;
