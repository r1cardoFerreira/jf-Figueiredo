const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: `"Junta de Freguesia Website" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Email enviado:", info.messageId);
}

module.exports = { enviarEmail };