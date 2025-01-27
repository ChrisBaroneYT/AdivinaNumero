let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

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

function verificarIntento() {
    // Obtener el número ingresado por el usuario
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Validar si el número está dentro del rango permitido
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número entre 1 y ${numeroMaximo}`, 'red');
        return;
    }
    //validar intento y crear un maximo numero de intentos
    if (intentos >= 3) {
        asignarTextoElemento('h1', '¡Perdiste! ¡Se acabaron los intentos!','red');
        asignarTextoElemento('p', `¡Perdiste! El número secreto era ${numeroSecreto}`, 'red');
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('h1', '¡Felicidades! ¡Ganaste!', 'green');
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${(intentos === 1) ? 'Intento' : 'Intentos'}!`, 'green');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('h1', '¡Intenta de nuevo!','yellow');
            asignarTextoElemento('p', 'El número secreto es menor.','yellow');
        } else {
            asignarTextoElemento('h1', '¡Intenta de nuevo!','yellow');
            asignarTextoElemento('p', 'El número secreto es mayor.','yellow');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
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

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!', 'white');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`, 'white');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;  // Comenzamos desde el intento 1
}

function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Reiniciar intentos
    intentos = 1;
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
