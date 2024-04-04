// Code: bobonext/app/admin_5dhb8A1a/layout.jsx
import React from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "Admin",
  description: "Admin panel for BoboNext",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
