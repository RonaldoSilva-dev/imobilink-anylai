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

````
src/
├── components/               # 👥 Componentes (sempre minúsculo)
│   ├── auth/                # (minúsculo)
│   │   ├── Login/          # (PascalCase porque é componente específico)
│   │   │   ├── LoginHeader.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LoginTabs.tsx
│   │   │   ├── UserTypeTabs.tsx
│   │   │   └── types.ts
│   │   └── register/       # (minúsculo)
│   │       ├── RegisterHeader.tsx
│   │       ├── PersonalInfoForm.tsx
│   │       └── types.ts
│   ├── common/             # (minúsculo) - Componentes compartilhados
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── LoadingSpinner.tsx
│   ├── dashboard/          # (minúsculo)
│   │   ├── CorretorDashboard.tsx
│   │   ├── DashboardTabs.tsx
│   │   ├── MatchCard.tsx
│   │   └── StatsCard.tsx
│   ├── fileUpload/         # (minúsculo) - Corrigido!
│   │   ├── FileUpload.tsx
│   │   ├── FilePreview.tsx
│   │   ├── useFileUpload.ts
│   │   └── types.ts
│   └── profile/            # (minúsculo) - Corrigido!
│       ├── CorretorProfile.tsx
│       └── sections/       # (minúsculo)
│           ├── PersonalInfoSection.tsx
│           └── ProfessionalInfoSection.tsx
├── hooks/                  # ⚓ (sempre minúsculo) - PADRÃO REACT
│   ├── useAuth.ts
│   └── useLoading.ts
├── utils/                  # 🛠️ (sempre minúsculo)
│   ├── formatters/        # (minúsculo)
│   │   └── formatDate.ts
│   ├── validators/        # (minúsculo)
│   │   └── validateEmail.ts
│   └── fileHandlers/      # (minúsculo)
│       └── fileValidation.ts
├── contexts/              # ⚙️ (sempre minúsculo) - PADRÃO REACT
│   ├── authContext.tsx    # (camelCase para arquivos)
│   └── loadingContext.tsx # (camelCase para arquivos)
├── types/                 # 📝 (sempre minúsculo)
│   ├── user.ts
│   ├── dashboard.ts
│   └── common.ts
├── routers/               # 🧭 (sempre minúsculo)
│   └── AppRouter.tsx
├── pages/                 # 🖥️ (sempre minúsculo) - Se tiver
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
└── styles/                # 🎨 (sempre minúsculo)
    ├── globals.css
    └── variables.css```

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
````

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
