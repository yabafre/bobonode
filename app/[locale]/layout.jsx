"use client"
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react"
import AuthGuard from "@/components/auth/AuthGuard"
import React, { Suspense } from 'react';


export default function LocaleLayout(props) {
  // console.log('locale layout', props)
  return (
      <SessionProvider>
        <html lang={props.params.locale}>
            <body>
            <AuthGuard>
              <Suspense fallback="loading">
                {props.children}
              </Suspense>
            </AuthGuard>
            </body>
        </html>
      </SessionProvider>
  );
}
