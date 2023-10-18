import allowedOrigins from './allowedOrigins.js'

/*
 * origin: this option specifies the origins that are allowed to access the application.
 *         If the origin is found in the allowedOrigins list, or if the origin is empty, the function calls the callback with a null value and true as arguments.
 *         Otherwise, it calls the callback with an Error object indicating that the origin is not allowed by CORS (Cross-Origin Resource Sharing).
 *
 * credentials: this option specifies whether or not CORS requests can include credentials, such as session cookies.
 *
 * optionsSuccessStatus: specifies the HTTP status code that should be returned for CORS preflight requests. This is set to 200 by default.
 */

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOptions
