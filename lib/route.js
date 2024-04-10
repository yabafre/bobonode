export const privateRoutes = [
  '/admin_5dhb8A1a/dashboard',
  '/priv/:path*', // for private pages
  '/private/:path*' // for private pages admin
]

export const authRoutes = [
  '/auth/login',
  '/admin_5dhb8A1a/auth/login',
  '/api/auth/signin'
]


export const DEFAULT_REDIRECT_LOCALE_URL = '/'

export const DEFAULT_REDIRECT_LOCALE_LOGIN_URL = '/auth/login'

export const DEFAULT_REDIRECT_ADMIN_LOGIN_URL = '/admin_5dhb8A1a/auth/login'

export const DEFAULT_REDIRECT_ADMIN_URL = '/admin_5dhb8A1a/dashboard'