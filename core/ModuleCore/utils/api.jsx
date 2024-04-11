// Desc: API calls for modules
import { SymfoboClient } from "@symfobo/client";

export const fetchModulesFromAPI = async () => {
  return SymfoboClient.get('/modules');
};

export const createModuleInAPI = async (module) => {
  return SymfoboClient.post('/modules/create', module);
};

export const deleteModuleInAPI = async (moduleName) => {
  return SymfoboClient.delete(`/modules/delete/${moduleName}`);
};

export const updateModuleInAPI = async (moduleName, module) => {
  return SymfoboClient.put(`/modules/update/${moduleName}`, module);
};
