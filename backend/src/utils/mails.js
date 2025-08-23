const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmail({ subject, text, html, attachments }) {
  const info = await transporter.sendMail({
    from: `"Junta de Freguesia Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_DESTINATARIO,
    subject,
    text,
    html,
    attachments,
  });

  console.log("Email enviado:", info.messageId);
}

function escapeHtml(unsafe) { //evitar xss
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function gerarHtmlEmail(dadosHtml) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #2e6c80;">Nova Sugestão ou Reclamação</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Nome:</td>
          <td style="padding: 8px;">${escapeHtml(dadosHtml.nome)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email:</td>
          <td style="padding: 8px;">${escapeHtml(dadosHtml.email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Assunto:</td>
          <td style="padding: 8px;">${escapeHtml(dadosHtml.assunto || "-")}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Mensagem:</td>
          <td style="padding: 8px;">${escapeHtml(dadosHtml.mensagem || "-")}</td>
        </tr>
      </table>
    </div>
  `;
}


module.exports = { enviarEmail, gerarHtmlEmail };