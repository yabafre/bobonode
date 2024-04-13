"use client"

// compoenents/common/Loading.jsx
import React from 'react';


import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"



export const Loading = () => {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog open={true} leastDestructiveRef={cancelRef}>
      <AlertDialogContent className={"z-50 flex justify-center border-0 !bg-transparent shadow-none"}>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="loading loading02">
          <span>S</span>
          <span>Y</span>
          <span>M</span>
          <span>F</span>
          <span>O</span>
          <span>B</span>
          <span>O</span>
        </div>
        <div className="hidden">
          <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

