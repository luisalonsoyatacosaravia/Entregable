const db = require('../config/db'); 

exports.obtenerCategorias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id_categoria, nombre_categoria FROM categoria ORDER BY nombre_categoria');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ error: 'Error interno del servidor al obtener categorías' });
    }
};