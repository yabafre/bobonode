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

export const metadata = {
    title: "Dashboard's Page",
    description: "Admin panel for BoboNext",
};

export default function Page(props) {
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
                    <Link href={"/admin_5dhb8A1a"}>
                        Go to Admin
                    </Link>
                </CardFooter>
            </Card>
        </main>
    );
}