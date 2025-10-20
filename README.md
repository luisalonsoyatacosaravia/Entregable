```sql
CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE subcategoria (
    id_subcategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_subcategoria VARCHAR(255) NOT NULL UNIQUE,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE docente (
    id_docente INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    duracion_horas INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    id_subcategoria INT NOT NULL,
    id_docente INT NOT NULL,
    FOREIGN KEY (id_subcategoria) REFERENCES subcategoria(id_subcategoria)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (id_docente) REFERENCES docente(id_docente)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

## 🛠️ Tecnologías Clave

| Área | Tecnología | Propósito |
| **Backend** | Node.js, Express | Entorno de ejecución y marco de trabajo para la API REST. |
| **Frontend** | HTML5 / JavaScript (`cursos.js`) | Estructura y lógica. |
| **Estilos** | Bootstrap 5.3 | Framework CSS para el diseño responsivo y componentes. |
| **Alertas** | SweetAlert2 | Modales de confirmación y notificaciones. |

**Instalar Dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar el Servidor Express:**
    ```bash
    npm start
    ```
    👤 Autor
Luis Yataco Saravia

[https://github.com/luisalonsoyatacosaravia/Entregable.git]