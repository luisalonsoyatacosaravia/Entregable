// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar todas las rutas
const categoriaRoutes = require('./routes/categoriaRoutes');
const subcategoriaRoutes = require('./routes/subcategoriaRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({ 
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}));

// Middlewares para procesar JSON y datos de formulario
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API (endpoint /api/...)
app.use('/api/categorias', categoriaRoutes);
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/cursos', cursoRoutes); 

// Ruta principal para servir cursos.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cursos.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});