
import { getTranslations } from "next-intl/server";


export async function AsyncTrad({path, id}) {
  const t = await getTranslations(path);
  return t(id);
}