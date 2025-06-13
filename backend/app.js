require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
// Ficheiros estáticos de uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// const comentarioRoutes = require('./routes/comentario.route');
const eventoRoutes = require('./src/routes/eventos.route');


// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
// app.use('/api/autent', autentRoutes);
app.use('/api/eventos', eventoRoutes);

// Erro global para capturar erros de Multer e outros
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor', detalhes: err.message });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    try {
      await prisma.$connect();
      console.log('📦 Base de dados conectada com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar base de dados:', error);
    }
    console.log(`🚀 Servidor ligado em http://localhost:${PORT}`);
  });
}

module.exports = app;