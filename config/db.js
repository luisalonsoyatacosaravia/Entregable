const mysql = require('mysql2'); 

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'proyecto_cursos'
});

module.exports = pool.promise();