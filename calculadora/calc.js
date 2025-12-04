// calc.js - Calculadora completa
const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('button');

let operacion = '';
let operadorAnterior = '';

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.dataset.val || boton.textContent;

        if (valor === 'C') {
            operacion = '';
            operadorAnterior = '';
            pantalla.textContent = '0';
            return;
        }

        if (valor === 'DEL') {
            operacion = operacion.slice(0, -1);
            pantalla.textContent = operacion || '0';
            return;
        }

        if (valor === '=') {
            try {
                operacion = eval(operacion.replace('×', '*').replace('÷', '/'));
                pantalla.textContent = operacion;
                operadorAnterior = operacion;
                operacion = '';
            } catch {
                pantalla.textContent = 'Error';
                operacion = '';
            }
            return;
        }

        operacion += valor;
        pantalla.textContent = operacion;
    });
});

// Soporte para teclado físico (¡bonus!)
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') operacion += e.key;
    if (e.key === '.') operacion += '.';
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') operacion += e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
    if (e.key === 'Enter') operacion = eval(operacion.replace('×','*').replace('÷','/'));
    if (e.key === 'Backspace') operacion = operacion.slice(0,-1);
    if (e.key === 'Escape') { operacion = ''; operadorAnterior = ''; }

    pantalla.textContent = operacion || '0';
});