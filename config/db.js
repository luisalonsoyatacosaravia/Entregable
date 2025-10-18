const mysql = require('mysql2'); // Importamos mysql2 para el soporte de promesas

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'proyecto_cursos'
});

module.exports = pool.promise();