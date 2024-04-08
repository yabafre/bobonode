"use client"

// ModuleContext.jsx
// Créez un contexte React pour gérer les modules


import { createContext, useContext, useState, useEffect } from 'react';
import { useModuleManager } from '@core/ModuleCore/ModuleManager';

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {

  const { modules, toggleModule } = useModuleManager();
  const [modulesState, setModulesState] = useState(modules);

  useEffect(() => {
    // console.log(modules)

  });

  const toggleModuleState = async (moduleName, enabled) => {
    await toggleModule(moduleName, enabled);
    const updatedModules = modulesState.map(module =>
      module.name === moduleName ? { ...module, enabled } : module
    );
    setModulesState(updatedModules);
  };

  return (
    <ModuleContext.Provider value={{ modules: modulesState, toggleModuleState }}>
      {children}
    </ModuleContext.Provider>
  );
}

export const useModules = () => useContext(ModuleContext);