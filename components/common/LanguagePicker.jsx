"use client";
import React from "react"
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {GlobeIcon} from "lucide-react"
import {useLocale} from "next-intl"
import {useRouter} from "next/navigation"
import { locales} from "@/navigation";

export function LanguagePicker() {
  const {locale} = useLocale()
  const router = useRouter()
  function changeLocale(locale) {
    // set cookie to remember locale
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`
    router.refresh()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="small"
          icon={<GlobeIcon />}
        >
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => changeLocale(l)}
          >
            {l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}