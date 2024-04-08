
import ModuleManager from "@core/ModuleCore/ModuleManager"

const moduleManager = new ModuleManager();

export default async function handler(req, res) {
  await moduleManager.loadModules();
  const modules = moduleManager.getModules();
  res.status(200).json({ modules });
}