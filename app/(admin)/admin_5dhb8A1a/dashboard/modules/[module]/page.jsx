// Module page view with params from route
import React from 'react';
import Module from '@modules/module';

export const metadata = {
  title: "Module Page",
  description: "This is a sample module page.",
};



export default function ModulePage({ params }){
  console.log(params);
  const moduleName = params.module;


  return (
    <section className={'container'}>
      <Module moduleName={moduleName} />
    </section>
  )
}
