"use client"
// useTest hook for testing purposes product module

import { useEffect, useState } from 'react';

export const Test = () => {
  const [test, setTest] = useState('test');

  useEffect(() => {
    console.log('test hook');
  }, []);

  return (
    <button onClick={() => setTest('test changed')}>{test}</button>
  )
}