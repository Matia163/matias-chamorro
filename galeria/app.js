const grid = document.getElementById('grid');
const filtros = document.querySelectorAll('.filtro');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const cerrar = document.querySelector('.cerrar');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let imagenesActuales = [];  // ← Aquí guardamos las imágenes que se están mostrando

const imagenes = [
    // PAISAJES
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=1200', cat: 'paisajes', alt: 'Montañas nevadas' },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=1200', cat: 'paisajes', alt: 'Lago y montañas' },
    { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&w=1200', cat: 'paisajes', alt: 'Desierto' },

    // RETRATOS
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=1200', cat: 'retratos', alt: 'Mujer sonriendo' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=1200', cat: 'retratos', alt: 'Hombre con barba' },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=1200', cat: 'retratos', alt: 'Mujer mirada seria' },

    // NATURALEZA
    { src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&w=1200', cat: 'naturaleza', alt: 'Cascada en bosque' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&w=1200', cat: 'naturaleza', alt: 'Bosque' },
    { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=1200', cat: 'naturaleza', alt: 'Playa' },

    // CÓDIGO/TECH
    { src: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&w=1200', cat: 'codigo', alt: 'Código en pantalla' },
    { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=1200', cat: 'codigo', alt: 'Laptop con código' },
    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200', cat: 'codigo', alt: 'Setup de desarrollo' }
];

let indiceActual = 0;

// Generar grid
function mostrarImagenes(arr) {
    imagenesActuales = arr;
    grid.innerHTML = '';
    arr.forEach((img, i) => {
        const div = document.createElement('div');
        div.className = 'imagen';
        div.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" data-index="${i}">
            <span class="categoria">${img.cat.charAt(0).toUpperCase() + img.cat.slice(1)}</span>
        `;
        grid.appendChild(div);
    });
    agregarEventosClick();
}

function agregarEventosClick() {
    document.querySelectorAll('.imagen img').forEach(img => {
        img.onclick = () => {
            indiceActual = parseInt(img.dataset.index);
            abrirLightbox();
        };
    });
}

function abrirLightbox() {
    lightbox.classList.add('activo');
    lightboxImg.src = imagenesActuales[indiceActual].src;
}

// Filtros
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        
        const filtro = btn.dataset.filtro;
        const filtradas = filtro === 'todos' 
            ? imagenes 
            : imagenes.filter(img => img.cat === filtro);
            
        mostrarImagenes(filtradas);
    });
});

// Lightbox navegación
cerrar.onclick = () => lightbox.classList.remove('activo');
lightbox.onclick = e => e.target === lightbox && lightbox.classList.remove('activo');

prev.onclick = () => {
    indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
    lightboxImg.src = imagenesActuales[indiceActual].src;
};

next.onclick = () => {
    indiceActual = (indiceActual + 1) % imagenesActuales.length;
    lightboxImg.src = imagenesActuales[indiceActual].src;
};

// Iniciar
mostrarImagenes(imagenes);