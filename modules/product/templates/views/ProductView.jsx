// /modules/product/templates/views/View.jsx
import React from 'react';
import { Test } from '@modules/product/hooks/useTest';


const View = () => {
  return (
    <div className={'flex flex-col items-center justify-center bg-red-600 rounded-xl'} >
      <h1 className={'text-5xl'}>Product Module</h1>
      <p>This is the product module view.</p>
      <Test />
    </div>
  );
};

export default View;
