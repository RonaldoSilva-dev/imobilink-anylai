PADRÕES ADOTADOS - PROJETO IMOBILINK-ANYLAI
1. NOSSA NOMENCLATURA
COMPONENTES (PascalCase):
CorretorDashboard, LoginForm, UserTypeTabs

MatchCard, StatsCard, QuickActions

FileUpload, FilePreview, CorretorProfile

PASTAS (camelCase) - PADRÃO REACT:
components/, hooks/, utils/, types/, contexts/, routers/

auth/, dashboard/, fileUpload/, profile/, common/

login/, register/ (subpastas dentro de auth/)

ARQUIVOS (camelCase para utilitários, PascalCase para componentes):
Utilitários/Hooks: useFileUpload.ts, fileUploadUtils.ts, registerUtils.ts

Componentes: Login.tsx, Register.tsx, CorretorDashboard.tsx

Contextos: authContext.tsx, loadingContext.tsx

Tipos: authTypes.ts, fileUploadTypes.ts, registerTypes.ts

CONSTANTES (SNAKE_CASE_MAIÚSCULO):
MAX_FILE_SIZE = 5 * 1024 * 1024

ACCEPTED_FILE_TYPES = "image/*,.pdf,.doc,.docx"

DEFAULT_EXPERIENCE_OPTIONS = [...]

TIPOS E INTERFACES (PascalCase):
EmpresaMatch, CorretorProfileData, AuthContextType

LoginErrors, RegisterFormData, QuickAction

UserType, AuthTab, DashboardTab

2. NOSSA ESTRUTURA REAL
text
src/
├── components/                    # 👥 Componentes React
│   ├── auth/                     # 🔐 Autenticação
│   │   ├── login/               # 👤 Login de usuários
│   │   │   ├── Login.tsx        # Componente principal
│   │   │   ├── LoginForm.tsx    # Formulário de login
│   │   │   ├── LoginHeader.tsx  # Cabeçalho
│   │   │   ├── LoginTabs.tsx    # Abas de navegação
│   │   │   └── UserTypeTabs.tsx # Seleção de tipo de usuário
│   │   └── register/            # 📝 Registro de novos usuários
│   │       ├── Register.tsx     # Componente principal
│   │       ├── ExperienceSelect.tsx
│   │       ├── PersonalInfoForm.tsx
│   │       ├── RegisterHeader.tsx
│   │       ├── SecurityInfoForm.tsx
│   │       ├── SuccessScreen.tsx
│   │       └── TermsAndConditions.tsx
│   ├── common/                  # 🔄 Componentes compartilhados
│   │   ├── Button.tsx          # Botão reutilizável
│   │   ├── Input.tsx           # Input reutilizável
│   │   ├── LoadingBar.tsx      # Barra de carregamento (Tailwind)
│   │   └── LoadingSpinner.tsx  # Spinner de carregamento
│   ├── dashboard/              # 📊 Dashboard e análises
│   │   ├── CorretorDashboard.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DashboardTabs.tsx
│   │   ├── FeaturePlaceholder.tsx
│   │   ├── GestorDashboard.tsx
│   │   ├── HeaderCorretorDashboard.tsx
│   │   ├── MatchCard.tsx
│   │   ├── QuickActions.tsx
│   │   ├── StatsCard.tsx
│   │   └── WelcomeSection.tsx
│   ├── fileUpload/             # 📁 Upload de arquivos
│   │   ├── FileUpload.tsx      # Componente principal
│   │   ├── FilePreview.tsx     # Preview de arquivos
│   │   └── index.ts           # Barrel exports
│   └── profile/               # 👤 Perfis de usuários
│       └── CorretorProfile.tsx # Perfil do corretor
├── hooks/                     # ⚓ Hooks customizados
│   └── useFileUpload.ts       # Hook para upload de arquivos
├── utils/                     # 🛠️ Utilitários e helpers
│   ├── fileUploadUtils.ts     # Utilitários de upload
│   └── registerUtils.ts       # Utilitários de registro
├── types/                     # 📝 Tipos TypeScript
│   ├── authTypes.ts           # Tipos de autenticação
│   ├── fileUploadTypes.ts     # Tipos de upload
│   └── registerTypes.ts       # Tipos de registro
├── contexts/                  # ⚙️ Contextos React
│   ├── authContext.tsx        # Contexto de autenticação
│   └── loadingContext.tsx     # Contexto de loading
├── routers/                   # 🧭 Roteamento
│   └── AppRouter.tsx          # Roteador principal
├── App.css
├── App.tsx                    # Componente raiz
├── index.css                  # Estilos globais
└── main.tsx                   # Ponto de entrada
3. PADRÕES DE CÓDIGO
3.1 Componentes React (Function Components com TypeScript)
typescript
// Exemplo: Componente bem estruturado
interface ComponentProps {
  title: string;
  value: number;
  onChange?: (value: number) => void;
}

const Component: React.FC<ComponentProps> = ({ 
  title, 
  value, 
  onChange 
}) => {
  // 1. Hooks no topo
  const [state, setState] = useState<Type>();
  const { data, loading } = useCustomHook();
  
  // 2. Handlers organizados
  const handleClick = () => {
    onChange?.(value + 1);
  };
  
  // 3. Render condicional claro
  if (loading) return <LoadingSpinner />;
  
  return (
    // 4. JSX estruturado
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{value}</p>
      <Button onClick={handleClick}>Incrementar</Button>
    </div>
  );
};

export default Component;
3.2 Organização de Imports
typescript
// 1. React e bibliotecas externas
import React, { useState } from 'react';

// 2. Hooks customizados
import { useFileUpload } from '../hooks/useFileUpload';

// 3. Contextos
import { useAuth } from '../contexts/authContext';

// 4. Componentes
import Button from '../common/Button';
import Input from '../common/Input';

// 5. Utilitários
import { validateForm } from '../utils/registerUtils';

// 6. Tipos
import { UserType } from '../types/authTypes';

// 7. Estilos (se necessário)
import './styles.css';
3.3 Convenções de Estilização (Tailwind CSS)
tsx
// Classes organizadas por categoria
<div className="
  // Layout
  flex flex-col items-center justify-center
  
  // Espaçamento
  p-4 md:p-6 lg:p-8
  m-2 mb-4
  
  // Cores e fundo
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  
  // Bordas e sombras
  rounded-lg border border-gray-200
  shadow-sm hover:shadow-md
  
  // Transições
  transition-all duration-200
  
  // Responsividade
  w-full sm:w-auto
">
3.4 Tratamento de Estado
Context API para estado global (auth, loading)

useState para estado local do componente

useReducer para estado complexo (quando necessário)

Custom Hooks para lógica reutilizável (useFileUpload)

4. PADRÕES DE COMMITS
Formato: [tipo]: [descrição]
Tipos:
feat: Nova funcionalidade

fix: Correção de bug

docs: Documentação

style: Formatação/estilo (sem alterar lógica)

refactor: Refatoração de código

test: Adição/ajuste de testes

chore: Atualização de dependências/build

build: Mudanças no sistema de build

Exemplos Baseados no Nosso Projeto:
feat: adiciona sistema de upload de arquivos com preview

fix: corrige validação do formulário de registro

refactor: padroniza estrutura seguindo convenções React

docs: atualiza documentação de padronização

style: converte LoadingBar para Tailwind CSS

chore: reorganiza tipos em pasta dedicada

5. REGRAS DE QUALIDADE
5.1 TypeScript
✅ Sem any - sempre tipar explicitamente

✅ Interfaces para props de componentes

✅ Tipos para dados de API

✅ Enum para valores fixos

✅ Type guards para validação

5.2 Performance
Memoização de componentes quando necessário (React.memo)

Lazy loading para rotas (React.lazy)

Code splitting para bundles grandes

Evitar re-renders desnecessários

5.3 Acessibilidade
Labels adequados para inputs (htmlFor + id)

ARIA attributes quando necessário

Keyboard navigation suportada

Contraste adequado de cores

5.4 Manutenibilidade
Componentes pequenos e focados

Nomes descritivos para funções e variáveis

Comentários apenas para lógica complexa

DRY (Don't Repeat Yourself)

6. PRÁTICAS RECOMENDADAS
6.1 Estrutura de Pastas
bash
# ✅ CORRETO (Padrão React)
components/
  auth/
    login/
      Login.tsx      # PascalCase para componente
  fileUpload/        # camelCase para pasta
    FileUpload.tsx
hooks/              # camelCase para pasta utilitária
  useFileUpload.ts  # camelCase para hook
6.2 Nomenclatura de Arquivos
Componentes: PascalCase.tsx

Hooks: useCamelCase.ts

Utilitários: camelCase.ts

Contextos: camelCase.tsx

Tipos: camelCase.ts

6.3 Imports Relativos
typescript
// ✅ CORRETO (caminhos relativos consistentes)
import Login from '../components/auth/login/Login';
import { useAuth } from '../contexts/authContext';

// ❌ EVITAR (caminhos absolutos complexos)
import Login from 'src/components/auth/login/Login';
7. CHECKLIST DE PADRONIZAÇÃO
Pastas em camelCase (fileUpload/, login/, register/)

Componentes em PascalCase (Login.tsx, Register.tsx)

Hooks em useCamelCase.ts (useFileUpload.ts)

Utilitários em camelCase.ts (fileUploadUtils.ts)

Contextos em camelCase.tsx (authContext.tsx)

Tipos em camelCase.ts (authTypes.ts)

Imports atualizados com caminhos corretos

Wrappers desnecessários removidos

Arquivos backup limpos

TypesScript sem erros de compilação

Versão: 1.0
Última atualização: Janeiro 2026
Baseado na estrutura real do projeto Imobilink-Anylai