const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmail({ subject, text, /*html,*/ attachments }) {
  const info = await transporter.sendMail({
    from: `"Junta de Freguesia Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_DESTINATARIO,
    subject,
    text,
    //html,
    attachments,
  });

  console.log("Email enviado:", info.messageId);
}

module.exports = { enviarEmail };