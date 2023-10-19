export default function emailTemplate (link) {
  return `
  <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style type="text/css">
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1E1E1E;
        color: #FAFAFA;
      }

      .main {
        background-color: #252525;
      }
    }

    [data-ogsc] body {
      background-color: #1E1E1E;
      color: #FAFAFA;
    }

    [data-ogsc] .main {
      background-color: #252525;
    }

    .main {
      width: 100%;
      max-width: 600px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
      border-radius: 6px;
      font-size: 1.1rem;
    }
  </style>
</head>

<body>
  <center style="width: 100%;
  table-layout: fixed;
  padding: 60px 0px;">
    <table class="main">
      <tr>
        <td style="padding: 0 20px;">
          <h2 style="text-align: center;">¿Has olvidado tu contraseña?</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px;">
          <p>
            ¡Estás de suerte! Prueba haciendo click en el botón de abajo para establecer una nueva contraseña:
          </p>
        </td>
      </tr>
      <tr>
        <td height="100px" style="text-align: center;">
          <a style="background-color: #FFA07A;
          color: #fff;
          font-weight: bold;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;" href="${link}">Restablecer contraseña</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px;">
          <p>
            Este enlace solo será válido durante los próximos <strong>10 minutos.</strong> ¡Date prisa!
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px;">
          <p>
            Si has recibido este correo pero no has sido tú quien lo ha solicitado, puedes olvidarte de esto...
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px;">
          <p>
            Nos vemos pronto. ¡Buena suerte!
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 20px; text-align: center; font-size: .8rem;">
          <p>
            Por favor, no responda a este correo. No reenvíe este mensaje.
          </p>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>`
}
