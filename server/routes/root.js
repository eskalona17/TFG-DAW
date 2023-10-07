import { fileURLToPath } from 'url'
import express from 'express'
import path from 'path'

// Get the directory of the current file
const directory = path.dirname(fileURLToPath(import.meta.url))

// Create a router
const router = express.Router()

// Add a route to serve the index.html file
router.get('^/$|/index(.html)?', (req, res) => {
  // Send the index.html file
  res.sendFile(path.join(directory, '..', 'views', 'index.html'))
})

// Export the router
export default router
