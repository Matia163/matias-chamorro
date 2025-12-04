// script.js - Día 2
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los elementos que vamos a usar
    const boton = document.getElementById('btn-color');
    const contadorElement = document.getElementById('contador');
    const body = document.body;

    // Variable para llevar la cuenta
    let clicks = 0;

    // Array de colores bonitos para ir cambiando
    const colores = [
        '#f0f2f5',  // color original
        '#5ba8dfff',
        '#72e97cff',
        '#e7c083ff',
        '#d894e2ff',
        '#ea929fff',
        '#82d2dcff'
    ];

    // Función que se ejecuta al hacer clic
    boton.addEventListener('click', () => {
        clicks++; // aumentamos el contador
        
        // Cambiamos el color de fondo
        const colorAleatorio = colores[clicks % colores.length];
        body.style.backgroundColor = colorAleatorio;

        // Actualizamos el texto del contador
        contadorElement.textContent = clicks;

        // Pequeño feedback visual extra
        boton.textContent = clicks === 1 
            ? '¡Bien hecho!' 
            : 'Cambiar color de fondo';
    });
});