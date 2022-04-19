const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento</title>
  </head>
  <body>
    <div class="container section">
      <label>Iphone</label>
      <img src="https://i.blogs.es/187a45/iphone-11-pro-02/450_1000.jpg">
      <img src="https://asyscomputadores.com/wp-content/uploads/2021/07/h6PGQO8p-Dell-Alienware-Aurora-Ryzen-Edition-R10-1.jpg.webp">
    </div>
  </body>
  </html>`
}

function getMessage(emailParams){
  return{
    to:emailParams.toEmail,
    from: 'santiago.jimenezv@autonoma.edu.co',
    subject: 'Confirmación orden de compra BLACKFRIDAY',
    text: `Hola ${emailParams.customerName}, te enviamos las imágenes de los productos comprados
    y la factura con número ${emailParams.orderNro}, Gracias por tu compra`,
    html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
  }
}

async function sendOrder(emailParams){
  try {
    await sgMail.send(getMessage(emailParams))
    return {message: 'Confirmación de compra enviada'}
  } catch (err) {
    const message = 'No se pudo enviar la orden de compra. Valide los errores'
    console.error(message)
    console.error(err)
    if(err.response) console.error(err.response.body)
    return {message}
  }
}

module.exports={
  sendOrder
}