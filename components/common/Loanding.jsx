"use client"

// compoenents/common/Loading.jsx
import React from 'react';


import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"



export const Loading = ({ open }) => {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog open={open} leastDestructiveRef={cancelRef}>
      <AlertDialogContent className={"flex justify-center z-50 !bg-transparent border-0 shadow-none"}>
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

