// This file is used to configure the Symfobo client
// path: lib/config.js
/**
 * @module lib/config
 * @desc This file is used to configure the Symfobo client
 * @requires core/api/symfobojs
 */

import Symfobo from "@core/api/symfobojs"

// Defaults to standard port for Symfobo backend api
let SYMFOBO_BACKEND_API_URL = "http://localhost:9000/api/v1"

let SYMFOBO_BACK_API_KEY = process.env.NEXT_PUBLIC_BACK_API_KEY

if (process.env.NEXT_PUBLIC_SYMFOBO_BACKEND_API_URL) {
  SYMFOBO_BACKEND_API_URL = process.env.SYMFOBO_BACKEND_API_URL
}

export const SymfoboClient = new Symfobo({
  baseUrl: SYMFOBO_BACKEND_API_URL,
  maxRetries: 3,
  apiKey: SYMFOBO_BACK_API_KEY
})

