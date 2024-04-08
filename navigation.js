// navigation.js
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'fr', 'pl'];

export const localePrefix = 'always'; // Default

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales, localePrefix});