import { fileURLToPath } from 'url'
import path from 'path'

/*
 * The first thing the error handler does is set the response status code to 404 Not Found.
 * Next, the error handler checks if the request accepts HTML.
 * If it does, the error handler sends the 404.html file.
 * If the request does not accept HTML, the error handler checks if the request accepts JSON.
 * If it does, the error handler sends a JSON object with the message "404 Not Found".
 * Otherwise, the error handler sends the message "404 Not Found" as plain text.
*/

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
