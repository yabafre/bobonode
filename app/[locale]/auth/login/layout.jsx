import React from "react";
import SessionWrapper from "@/components/auth/SessionWrapper";
import "@/styles/globals.css";

const locales = ['en', 'fr', 'pl'];
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export const metadata = {
  title: "Authentication",
  description: "Authentication page for BoboNext",
}

export default function Login({children, params: {locale}}) {

  return (
    <html lang={locale}>
      <SessionWrapper>
        <body>
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
