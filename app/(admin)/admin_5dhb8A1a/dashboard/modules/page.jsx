// module manager page.jsx
// Path: app/%28admin%29/admin_5dhb8A1a/dashboard/modules/page.jsx

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ModuleList from "@/components/core/ModuleCore/ModuleList"

export default function PageModule() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
          <CardDescription>Manage your modules</CardDescription>
        </CardHeader>
        <CardContent>
          <ModuleList />
        </CardContent>
        <CardFooter>
          <Link href="/dashboard">
            <Button>Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}