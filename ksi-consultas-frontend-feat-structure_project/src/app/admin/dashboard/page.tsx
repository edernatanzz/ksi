'use client'
import React, { useState, useMemo } from 'react'
import { serviceCategories, dashboardCardsByCategory, DashboardCard as DashboardCardType } from '@/data/dashboard'


import EmptyState from '@/components/atoms/EmptyStates/EmptyState'
import { searchAllServices } from '@/utils/searchUtils'
import {
 
  filterCategoriesByPermissions,
  filterServicesByPermissions} from '@/utils/dashBoardPermissions'
import { useAuth } from '@/contexts/AuthContext'
import { RouteGuard} from '@/components/template/RouteGuard/RouteGuard'
import { Permission } from '@/types/auth'
import DashboardHeader from '@/components/organisms/AdminOrganisms/Painel/DashboardHeader'
import MetricOverview from '@/components/organisms/AdminOrganisms/Painel/MetricOverview'
import { MetricCardProps } from '@/components/molecules/AdminMolecules/Painel/MetricCard/MetricCard'
import CostEvolutionChartSection from '@/components/organisms/AdminOrganisms/Painel/CostEvolutionChartSection'
import QuickActionsSection from '@/components/organisms/AdminOrganisms/Painel/QuickActionsSection'
import SupplierStatusSection from '@/components/organisms/AdminOrganisms/Painel/SupplierStatusSection'
import RecentAlertsSection from '@/components/organisms/AdminOrganisms/Painel/RecentAlertsSection'

export default function Page() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const { user } = useAuth();

  const handleBackToMain = () => {
    setCurrentCategory(null)
    setSearchQuery('')
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim() && currentCategory) {
      setCurrentCategory(null)
    }
  }

  const handleSearchClear = () => {
    setSearchQuery('')
  }

  const getNavigationItems = () => {
    if (!currentCategory) {
      return [{ label: `Bem-vindo(a), ${user?.name}`, isActive: true }]
    }
    
    const category = serviceCategories.find(cat => cat.id === currentCategory)
    return [
      { label: 'Painel', onClick: handleBackToMain },
      { label: category?.title || '', isActive: true }
    ]
  }

  const { currentData, isMainView, isSearchMode } = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0
    const isMainViewCalc = currentCategory === null
    
    let data: DashboardCardType[] = []
    
    if (isSearching && currentCategory === null) {
      const allResults = searchAllServices(searchQuery)
      const filteredResults = filterServicesByPermissions(allResults, user?.permissions || [])
      data = filteredResults.map(service => ({
        id: service.id,
        title: service.title as string,
        subtitle: service.subtitle as string,
        icon: service.icon as string,
        path: service.path as string,
        category: service.category
      }))
    } else if (isSearching && currentCategory) {
      const categoryServices = dashboardCardsByCategory[currentCategory as keyof typeof dashboardCardsByCategory] || []
      data = categoryServices.filter(service => {
        const titleMatch = service.title.toLowerCase().includes(searchQuery.toLowerCase())
        const subtitleMatch = service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        return titleMatch || subtitleMatch
      })
    } else if (currentCategory) {
      data = dashboardCardsByCategory[currentCategory as keyof typeof dashboardCardsByCategory] || []
    } else {
      const categories = filterCategoriesByPermissions(serviceCategories, user?.permissions || [])
      data = categories.map(category => ({
        id: category.id,
        title: category.title,
        subtitle: category.subtitle,
        icon: category.icon,
        path: category.path,
        category: category.id
      }))
    }

    return {
      currentData: data,
      isMainView: isMainViewCalc,
      isSearchMode: isSearching
    }
  }, [searchQuery, currentCategory, user?.permissions])

  const getPageTitle = () => {
    if (isMainView) {
      return 'PAINEL DE CONTROLE'
    }
    const category = serviceCategories.find(cat => cat.id === currentCategory)
    return category?.title || 'CATEGORIA'
  }

  const getPageSubtitle = () => {
    if (isMainView) {
      return null
    }
    const category = serviceCategories.find(cat => cat.id === currentCategory)
    return `${category?.subtitle || ''} • ${currentData.length} serviços disponíveis`
  }

  const getEmptyStateMessage = () => {
    if (isSearchMode) {
      return {
        icon: 'search_off',
        message: `Nenhum resultado encontrado para "${searchQuery}"`
      }
    }
    return {
      icon: 'folder_open',
      message: 'Nenhum item encontrado'
    }
  }

  const metricsData: MetricCardProps[] = [
    {
      title: 'Custo Total Mensal',
      value: 'R$ 12.847,90',
      change: '-8.2%',
      changeType: 'negative',
      icon: 'payments',
    },
    {
      title: 'Consultas Realizadas',
      value: '43.572',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'search',
    },
    {
      title: 'Disponibilidade Geral',
      value: '99.2%',
      change: '+0.3%',
      changeType: 'positive',
      icon: 'check_circle',
    },
    {
      title: 'Economia Realizada',
      value: 'R$ 2.340,50',
      change: '+18.7%',
      changeType: 'positive',
      icon: 'savings',
    },
  ];

  const chartLegendData = [
    { label: 'Serasa', color: 'bg-red-500' },
    { label: 'SPC', color: 'bg-blue-500' },
    { label: 'Receita', color: 'bg-green-500' },
  ];

  const quickActionsData = [
    {
      title: 'Trocar Fornecedor Principal',
      description: 'Receita Federal → SPC Brasil',
      icon: 'flash_on',
      bgColor: 'bg-red-600',
      textColor: 'text-white',
      onClick: () => console.log('Trocar Fornecedor Principal'),
    },
    {
      title: 'Gerenciar Usuários',
      description: 'Adicionar novos acessos',
      icon: 'people',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      onClick: () => console.log('Gerenciar Usuários'),
    },
    {
      title: 'Relatório Executivo',
      description: 'Gerar relatório mensal',
      icon: 'bar_chart',
      bgColor: 'bg-green-600',
      textColor: 'text-white',
      onClick: () => console.log('Relatório Executivo'),
    },
  ];

  const suppliersData = [
    {
      name: 'Serasa',
      uptime: '99.8%',
      avgCost: 'R$ 0.45',
      responseTime: '120ms',
      consultations: '15.420',
      statusColor: 'bg-green-500',
    },
    {
      name: 'SPC Brasil',
      uptime: '99.2%',
      avgCost: 'R$ 0.38',
      responseTime: '95ms',
      consultations: '12.380',
      statusColor: 'bg-green-500',
    },
    {
      name: 'Receita Federal',
      uptime: '97.5%',
      avgCost: 'R$ 0.52',
      responseTime: '180ms',
      consultations: '8.920',
      statusColor: 'bg-yellow-500',
    },
    {
      name: 'Junta Comercial',
      uptime: '98.9%',
      avgCost: 'R$ 0.29',
      responseTime: '140ms',
      consultations: '6.750',
      statusColor: 'bg-green-500',
    },
  ];

  const handleConfigureFallback = (supplierName: string) => {
    console.log(`Configurar fallback para: ${supplierName}`);
    // Lógica para configurar o fallback
  };

  return (
    <RouteGuard requiredPermissions={[Permission.READ_DASHBOARD]}>
    <div data-testid="dashboard-container" className="p-4 sm:p-8 bg-ksiBeige min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
          resultCount={isSearchMode && isMainView ? currentData.length : undefined}
          isSearchActive={isSearchMode && isMainView}
          navigationItems={getNavigationItems()}
          pageTitle={getPageTitle()}
          pageSubtitle={getPageSubtitle()}
          isMainView={isMainView}
          handleBackToMain={handleBackToMain}
        />

        <MetricOverview metrics={metricsData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CostEvolutionChartSection
            title="Evolução de Custos por Fornecedor"
            legendItems={chartLegendData}
          />
          <QuickActionsSection
            title="Ações Rápidas"
            actions={quickActionsData}
          />
        </div>

        <SupplierStatusSection
          title="Status dos Fornecedores"
          suppliers={suppliersData}
          onConfigureFallback={handleConfigureFallback}
        />

        <RecentAlertsSection
          title="Alertas Recentes"
          historyLink="#"
        />

        {currentData.length === 0 && (
          <EmptyState
            icon={getEmptyStateMessage().icon}
            message={getEmptyStateMessage().message}
            actionLabel={isSearchMode ? "Limpar busca" : undefined}
            actionIcon={isSearchMode ? "refresh" : undefined}
            onAction={isSearchMode ? handleSearchClear : undefined}
            showAnimation={true}
          />
        )}
      </div>
    </div>
    </RouteGuard>
  )
}