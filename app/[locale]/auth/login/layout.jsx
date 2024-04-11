// layout.jsx
import React from "react"

export const metadata = {
  title: "Authentication",
  description: "Authentication page for BoboNext",
}

export default function LoginLayout({children}) {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-24">
      {children}
    </main>
  );
}