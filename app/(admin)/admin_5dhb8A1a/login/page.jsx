"use client"

import Image from "next/image";
import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginUserAdmin } from "./login-action"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeNoneIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function LoginAdmin() {
  const formLogin = useForm({
      resolver: zodResolver(schemaLogin),
      defaultValues: {
        email: "",
        password: "",
      },

    });
  const onSubmitLogin = async (data) => {
    try {
      const res = await loginUserAdmin(data)
      const { success, failure } = res
      console.log(success, failure)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-14">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/LogoBobochicParis.svg"
          alt="BobochicParis Logo"
          width={150}
          height={37}
          priority
        />
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/Symfobo.svg"
          alt="Symfobo Logo"
          width={200}
          height={37}
          priority
        />
      </div>
      <div className="inline-flex h-[364px] w-[450px] flex-col items-start justify-center gap-10">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Form {...formLogin}>
            <form
              onSubmit={formLogin.handleSubmit(onSubmitLogin)}
              className={"flex w-full flex-col gap-4"}
            >
              <FormField
                control={formLogin.control}
                name={"email"}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel placeholder="marion@bobochicparis.com">Adresse Email</FormLabel>
                      <FormControl className={"inline-flex h-10 w-[450px] items-center justify-start gap-2 rounded-[99px] border border-gray-200 bg-white px-4 py-2 shadow"}>
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
                      <FormControl className={"inline-flex h-10 w-[450px] items-center justify-start gap-2 rounded-[99px] border border-gray-200 bg-white px-4 py-2 shadow"}>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                      {/*<span className="w-[450px] text-base font-normal leading-normal text-zinc-500">*/}
                      {/*  <button> Mot de passe oublié ?</button>*/}
                      {/*</span>*/}
                    </FormItem>
                  )
                }}
              />
              <FormItem className={"inline-flex h-24 w-[450px] flex-col items-center justify-start gap-4"}>
                <Button
                  className="inline-flex h-10 w-[187px] items-center justify-center rounded-[99px] border-2 border-blue-600 bg-blue-500 px-6 py-2 shadow"
                  type="submit"
                >
                  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.2806 9.53063L8.53063 13.2806C8.46094 13.3503 8.37822 13.4056 8.28717 13.4433C8.19613 13.481 8.09855 13.5004 8 13.5004C7.90145 13.5004 7.80387 13.481 7.71283 13.4433C7.62178 13.4056 7.53906 13.3503 7.46937 13.2806C7.39969 13.2109 7.34442 13.1282 7.3067 13.0372C7.26899 12.9461 7.24958 12.8485 7.24958 12.75C7.24958 12.6515 7.26899 12.5539 7.3067 12.4628C7.34442 12.3718 7.39969 12.2891 7.46937 12.2194L9.93969 9.75H1.25C1.05109 9.75 0.860322 9.67098 0.71967 9.53033C0.579018 9.38968 0.5 9.19891 0.5 9C0.5 8.80109 0.579018 8.61032 0.71967 8.46967C0.860322 8.32902 1.05109 8.25 1.25 8.25H9.93969L7.46937 5.78063C7.32864 5.63989 7.24958 5.44902 7.24958 5.25C7.24958 5.05098 7.32864 4.86011 7.46937 4.71937C7.61011 4.57864 7.80098 4.49958 8 4.49958C8.19902 4.49958 8.38989 4.57864 8.53063 4.71937L12.2806 8.46937C12.3504 8.53903 12.4057 8.62175 12.4434 8.71279C12.4812 8.80384 12.5006 8.90144 12.5006 9C12.5006 9.09856 12.4812 9.19616 12.4434 9.28721C12.4057 9.37825 12.3504 9.46097 12.2806 9.53063ZM17 0H11.75C11.5511 0 11.3603 0.0790178 11.2197 0.21967C11.079 0.360322 11 0.551088 11 0.75C11 0.948912 11.079 1.13968 11.2197 1.28033C11.3603 1.42098 11.5511 1.5 11.75 1.5H17V16.5H11.75C11.5511 16.5 11.3603 16.579 11.2197 16.7197C11.079 16.8603 11 17.0511 11 17.25C11 17.4489 11.079 17.6397 11.2197 17.7803C11.3603 17.921 11.5511 18 11.75 18H17C17.3978 18 17.7794 17.842 18.0607 17.5607C18.342 17.2794 18.5 16.8978 18.5 16.5V1.5C18.5 1.10218 18.342 0.720644 18.0607 0.43934C17.7794 0.158035 17.3978 0 17 0Z"
                      fill="white"/>
                  </svg>
                  &nbsp;
                  Se connecter
                </Button>
                <Button variant="outline" className="inline-flex h-10 w-[349px] items-center justify-center rounded-[99px] border-2 border-neutral-300 px-6 py-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.125 14.875C11.125 15.0975 11.059 15.315 10.9354 15.5C10.8118 15.685 10.6361 15.8292 10.4305 15.9144C10.2249 15.9995 9.99875 16.0218 9.78052 15.9784C9.56229 15.935 9.36184 15.8278 9.2045 15.6705C9.04717 15.5132 8.94002 15.3127 8.89661 15.0945C8.8532 14.8762 8.87548 14.65 8.96063 14.4445C9.04578 14.2389 9.18998 14.0632 9.37498 13.9396C9.55999 13.816 9.77749 13.75 10 13.75C10.2984 13.75 10.5845 13.8685 10.7955 14.0795C11.0065 14.2905 11.125 14.5766 11.125 14.875ZM10 4.75C7.93187 4.75 6.25 6.26406 6.25 8.125V8.5C6.25 8.69891 6.32901 8.88968 6.46967 9.03033C6.61032 9.17098 6.80108 9.25 7 9.25C7.19891 9.25 7.38967 9.17098 7.53033 9.03033C7.67098 8.88968 7.75 8.69891 7.75 8.5V8.125C7.75 7.09375 8.75968 6.25 10 6.25C11.2403 6.25 12.25 7.09375 12.25 8.125C12.25 9.15625 11.2403 10 10 10C9.80108 10 9.61032 10.079 9.46967 10.2197C9.32901 10.3603 9.25 10.5511 9.25 10.75V11.5C9.25 11.6989 9.32901 11.8897 9.46967 12.0303C9.61032 12.171 9.80108 12.25 10 12.25C10.1989 12.25 10.3897 12.171 10.5303 12.0303C10.671 11.8897 10.75 11.6989 10.75 11.5V11.4325C12.46 11.1184 13.75 9.75437 13.75 8.125C13.75 6.26406 12.0681 4.75 10 4.75ZM19.75 10C19.75 11.9284 19.1782 13.8134 18.1068 15.4168C17.0355 17.0202 15.5127 18.2699 13.7312 19.0078C11.9496 19.7458 9.98918 19.9389 8.09787 19.5627C6.20655 19.1865 4.46927 18.2579 3.10571 16.8943C1.74214 15.5307 0.813546 13.7934 0.43734 11.9021C0.0611344 10.0108 0.254217 8.05042 0.992171 6.26884C1.73013 4.48726 2.97981 2.96452 4.58319 1.89317C6.18657 0.821828 8.07163 0.25 10 0.25C12.585 0.25273 15.0634 1.28084 16.8913 3.10872C18.7192 4.93661 19.7473 7.41498 19.75 10ZM18.25 10C18.25 8.3683 17.7661 6.77325 16.8596 5.41655C15.9531 4.05984 14.6646 3.00242 13.1571 2.37799C11.6496 1.75357 9.99084 1.59019 8.3905 1.90852C6.79016 2.22685 5.32015 3.01259 4.16637 4.16637C3.01258 5.32015 2.22685 6.79016 1.90852 8.39051C1.59019 9.99085 1.75357 11.6496 2.37799 13.1571C3.00241 14.6646 4.05984 15.9531 5.41654 16.8596C6.77325 17.7661 8.3683 18.25 10 18.25C12.1873 18.2475 14.2842 17.3775 15.8309 15.8309C17.3775 14.2843 18.2475 12.1873 18.25 10Z"
                      fill="#232426"/>
                  </svg>
                  &nbsp;
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Je n'arrive pas à me connecter</span>
                </Button>
              </FormItem>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p>
          <span>2024</span>
          <span>© BobochicParis</span>
        </p>
      </div>
    </main>
  );
}
