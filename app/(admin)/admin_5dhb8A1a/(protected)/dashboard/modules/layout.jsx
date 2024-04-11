//layout module manager
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button} from "@/components/ui/button"

export const metadata = {
  title: "Layout Module",
  description: "This is a sample layout module.",
};



export default function LayoutModule({ children}) {
  return (
    <div className="flex flex-col gap-4 moduleLayout ">
      <Card className={""}>
        <CardHeader>
          <CardTitle>Layout Module</CardTitle>
          <CardDescription>Manage your layout</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter>
          <Link href="/admin_5dhb8A1a/dashboard/modules">
            <Button>Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}