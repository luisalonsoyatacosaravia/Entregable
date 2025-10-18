const db = require('../config/db'); 

exports.obtenerDocentes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id_docente, nombre_completo FROM docente ORDER BY nombre_completo');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener docentes:", error);
        res.status(500).json({ error: 'Error interno del servidor al obtener docentes' });
    }
};