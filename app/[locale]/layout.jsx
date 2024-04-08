import SessionWrapper from "@/components/auth/SessionWrapper";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"
import React, { Suspense } from 'react';


export default function LocaleLayout(props) {
  return (
    <html lang={props.params.locale}>
        <body>
          <SessionProvider session={props.session}>
              <Suspense fallback="loading...">
                {props.children}
              </Suspense>
          </SessionProvider>
        </body>
    </html>
  );
}
