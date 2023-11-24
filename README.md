# Guía de Uso de la aplicación (nombre por determinar)

Bienvenido/a a nuestra aplicación. A continuación, te proporcionamos una guía paso a paso para que puedas probar la aplicación de manera efectiva.

## 1. Descarga y Configuración Inicial

Descarga el archivo y descomprímelo. Obtendrás dos carpetas: `client` y `server`.

## 2. Variables de entorno

Debes configurar las variables de entorno de cada servidor.
Para ello repite estos pasos en las carpetas `client` y `server`.
1. Abre la carpeta.
2. Renombra el archivo `.env.example` por `.env`.

## 3. Iniciar Servidores

Para ejecutar la aplicación, sigue estos pasos desde tu terminal:

### a. Iniciar el Cliente

1. Abre una pestaña de la terminal.
2. Navega a la raíz de la carpeta `client`.
3. Ejecuta el comando:

```bash
npm run dev
```

### b. Iniciar el Servidor

1. Abre una pestaña de la terminal.
2. Navega a la raíz de la carpeta `server`.
3. Ejecuta el comando:

```bash
npm run dev
```

Ahora, tendrás ambos servidores desplegados en tu entorno local.

## 4. Acceso a la App

### Iniciar Sesión

1. Abre tu navegador y ve a [http://localhost:5173/login](http://localhost:5173/login)
2. Ingresa con el usuario de prueba:
    - Usuario: test
    - Contraseña: 123456

### Registro de Usuario

1. Para registrar un nuevo usuario, visita [http://localhost:5173/register](http://localhost:5173/register)
2. Completa el formulario y crea un nuevo usuario.

## 5. Navegación y Funcionalidades

Después de iniciar sesión, puedes explorar las distintas vistas de la aplicación:

- ***Principal:*** Página principal después del inicio de sesión.
- ***Explora:*** Vista de exploración.
- ***Mensajes:*** (En desarrollo).
- ***Editar Perfil:*** Edita la información de tu perfil.
- ***Configuración:*** (En desarrollo).

## 6. Estado de Desarrollo

- La parte del servidor está configurada y funcionando en un 95%.
- Se está trabajando en la conexión entre el cliente y el servidor.
- El diseño definitivo y la funcionalidad completa del frontend están en desarrollo.

¡Gracias por utilizar nuestra aplicación! Si tienes alguna pregunta o problema, no dudes en contactarnos. ¡Disfruta explorando la aplicación!
