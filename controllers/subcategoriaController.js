const db = require('../config/db'); 

exports.obtenerSubcategorias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id_subcategoria, nombre_subcategoria, id_categoria FROM subcategoria ORDER BY nombre_subcategoria');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener subcategorías:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.obtenerSubcategoriasPorCategoria = async (req, res) => {
    const { id_categoria } = req.params;
    try {
        const [rows] = await db.query('SELECT id_subcategoria, nombre_subcategoria FROM subcategoria WHERE id_categoria = ? ORDER BY nombre_subcategoria', [id_categoria]);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener subcategorías por categoría:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};