const input = document.getElementById('nueva-tarea');
const boton = document.getElementById('agregar');
const lista = document.getElementById('lista');

// Cargar tareas guardadas al iniciar
cargarTareas();

boton.addEventListener('click', agregarTarea);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarTarea();
});

function agregarTarea() {
    const texto = input.value.trim();
    if (texto === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${texto}</span>
        <button class="borrar">×</button>
    `;

    // Marcar como completada
    li.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            li.classList.toggle('completada');
            guardarTareas();
        }
    });

    // Borrar tarea
    li.querySelector('.borrar').addEventListener('click', () => {
        li.remove();
        guardarTareas();
    });

    lista.appendChild(li);
    input.value = '';
    guardarTareas();
}

function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('#lista li').forEach(li => {
        tareas.push({
            texto: li.querySelector('span').textContent,
            completada: li.classList.contains('completada')
        });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarea.texto}</span>
            <button class="borrar">×</button>
        `;
        if (tarea.completada) li.classList.add('completada');

        li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                li.classList.toggle('completada');
                guardarTareas();
            }
        });
        li.querySelector('.borrar').addEventListener('click', () => {
            li.remove();
            guardarTareas();
        });

        lista.appendChild(li);
    });
}