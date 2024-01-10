import z from 'zod'

// Function to validate text fields
export async function validateText (text) {
  const textSchema = z.string({
    required_error: 'Field required',
    invalid_type_error: 'Field must be a string'
  }).min(3, {
    message: 'Must be 3 or fewer characters long'
  })
  return await textSchema.parseAsync(text)
}

// Function to validate email
export async function validateEmail (email) {
  const emailSchema = z.string().email({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  })
  return await emailSchema.parseAsync(email)
}

// Function to validate passwords
export async function validatePassword (password) {
  const passwordSchema = z.string({
    required_error: 'Password is required'
  }).min(6, {
    message: 'Must be 6 or fewer characters long'
  })
  return await passwordSchema.parseAsync(password)
}

// Function to validate addresses
export async function validateAddress (address) {
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.number().int().min(1000).max(52999),
    country: z.enum(['España'])
  })
  return await addressSchema.parseAsync(address)
}
