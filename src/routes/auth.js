// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require("../middleware/authMiddleware");

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// rotas protegidas:
router.get('/me', isAuthenticated, authController.me);

module.exports = router;