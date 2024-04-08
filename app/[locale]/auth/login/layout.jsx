// layout.jsx
import React from "react"

export const metadata = {
  title: "Authentication",
  description: "Authentication page for BoboNext",
}

export default function LoginLayout({children}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </main>
  );
}