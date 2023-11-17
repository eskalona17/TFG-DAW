import multer from 'multer'
import { fileURLToPath } from 'url'
import path, { dirname, join } from 'path'

// Define la carpeta de destino base para las imágenes cargadas
const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDirectory = dirname(currentFilePath)
const uploadBaseDestination = join(currentDirectory, '../public/')

// Función para generar un almacenamiento de multer personalizado
const createMulterStorage = (folderName) => {
  const uploadDestination = join(uploadBaseDestination, folderName)

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDestination)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

  return multer({ storage })
}

// Crear configuraciones de multer separadas para profilePic y media
const profilePicUpload = createMulterStorage('profilePic')
const mediaUpload = createMulterStorage('media')

export { profilePicUpload, mediaUpload }
