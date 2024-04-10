"use client";

import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic"
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Suspense } from "react";
import { useModuleManager } from "@core/ModuleCore/ModuleManager"
import { useRouter } from "next/navigation"

// Fonction pour charger dynamiquement un composant de module avec next/dynamic
const loadModuleComponent = (module) => {
  const modulePath = `${module.name}/templates/views/${module.componentPath}`;
  return dynamic(() => import(`/modules/${modulePath}`).then((mod) => mod.default));
};

export default function Module({ moduleName }) {
  const { modules } = useModuleManager();
  const [module, setModule] = useState(null); // Initialisez à null pour un test explicite
  const router = useRouter();

  useEffect(() => {
    // Assurez-vous que modules est chargé et prêt pour la recherche
    if (modules.length > 0) {
      const moduleInfo = modules.find((mod) => mod.name === moduleName);
      if (moduleInfo) {
        setModule(moduleInfo);
      } else {
        // Si aucun module correspondant n'est trouvé, redirigez après un court délai
        setTimeout(() => {
          router.push('/admin_5dhb8A1a/dashboard/modules');
        }, 200);
      }
    }
  }, [moduleName, modules, router]);

  if (!module) {
    return <div>Loading module information...</div>;
  }

  const DynamicComponent = loadModuleComponent(module);

  return (
    <section className={'container'}>
      <Suspense fallback={<div>Loading component...</div>}>
        <DynamicComponent />
      </Suspense>
      <Link href={'/admin_5dhb8A1a/dashboard/modules'}>
        <Button>Back to modules</Button>
      </Link>
    </section>
  );
}
