import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Input from "../common/Input";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";

// Interface para certificados
interface Certificado {
  id: string;
  nome: string;
  arquivoUrl: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  file?: File; // Para upload temporário
}

// Interface para especializações com certificados
interface Especializacao {
  id: string;
  nome: string;
  certificados: Certificado[];
  createdAt: string;
}

// Interface para dados do perfil do corretor
interface CorretorProfileData {
  id: string;
  userId: string;
  nomeCompleto: string;
  cpf: string;
  creci: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  bio: string;
  especializacoes: Especializacao[];
  experienciaAnos: number;
  valorMedioVenda: number;
  idiomas: string[];
  disponibilidade: string;
  fotoUrl: string;
  curriculoUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Interface para props do componente
interface CorretorProfileProps {
  onBack: () => void;
}

/**
 * Componente principal do Perfil do Corretor
 * - Gerencia informações pessoais e profissionais
 * - Upload de foto e currículo
 * - Especializações com certificados
 * - Informações básicas e profissionais
 */
const CorretorProfile: React.FC<CorretorProfileProps> = ({ onBack }) => {
  // Contextos de autenticação e loading
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();
  
  // Estado do perfil
  const [profile, setProfile] = useState<CorretorProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para uploads principais
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [curriculoFile, setCurriculoFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Estado do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    creci: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    bio: "",
    experienciaAnos: 0,
    valorMedioVenda: 0,
    disponibilidade: "meio-periodo"
  });

  // Estados para arrays dinâmicos
  const [especializacoes, setEspecializacoes] = useState<Especializacao[]>([]);
  const [novaEspecializacao, setNovaEspecializacao] = useState("");
  const [idiomas, setIdiomas] = useState<string[]>([]);
  const [novoIdioma, setNovoIdioma] = useState("");

  // Estado para certificados em upload
  const [certificadosLoading, setCertificadosLoading] = useState<{[key: string]: boolean}>({});

  /**
   * Função para buscar endereço pelo CEP
   */
  const buscarEnderecoPorCEP = async (cep: string) => {
    // Limpar CEP - remover caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length === 8) {
      try {
        setLoading(true);
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            endereco: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
          console.log("✅ Endereço encontrado via CEP");
        } else {
          console.log("❌ CEP não encontrado");
        }
      } catch (error) {
        console.error("❌ Erro ao buscar CEP:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * Efeito para carregar dados do perfil ao montar componente
   */
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para demonstração
      const mockProfile: CorretorProfileData = {
        id: "1",
        userId: user?.id || "1",
        nomeCompleto: user?.name || "",
        cpf: "123.456.789-00",
        creci: "123456F",
        telefone: "(11) 99999-9999",
        cep: "01311-000",
        endereco: "Avenida Paulista",
        numero: "1000",
        complemento: "Sala 101",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        bio: "Corretor especializado em imóveis residenciais e comerciais com mais de 5 anos de experiência no mercado.",
        especializacoes: [
          {
            id: "1",
            nome: "Residencial",
            certificados: [
              {
                id: "1",
                nome: "Certificado Especialização Residencial.pdf",
                arquivoUrl: "",
                tipo: "application/pdf",
                tamanho: 2048576,
                dataUpload: new Date().toISOString()
              }
            ],
            createdAt: new Date().toISOString()
          },
          {
            id: "2",
            nome: "Comercial",
            certificados: [],
            createdAt: new Date().toISOString()
          },
          {
            id: "3",
            nome: "Lançamentos",
            certificados: [],
            createdAt: new Date().toISOString()
          }
        ],
        experienciaAnos: 5,
        valorMedioVenda: 500000,
        idiomas: ["Português", "Inglês"],
        disponibilidade: "integral",
        fotoUrl: "",
        curriculoUrl: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Atualizar estados com dados mockados
      setProfile(mockProfile);
      setFormData({
        nomeCompleto: mockProfile.nomeCompleto,
        cpf: mockProfile.cpf,
        creci: mockProfile.creci,
        telefone: mockProfile.telefone,
        cep: mockProfile.cep,
        endereco: mockProfile.endereco,
        numero: mockProfile.numero,
        complemento: mockProfile.complemento,
        bairro: mockProfile.bairro,
        cidade: mockProfile.cidade,
        estado: mockProfile.estado,
        bio: mockProfile.bio,
        experienciaAnos: mockProfile.experienciaAnos,
        valorMedioVenda: mockProfile.valorMedioVenda,
        disponibilidade: mockProfile.disponibilidade
      });
      setEspecializacoes(mockProfile.especializacoes);
      setIdiomas(mockProfile.idiomas);
      setLoading(false);
    };

    if (user) {
      loadProfile();
    }
  }, [user, setLoading]);

  /**
   * Handler para mudanças em inputs de texto
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handler para mudanças em inputs numéricos
   */
  const handleNumberChange = (field: string, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value);
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  /**
   * Handler específico para CEP - busca automática do endereço
   */
  const handleCepChange = (value: string) => {
    setFormData(prev => ({ ...prev, cep: value }));
    
    // Buscar endereço quando CEP estiver completo
    if (value.replace(/\D/g, '').length === 8) {
      buscarEnderecoPorCEP(value);
    }
  };

  /**
   * Adiciona uma nova especialização à lista
   */
  const addEspecializacao = () => {
    if (novaEspecializacao.trim() && !especializacoes.some(esp => esp.nome === novaEspecializacao.trim())) {
      const novaEspecializacaoObj: Especializacao = {
        id: Date.now().toString(),
        nome: novaEspecializacao.trim(),
        certificados: [],
        createdAt: new Date().toISOString()
      };
      setEspecializacoes(prev => [...prev, novaEspecializacaoObj]);
      setNovaEspecializacao("");
    }
  };

  /**
   * Remove uma especialização da lista
   */
  const removeEspecializacao = (index: number) => {
    setEspecializacoes(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Adiciona certificado a uma especialização
   */
  const addCertificado = async (especializacaoId: string, file: File) => {
    setCertificadosLoading(prev => ({ ...prev, [especializacaoId]: true }));
    
    // Simular upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const novoCertificado: Certificado = {
      id: Date.now().toString(),
      nome: file.name,
      arquivoUrl: "",
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      file: file
    };
    
    setEspecializacoes(prev => 
      prev.map(esp => 
        esp.id === especializacaoId 
          ? { ...esp, certificados: [...esp.certificados, novoCertificado] }
          : esp
      )
    );
    
    console.log(`✅ Certificado adicionado à especialização: ${file.name}`);
    setCertificadosLoading(prev => ({ ...prev, [especializacaoId]: false }));
  };

  /**
   * Remove certificado de uma especialização
   */
  const removeCertificado = (especializacaoId: string, certificadoId: string) => {
    setEspecializacoes(prev => 
      prev.map(esp => 
        esp.id === especializacaoId 
          ? { ...esp, certificados: esp.certificados.filter(cert => cert.id !== certificadoId) }
          : esp
      )
    );
    console.log(`🗑️ Certificado removido`);
  };

  /**
   * Adiciona um novo idioma à lista
   */
  const addIdioma = () => {
    if (novoIdioma.trim() && !idiomas.includes(novoIdioma.trim())) {
      setIdiomas(prev => [...prev, novoIdioma.trim()]);
      setNovoIdioma("");
    }
  };

  /**
   * Remove um idioma da lista
   */
  const removeIdioma = (index: number) => {
    setIdiomas(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Handler para upload de foto
   */
  const handleFotoUpload = async (file: File) => {
    setUploadLoading(true);
    setFotoFile(file);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("✅ Foto enviada:", file.name);
    setUploadLoading(false);
  };

  const handleFotoRemove = () => {
    console.log("🗑️ Foto removida");
    setFotoFile(null);
  };

  /**
   * Handler para upload de currículo
   */
  const handleCurriculoUpload = async (file: File) => {
    setUploadLoading(true);
    setCurriculoFile(file);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("✅ Currículo enviado:", file.name);
    setUploadLoading(false);
  };

  const handleCurriculoRemove = () => {
    console.log("🗑️ Currículo removido");
    setCurriculoFile(null);
  };

  /**
   * Handler para salvar perfil completo
   */
  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedProfile: CorretorProfileData = {
      ...profile!,
      ...formData,
      especializacoes,
      idiomas,
      updatedAt: new Date().toISOString()
    };
    
    setProfile(updatedProfile);
    setIsEditing(false);
    setLoading(false);
    
    console.log("💾 Perfil salvo:", updatedProfile);
  };

  /**
   * Handler para cancelar edição
   */
  const handleCancel = () => {
    if (profile) {
      setFormData({
        nomeCompleto: profile.nomeCompleto,
        cpf: profile.cpf,
        creci: profile.creci,
        telefone: profile.telefone,
        cep: profile.cep,
        endereco: profile.endereco,
        numero: profile.numero,
        complemento: profile.complemento,
        bairro: profile.bairro,
        cidade: profile.cidade,
        estado: profile.estado,
        bio: profile.bio,
        experienciaAnos: profile.experienciaAnos,
        valorMedioVenda: profile.valorMedioVenda,
        disponibilidade: profile.disponibilidade
      });
      setEspecializacoes(profile.especializacoes);
      setIdiomas(profile.idiomas);
    }
    setIsEditing(false);
  };

  // Loading state durante carregamento inicial
  if (loading && !profile) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "400px" 
      }}>
        <div>Carregando perfil...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      {/* Header do Perfil */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "2rem" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button onClick={onBack} variant="secondary">
            ← Voltar para Dashboard
          </Button>
          <div>
            <h1 style={{ color: "#2563eb", margin: "0 0 0.5rem 0" }}>
              👤 Meu Perfil
            </h1>
            <p style={{ color: "#6b7280", margin: 0 }}>
              Gerencie suas informações profissionais
            </p>
          </div>
        </div>
        
        {/* Botões de Ação */}
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="primary">
            ✏️ Editar Perfil
          </Button>
        ) : (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button onClick={handleCancel} variant="secondary">
              ❌ Cancelar
            </Button>
            <Button onClick={handleSave} loading={loading} variant="success">
              💾 Salvar Alterações
            </Button>
          </div>
        )}
      </div>

      {/* ========== SEÇÃO 1: UPLOAD DE FOTO E DOCUMENTOS ========== */}
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "2rem", 
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        marginBottom: "2rem",
        border: "1px solid #e5e7eb"
      }}>
        <h2 style={{ color: "#374151", margin: "0 0 1.5rem 0" }}>
          📸 Foto e Documentos
        </h2>
        
        <FileUpload
          label="Foto de Perfil"
          accept="image/*"
          currentFileUrl={profile?.fotoUrl}
          onFileSelect={handleFotoUpload}
          onFileRemove={handleFotoRemove}
          helperText="Formatos: JPG, PNG, GIF. Tamanho máximo: 5MB"
          loading={uploadLoading}
        />
        
        <FileUpload
          label="Currículo Profissional"
          accept=".pdf,.doc,.docx"
          currentFileUrl={profile?.curriculoUrl}
          onFileSelect={handleCurriculoUpload}
          onFileRemove={handleCurriculoRemove}
          helperText="Formatos: PDF, DOC, DOCX. Tamanho máximo: 10MB"
          loading={uploadLoading}
        />
      </div>

      {/* ========== SEÇÃO 2: INFORMAÇÕES BÁSICAS ========== */}
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "2rem", 
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        marginBottom: "2rem",
        border: "1px solid #e5e7eb"
      }}>
        <h2 style={{ color: "#374151", margin: "0 0 1.5rem 0" }}>
          📋 Informações Básicas
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <Input
            label="Nome Completo"
            value={formData.nomeCompleto}
            onChange={(value) => handleInputChange("nomeCompleto", value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="CPF"
            value={formData.cpf}
            onChange={(value) => handleInputChange("cpf", value)}
            disabled={!isEditing}
            placeholder="000.000.000-00"
          />
          
          <Input
            label="CRECI"
            value={formData.creci}
            onChange={(value) => handleInputChange("creci", value)}
            disabled={!isEditing}
            placeholder="123456F"
            required
          />
          
          <Input
            label="Telefone"
            value={formData.telefone}
            onChange={(value) => handleInputChange("telefone", value)}
            disabled={!isEditing}
            placeholder="(11) 99999-9999"
          />
        </div>
        
        {/* NOVO: SEÇÃO DE ENDEREÇO COM CEP */}
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ color: "#374151", margin: "0 0 1rem 0", fontSize: "1.125rem" }}>
            📍 Endereço
          </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem", marginBottom: "1rem" }}>
            <Input
              label="CEP"
              value={formData.cep}
              onChange={handleCepChange}
              disabled={!isEditing}
              placeholder="00000-000"
              helperText="Digite o CEP para buscar o endereço automaticamente"
            />
            
            <Input
              label="Endereço"
              value={formData.endereco}
              onChange={(value) => handleInputChange("endereco", value)}
              disabled={!isEditing}
              placeholder="Rua, Avenida, etc."
            />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr", gap: "1.5rem", marginBottom: "1rem" }}>
            <Input
              label="Número"
              value={formData.numero}
              onChange={(value) => handleInputChange("numero", value)}
              disabled={!isEditing}
              placeholder="123"
            />
            
            <Input
              label="Complemento"
              value={formData.complemento}
              onChange={(value) => handleInputChange("complemento", value)}
              disabled={!isEditing}
              placeholder="Apartamento, Sala, etc."
            />
            
            <Input
              label="Bairro"
              value={formData.bairro}
              onChange={(value) => handleInputChange("bairro", value)}
              disabled={!isEditing}
              placeholder="Centro"
            />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
            <Input
              label="Cidade"
              value={formData.cidade}
              onChange={(value) => handleInputChange("cidade", value)}
              disabled={!isEditing}
              placeholder="São Paulo"
            />
            
            <Input
              label="Estado"
              value={formData.estado}
              onChange={(value) => handleInputChange("estado", value)}
              disabled={!isEditing}
              placeholder="SP"
            />
          </div>
        </div>
      </div>

      {/* ========== SEÇÃO 3: INFORMAÇÕES PROFISSIONAIS ========== */}
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "2rem", 
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        marginBottom: "2rem",
        border: "1px solid #e5e7eb"
      }}>
        <h2 style={{ color: "#374151", margin: "0 0 1.5rem 0" }}>
          💼 Informações Profissionais
        </h2>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
            Biografia Profissional
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            disabled={!isEditing}
            rows={4}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: !isEditing ? "#f9fafb" : "#fff",
              color: !isEditing ? "#6b7280" : "#000",
              fontSize: "1rem",
              resize: "vertical"
            }}
            placeholder="Descreva sua experiência, especialidades e abordagem profissional..."
          />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
              Experiência (anos)
            </label>
            <input
              type="number"
              value={formData.experienciaAnos}
              onChange={(e) => handleNumberChange("experienciaAnos", e.target.value)}
              disabled={!isEditing}
              min="0"
              max="50"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: !isEditing ? "#f9fafb" : "#fff",
                color: !isEditing ? "#6b7280" : "#000",
                fontSize: "1rem"
              }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
              Valor Médio de Venda (R$)
            </label>
            <input
              type="number"
              value={formData.valorMedioVenda}
              onChange={(e) => handleNumberChange("valorMedioVenda", e.target.value)}
              disabled={!isEditing}
              min="0"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: !isEditing ? "#f9fafb" : "#fff",
                color: !isEditing ? "#6b7280" : "#000",
                fontSize: "1rem"
              }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
            Disponibilidade
          </label>
          <select
            value={formData.disponibilidade}
            onChange={(e) => handleInputChange("disponibilidade", e.target.value)}
            disabled={!isEditing}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: !isEditing ? "#f9fafb" : "#fff",
              color: !isEditing ? "#6b7280" : "#000",
              fontSize: "1rem"
            }}
          >
            <option value="meio-periodo">Meio Período</option>
            <option value="integral">Período Integral</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
      </div>

      {/* ========== SEÇÃO 4: ESPECIALIZAÇÕES COM CERTIFICADOS ========== */}
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "2rem", 
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        marginBottom: "2rem",
        border: "1px solid #e5e7eb"
      }}>
        <h2 style={{ color: "#374151", margin: "0 0 1.5rem 0" }}>
          🎓 Especializações e Certificados
        </h2>
        
        {/* Lista de Especializações */}
        {especializacoes.map((especializacao, index) => (
          <div key={especializacao.id} style={{ 
            marginBottom: "2rem",
            padding: "1.5rem",
            backgroundColor: "#f8fafc",
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb"
          }}>
            {/* Nome da Especialização */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <h3 style={{ margin: 0, color: "#374151" }}>
                {especializacao.nome}
              </h3>
              {isEditing && (
                <Button 
                  onClick={() => removeEspecializacao(index)}
                  variant="danger"
                  size="small"
                >
                  🗑️ Remover
                </Button>
              )}
            </div>

            {/* Certificados da Especialização */}
            <div style={{ marginBottom: "1rem" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "#6b7280", fontSize: "0.875rem" }}>
                Certificados ({especializacao.certificados.length}/2):
              </h4>
              
              {/* Lista de Certificados */}
              {especializacao.certificados.map((certificado) => (
                <div key={certificado.id} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem",
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  marginBottom: "0.5rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>📄</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: "500", color: "#374151" }}>
                        {certificado.nome}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280" }}>
                        {(certificado.tamanho / 1024 / 1024).toFixed(2)} MB • {certificado.tipo}
                      </p>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <Button 
                      onClick={() => removeCertificado(especializacao.id, certificado.id)}
                      variant="danger"
                      size="small"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              
              {/* Upload de Certificado (apenas no modo edição e se menos de 2 certificados) */}
              {isEditing && especializacao.certificados.length < 2 && (
                <FileUpload
                  label=""
                  accept=".pdf,.jpg,.jpeg,.png"
                  onFileSelect={(file) => addCertificado(especializacao.id, file)}
                  onFileRemove={() => {}}
                  helperText="Formatos: PDF, JPG, PNG. Tamanho máximo: 5MB"
                  loading={certificadosLoading[especializacao.id]}
                />
              )}
            </div>
          </div>
        ))}
        
        {/* Adicionar Nova Especialização (apenas no modo edição) */}
        {isEditing && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
            <Input
              label="Nova Especialização"
              value={novaEspecializacao}
              onChange={setNovaEspecializacao}
              placeholder="Ex: Residencial, Comercial, Lançamentos..."
              style={{ flex: 1 }}
            />
            <Button 
              onClick={addEspecializacao} 
              variant="secondary"
            >
              ➕ Adicionar Especialização
            </Button>
          </div>
        )}
      </div>

      {/* ========== SEÇÃO 5: IDIOMAS ========== */}
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "2rem", 
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        border: "1px solid #e5e7eb"
      }}>
        <h2 style={{ color: "#374151", margin: "0 0 1.5rem 0" }}>
          🌐 Idiomas
        </h2>
        
        {/* Lista de Idiomas */}
        <div style={{ marginBottom: "1rem" }}>
          {idiomas.map((idioma, index) => (
            <div key={index} style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#f0fdf4",
              color: "#166534",
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
              margin: "0 0.5rem 0.5rem 0",
              fontSize: "0.875rem"
            }}>
              {idioma}
              {isEditing && (
                <button
                  onClick={() => removeIdioma(index)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    marginLeft: "0.5rem",
                    cursor: "pointer",
                    fontSize: "1rem"
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Adicionar Novo Idioma (apenas no modo edição) */}
        {isEditing && (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input
              label=""
              value={novoIdioma}
              onChange={setNovoIdioma}
              placeholder="Novo idioma (ex: Inglês, Espanhol...)"
              style={{ flex: 1 }}
            />
            <Button 
              onClick={addIdioma} 
              variant="secondary"
              style={{ alignSelf: "flex-end" }}
            >
              ➕ Adicionar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorretorProfile;