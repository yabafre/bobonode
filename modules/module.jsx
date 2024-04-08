"use client";
// component for the core module, for set the module view
// Path: components/core/ModuleCore/module.jsx

import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic"
import Link from 'next/link';

import { Button} from "@/components/ui/button"
import { Suspense } from "react";
import { useModuleManager } from "@core/ModuleCore/ModuleManager"


// Fonction pour charger dynamiquement un composant de module avec next/dynamic
const loadModuleComponent = (componentPath) => {
  return dynamic(() => import(`/modules${componentPath}`).then((mod) => mod.default));
};


export default function Module({ moduleName }) {
  const { modules } = useModuleManager();
  const [module, setModule] = useState();

  useEffect(() => {
    const moduleInfo = modules.find((module) => module.name === moduleName);
    setModule(moduleInfo);
    console.log(moduleInfo)
  }, [moduleName, modules]);

  if (!module) {
    return null;
  }

  const DynamicComponent = loadModuleComponent(module.componentPath);

  return (
    <section className={'container'}>
      <h1>{module.name}</h1>
      <p>{module.description}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
      <Link href={'/admin_5dhb8A1a/dashboard/modules'}>
        <Button>Back to modules</Button>
      </Link>
    </section>
  );

}