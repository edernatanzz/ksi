export enum UserRole {
  ADMIN = 'admin',
  FINANCEIRO = 'financeiro', 
  SUPORTE = 'suporte',
  DEVS = 'devs',
  MARKETING = 'marketing'
}

export enum Permission {
  // Permissões gerais
  READ_DASHBOARD = 'read_dashboard',
  READ_REPORTS = 'read_reports',
  WRITE_REPORTS = 'write_reports',
  DELETE_REPORTS = 'delete_reports',
  
  // Permissões específicas por categoria
  READ_BANCARIO = 'read_bancario',
  WRITE_BANCARIO = 'write_bancario',
  READ_VEICULAR = 'read_veicular',
  WRITE_VEICULAR = 'write_veicular',
  READ_LOCALIZACAO = 'read_localizacao',
  WRITE_LOCALIZACAO = 'write_localizacao',
  READ_JURIDICO = 'read_juridico',
  WRITE_JURIDICO = 'write_juridico',
  READ_COMERCIAL = 'read_comercial',
  WRITE_COMERCIAL = 'write_comercial',
  
  // Permissões administrativas
  MANAGE_USERS = 'manage_users',
  MANAGE_PERMISSIONS = 'manage_permissions',
  MANAGE_SYSTEM = 'manage_system',
  
  // Permissões de relatórios específicos
  EXPORT_DATA = 'export_data',
  VIEW_ANALYTICS = 'view_analytics',
  ADVANCED_SEARCH = 'advanced_search'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
  canAccess: (requiredPermissions: Permission[]) => boolean;
  loading: boolean;
}

export interface RolePermissions {
  [UserRole.ADMIN]: Permission[];
  [UserRole.FINANCEIRO]: Permission[];
  [UserRole.SUPORTE]: Permission[];
  [UserRole.DEVS]: Permission[];
  [UserRole.MARKETING]: Permission[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  refreshToken?: string;
}