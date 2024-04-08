import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales} from "@/navigation";

// Can be imported from a shared config

export default getRequestConfig(async ({locale}) => {
    const baseLocale = new Intl.Locale(locale).baseName;
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(baseLocale)) notFound();

    return {
        messages: (await import(`./lang/${locale}.json`)).default
    };
});