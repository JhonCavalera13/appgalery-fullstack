const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');
const md_auth = require('../authenticated/authenticated');

// http://localhost:3000/users/
router.get('/', usuariosController.getAll);
router.get('/search/:email', usuariosController.findEmail);
router.post('/create', usuariosController.createUser);
router.post('/login', usuariosController.login);

module.exports = router;