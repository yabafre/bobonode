// page error.jsx is not found
"use client"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {LoginButton} from "@/components/auth/LoginButton";


export default function RouteError () {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sorry, you need to be logged in to access this page
        </CardTitle>
      </CardHeader>
      {/*<CardContent>*/}
      {/*  <pre>{error.message}</pre>*/}
      {/*</CardContent>*/}
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  )
}