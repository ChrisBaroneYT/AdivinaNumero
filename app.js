let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto, color) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    elementoHTML.style.color = color; // Asignar el color
    return;
}

//al oprimir el boton de enter se ejecuta la funcion verificarIntento
document.getElementById('valorUsuario').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verificarIntento();
    }
});
// Función para verificar el intento del usuario
function verificarIntento() {
    // Obtener el número ingresado por el usuario
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Validar si el número está dentro del rango permitido
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número entre 1 y ${numeroMaximo}`, 'red');
        return;
    }

    // Verificar si el número es correcto
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('h1', '¡Felicidades! ¡Ganaste!', 'green');
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos + 1} ${(intentos + 1 === 1) ? 'Intento' : 'Intentos'}!`, 'green');
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }
    // Verificar si el usuario alcanzó el límite de intentos
    if (intentos >= 2) {
        asignarTextoElemento('h1', `¡Perdiste! ¡Se acabaron tus intentos!`, 'red');
        asignarTextoElemento('p', `¡Perdiste! El número secreto era ${numeroSecreto}`, 'red');
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }

    // El usuario no acertó, pero aún tiene intentos
    if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento('h1', '¡Intenta de nuevo!', 'yellow');
        asignarTextoElemento('p', 'El número secreto es menor.', 'yellow');
    } else {
        asignarTextoElemento('h1', '¡Intenta de nuevo!', 'yellow');
        asignarTextoElemento('p', 'El número secreto es mayor.', 'yellow');
    }
    // Incrementar intentos
    intentos++;
    
    limpiarCaja(); // Limpiar el input para el siguiente intento
}

// Función para limpiar la caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}
// Función para generar un número aleatorio
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles', 'red');
        asignarTextoElemento('h1', `¡Perdiste! ¡Se acabaron tus ${intentos} intentos!`,'red');
    } else {
        // Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
       
    }
}
// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!', 'white');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`, 'white');
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;  // Comenzamos desde el intento 1
    console.log(numeroSecreto);
}
// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Reiniciar intentos
    intentos = 0;
    // Indicar mensaje de intervalo de números 
    asignarTextoElemento('h1', 'Juego del número secreto!','white');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`,'white');
    // Generar el número aleatorio
    numeroSecreto = generarNumeroSecreto();
    // Inicializar el número de intentos
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    
}
condicionesIniciales();
