const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputGreninja = document.getElementById('Greninja')
const inputCharizard = document.getElementById('Charizard')
const inputVenusaur = document.getElementById('Venusaur')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const mascotaAleatoria = aleatorio(1,3)
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')

let mokepones = []

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let Greninja = new Mokepon("Grenninja", "Greninja.png", 3)
let Charizard = new Mokepon("Charizard", "Charizard.png", 3)
let Venusaur = new Mokepon("Venuzaur", "Venuzaur.png", 3)

Greninja.ataques.push(
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Lanzallamas", id:"boton-fuego"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
)

Charizard.ataques.push(
    {nombre: "Lanzallamas", id:"boton-fuego"},
    {nombre: "Lanzallamas", id:"boton-fuego"},
    {nombre: "Lanzallamas", id:"boton-fuego"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
)

Venusaur.ataques.push(
    {nombre: "Tetratemblor", id:"boton-tierra"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Lanzallamas", id:"boton-fuego"},
)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    if (inputGreninja.checked) {
        spanMascotaJugador.innerHTML = 'Greninja'
    } else if (inputCharizard.checked) {
        spanMascotaJugador.innerHTML = 'Charizard'
    } else if (inputVenusaur.checked) {
        spanMascotaJugador.innerHTML = 'Venusaur'
    } else {
        alert('Selecciona una mascota')
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Greninja'
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Charizard'
    } else {
        spanMascotaEnemigo.innerHTML = 'Venusaur'
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {


    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = 'flex'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)