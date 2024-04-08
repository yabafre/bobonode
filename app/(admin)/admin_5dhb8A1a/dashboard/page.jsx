import React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// export { auth } from "@/lib/auth";

export const metadata = {
    title: "Dashboard's Page",
    description: "Admin panel for BoboNext",
};

export default async function Page(props) {
    // const session = await auth()
    // console.log(session)
    return (
        <main className={"container"}>
            <Card>
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        This is the dashboard page.
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Link href={"/admin_5dhb8A1a/dashboard/modules"}>
                        Go to modules list
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}