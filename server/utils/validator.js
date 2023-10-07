import z from 'zod'

// Función para validar campos de texto
export async function validateText (text) {
  const textSchema = z.string({
    required_error: 'Field required',
    invalid_type_error: 'Field must be a string'
  }).min(3, {
    message: 'Must be 3 or fewer characters long'
  })
  return await textSchema.parseAsync(text)
}

// Función para validar direcciones de correo electrónico
export async function validateEmail (email) {
  const emailSchema = z.string().email({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  })
  return await emailSchema.parseAsync(email)
}

// Función para validar contraseñas
export async function validatePassword (password) {
  const passwordSchema = z.string({
    required_error: 'Password is required'
  }).min(6, {
    message: 'Must be 6 or fewer characters long'
  })
  return await passwordSchema.parseAsync(password)
}

// Función para validar direcciones
export async function validateAddress (address) {
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.number().int().min(1000).max(52999),
    country: z.enum(['spain'])
  })
  return await addressSchema.parseAsync(address)
}
