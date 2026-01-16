import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Button from "../common/Button";
import CorretorProfile from "../profile/CorretorProfile";

type DashboardView = "main" | "profile";

// Interfaces para o sistema de match
interface EmpresaMatch {
  id: string;
  nome: string;
  tipo: 'imobiliaria' | 'construtora';
  cidade: string;
  estado: string;
  especialidades: string[];
  avaliacao: number;
  totalAvaliacoes: number;
  fotoUrl: string;
  matchScore: number;
  status: 'pendente' | 'ativo' | 'recusado' | 'desativado';
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
  const [abaAtiva, setAbaAtiva] = useState<'overview' | 'matches' | 'imoveis' | 'clientes' | 'relatorios'>('overview');

  const [metricas, setMetricas] = useState<MetricasDashboard>({
    totalMatches: 0,
    matchesAtivos: 0,
    matchesPendentes: 0,
    taxaAceitacao: 0,
    imoveisCadastrados: 0,
    clientesAtivos: 0,
    avaliacaoMedia: 0
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados mockados para demonstração
      const mockMetricas: MetricasDashboard = {
        totalMatches: 12,
        matchesAtivos: 8,
        matchesPendentes: 2,
        taxaAceitacao: 75,
        imoveisCadastrados: 24,
        clientesAtivos: 15,
        avaliacaoMedia: 4.7
      };

      const mockMatches: EmpresaMatch[] = [
        {
          id: '1',
          nome: 'Imobiliária São Paulo',
          tipo: 'imobiliaria',
          cidade: 'São Paulo',
          estado: 'SP',
          especialidades: ['Residencial', 'Comercial'],
          avaliacao: 4.8,
          totalAvaliacoes: 124,
          fotoUrl: '',
          matchScore: 92,
          status: 'ativo',
          dataMatch: '2024-01-15',
          ultimaInteracao: '2024-01-20'
        },
        {
          id: '2',
          nome: 'Construtora Alpha',
          tipo: 'construtora',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          especialidades: ['Lançamentos', 'Alto Padrão'],
          avaliacao: 4.5,
          totalAvaliacoes: 89,
          fotoUrl: '',
          matchScore: 85,
          status: 'ativo',
          dataMatch: '2024-01-10',
          ultimaInteracao: '2024-01-18'
        },
        {
          id: '3',
          nome: 'Imobiliária Beta',
          tipo: 'imobiliaria',
          cidade: 'Belo Horizonte',
          estado: 'MG',
          especialidades: ['Comercial', 'Corporativo'],
          avaliacao: 4.2,
          totalAvaliacoes: 67,
          fotoUrl: '',
          matchScore: 78,
          status: 'pendente',
          dataMatch: '2024-01-22',
          ultimaInteracao: '2024-01-22'
        },
        {
          id: '4',
          nome: 'Construtora Gamma',
          tipo: 'construtora',
          cidade: 'Curitiba',
          estado: 'PR',
          especialidades: ['Econômico', 'Médio Padrão'],
          avaliacao: 4.6,
          totalAvaliacoes: 156,
          fotoUrl: '',
          matchScore: 88,
          status: 'ativo',
          dataMatch: '2024-01-05',
          ultimaInteracao: '2024-01-19'
        }
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
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'ativo' }
          : match
      )
    );
    console.log(`✅ Match aceito: ${matchId}`);
  };

  // Recusar match
  const recusarMatch = (matchId: string) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'recusado' }
          : match
      )
    );
    console.log(`❌ Match recusado: ${matchId}`);
  };

  // Desativar match (remover match ativo)
  const desativarMatch = (matchId: string) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'desativado' }
          : match
      )
    );
    console.log(`🔴 Match desativado: ${matchId}`);
  };

  // Filtrar matches por status
  const matchesAtivos = matches.filter(match => match.status === 'ativo');
  const matchesPendentes = matches.filter(match => match.status === 'pendente');

  // Se a view atual for profile, mostrar o componente de perfil
  if (currentView === "profile") {
    return <CorretorProfile onBack={handleBackToDashboard} />;
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '2rem' }}>📊</div>
        <div style={{ color: '#374151', fontSize: '1.125rem' }}>Carregando Dashboard...</div>
      </div>
    );
  }

  // View principal do dashboard
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#fff",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 style={{ 
              color: "#2563eb", 
              margin: 0, 
              fontSize: "1.5rem",
              fontWeight: "bold"
            }}>
              🏠 Dlogg LinkImobili
            </h1>
            <span style={{
              backgroundColor: "#dbeafe",
              color: "#2563eb",
              padding: "0.25rem 0.75rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              fontWeight: "500"
            }}>
              Área do Corretor
            </span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "500", color: "#374151" }}>
                {user?.name}
              </p>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
                {user?.email}
              </p>
            </div>
            <Button
              onClick={logout}
              variant="danger"
              style={{ padding: "0.5rem 1rem" }}
            >
              🚪 Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Welcome Section */}
        <div style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          marginBottom: "2rem",
          border: "1px solid #e5e7eb"
        }}>
          <h2 style={{ 
            color: "#111827", 
            margin: "0 0 1rem 0",
            fontSize: "1.5rem"
          }}>
            👋 Bem-vindo, {user?.name}!
          </h2>
          <p style={{ 
            color: "#6b7280", 
            margin: "0 0 1.5rem 0",
            fontSize: "1.125rem"
          }}>
            Sua jornada no Dlogg LinkImobili começa aqui. Encontre os melhores empreendimentos 
            e faça matches com construtoras que combinam com seu perfil.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button 
              variant="primary"
              onClick={() => setCurrentView("profile")}
            >
              👤 Completar Meu Perfil
            </Button>
            <Button variant="secondary">
              💼 Buscar Empreendimentos
            </Button>
          </div>
        </div>

        {/* Navegação por Abas */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'overview', label: '📈 Visão Geral', icon: '📈' },
            { id: 'matches', label: '🤝 Matches', icon: '🤝' },
            { id: 'imoveis', label: '🏠 Imóveis', icon: '🏠' },
            { id: 'clientes', label: '👥 Clientes', icon: '👥' },
            { id: 'relatorios', label: '📋 Relatórios', icon: '📋' }
          ].map(aba => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id as any)}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '0.5rem',
                backgroundColor: abaAtiva === aba.id ? '#2563eb' : 'transparent',
                color: abaAtiva === aba.id ? 'white' : '#6b7280',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{aba.icon}</span>
              {aba.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das Abas */}
        {abaAtiva === 'overview' && (
          <div>
            {/* Stats Grid - Métricas Principais */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem"
            }}>
              {/* Card Total Matches */}
              <div style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤝</div>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#111827" }}>Total Matches</h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
                  {metricas.matchesAtivos} ativos • {metricas.matchesPendentes} pendentes
                </p>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "bold", 
                  color: "#2563eb",
                  marginTop: "0.5rem"
                }}>
                  {metricas.totalMatches}
                </div>
              </div>

              {/* Card Imóveis Cadastrados */}
              <div style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🏠</div>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#111827" }}>Imóveis</h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
                  Cadastrados no portfólio
                </p>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "bold", 
                  color: "#059669",
                  marginTop: "0.5rem"
                }}>
                  {metricas.imoveisCadastrados}
                </div>
              </div>

              {/* Card Clientes Ativos */}
              <div style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</div>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#111827" }}>Clientes</h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
                  Ativos no sistema
                </p>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "bold", 
                  color: "#d97706",
                  marginTop: "0.5rem"
                }}>
                  {metricas.clientesAtivos}
                </div>
              </div>

              {/* Card Avaliação Média */}
              <div style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⭐</div>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#111827" }}>Avaliação</h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
                  Média de satisfação
                </p>
                <div style={{ 
                  fontSize: "2rem", 
                  fontWeight: "bold", 
                  color: "#7c3aed",
                  marginTop: "0.5rem"
                }}>
                  {metricas.avaliacaoMedia}/5
                </div>
              </div>
            </div>

            {/* Seção de Matches Recentes */}
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#374151', margin: 0 }}>🤝 Matches Recentes</h2>
                <Button 
                  onClick={() => setAbaAtiva('matches')}
                  variant="secondary"
                  size="small"
                >
                  Ver Todos
                </Button>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {matches.slice(0, 3).map(match => (
                  <div key={match.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        backgroundColor: match.tipo === 'imobiliaria' ? '#dbeafe' : '#f0fdf4',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '1.25rem'
                      }}>
                        {match.tipo === 'imobiliaria' ? '🏢' : '🏗️'}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', color: '#374151' }}>
                          {match.nome}
                        </h4>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                          {match.cidade} - {match.estado} • {match.especialidades.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          padding: '0.25rem 0.75rem', 
                          backgroundColor: match.status === 'ativo' ? '#d1fae5' : 
                                         match.status === 'pendente' ? '#fef3c7' : '#fecaca',
                          color: match.status === 'ativo' ? '#065f46' : 
                                match.status === 'pendente' ? '#92400e' : '#dc2626',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {match.status === 'ativo' ? 'Ativo' : 
                           match.status === 'pendente' ? 'Pendente' : 'Recusado'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                          Match: {match.matchScore}%
                        </div>
                      </div>
                      
                      {match.status === 'pendente' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Button 
                            onClick={() => aceitarMatch(match.id)}
                            variant="success"
                            size="small"
                          >
                            ✓
                          </Button>
                          <Button 
                            onClick={() => recusarMatch(match.id)}
                            variant="danger"
                            size="small"
                          >
                            ×
                          </Button>
                        </div>
                      )}
                      
                      {match.status === 'ativo' && (
                        <Button 
                          onClick={() => desativarMatch(match.id)}
                          variant="secondary"
                          size="small"
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
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ color: '#374151', margin: '0 0 1.5rem 0' }}>🚀 Ações Rápidas</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <Button variant="primary" style={{ justifyContent: 'center' }}>
                  📋 Cadastrar Imóvel
                </Button>
                <Button variant="secondary" style={{ justifyContent: 'center' }}>
                  👥 Novo Cliente
                </Button>
                <Button variant="secondary" style={{ justifyContent: 'center' }}>
                  🤝 Buscar Matches
                </Button>
                <Button variant="secondary" style={{ justifyContent: 'center' }}>
                  📊 Gerar Relatório
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Aba Matches */}
        {abaAtiva === 'matches' && (
          <div>
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ color: '#374151', margin: '0 0 1.5rem 0' }}>🤝 Sistema de Matches</h2>
              
              {/* Filtros */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <Button 
                  variant={matchesPendentes.length > 0 ? "primary" : "secondary"}
                  size="small"
                >
                  Pendentes ({matchesPendentes.length})
                </Button>
                <Button variant="secondary" size="small">
                  Ativos ({matchesAtivos.length})
                </Button>
                <Button variant="secondary" size="small">
                  Todos ({matches.length})
                </Button>
              </div>

              {/* Lista de Matches */}
              <div style={{ display: 'grid', gap: '1rem' }}>
                {matches.map(match => (
                  <div key={match.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <div style={{
                        backgroundColor: match.tipo === 'imobiliaria' ? '#dbeafe' : '#f0fdf4',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        fontSize: '1.5rem'
                      }}>
                        {match.tipo === 'imobiliaria' ? '🏢' : '🏗️'}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <h4 style={{ margin: 0, color: '#374151' }}>
                            {match.nome}
                          </h4>
                          <div style={{ 
                            padding: '0.25rem 0.75rem', 
                            backgroundColor: match.status === 'ativo' ? '#d1fae5' : 
                                           match.status === 'pendente' ? '#fef3c7' : '#fecaca',
                            color: match.status === 'ativo' ? '#065f46' : 
                                  match.status === 'pendente' ? '#92400e' : '#dc2626',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            {match.status === 'ativo' ? 'Ativo' : 
                             match.status === 'pendente' ? 'Pendente' : 
                             match.status === 'recusado' ? 'Recusado' : 'Desativado'}
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#6b7280', flexWrap: 'wrap' }}>
                          <div>
                            <strong>Localização:</strong> {match.cidade} - {match.estado}
                          </div>
                          <div>
                            <strong>Especialidades:</strong> {match.especialidades.join(', ')}
                          </div>
                          <div>
                            <strong>Avaliação:</strong> {match.avaliacao} ⭐ ({match.totalAvaliacoes})
                          </div>
                          <div>
                            <strong>Match Score:</strong> {match.matchScore}%
                          </div>
                        </div>
                        
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                          Match realizado em: {new Date(match.dataMatch).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {match.status === 'pendente' && (
                        <>
                          <Button 
                            onClick={() => aceitarMatch(match.id)}
                            variant="success"
                          >
                            Aceitar Match
                          </Button>
                          <Button 
                            onClick={() => recusarMatch(match.id)}
                            variant="danger"
                          >
                            Recusar
                          </Button>
                        </>
                      )}
                      
                      {match.status === 'ativo' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <Button variant="primary" size="small">
                            💬 Chat
                          </Button>
                          <Button 
                            onClick={() => desativarMatch(match.id)}
                            variant="danger"
                            size="small"
                          >
                            Desativar Match
                          </Button>
                        </div>
                      )}
                      
                      {(match.status === 'recusado' || match.status === 'desativado') && (
                        <Button variant="secondary" size="small">
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
        {(abaAtiva === 'imoveis' || abaAtiva === 'clientes' || abaAtiva === 'relatorios') && (
          <div style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {abaAtiva === 'imoveis' ? '🏠' : 
               abaAtiva === 'clientes' ? '👥' : '📋'}
            </div>
            <h2 style={{ color: '#374151', margin: '0 0 1rem 0' }}>
              {abaAtiva === 'imoveis' ? 'Gestão de Imóveis' : 
               abaAtiva === 'clientes' ? 'Gestão de Clientes' : 'Relatórios e Analytics'}
            </h2>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Esta funcionalidade está em desenvolvimento e será implementada em breve!
            </p>
            <Button 
              onClick={() => setAbaAtiva('overview')}
              variant="primary"
              style={{ marginTop: '1.5rem' }}
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