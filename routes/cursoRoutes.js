// routes/cursoRoutes.js (guiado por image_c484fd.jpg)
const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.post('/', cursoController.registrarCurso);
router.get('/', cursoController.obtenerCursos);
router.get('/:id_curso', cursoController.obtenerCursoPorId);
router.put('/:id_curso', cursoController.actualizarCurso);
router.delete('/:id_curso', cursoController.eliminarCurso);

module.exports = router;