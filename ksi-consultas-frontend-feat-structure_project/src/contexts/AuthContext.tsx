// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Permission, AuthContextType } from '@/types/auth';
import { getPermissionsByRole } from '@/config/rolePermissions';
import { toast } from 'react-toastify';

// Mock de usuários com diferentes roles
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@ksi.com',
    password: '123456',
    name: 'Administrador KSI',
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'financeiro@ksi.com',
    password: '123456',
    name: 'Gerente Financeiro',
    role: UserRole.FINANCEIRO,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '3',
    email: 'suporte@ksi.com',
    password: '123456',
    name: 'Analista de Suporte',
    role: UserRole.SUPORTE,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '4',
    email: 'dev@ksi.com',
    password: '123456', 
    name: 'Desenvolvedor Senior',
    role: UserRole.DEVS,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '5',
    email: 'marketing@ksi.com',
    password: '123456',
    name: 'Analista de Marketing',
    role: UserRole.MARKETING,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
];

const AUTH_STORAGE_KEY = 'ksi_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userWithPermissions = {
          ...parsedUser,
          permissions: getPermissionsByRole(parsedUser.role)
        };
        setUser(userWithPermissions);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error('Credenciais inválidas');
      }

      if (!mockUser.isActive) {
        throw new Error('Usuário inativo');
      }

      // Criar objeto user com permissões
      const authenticatedUser: User = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        permissions: getPermissionsByRole(mockUser.role),
        isActive: mockUser.isActive,
        lastLogin: new Date(),
        createdAt: mockUser.createdAt,
        updatedAt: new Date()
      };

      setUser(authenticatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      
      // Configurar o cookie user_role
      document.cookie = `user_role=${authenticatedUser.role}; path=/`;
      
      toast.success(`Bem-vindo, ${authenticatedUser.name}!`);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Remover o cookie user_role
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    toast.info('Logout realizado com sucesso');
  };

  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const canAccess = (requiredPermissions: Permission[]): boolean => {
    if (!user || !requiredPermissions.length) return false;
    
    return requiredPermissions.some(permission => 
      user.permissions.includes(permission)
    );
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
    canAccess,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};