'use client'

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

export interface DashboardCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  path: string;
  category?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  path: string;
  serviceCount: number;
}

//sidebar 
export const menuItems: MenuItem[] = [
  {
    id: 'inicio',
    label: 'INÍCIO',
    icon: 'home',
    path: '/',
  },
  {
    id: 'relatorios',
    label: 'RELATÓRIOS',
    icon: 'assessment',
    path: '/relatorios',
  },
  {
    id: 'configuracoes',
    label: 'CONFIGURAÇÕES',
    icon: 'settings',
    path: '/configuracoes',
  },
];

// Categorias principais do dashboard
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'bancario',
    title: 'SERVIÇOS BANCÁRIOS',
    subtitle: 'Relatórios de crédito e análises',
    icon: 'account_balance',
    path: '/categorias/bancario',
    serviceCount: 6,
  },
  {
    id: 'veicular',
    title: 'CONSULTAS VEICULARES',
    subtitle: 'ATPV, histórico, débitos',
    icon: 'directions_car',
    path: '/categorias/veicular',
    serviceCount: 8,
  },
  {
    id: 'localizacao',
    title: 'LOCALIZAÇÃO E BENS',
    subtitle: 'Localizador de pessoas e bens',
    icon: 'location_on',
    path: '/categorias/localizacao',
    serviceCount: 5,
  },
  {
    id: 'juridico',
    title: 'CONSULTAS JURÍDICAS',
    subtitle: 'Antecedentes e ações judiciais',
    icon: 'gavel',
    path: '/categorias/juridico',
    serviceCount: 4,
  },
  {
    id: 'comercial',
    title: 'SERVIÇOS COMERCIAIS',
    subtitle: 'Comunicados e negativação',
    icon: 'business',
    path: '/categorias/comercial',
    serviceCount: 3,
  },
];

// Todos os serviços organizados por categoria
export const dashboardCardsByCategory = {
  bancario: [
    {
      id: 'rating-bancario',
      title: 'RATING BANCÁRIO',
      subtitle: 'Nexourto de crédits',
      icon: 'description',
      path: '/consultas/rating-bancario',
      category: 'bancario',
    },
    {
      id: 'relatorio-top',
      title: 'RELATÓRIO TOP',
      subtitle: 'Retotoria',
      icon: 'article',
      path: '/consultas/relatorio-top',
      category: 'bancario',
    },
    {
      id: 'relatorio-ksi-master',
      title: 'RELATÓRIO KSI MASTER',
      subtitle: 'Relatório analítico de crédito',
      icon: 'star',
      path: '/consultas/relatorio-ksi-master',
      category: 'bancario',
    },
    {
      id: 'gold-reneira',
      title: 'GOLD',
      subtitle: 'Reneira crédito',
      icon: 'shield',
      path: '/consultas/gold-reneira',
      category: 'bancario',
    },
    {
      id: 'scr-banco-central',
      title: 'SCR - BANCO CENTRAL',
      subtitle: 'Relatório analítico de crédito',
      icon: 'account_balance',
      path: '/consultas/scr-banco-central',
      category: 'bancario',
    },
    {
      id: 'relatorio-plus-pf',
      title: 'RELATÓRIO PLUS PF',
      subtitle: 'Relatório analítico de crédito - Plus PF',
      icon: 'person',
      path: '/consultas/relatorio-plus-pf',
      category: 'bancario',
    },
  ],
  
  veicular: [
    {
      id: 'atpv-online',
      title: 'ATPV ONLINE',
      subtitle: 'Vsicolar compreiruretus',
      icon: 'local_shipping',
      path: '/consultas/atpv-online',
      category: 'veicular',
    },
    {
      id: 'veicular-completa',
      title: 'VEICULAR COMPLETA',
      subtitle: 'Veicular - Veicular completa',
      icon: 'directions_car',
      path: '/consultas/veicular-completa',
      category: 'veicular',
    },
    {
      id: 'historico-proprietario',
      title: 'HISTÓRICO DE PROPRIETÁRIO',
      subtitle: 'Comuiimersor du venitio',
      icon: 'history',
      path: '/consultas/historico-proprietario-1',
      category: 'veicular',
    },
    {
      id: 'denatran-plus',
      title: 'DENATRAN PLUS',
      subtitle: 'De xirion puins',
      icon: 'local_shipping',
      path: '/consultas/denatran-plus',
      category: 'veicular',
    },
    {
      id: 'atpv-renainf',
      title: 'ATPV - RENAINF',
      subtitle: 'Vsiocial ATHV',
      icon: 'commute',
      path: '/consultas/atpv-renainf',
      category: 'veicular',
    },
    {
      id: 'veicular-cautelar',
      title: 'VEICULAR CAUTELAR',
      subtitle: 'Veicular Cautelar',
      icon: 'security',
      path: '/consultas/veicular-cautelar',
      category: 'veicular',
    },
  ],
  
  localizacao: [
    {
      id: 'localizador-bens',
      title: 'LOCALIZADOR DE BENS',
      subtitle: 'Reqóira condals',
      icon: 'location_on',
      path: '/consultas/localizador-bens',
      category: 'localizacao',
    },
    {
      id: 'infobusca-nome',
      title: 'INFOBUSCA POR NOME',
      subtitle: 'Localizador - Infobusca por Nome',
      icon: 'person_search',
      path: '/consultas/infobusca-nome',
      category: 'localizacao',
    },
    {
      id: 'infobusca-cpf',
      title: 'INFOBUSCA POR CPF CNPJ',
      subtitle: 'Localizador - Infobusca por CPF/CNPJ',
      icon: 'badge',
      path: '/consultas/infobusca-cpf',
      category: 'localizacao',
    },
    {
      id: 'localizador-telefone',
      title: 'LOCALIZADOR POR TELEFONE',
      subtitle: 'Localizador - Telefone',
      icon: 'phone',
      path: '/consultas/localizador-telefone',
      category: 'localizacao',
    },
    {
      id: 'localizador-veiculo',
      title: 'LOCALIZADOR DE VEICULO',
      subtitle: 'CPF/CNPJ - Base DETRAN',
      icon: 'car_rental',
      path: '/consultas/localizador-veiculo',
      category: 'localizacao',
    },
  ],
  
  juridico: [
    {
      id: 'antecedente-criminal',
      title: 'ANTECEDENTE CRIMINAL',
      subtitle: 'Amesadietra Chimmt',
      icon: 'warning',
      path: '/consultas/antecedente-criminal',
      category: 'juridico',
    },
    {
      id: 'acao-trabalhista',
      title: 'AÇÃO TRABALHISTA',
      subtitle: 'Apjad ittaiaimeo',
      icon: 'work',
      path: '/consultas/acao-trabalhista',
      category: 'juridico',
    },
    {
      id: 'acoes-judiciais',
      title: 'AÇÕES JUDICIAIS',
      subtitle: 'Localizador - Ações Judiciais',
      icon: 'gavel',
      path: '/consultas/acoes-judiciais',
      category: 'juridico',
    },
    {
      id: 'protesto-online',
      title: 'PROTESTO ONLINE',
      subtitle: 'Protesto Online',
      icon: 'warning',
      path: '/consultas/protesto-online',
      category: 'juridico',
    },
  ],
  
  comercial: [
    {
      id: 'comunicado-vendas',
      title: 'COMUNICADO DE VENDAS',
      subtitle: 'Vsiolar comprete',
      icon: 'event_note',
      path: '/consultas/comunicado-vendas',
      category: 'comercial',
    },
    {
      id: 'negativacao-online',
      title: 'NEGATIVAÇÃO ONLINE',
      subtitle: 'Negativação Online',
      icon: 'block',
      path: '/consultas/negativacao-online',
      category: 'comercial',
    },
    {
      id: 'cheque-roubado',
      title: 'CHEQUE ROUBADO E SUSTADO',
      subtitle: 'Cheque roubado e sustado',
      icon: 'receipt',
      path: '/consultas/cheque-roubado',
      category: 'comercial',
    },
  ],
};

export const dashboardCards: DashboardCard[] = serviceCategories;