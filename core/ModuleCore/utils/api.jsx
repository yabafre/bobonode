// Desc: API calls for modules
import { SymfoboClient } from "@symfobo/client";

export const fetchModulesFromAPI = async () => {
  return SymfoboClient.get('/api/modules');
};

export const createModuleInAPI = async (module) => {
  return SymfoboClient.post('/api/modules/create', module);
};

export const deleteModuleInAPI = async (moduleName) => {
  return SymfoboClient.delete(`/api/modules/delete/${moduleName}`);
};

export const updateModuleInAPI = async (moduleName, module) => {
  return SymfoboClient.put(`/api/modules/update/${moduleName}`, module);
};
