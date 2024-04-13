import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"




export default function DashboardLayout({ children}) {
  return (
    <section className={"h-screen dashboardLayout"}>
      <nav className={"flex justify-between items-center p-4"}>
        <ul className={"flex space-x-4"}>
          <li>
            <Link href={"/admin_5dhb8A1a/dashboard"}>
              <h2>Dashboard</h2>
            </Link>
          </li>
          <li>
            <Link href={"/admin_5dhb8A1a/dashboard/modules"}>
              <h2>Modules</h2>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={"flex justify-between items-center p-6"}>
        <div className={"flex-1"}>
          {children}
        </div>
      </div>
    </section>
  )
}