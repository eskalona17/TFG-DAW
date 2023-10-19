import multer from 'multer'
import { fileURLToPath } from 'url'
import path, { dirname, join } from 'path'

// Define la carpeta de destino para las imágenes cargadas
const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDirectory = dirname(currentFilePath)

// Define la carpeta de destino para las imágenes cargadas
const uploadDestination = join(currentDirectory, '../public/profilePic/')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestination)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

export default upload
