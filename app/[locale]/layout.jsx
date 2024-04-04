import React from "react";
import SessionWrapper from "@/components/auth/SessionWrapper";
import "@/styles/globals.css";

export const metadata = {
  title: "Storefront",
  description: "Storefront for BoboNext",
};

export default function LocaleLayout({children, params: {locale}}) {
  return (
      <html lang={locale}>
            <body>
                {children}
            </body>
      </html>
  );
}
