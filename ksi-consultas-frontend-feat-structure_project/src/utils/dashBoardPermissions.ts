import { Permission } from '@/types/auth';
import { ServiceCategory } from '@/data/dashboard';

export const CATEGORY_READ_PERMISSIONS = {
  'bancario': Permission.READ_BANCARIO,
  'veicular': Permission.READ_VEICULAR,
  'localizacao': Permission.READ_LOCALIZACAO,
  'juridico': Permission.READ_JURIDICO,
  'comercial': Permission.READ_COMERCIAL
} as const;

export const CATEGORY_WRITE_PERMISSIONS = {
  'bancario': Permission.WRITE_BANCARIO,
  'veicular': Permission.WRITE_VEICULAR,
  'localizacao': Permission.WRITE_LOCALIZACAO,
  'juridico': Permission.WRITE_JURIDICO,
  'comercial': Permission.WRITE_COMERCIAL
} as const;

export const canAccessCategory = (
  categoryId: string, 
  userPermissions: Permission[]
): boolean => {
  const requiredPermission = CATEGORY_READ_PERMISSIONS[categoryId as keyof typeof CATEGORY_READ_PERMISSIONS];
  return !requiredPermission || userPermissions.includes(requiredPermission);
};

export const canEditInCategory = (
  categoryId: string, 
  userPermissions: Permission[]
): boolean => {
  const requiredPermission = CATEGORY_WRITE_PERMISSIONS[categoryId as keyof typeof CATEGORY_WRITE_PERMISSIONS];
  return !requiredPermission || userPermissions.includes(requiredPermission);
};

export const filterCategoriesByPermissions = (
  categories: ServiceCategory[], 
  userPermissions: Permission[]
): ServiceCategory[] => {
  return categories.filter(category => 
    canAccessCategory(category.id, userPermissions)
  );
};

type ServiceOrDashboardCard = { categoryId?: string; category?: string; id: string; [key: string]: unknown };

export const filterServicesByPermissions = (
  services: ServiceOrDashboardCard[], 
  userPermissions: Permission[]
): ServiceOrDashboardCard[] => {
  return services.filter(service => {
    const categoryId = service.categoryId || service.category || service.id;
    return canAccessCategory(categoryId, userPermissions);
  });
};

export const getRequiredPermissionsForAction = (action: string): Permission[] => {
  switch (action) {
    case 'new_consultation':
      return [
        Permission.WRITE_BANCARIO,
        Permission.WRITE_VEICULAR,
        Permission.WRITE_LOCALIZACAO,
        Permission.WRITE_JURIDICO,
        Permission.WRITE_COMERCIAL
      ];
    case 'view_history':
      return [Permission.READ_REPORTS];
    case 'export_data':
      return [Permission.EXPORT_DATA];
    case 'advanced_search':
      return [Permission.ADVANCED_SEARCH];
    case 'view_analytics':
      return [Permission.VIEW_ANALYTICS];
    default:
      return [];
  }
};

export const hasAnyWritePermission = (userPermissions: Permission[]): boolean => {
  const writePermissions = Object.values(CATEGORY_WRITE_PERMISSIONS);
  return writePermissions.some(permission => userPermissions.includes(permission));
};

export const getAccessibleCategories = (userPermissions: Permission[]): string[] => {
  return Object.entries(CATEGORY_READ_PERMISSIONS)
    .filter(([, permission]) => userPermissions.includes(permission))
    .map(([categoryId, ]) => categoryId);
};

export const getUserAccessStats = (userPermissions: Permission[]) => {
  const totalCategories = Object.keys(CATEGORY_READ_PERMISSIONS).length;
  const accessibleCategories = getAccessibleCategories(userPermissions);
  const writeableCategories = Object.entries(CATEGORY_WRITE_PERMISSIONS)
    .filter(([, permission]) => userPermissions.includes(permission))
    .map(([categoryId, ]) => categoryId);

  return {
    totalCategories,
    accessibleCount: accessibleCategories.length,
    writeableCount: writeableCategories.length,
    accessibleCategories,
    writeableCategories,
    accessPercentage: (accessibleCategories.length / totalCategories) * 100
  };
};