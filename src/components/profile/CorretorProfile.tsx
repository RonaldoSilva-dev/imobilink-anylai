import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Input from "../common/Input";
import Button from "../common/Button";
import FileUpload from "../FileUpload";

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

  // Estados para uploads principais (agora usamos apenas quando necessário)
  // Removemos a declaração não utilizada de curriculoFile
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
    disponibilidade: "meio-periodo",
  });

  // Estados para arrays dinâmicos
  const [especializacoes, setEspecializacoes] = useState<Especializacao[]>([]);
  const [novaEspecializacao, setNovaEspecializacao] = useState("");
  const [idiomas, setIdiomas] = useState<string[]>([]);
  const [novoIdioma, setNovoIdioma] = useState("");

  // Estado para certificados em upload
  const [certificadosLoading, setCertificadosLoading] = useState<{
    [key: string]: boolean;
  }>({});

  /**
   * Função para buscar endereço pelo CEP
   */
  const buscarEnderecoPorCEP = async (cep: string) => {
    // Limpar CEP - remover caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
      try {
        setLoading(true);
        const response = await fetch(
          `https://viacep.com.br/ws/${cepLimpo}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            endereco: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
                dataUpload: new Date().toISOString(),
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            nome: "Comercial",
            certificados: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            nome: "Lançamentos",
            certificados: [],
            createdAt: new Date().toISOString(),
          },
        ],
        experienciaAnos: 5,
        valorMedioVenda: 500000,
        idiomas: ["Português", "Inglês"],
        disponibilidade: "integral",
        fotoUrl: "",
        curriculoUrl: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        disponibilidade: mockProfile.disponibilidade,
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handler para mudanças em inputs numéricos
   */
  const handleNumberChange = (field: string, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value);
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  /**
   * Handler específico para CEP - busca automática do endereço
   */
  const handleCepChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cep: value }));

    // Buscar endereço quando CEP estiver completo
    if (value.replace(/\D/g, "").length === 8) {
      buscarEnderecoPorCEP(value);
    }
  };

  /**
   * Adiciona uma nova especialização à lista
   */
  const addEspecializacao = () => {
    if (
      novaEspecializacao.trim() &&
      !especializacoes.some((esp) => esp.nome === novaEspecializacao.trim())
    ) {
      const novaEspecializacaoObj: Especializacao = {
        id: Date.now().toString(),
        nome: novaEspecializacao.trim(),
        certificados: [],
        createdAt: new Date().toISOString(),
      };
      setEspecializacoes((prev) => [...prev, novaEspecializacaoObj]);
      setNovaEspecializacao("");
    }
  };

  /**
   * Remove uma especialização da lista
   */
  const removeEspecializacao = (index: number) => {
    setEspecializacoes((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Adiciona certificado a uma especialização
   */
  const addCertificado = async (especializacaoId: string, file: File) => {
    setCertificadosLoading((prev) => ({ ...prev, [especializacaoId]: true }));

    // Simular upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const novoCertificado: Certificado = {
      id: Date.now().toString(),
      nome: file.name,
      arquivoUrl: "",
      tipo: file.type,
      tamanho: file.size,
      dataUpload: new Date().toISOString(),
      file: file,
    };

    setEspecializacoes((prev) =>
      prev.map((esp) =>
        esp.id === especializacaoId
          ? { ...esp, certificados: [...esp.certificados, novoCertificado] }
          : esp,
      ),
    );

    console.log(`✅ Certificado adicionado à especialização: ${file.name}`);
    setCertificadosLoading((prev) => ({ ...prev, [especializacaoId]: false }));
  };

  /**
   * Remove certificado de uma especialização
   */
  const removeCertificado = (
    especializacaoId: string,
    certificadoId: string,
  ) => {
    setEspecializacoes((prev) =>
      prev.map((esp) =>
        esp.id === especializacaoId
          ? {
              ...esp,
              certificados: esp.certificados.filter(
                (cert) => cert.id !== certificadoId,
              ),
            }
          : esp,
      ),
    );
    console.log(`🗑️ Certificado removido`);
  };

  /**
   * Adiciona um novo idioma à lista
   */
  const addIdioma = () => {
    if (novoIdioma.trim() && !idiomas.includes(novoIdioma.trim())) {
      setIdiomas((prev) => [...prev, novoIdioma.trim()]);
      setNovoIdioma("");
    }
  };

  /**
   * Remove um idioma da lista
   */
  const removeIdioma = (index: number) => {
    setIdiomas((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Handler para upload de foto
   */
  const handleFotoUpload = async (file: File) => {
    setUploadLoading(true);
    // Aqui você pode usar a variável se necessário
    // const fotoFile = file; // Opcional: armazenar se precisar depois
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("✅ Foto enviada:", file.name);
    setUploadLoading(false);
  };

  const handleFotoRemove = () => {
    console.log("🗑️ Foto removida");
    // Se você precisar limpar o estado de foto, pode adicionar aqui
  };

  /**
   * Handler para upload de currículo
   */
  const handleCurriculoUpload = async (file: File) => {
    setUploadLoading(true);
    // Aqui você pode usar a variável se necessário
    // const curriculoFile = file; // Opcional: armazenar se precisar depois
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("✅ Currículo enviado:", file.name);
    setUploadLoading(false);
  };

  const handleCurriculoRemove = () => {
    console.log("🗑️ Currículo removido");
    // Se você precisar limpar o estado de currículo, pode adicionar aqui
  };

  /**
   * Handler para salvar perfil completo
   */
  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const updatedProfile: CorretorProfileData = {
      ...profile!,
      ...formData,
      especializacoes,
      idiomas,
      updatedAt: new Date().toISOString(),
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
        disponibilidade: profile.disponibilidade,
      });
      setEspecializacoes(profile.especializacoes);
      setIdiomas(profile.idiomas);
    }
    setIsEditing(false);
  };

  // Loading state durante carregamento inicial
  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-gray-700 text-lg">Carregando perfil...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Container principal */}
      <div className="max-w-7xl mx-auto">
        {/* Header do Perfil */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="secondary"
                className="flex-shrink-0"
              >
                ← Voltar para Dashboard
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  👤 Meu Perfil
                </h1>
                <p className="text-gray-600 mt-1">
                  Gerencie suas informações profissionais
                </p>
              </div>
            </div>

            {/* Botões de Ação */}
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="primary"
                className="w-full sm:w-auto mt-4 sm:mt-0"
              >
                ✏️ Editar Perfil
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Button
                  onClick={handleCancel}
                  variant="secondary"
                  className="flex-1 sm:flex-none"
                >
                  ❌ Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  loading={loading}
                  variant="success"
                  className="flex-1 sm:flex-none"
                >
                  💾 Salvar Alterações
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Layout em duas colunas para desktop, uma para mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda: Foto e Documentos */}
          <div className="lg:col-span-1 space-y-6">
            {/* Seção 1: UPLOAD DE FOTO E DOCUMENTOS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📸 Foto e Documentos
              </h2>

              <div className="space-y-4">
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
            </div>

            {/* Seção 5: IDIOMAS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                🌐 Idiomas
              </h2>

              {/* Lista de Idiomas */}
              <div className="mb-4">
                {idiomas.map((idioma, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {idioma}
                    {isEditing && (
                      <button
                        onClick={() => removeIdioma(index)}
                        className="ml-2 text-emerald-600 hover:text-emerald-800 text-lg font-bold"
                        aria-label={`Remover idioma ${idioma}`}
                        type="button"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Adicionar Novo Idioma (apenas no modo edição) */}
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    label=""
                    value={novoIdioma}
                    onChange={setNovoIdioma}
                    placeholder="Novo idioma (ex: Inglês, Espanhol...)"
                    className="flex-1"
                  />
                  <Button
                    onClick={addIdioma}
                    variant="secondary"
                    className="self-end"
                  >
                    ➕ Adicionar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Coluna direita: Informações principais (2/3 da tela) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seção 2: INFORMAÇÕES BÁSICAS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                📋 Informações Básicas
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

              {/* Seção de Endereço com CEP */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  📍 Endereço
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    onChange={(value) =>
                      handleInputChange("complemento", value)
                    }
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Seção 3: INFORMAÇÕES PROFISSIONAIS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                💼 Informações Profissionais
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biografia Profissional
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed resize-y"
                  placeholder="Descreva sua experiência, especialidades e abordagem profissional..."
                  aria-label="Biografia profissional"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiência (anos)
                  </label>
                  <input
                    type="number"
                    value={formData.experienciaAnos}
                    onChange={(e) =>
                      handleNumberChange("experienciaAnos", e.target.value)
                    }
                    disabled={!isEditing}
                    min="0"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label="Anos de experiência"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Médio de Venda (R$)
                  </label>
                  <input
                    type="number"
                    value={formData.valorMedioVenda}
                    onChange={(e) =>
                      handleNumberChange("valorMedioVenda", e.target.value)
                    }
                    disabled={!isEditing}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label="Valor médio de venda em reais"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="disponibilidade"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Disponibilidade
                </label>
                <select
                  id="disponibilidade"
                  value={formData.disponibilidade}
                  onChange={(e) =>
                    handleInputChange("disponibilidade", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  aria-label="Selecione sua disponibilidade de trabalho"
                >
                  <option value="meio-periodo">Meio Período</option>
                  <option value="integral">Período Integral</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
            </div>

            {/* Seção 4: ESPECIALIZAÇÕES COM CERTIFICADOS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                🎓 Especializações e Certificados
              </h2>

              {/* Lista de Especializações */}
              <div className="space-y-4">
                {especializacoes.map((especializacao, index) => (
                  <div
                    key={especializacao.id}
                    className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                  >
                    {/* Nome da Especialização */}
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900">
                        {especializacao.nome}
                      </h3>
                      {isEditing && (
                        <Button
                          onClick={() => removeEspecializacao(index)}
                          variant="danger"
                          size="small"
                          aria-label={`Remover especialização ${especializacao.nome}`}
                        >
                          🗑️ Remover
                        </Button>
                      )}
                    </div>

                    {/* Certificados da Especialização */}
                    <div className="mb-3">
                      <h4 className="text-sm text-gray-600 mb-2">
                        Certificados ({especializacao.certificados.length}/2):
                      </h4>

                      {/* Lista de Certificados */}
                      {especializacao.certificados.map((certificado) => (
                        <div
                          key={certificado.id}
                          className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-3 mb-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">📄</span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {certificado.nome}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(certificado.tamanho / 1024 / 1024).toFixed(2)}{" "}
                                MB • {certificado.tipo}
                              </p>
                            </div>
                          </div>

                          {isEditing && (
                            <Button
                              onClick={() =>
                                removeCertificado(
                                  especializacao.id,
                                  certificado.id,
                                )
                              }
                              variant="danger"
                              size="small"
                              aria-label={`Remover certificado ${certificado.nome}`}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}

                      {/* Upload de Certificado */}
                      {isEditing && especializacao.certificados.length < 2 && (
                        <FileUpload
                          label=""
                          accept=".pdf,.jpg,.jpeg,.png"
                          onFileSelect={(file) =>
                            addCertificado(especializacao.id, file)
                          }
                          onFileRemove={() => {}}
                          helperText="Formatos: PDF, JPG, PNG. Tamanho máximo: 5MB"
                          loading={certificadosLoading[especializacao.id]}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Adicionar Nova Especialização */}
              {isEditing && (
                <div className="flex gap-3 items-end mt-6">
                  <Input
                    label="Nova Especialização"
                    value={novaEspecializacao}
                    onChange={setNovaEspecializacao}
                    placeholder="Ex: Residencial, Comercial, Lançamentos..."
                    className="flex-1"
                  />
                  <Button onClick={addEspecializacao} variant="secondary">
                    ➕ Adicionar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorretorProfile;
