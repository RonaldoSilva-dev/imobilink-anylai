import React from "react"
import { useLoading } from "./LoadingContext"

interface User {
  id: string
  email: string
  name: string
  type: "corretor" | "gestor"
  avatar: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: "corretor" | "gestor") => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  userType: "corretor" | "gestor"
  confirmPassword: string
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

// Simulação de banco de dados em memória
const mockUsers: User[] = [
  {
    id: "1",
    email: "corretor@exemplo.com",
    name: "João Silva",
    type: "corretor",
    avatar: "👨‍💼",
    createdAt: new Date().toISOString()
  },
  {
    id: "2", 
    email: "gestor@exemplo.com",
    name: "Maria Santos",
    type: "gestor",
    avatar: "👩‍💼",
    createdAt: new Date().toISOString()
  }
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const { setLoading } = useLoading()

  const login = async (email: string, password: string, userType: "corretor" | "gestor"): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Validações
    if (!email || !password) {
      setLoading(false)
      return { success: false, error: "Email e senha são obrigatórios" }
    }

    if (!email.includes("@")) {
      setLoading(false)
      return { success: false, error: "Email inválido" }
    }

    if (password.length < 6) {
      setLoading(false)
      return { success: false, error: "Senha deve ter pelo menos 6 caracteres" }
    }

    // Buscar usuário
    const foundUser = mockUsers.find(u => u.email === email && u.type === userType)
    
    if (!foundUser) {
      setLoading(false)
      return { success: false, error: "Usuário não encontrado ou tipo incorreto" }
    }

    // Simular verificação de senha (em produção seria hash)
    if (password !== "123456") { // Senha padrão para demo
      setLoading(false)
      return { success: false, error: "Senha incorreta" }
    }

    setUser(foundUser)
    setLoading(false)
    return { success: true }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Validações
    if (!userData.email || !userData.password || !userData.name || !userData.confirmPassword) {
      setLoading(false)
      return { success: false, error: "Todos os campos são obrigatórios" }
    }

    if (!userData.email.includes("@")) {
      setLoading(false)
      return { success: false, error: "Email inválido" }
    }

    if (userData.password.length < 6) {
      setLoading(false)
      return { success: false, error: "Senha deve ter pelo menos 6 caracteres" }
    }

    if (userData.password !== userData.confirmPassword) {
      setLoading(false)
      return { success: false, error: "As senhas não coincidem" }
    }

    // Verificar se email já existe
    if (mockUsers.find(u => u.email === userData.email)) {
      setLoading(false)
      return { success: false, error: "Email já cadastrado" }
    }

    // Criar novo usuário
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      type: userData.userType,
      avatar: userData.userType === "corretor" ? "👨‍💼" : "👩‍💼",
      createdAt: new Date().toISOString()
    }

    mockUsers.push(newUser)
    setUser(newUser)
    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}