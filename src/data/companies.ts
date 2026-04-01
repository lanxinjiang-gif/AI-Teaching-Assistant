import type { CompanyType } from '@/lib/types/game';

export const companies: CompanyType[] = [
  {
    id: 'retail',
    label: 'Retail',
    description: 'High transaction volumes, seasonal inventory swings, and tight margins.',
    sceneId: 'retail-office',
    accentColor: 'amber',
    contextualModifiers: {
      'month-end-close': 'Sales promotions ran through month-end, causing cut-off ambiguities.',
      'inventory-controls': 'Shrinkage and seasonal markdowns complicate inventory counts.',
    },
  },
  {
    id: 'saas',
    label: 'SaaS',
    description: 'Subscription revenue, deferred income, and capitalized software costs.',
    sceneId: 'saas-office',
    accentColor: 'sky',
    contextualModifiers: {
      'month-end-close': 'Multi-element arrangements require careful revenue allocation.',
      'revenue-recognition': 'ASC 606 five-step model applies to every contract.',
    },
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    description: 'Raw materials, WIP, finished goods — complexity at every stage.',
    sceneId: 'manufacturing-floor',
    accentColor: 'orange',
    contextualModifiers: {
      'month-end-close': 'WIP valuations and overhead absorption must be finalized.',
      'inventory-controls': 'Cycle counts and BOM variances require investigation.',
    },
  },
  {
    id: 'high-tech',
    label: 'High Tech',
    description: 'R&D capitalization, stock-based comp, and complex software revenue.',
    sceneId: 'high-tech-office',
    accentColor: 'purple',
    contextualModifiers: {
      'month-end-close': 'Equity award expense and R&D vs. capex decisions hit this close.',
      'revenue-recognition': 'Variable consideration and contract modifications are common.',
    },
  },
];

export const companyById = Object.fromEntries(
  companies.map((c) => [c.id, c])
) as Record<CompanyType['id'], CompanyType>;
