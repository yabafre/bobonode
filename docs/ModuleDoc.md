# Gestion des Modules dans BOBONEXT

Ce document fournit une vue d'ensemble et des directives pour la gestion des modules dans Bobonext, une application Next.js conçue pour une extensibilité maximale et des performances optimisées.

## Vue d'Ensemble

Les modules dans Bobonext permettent d'ajouter, configurer et gérer dynamiquement des fonctionnalités spécifiques sans perturber l'architecture principale de l'application. Chaque module peut contenir son propre ensemble de routes, composants, et logique métier, facilitant ainsi le développement et la maintenance.

## Structure des Modules

Les modules sont organisés dans le répertoire `/modules`, avec une structure standardisée :

```
/modules
   /[ModuleName]
      /hooks
      /templates
         /component
         /views
            - [ModuleName]View.jsx
   - config.jsx
```

- **`[ModuleName]`**: Nom du module, par exemple `Product` ou `Stripe`.
- **`hooks`**: Contient les hooks personnalisés utilisés par le module.
- **`templates/views`**: Contient le composant React du rendu du module
- **`templates/component`**: Contient les composants réutilisables du module.
- **`config.jsx`**: Fichier de configuration exportant les métadonnées et l'état de tout les modules.


## Utilisation

Pour activer, désactiver, ou configurer un module :

1. Accédez au tableau de bord d'administration à l'URL `/admin_5dhb8A1a/dashboard/modules`.
2. Sélectionnez le module souhaité pour ajuster son état ou sa configuration.
3. Utilisez les commutateurs pour activer/désactiver les modules et accédez aux paramètres spécifiques pour les configurer.

## Développement de Modules

Pour créer un nouveau module :

1. Créez un dossier sous `/modules` avec le nom du module.
2. Structurez votre module selon la structure décrite ci-dessus.
3. Ajoutez votre logique métier, composants, et routes spécifiques au module.
4. Mettez à jour `/modules/config.jsx` pour inclure la configuration de votre module.

## Configuration

Le fichier `/modules/config.jsx` contient la configuration de tous les modules de l'application. Chaque module est défini par un objet avec les propriétés suivantes :

```jsx
{
  name: 'ModuleName', 
  description: 'Module Description',
  author: 'Author Name',
  version: '1.0.0',
  available: Boolean,
  category: 'Category Name',
  enabled: Boolean, // cet état sera initialisé à partir du backend lors du chargement de l'application
  componentPath: 'ModuleNameView',
  logo: 'logo.png'
}

```

## Gestion des Routes

Les routes des modules sont gérées dynamiquement par Bobonext. Seules les routes des modules activés seront accessibles dans l'application. Les routes des modules sont définies dans le `AppRouter` de l'application Next.js.

## Gestionnaire de Modules (Module Manager)

Le gestionnaire de modules est géré par le composant `ModuleManager` dans le fichier `@core/ModuleCore/ModuleManager.jsx`. Ce composant charge les modules activés et les rend disponibles dans l'application.


## A retenir

- Les modules sont conçus pour être indépendants et réutilisables.
- Les modules peuvent être activés, désactivés, et configurés dynamiquement.
- Seules les modules avec le status `available` => `true` seront chargés dans le dashboard.
- Seules les routes des modules activés seront accessibles dans l'application.

Pour plus d'informations, consultez la documentation complète de Bobonext.