import { fileURLToPath } from 'url'
import express from 'express'
import path from 'path'

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create a router
const router = express.Router()

// Add a route to serve the index.html file
router.get('^/$|/index(.html)?', (req, res) => {
  // Send the index.html file
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// Export the router
export default router
