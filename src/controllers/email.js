const nodemailer = require("nodemailer");

// Función para enviar el correo electrónico
const enviarCorreo = async (nombre, email, asunto, mensaje) => {
  // Configuración del transporte de correo
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  // Contenido del correo electrónico
  const mailOptions = {
    from: `${email}`, // Cambiar por tu dirección de correo
    to: "briannoviedo@gmail.com", // Cambiar por la dirección de correo destino
    subject: asunto,
    html: `
   <h2>Email enviado por: ${nombre} !</h2>
   <h3>Su email es: ${email}</h3>
   <br>
   <h4>Mensaje:</h4>
   <p>${mensaje}</p>
   <br>
   <br>
  <p>Bomberos Santa Catalina App.</p>`,
  };

  try {
    // Envío del correo electrónico
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo", error);
  }
};

module.exports = enviarCorreo;
