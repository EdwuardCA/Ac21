const mensaje = document.getElementById('mensaje');
const charCount = document.querySelector('.char-count');
const matrizMensaje = document.getElementById('matrizMensaje');
const k11 = document.getElementById('k11');
const k12 = document.getElementById('k12');
const k21 = document.getElementById('k21');
const k22 = document.getElementById('k22');
const btnEncriptar = document.getElementById('encriptar');
const resultado = document.getElementById('resultado');
const btnDesencriptar = document.getElementById('desencriptar');
const textoEncriptado = document.getElementById('textoEncriptado');

function modInverse(a, m) {
    a = (a % m + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
}

mensaje.addEventListener('input', () => {
    const len = mensaje.value.length;
    charCount.textContent = `${len}/30`;
    mostrarMatrizMensaje();
});

// MATRIZ SIN PADDING (corregido)
function mostrarMatrizMensaje() {
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');

    if (texto.length === 0) {
        matrizMensaje.textContent = 'Escribe un mensaje primero...';
        return;
    }

    const valores = texto.split('').map(char => char.charCodeAt(0) - 65);

    let matriz = '[';
    for (let i = 0; i < valores.length; i += 2) {
        if (i > 0) matriz += ' ';
        matriz += `[${valores[i]}, ${valores[i + 1] !== undefined ? valores[i + 1] : ''}]`;
    }
    matriz += ']';

    matrizMensaje.textContent = matriz;
}

// ENCRIPTAR
btnEncriptar.addEventListener('click', () => {

    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');

    if (texto.length === 0) {
        resultado.textContent = 'Error: Ingresa un mensaje';
        resultado.classList.add('error');
        return;
    }

    let det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % 26;
    det = (det + 26) % 26;

    if (!modInverse(det, 26)) {
        resultado.textContent = 'Error: La matriz no es invertible módulo 26';
        resultado.classList.add('error');
        return;
    }

    let numeros = texto.split('').map(char => char.charCodeAt(0) - 65);

    // padding correcto (solo aquí)
    if (numeros.length % 2 !== 0) {
        numeros.push(23); // X
    }

    let encriptado = '';
    for (let i = 0; i < numeros.length; i += 2) {
        const v1 = numeros[i];
        const v2 = numeros[i + 1];

        const c1 = (key[0][0] * v1 + key[0][1] * v2) % 26;
        const c2 = (key[1][0] * v1 + key[1][1] * v2) % 26;

        encriptado += String.fromCharCode(65 + c1);
        encriptado += String.fromCharCode(65 + c2);
    }

    resultado.classList.remove('error');
    resultado.textContent = encriptado;
});

// DESENCRIPTAR
btnDesencriptar.addEventListener('click', () => {

    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    const texto = textoEncriptado.value.toUpperCase().replace(/[^A-Z]/g, '');

    if (texto.length === 0) {
        resultado.textContent = 'Error: Ingresa texto encriptado';
        resultado.classList.add('error');
        return;
    }

    let det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % 26;
    det = (det + 26) % 26;

    const invDet = modInverse(det, 26);

    if (!invDet) {
        resultado.textContent = 'Error: La matriz no tiene inverso módulo 26';
        resultado.classList.add('error');
        return;
    }

    const invKey = [
        [(key[1][1] * invDet) % 26, ((-key[0][1]) * invDet) % 26],
        [((-key[1][0]) * invDet) % 26, (key[0][0] * invDet) % 26]
    ];

    let numeros = texto.split('').map(c => c.charCodeAt(0) - 65);

    let desencriptado = '';
    for (let i = 0; i < numeros.length; i += 2) {
        const v1 = numeros[i];
        const v2 = numeros[i + 1];

        let c1 = (invKey[0][0] * v1 + invKey[0][1] * v2) % 26;
        let c2 = (invKey[1][0] * v1 + invKey[1][1] * v2) % 26;

        if (c1 < 0) c1 += 26;
        if (c2 < 0) c2 += 26;

        desencriptado += String.fromCharCode(65 + c1);
        desencriptado += String.fromCharCode(65 + c2);
    }

    // QUITAR PADDING SOLO SI EL MENSAJE ORIGINAL ERA IMPAR
    const original = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (original.length % 2 !== 0 && desencriptado.endsWith("X")) {
        desencriptado = desencriptado.slice(0, -1);
    }

    resultado.classList.remove('error');
    resultado.textContent = desencriptado;
});
