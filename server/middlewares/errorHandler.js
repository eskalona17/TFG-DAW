import { fileURLToPath } from 'url'
import path from 'path'

const NOT_FOUND = 404
const NOT_FOUND_MESSAGE = '404 Not Found'
const directory = path.dirname(fileURLToPath(import.meta.url))

const errorHandler = (req, res) => {
  res.status(NOT_FOUND)
  if (req.accepts('html')) {
    res.sendFile(path.join(directory, '..', 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: NOT_FOUND_MESSAGE })
  } else {
    res.type('txt').send(NOT_FOUND_MESSAGE)
  }
}

export { errorHandler }
