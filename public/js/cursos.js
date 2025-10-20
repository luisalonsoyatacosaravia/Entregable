const API_URL_CURSOS = "http://localhost:3000/api/cursos";
const API_URL_CATEGORIAS = "http://localhost:3000/api/categorias";
const API_URL_SUBCATEGORIAS = "http://localhost:3000/api/subcategorias";
const API_URL_DOCENTES = "http://localhost:3000/api/docentes";

const formularioCurso = document.getElementById('form-curso');
const idCursoInput = document.getElementById('id_curso');
const tablaCursosBody = document.querySelector('#tabla-cursos tbody');
const selectCategorias = document.getElementById('id_categoria');
const selectSubcategorias = document.getElementById('id_subcategoria');
const selectDocentes = document.getElementById('id_docente');
const btnGuardar = document.getElementById('btn-guardar');


function formatDateForInput(dateString) {
    if (!dateString) return '';
    const date = new Date(Date.parse(dateString));
    const year = date.getFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
    if (!dateString) return '';
    const date = new Date(Date.parse(dateString));
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

async function obtenerCategorias(selectedId = null) {
    try {
        const response = await fetch(API_URL_CATEGORIAS);
        const categorias = await response.json();
        
        selectCategorias.innerHTML = '<option value="">Seleccione</option>';
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id_categoria;
            option.textContent = cat.nombre_categoria;
            selectCategorias.appendChild(option);
        });
        if (selectedId) selectCategorias.value = selectedId;
    } catch (error) {
        console.error("Error cargando categorías:", error);
    }
}

async function obtenerSubcategoriasPorCategoria(idCategoria, selectedId = null) {
    selectSubcategorias.innerHTML = '<option value="">Seleccione</option>';
    if (!idCategoria) return;
    
    try {
        const response = await fetch(`${API_URL_SUBCATEGORIAS}/porCategoria/${idCategoria}`);
        const subcategorias = await response.json();

        subcategorias.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.id_subcategoria;
            option.textContent = sub.nombre_subcategoria;
            selectSubcategorias.appendChild(option);
        });
        if (selectedId) selectSubcategorias.value = selectedId;

    } catch (error) {
        console.error("Error cargando subcategorías:", error);
    }
}

async function obtenerDocentes(selectedId = null) {
    try {
        const response = await fetch(API_URL_DOCENTES);
        const docentes = await response.json();
        
        selectDocentes.innerHTML = '<option value="">Seleccione</option>';
        docentes.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id_docente;
            option.textContent = doc.nombre_completo;
            selectDocentes.appendChild(option);
        });
        if (selectedId) selectDocentes.value = selectedId;
    } catch (error) {
        console.error("Error cargando docentes:", error);
    }
}

selectCategorias.addEventListener('change', (event) => {
    obtenerSubcategoriasPorCategoria(event.target.value);
});

// 1. OBTENER CURSOS (READ)
async function obtenerCursos() {
    try {
        const response = await fetch(API_URL_CURSOS, { method: "GET" });
        if (!response.ok) throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        
        const cursos = await response.json();
        tablaCursosBody.innerHTML = '';

        cursos.forEach(curso => {
            const row = tablaCursosBody.insertRow();
            row.insertCell().textContent = curso.id_curso;
            row.insertCell().textContent = curso.titulo;
            row.insertCell().textContent = curso.nombre_categoria;
            row.insertCell().textContent = curso.nombre_subcategoria;
            row.insertCell().textContent = curso.nombre_docente;
            row.insertCell().textContent = formatDisplayDate(curso.fecha_inicio);
            row.lastChild.classList.add('text-center');
            row.insertCell().textContent = formatDisplayDate(curso.fecha_fin);
            row.lastChild.classList.add('text-center');
            row.insertCell().textContent = curso.duracion_horas;
            row.lastChild.classList.add('text-center');
            row.insertCell().textContent = parseFloat(curso.precio).toFixed(2);
            row.lastChild.classList.add('text-end');

            const actionsCell = row.insertCell();
            actionsCell.classList.add('text-center');

            // Botón Editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-info', 'btn-sm', 'me-2');
            editButton.title = 'Editar';
            editButton.onclick = () => cargarParaEdicion(curso.id_curso); 
            actionsCell.appendChild(editButton);

            // Botón Eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.title = 'Eliminar';
            deleteButton.onclick = () => eliminarCurso(curso.id_curso, curso.titulo);
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        tablaCursosBody.innerHTML = `<tr><td colspan="10" class="text-center text-danger">Error al cargar cursos: ${error.message}</td></tr>`;
    }
}

// 2. CARGAR PARA EDICIÓN (READ ONE)
async function cargarParaEdicion(id_curso) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const response = await fetch(`${API_URL_CURSOS}/${id_curso}`);
        if (!response.ok) throw new Error('Curso no encontrado.');
        const curso = await response.json();

        // Llenar campos del formulario
        idCursoInput.value = curso.id_curso;
        document.getElementById('titulo').value = curso.titulo;
        document.getElementById('descripcion').value = curso.descripcion;
        document.getElementById('fecha_inicio').value = formatDateForInput(curso.fecha_inicio);
        document.getElementById('fecha_fin').value = formatDateForInput(curso.fecha_fin);
        document.getElementById('duracion_horas').value = curso.duracion_horas;
        document.getElementById('precio').value = parseFloat(curso.precio).toFixed(2);
        
        // Cargar y seleccionar selects
        await obtenerCategorias(curso.id_categoria);
        await obtenerSubcategoriasPorCategoria(curso.id_categoria, curso.id_subcategoria);
        await obtenerDocentes(curso.id_docente);

        // Actualizar botón de Guardar/Actualizar
        btnGuardar.innerHTML = 'Actualizar';
        btnGuardar.classList.add('btn-warning');

    } catch (error) {
        console.error("Error al cargar curso para edición:", error);
        alert('No se pudo cargar el curso para edición.');
    }
}

// 3. REGISTRAR/ACTUALIZAR (CREATE/UPDATE)
formularioCurso.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id_curso = idCursoInput.value;
    const method = id_curso ? 'PUT' : 'POST';
    const url = id_curso ? `${API_URL_CURSOS}/${id_curso}` : API_URL_CURSOS;

    const data = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        fecha_inicio: document.getElementById('fecha_inicio').value,
        fecha_fin: document.getElementById('fecha_fin').value,
        duracion_horas: parseInt(document.getElementById('duracion_horas').value),
        precio: parseFloat(document.getElementById('precio').value),
        id_subcategoria: parseInt(selectSubcategorias.value),
        id_docente: parseInt(selectDocentes.value)
    };

    try {
        let response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la operación: ${response.status} - ${errorData.details || errorData.error || response.statusText}`);
        }

        const result = await response.json();
        alert(result.message);
        resetFormulario();
        obtenerCursos(); 
    } catch (error) {
        console.error("Error al guardar curso:", error);
        alert(`Error al guardar/actualizar el curso: ${error.message}`);
    }
});

// 4. ELIMINAR CURSO (DELETE)
async function eliminarCurso(id, titulo_curso) {
    
    // Configuración para los botones de SweetAlert usando clases de Bootstrap
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger mx-2", // Rojo para eliminar
            cancelButton: "btn btn-secondary" // Gris para cancelar
        },
        buttonsStyling: false
    });

    // Muestra el modal de confirmación
    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: `Estás a punto de eliminar el curso: "${titulo_curso}". ¡Esta acción no se puede revertir!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, ¡Eliminar!",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then(async (result) => { 
        
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL_CURSOS}/${id}`, {
                    method: 'DELETE',
                });
                
                if (!response.ok) {
                    throw new Error('Error al eliminar el curso');
                }                          
                await response.json(); 
                swalWithBootstrapButtons.fire({
                    title: "¡Eliminado!",
                    text: `El curso "${titulo_curso}" ha sido eliminado.`,
                    icon: "success"
                });
                
                obtenerCursos(); 
                resetFormulario();
                
            } catch (error) {
                console.error("Error al eliminar curso:", error);
                
                // Mostrar mensaje de error (puede ser por dependencias en la BD)
                swalWithBootstrapButtons.fire({
                    title: "Error",
                    text: `No se pudo eliminar el curso. Verifique si hay dependencias.`,
                    icon: "error"
                });
            }
            
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelación",
                text: "El curso está a salvo :)",
                icon: "info"
            });
        }
    });
}
function resetFormulario() {
    formularioCurso.reset();
    idCursoInput.value = '';

  
    btnGuardar.innerHTML = 'Guardar';
    btnGuardar.classList.remove('btn-warning');
    btnGuardar.classList.add('btn-primary');

    
    obtenerCategorias();
    obtenerSubcategoriasPorCategoria(null);
    obtenerDocentes();
}

document.getElementById('btn-cancelar').addEventListener('click', (e) => {
    e.preventDefault();
    resetFormulario();
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    resetFormulario(); 
    obtenerCursos();
});