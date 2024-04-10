// modules/config.jsx

export const modulesConfig = [
  {
    name: 'product',
    description: 'Module for managing products',
    author: 'Developer',
    version: '1.0.0',
    available: true,
    category: 'Features',
    enabled: false, // cet état peut être initialisé à partir du backend lors du chargement de l'application
    componentPath: 'ProductView',
    logo: 'logo.png',
  },
  {
    name: 'stripe',
    description: 'Module for managing payments with stripe',
    author: 'Developer',
    version: '1.0.0',
    available: false,
    category: 'Features',
    enabled: true, // cet état peut être initialisé à partir du backend lors du chargement de l'application
    componentPath: 'StripeView',
    logo: 'logo.png',
  }
];
