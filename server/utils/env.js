export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'dominio en producción'

export const PORT = () =>
  process.env.PORT
    ? process.env.PORT
    : process.env.NODE_ENV !== 'production'
      ? 1234
      : process.env.PORT
