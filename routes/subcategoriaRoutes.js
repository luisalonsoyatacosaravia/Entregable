// routes/subcategoriaRoutes.js
const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaController');

router.get('/', subcategoriaController.obtenerSubcategorias);
router.get('/porCategoria/:id_categoria', subcategoriaController.obtenerSubcategoriasPorCategoria);

module.exports = router;