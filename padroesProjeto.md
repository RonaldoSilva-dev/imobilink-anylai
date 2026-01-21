# PADRÕES ADOTADOS - PROJETO IMOBILINK

## 1. NOSSA NOMENCLATURA

### COMPONENTES (PascalCase):

- `CorretorDashboard`, `LoginForm`, `UserTypeTabs`
- `MatchCard`, `StatsCard`, `QuickActions`
- `FileUpload`, `FilePreview`, `CorretorProfile`

### ARQUIVOS (camelCase):

- `useFileUpload.ts`, `useAuth.ts`, `useLoading.ts`
- `authContext.tsx`, `loadingContext.tsx`
- `formatFileSize.ts`, `validateFileType.ts`

### CONSTANTES (SNAKE_CASE_MAIÚSCULO):

- `MAX_FILE_SIZE`, `ACCEPTED_FILE_TYPES`, `DEFAULT_EXPERIENCE_OPTIONS`

### TIPOS e INTERFACES (PascalCase):

- `EmpresaMatch`, `CorretorProfileData`, `AuthContextType`
- `LoginErrors`, `RegisterFormData`, `QuickAction`

## 2. NOSSA ESTRUTURA ATUALIZADA

```
src/
├── components/               # 👥 Componentes Reutilizáveis
│   ├── auth/                # Componentes de autenticação
│   │   ├── Login/          # Componentes da tela de login
│   │   │   ├── LoginHeader.tsx
│   │   │   ├── LoginTabs.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── UserTypeTabs.tsx
│   │   │   └── types.ts
│   │   └── Register/       # Componentes da tela de registro
│   │       ├── RegisterHeader.tsx
│   │       ├── PersonalInfoForm.tsx
│   │       ├── SecurityInfoForm.tsx
│   │       ├── SuccessScreen.tsx
│   │       ├── TermsAndConditions.tsx
│   │       ├── utils.ts
│   │       └── types.ts
│   ├── common/             # Componentes compartilhados
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingBar.tsx
│   │   └── LoadingSpinner.tsx
│   ├── dashboard/          # Componentes do dashboard
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
│   ├── FileUpload/         # Componentes de upload de arquivo
│   │   ├── FileUpload.tsx
│   │   ├── FilePreview.tsx
│   │   ├── FileUpload.hooks.ts
│   │   ├── FileUpload.utils.ts
│   │   ├── FileUpload.types.ts
│   │   └── index.ts
│   └── profile/            # Componentes de perfil
│       ├── CorretorProfile.tsx
│       └── modules/        # (Sugestão) Módulos do perfil
│           ├── PersonalInfoSection.tsx
│           ├── ProfessionalInfoSection.tsx
│           ├── SpecializationsSection.tsx
│           ├── LanguagesSection.tsx
│           └── UploadDocumentsSection.tsx
├── contexts/               # ⚙️ Contextos React
│   ├── AuthContext.tsx
│   └── LoadingContext.tsx
├── routers/                # 🧭 Roteamento
│   └── AppRouter.tsx
├── utils/                  # 🛠️ Utilitários
│   ├── fileValidation.ts   # Funções de validação de arquivos
│   ├── formatadores/       # Funções de formatação
│   │   └── formatDate.ts
│   ├── validadores/        # Funções de validação
│   │   └── validateEmail.ts
│   └── api/               # Serviços de API (futuro)
│       ├── corretores.ts
│       └── auth.ts
├── types/                  # 📝 Tipos TypeScript Globais
│   ├── user.ts            # Tipos relacionados a usuários
│   ├── dashboard.ts       # Tipos do dashboard
│   └── common.ts          # Tipos compartilhados
├── hooks/                 # ⚓ Hooks Customizados
│   ├── useAuth.ts
│   ├── useLoading.ts
│   └── useFileUpload.ts
└── styles/               # 🎨 Estilos Globais
    ├── globals.css
    └── variables.css
```

## 3. PADRÕES DE CÓDIGO

### 3.1 Componentes React

- **Function Components** com TypeScript
- **Props tipadas** com interfaces explícitas
- **Hooks** no topo do componente
- **Export default** para componentes principais
- **Export nomeado** para tipos e utilitários

### 3.2 Estrutura de Componentes

```typescript
// Exemplo padrão
interface ComponentProps {
  prop1: string;
  prop2?: number;
  onAction?: () => void;
}

const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2 = 0,
  onAction
}) => {
  // Hooks no topo
  const [state, setState] = useState();
  const { data } = useCustomHook();

  // Handlers organizados
  const handleClick = () => {
    // Lógica
    onAction?.();
  };

  return (
    // JSX estruturado
    <div>
      {prop1}
    </div>
  );
};

export default Component;
```

### 3.3 Convenções de Estilização

- **Tailwind CSS** como padrão
- **Classes agrupadas** por funcionalidade
- **Responsive design** com prefixos (sm:, md:, lg:)
- **Cores temáticas** consistentes

### 3.4 Tratamento de Estado

- **Context API** para estado global (auth, loading)
- **useState** para estado local do componente
- **useEffect** para side effects controlados

## 4. PADRÕES DE COMMITS

### Formato: `[tipo]: [descrição]`

### Tipos:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação/estilo (sem alterar lógica)
- `refactor:` Refatoração de código
- `test:` Adição/ajuste de testes
- `chore:` Atualização de dependências/build

### Exemplos:

- `feat: adiciona sistema de upload de arquivos`
- `fix: corrige validação do formulário de login`
- `refactor: modulariza componente CorretorProfile`
- `docs: atualiza documentação de padronização`
