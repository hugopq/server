// src/server.js
require('dotenv').config(); // Carrega .env uma única vez no início
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importa só o necessário

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || process.env.RENDER_EXTERNAL_PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middlewares
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Inicialização segura
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Backend rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro fatal:', err.message);
    process.exit(1);
  });