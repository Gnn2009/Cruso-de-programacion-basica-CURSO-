const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

let mokepones = []

let ataqueJugador = []
let ataqueEnemigo

let opcionDeMokepones
let inputGreninja 
let inputCharizard
let inputVenusaur

let mascotaJugador
let ataquesMokepon
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []


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

let Greninja = new Mokepon("Greninja", "Greninja.png", 3)
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

mokepones.push(Greninja,Charizard,Venusaur  )

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    mokepones.forEach(Mokepon => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre} />
            <label class="tarjeta-mascota" for=${Mokepon.nombre}>
                <p>${Mokepon.nombre}</p>
                <img src=${Mokepon.foto}
                } alt=${Mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputGreninja = document.getElementById('Greninja')
        inputCharizard = document.getElementById('Charizard')
        inputVenusaur = document.getElementById('Venuzaur')

    });

    sectionReiniciar.style.display = 'none'
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    if (inputGreninja.checked) {
        spanMascotaJugador.innerHTML = inputGreninja.id
        mascotaJugador = inputGreninja.id
    } else if (inputCharizard.checked) {
        spanMascotaJugador.innerHTML = inputCharizard.id
        mascotaJugador = inputCharizard.id
    } else if (inputVenusaur.checked) {
        spanMascotaJugador.innerHTML = inputVenusaur.id
        mascotaJugador = inputVenusaur.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)

    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques) 
}

function mostrarAtaques(ataques) {
    ataques.forEach(ataque => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-ataques Bataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.Bataque')



}
function secuenciaDeAtaque(){
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent == 'Hidropulso'){
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
            }else if(e.target.textContent == 'Lanzallamas'){
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
            }else if(e.target.textContent == 'Tetratemblor'){
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
            }
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0,mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre

    secuenciaDeAtaque()

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