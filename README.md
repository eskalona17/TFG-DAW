# Guía de uso de la aplicación InstaPet

Bienvenido/a a nuestra aplicación. A continuación, te proporcionamos una guía paso a paso para que puedas probar la aplicación de manera efectiva.

## 1. Descarga y configuración Inicial

Descarga el archivo y descomprímelo. Obtendrás dos carpetas: `client` y `server`.

## 2. Descarga dependencias

Para que la aplicación se ejecute correctamente, debes hacer una instalación de las dependencias utilizadas.
Para ello repite estos pasos en las rutas `client` y `server`.
1. Abre una pestaña de la terminal.
2. Navega a la raíz de la carpeta `client` o `server` respectivamente.
3. Ejecuta el comando:

```bash
npm install
``` 

## 3. Variables de entorno

Debes configurar las variables de entorno de cada servidor.
Para ello repite estos pasos en las carpetas `client` y `server`.
1. Abre la carpeta.
2. Renombra el archivo `.env.example` por `.env`.

## 4. Iniciar servidores

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

## 5. Acceso a la app

### Iniciar sesión

1. Abre tu navegador y ve a [http://localhost:5173/](http://localhost:5173/)
2. Como no hay ningun usuario con la sesión iniciada, se te muestra la página para hacer login.
3. Ingresa con el usuario de prueba:
    - Usuario: odin
    - Contraseña: 123456

### Registro de usuario

1. Para registrar un nuevo usuario, visita [http://localhost:5173/register](http://localhost:5173/register)
2. Completa el formulario y crea un nuevo usuario.
3. Después haz login en la página que se muestra.

## 6. Navegación y funcionalidades

Después de iniciar sesión, puedes explorar las distintas vistas de la aplicación:

- ***Principal:*** Página principal después del inicio de sesión.
- ***Explora:*** Vista de exploración.
- ***Mensajes:*** Intercambia mensajes en tiempo real con otros usuarios.
- ***Editar Perfil:*** Edita la información de tu perfil.
- ***Configuración:*** Alterna entre modo claro u oscuro, cierra sesión o elimina tu perfil.

## 7. Estado de desarrollo

- Actualmente, la versión 1.0.0 de la aplicación ya se encuentra disponible.
- El código fuente completo lo puedes encontrar en el siguiente repositorio público [GutHub](https://github.com/eskalona17/TFG-DAW). Debes situarte sobre la rama `Final`
- Puedes consultar el diseño final en el siguiente enlace [Figma](https://www.figma.com/proto/YBFfJ2qbnVAv2IiIzuYUrx/Mockup?type=design&node-id=1-9&t=BFUwUcrfdWatSBw3-1&scaling=scale-down-width&page-id=0%3A1&starting-point-node-id=1%3A9&mode=design)

¡Gracias por utilizar nuestra aplicación! Si tienes alguna pregunta o problema, no dudes en contactarnos. ¡Disfruta explorando la aplicación!
