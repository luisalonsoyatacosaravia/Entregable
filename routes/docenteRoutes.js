
const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

router.get('/', docenteController.obtenerDocentes);

module.exports = router;