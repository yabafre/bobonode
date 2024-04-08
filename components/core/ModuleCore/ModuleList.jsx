"use client"
// ModuleList component for the core module, for set the modules list
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { useModules } from '@providers/ModuleContext';
import { Switch } from '@/components/ui/switch';
import { Button} from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useModuleManager } from "@core/ModuleCore/ModuleManager"
import Image from "next/image"

const ModuleList = () => {
  const { modules, toggleModuleState } = useModuleManager();

  useEffect(() => {
    console.log(modules)
  }, [modules])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Modules</h2>
      <div className="divide-y divide-gray-200">
        {modules?.length > 0 ? modules.map((module) => (
          <Card key={module.name} className="py-4">
            <CardHeader>
              <CardTitle>{module.name}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={module.logo} width={100} height={100} alt={module.name} />
            </CardContent>
            <CardFooter>
              <Switch
                checked={module.enabled}
                onChange={() => toggleModuleState(module.name)}
              />
            </CardFooter>
          </Card>
        )) : <p>No modules available</p>}
      </div>
    </div>
  );
};

export default ModuleList;
