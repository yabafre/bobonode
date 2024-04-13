// core/moduleCore/ModuleManager.js
// Description: ModuleManager est une hook qui gère les modules chargés dans l'application.

import { useState, useEffect } from 'react';
import { modulesConfig } from '@modules/config';
import {
  fetchModulesFromAPI,
  createModuleInAPI,
  deleteModuleInAPI,
  updateModuleInAPI,
} from '@core/ModuleCore/utils/api';

export const useModuleManager = () => {
  const [modules, setModules] = useState([]);

  // Déplacez la logique de synchronisation dans sa propre fonction pour pouvoir la réutiliser
  const synchronizeModules = async () => {
    const apiModules = await fetchModulesFromAPI();

    console.log(apiModules)

    // Créer ou supprimer des modules dans l'API en fonction de la configuration locale
    await Promise.all(modulesConfig.map(async (localModule) => {
      const moduleExistsInAPI = apiModules.find(apiModule => apiModule.name === localModule.name);
      if (localModule.available && !moduleExistsInAPI) {
        await createModuleInAPI(localModule);
      } else if (!localModule.available && moduleExistsInAPI) {
        await deleteModuleInAPI(localModule.name);
      }
    }));

    // Supprimer des modules de l'API qui ne sont plus dans la configuration locale
    await Promise.all(apiModules.map(async (apiModule) => {
      if (!modulesConfig.find(localModule => localModule.name === apiModule.name)) {
        await deleteModuleInAPI(apiModule.name);
      }
    }));

    // Mise à jour de l'état local avec les informations des modules disponibles de l'API
    const updatedModules = apiModules
      .filter(apiModule => modulesConfig.some(localModule => localModule.name === apiModule.name && localModule.available))
      .map(apiModule => ({
        ...modulesConfig.find(localModule => localModule.name === apiModule.name),
        ...apiModule,
      }));

    setModules(updatedModules);
  };

  // Exécuter la synchronisation au montage du composant
  useEffect(() => {
    synchronizeModules().catch(e => console.error(e));
  }, []);

  // Récupérer les informations d'un module spécifique
  const getModuleInfo = (moduleName) => {
    return modules.find((module) => module.name === moduleName);
  };

  // Activer/désactiver un module et synchroniser avec l'API
  const toggleModule = async (moduleName) => {
    console.log(moduleName)
    const moduleToUpdate = getModuleInfo(moduleName);
    if (!moduleToUpdate) return;

    const updatedModule = { ...moduleToUpdate, enabled: !moduleToUpdate.enabled };
    await updateModuleInAPI(moduleName, updatedModule);

    // Ré-exécuter la synchronisation après la mise à jour pour refléter les changements
    await synchronizeModules();
  };

  return { modules, getModuleInfo, toggleModule };
};

