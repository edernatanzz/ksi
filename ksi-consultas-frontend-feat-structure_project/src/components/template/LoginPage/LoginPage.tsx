'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/molecules/LoginForm/LoginForm';
import LoginWelcome from '@/components/molecules/LoginWelcome/LoginWelcome';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const USER_DEMO_INFO = [
  {
    email: 'admin@ksi.com',
    password: '123456',
    name: 'Administrador KSI',
    role: 'Administrador',
    description: 'Acesso completo ao sistema'
  },
  {
    email: 'financeiro@ksi.com',
    password: '123456',
    name: 'Gerente Financeiro',
    role: 'Financeiro',
    description: 'Acesso a relatórios bancários e comerciais'
  },
  {
    email: 'suporte@ksi.com',
    password: '123456',
    name: 'Analista de Suporte',
    role: 'Suporte',
    description: 'Acesso de leitura a todas as consultas'
  },
  {
    email: 'dev@ksi.com',
    password: '123456',
    name: 'Desenvolvedor Senior',
    role: 'Desenvolvedor',
    description: 'Acesso técnico e gerenciamento do sistema'
  },
  {
    email: 'marketing@ksi.com',
    password: '123456',
    name: 'Analista de Marketing',
    role: 'Marketing',
    description: 'Acesso a dados comerciais e analytics'
  }
];

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      await login(data.email, data.password);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno. Tente novamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    await handleLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-secondary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        
        {/* Welcome Section - Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-secondary-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-16 h-16 border border-white rounded-full"></div>
          </div>
          <LoginWelcome />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDemoUsers(!showDemoUsers)}
                className="text-sm text-secondary-600 hover:text-secondary-800 underline"
              >
                {showDemoUsers ? 'Ocultar' : 'Ver'} usuários de demonstração
              </button>
            </div>

            {showDemoUsers && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Usuários de Demonstração:
                </h3>
                <div className="space-y-2">
                  {USER_DEMO_INFO.map((user, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-xs cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleDemoLogin(user.email, user.password)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-secondary-800">
                            {user.name}
                          </div>
                          <div className="text-gray-600">
                            {user.email}
                          </div>
                          <div className="text-primary-600 font-medium">
                            {user.role}
                          </div>
                          <div className="text-gray-500 mt-1">
                            {user.description}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Clique para entrar
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Senha padrão para todos: <strong>123456</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;