'use client'
import React from 'react'
import SearchSection from '@/components/molecules/SearchSection/SeachSection'
import Navigation from '@/components/atoms/Navigation/Navigation'
import Button from '@/components/atoms/Button/Button'
import { PermissionGuard } from '@/components/template/RouteGuard'
import { getRequiredPermissionsForAction } from '@/utils/dashBoardPermissions'

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  resultCount?: number;
  isSearchActive: boolean;
  navigationItems: { label: string; isActive?: boolean; onClick?: () => void }[];
  pageTitle: string;
  pageSubtitle: string | null;
  isMainView: boolean;
  handleBackToMain: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchClear,
  resultCount,
  isSearchActive,
  navigationItems,
  pageTitle,
  pageSubtitle,
  isMainView,
  handleBackToMain,
}) => {
  return (
    <>
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchClear={onSearchClear}
        resultCount={isSearchActive ? resultCount : undefined}
        isSearchActive={isSearchActive}
      />

      <Navigation items={navigationItems} />

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4 lg:gap-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-medium text-black break-words">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="text-gray-600 mt-1 text-sm break-words">
              {pageSubtitle}
            </p>
          )}
        </div>

        <div data-testid="buttons-container" className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-shrink-0">
          {!isMainView && (
            <Button
              variant="secondary"
              size="small"
              startIcon={<span className="material-icons text-[20px]">arrow_back</span>}
              onClick={handleBackToMain}
              className="w-full sm:w-auto"
            >
              Voltar
            </Button>
          )}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <PermissionGuard
              requiredPermissions={getRequiredPermissionsForAction('new_consultation')}
              mode="any"
            >
              <Button
                variant="secondary"
                size="small"
                startIcon={<span className="material-icons text-[20px]">add_circle</span>}
                className="w-full sm:w-auto"
              >
                Nova Consulta
              </Button>
              <Button
                variant="primary"
                size="small"
                className="w-full sm:w-auto"
              >
                Ver Histórico
              </Button>
            </PermissionGuard>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;