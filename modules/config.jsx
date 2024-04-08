// modules/config.jsx

export const modulesConfig = [
  {
    name: 'Product',
    description: 'Module for managing products',
    author: 'Developer',
    version: '1.0.0',
    available: true,
    category: 'Features',
    enabled: false, // cet état peut être initialisé à partir du backend lors du chargement de l'application
    componentPath: 'product/templates/views/ProductView',
    logo: '/medias/modules/product/logo.png',
  },
  {
    name: 'Stripe',
    description: 'Module for managing payments with stripe',
    author: 'Developer',
    version: '1.0.0',
    available: false,
    category: 'Features',
    enabled: true, // cet état peut être initialisé à partir du backend lors du chargement de l'application
    componentPath: 'stripe/templates/views/StripeView',
    logo: '/medias/modules/stripe/logo.png',
  }
];
