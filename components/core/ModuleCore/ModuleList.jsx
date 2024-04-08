"use client"
// ModuleList component for the core module, for set the modules list
import React, {useEffect, useState} from 'react';
import { Switch } from '@/components/ui/switch';
import { Button} from "@/components/ui/button"
import DashboardLink from "@/components/admin/DashboardLink"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useModuleManager } from "@core/ModuleCore/ModuleManager"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define the schema for the module form
const schema = z.object({
  enabled: z.boolean(),
});
const ModuleList = () => {
  const { modules, toggleModule } = useModuleManager();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    // toggleModule(data.name).then(r => console.log(r)).catch(e => console.error(e));
  }

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
            <CardFooter className={'flex justify-between'}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name={'enabled'}
                    render={({ field }) => (
                      <FormControl>
                          <Switch
                            defaultChecked={module.enabled}
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              form.setValue('enabled', checked);
                              onSubmit({ name: module.name, enabled: checked });
                            }}
                          />
                      </FormControl>
                    )}
                  />
                </form>
              </Form>
              {module.enabled ? (
                <DashboardLink href={`/modules/${module.name}`}>
                  <Button variant={'outline'}>Config</Button>
                </DashboardLink>
              ) : null}
            </CardFooter>
          </Card>
        )) : <p>No modules available</p>}
      </div>
    </div>
  );
};

export default ModuleList;
