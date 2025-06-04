'use client'
import React, { useState, useMemo } from 'react'
import DashboardCard from '@/components/molecules/DashboardCard/DashboardCard'
import Navigation from '@/components/atoms/Navigation/Navigation'

import { serviceCategories, dashboardCardsByCategory } from '@/data/dashboard'

import Button from '@/components/atoms/Button/Button'
import { Fade } from '@mui/material'
import { searchAllServices } from '@/utils/searchUtils'
import SearchSection from '@/components/molecules/SearchSection/SeachSection'
import EmptyState from '@/components/atoms/EmptyStates/EmptyState'

export const Dashboard: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCategoryClick = (categoryId: string) => {
    setCurrentCategory(categoryId)
    setSearchQuery('')
  }

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
      return [{ label: 'Bem-vindo(a), fulano', isActive: true }]
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
    
    let data
    
    if (isSearching && currentCategory === null) {
      data = searchAllServices(searchQuery)
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
      data = serviceCategories
    }

    return {
      currentData: data,
      isMainView: isMainViewCalc,
      isSearchMode: isSearching
    }
  }, [searchQuery, currentCategory])

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

  return (
    <div data-testid="dashboard-container" className="p-8 bg-ksiBeige min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
          resultCount={isSearchMode && isMainView ? currentData.length : undefined}
          isSearchActive={isSearchMode && isMainView}
        />

        <Navigation items={getNavigationItems()} />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-medium text-black">
              {getPageTitle()}
            </h1>
            {getPageSubtitle() && (
              <p className="text-gray-600 mt-1 text-sm">
                {getPageSubtitle()}
              </p>
            )}
          </div>
          
          <div data-testid="buttons-container" className="flex space-x-3">
            {!isMainView && (
              <Button
                variant="secondary"
                size="small"
                startIcon={<span className="material-icons text-[20px]">arrow_back</span>}
                onClick={handleBackToMain}
              >
                Voltar
              </Button>
            )}
            <Button
              variant="secondary"
              size="small"
              startIcon={<span className="material-icons text-[20px]">add_circle</span>}
            >
              Nova Consulta
            </Button>
            <Button
              variant="primary"
              size="small"
            >
              Ver Histórico
            </Button>
          </div>
        </div>

        {/* resultado */}
        <Fade in={true} timeout={300}>
          <div 
            data-testid="dashboard-grid" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {currentData.map((card) => (
              <DashboardCard
                key={card.id}
                card={card}
                onClick={isMainView && !isSearchMode ? () => handleCategoryClick(card.id) : undefined}
              />
            ))}
          </div>
        </Fade>

        {/* caso não ache */}
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
  )
}

export default Dashboard