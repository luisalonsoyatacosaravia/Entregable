const db = require('../config/db'); 

exports.obtenerCursos = async (req, res) => {
    try {
        const query = `
            SELECT
                c.id_curso,
                c.titulo,
                c.fecha_inicio,
                c.fecha_fin,
                c.duracion_horas,
                c.precio,
                cat.nombre_categoria,
                scat.nombre_subcategoria,
                d.nombre_completo AS nombre_docente
            FROM
                cursos c
            JOIN
                subcategoria scat ON c.id_subcategoria = scat.id_subcategoria
            JOIN
                categoria cat ON scat.id_categoria = cat.id_categoria
            JOIN
                docente d ON c.id_docente = d.id_docente
            ORDER BY c.id_curso DESC;
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.obtenerCursoPorId = async (req, res) => {
    const { id_curso } = req.params;
    try {
        const query = `
            SELECT
                c.*,
                scat.id_categoria
            FROM
                cursos c
            JOIN
                subcategoria scat ON c.id_subcategoria = scat.id_subcategoria
            WHERE c.id_curso = ?;
        `;
        const [rows] = await db.query(query, [id_curso]);
        if (rows.length === 0) return res.status(404).json({ message: 'Curso no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// REGISTRAR (CREATE)
exports.registrarCurso = async (req, res) => {
    const { titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO cursos (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente]
        );
        res.status(201).json({ message: 'Curso registrado con éxito', id: result.insertId });
    } catch (error) {
        console.error('Error al registrar curso:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

// ACTUALIZAR (UPDATE)
exports.actualizarCurso = async (req, res) => {
    const { id_curso } = req.params;
    const { titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE cursos SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, duracion_horas = ?, precio = ?, id_subcategoria = ?, id_docente = ? WHERE id_curso = ?',
            [titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente, id_curso]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' });
        res.json({ message: 'Curso actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar curso:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

// ELIMINAR (DELETE)
exports.eliminarCurso = async (req, res) => {
    const { id_curso } = req.params;
    try {
        const [result] = await db.query('DELETE FROM cursos WHERE id_curso = ?', [id_curso]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Curso no encontrado' });
        res.json({ message: 'Curso eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar curso:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};