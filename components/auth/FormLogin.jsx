"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getProviders, signIn, useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useRouter } from "next/navigation"

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const schemaRegister = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  civility: z.number(["mr", "mme"], {
    required_error: "You need to select a notification type.",
  }),
  firstname: z.string(),
  lastname: z.string(),
  newsletter: z.boolean(
    {
      required_error: "You need to select a notification type.",
    }
  ),
  address: z.string(),
  city: z.string(),
  zip: z.string(),
  country: z.string(),
  phone: z.string(),
})

export default function FormLogin() {
  const { data: session } = useSession()
  const router = useRouter()
  const formLogin = useForm({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const formRegister = useForm({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      password: "",
      civility: 0,
      firstname: "",
      lastname: "",
      newsletter: false,
      address: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
    },
  })
  const onSubmitLogin = async (data) => {
    console.log("Login form : ", data)
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    })
  }
  const onSubmitRegister = async (data) => {
    console.log("Register form : ", data)
  }
  useEffect(() => {
    console.log("Providers : ", session)
  }, [session])
  return (
    <Tabs defaultValue="login" className="w-2/4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...formLogin}>
              <form
                onSubmit={formLogin.handleSubmit(onSubmitLogin)}
                className={"w-full flex flex-col gap-4"}
              >
                <FormField
                  control={formLogin.control}
                  name={"email"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formLogin.control}
                  name={"password"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormItem>
                  <Button variant={'outline'} type="submit">Login</Button>
                </FormItem>
              </form>
            </Form>
          </CardContent>
          <CardFooter className={"flex flex-row justify-center gap-4"}>
            <Button onClick={() => signIn("google")} className="flex flex-row gap-2 items-center">
              <FcGoogle />
              <span>with google</span>
            </Button>
            <Button onClick={() => signIn("github")} className="flex flex-row gap-2 items-center">
              <FaGithub />
              <span>with github</span>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...formRegister}>
              <form
                onSubmit={formRegister.handleSubmit(onSubmitRegister)}
                className={"w-full grid grid-cols-4 gap-4"}
              >
                <FormField
                  control={formRegister.control}
                  name={"email"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"password"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"civility"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Civility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={0} />
                              </FormControl>
                              <FormLabel className="font-normal">Mr</FormLabel>
                              <FormControl>
                                <RadioGroupItem value={1} />
                              </FormControl>
                              <FormLabel className="font-normal">Mme</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"firstname"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"lastname"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"newsletter"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Newsletter</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"address"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"city"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"zip"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"country"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formRegister.control}
                  name={"phone"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormItem>
                  <Button type="submit">Register</Button>
                </FormItem>
              </form>
            </Form>
          </CardContent>
          <CardFooter className={"flex flex-row justify-center gap-4"}>
            <Button onClick={() => signIn("google")} className="flex flex-row gap-2 items-center">
              <FcGoogle />
              <span>with google</span>
            </Button>
            <Button onClick={() => signIn("github")} className="flex flex-row gap-2 items-center">
              <FaGithub />
              <span>with github</span>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}