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
let ataqueEnemigo= []

let opcionDeMokepones
let inputGreninja 
let inputCharizard
let inputVenusaur

let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo

let botonFuego 
let botonAgua 
let botonTierra 
let botones = []

let indexAtaqueJugador
let indexAtaueEnemigo


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
    if (!inputGreninja.checked && !inputCharizard.checked && !inputVenusaur.checked) {
        alert('Selecciona una mascota')
        return
    }

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
                ataqueJugador.push('Hidropulso')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
            }else if(e.target.textContent == 'Lanzallamas'){
                ataqueJugador.push('Lanzallamas')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
            }else if(e.target.textContent == 'Tetratemblor'){
                ataqueJugador.push('Tetratemblor')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
            }
            ataqueAleatorioEnemigo()
        })
    })


}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0,mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques

    secuenciaDeAtaque()

}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
        ataqueEnemigo.push('Lanzallamas')
    } else if (ataqueAleatorio === 3 || ataqueAleatorio === 4) {
        ataqueEnemigo.push('Hidropulso')
    } else {
        ataqueEnemigo.push('Tetratemblor')
    }

    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexBothPlayers(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexBothPlayers(index, index)
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index] == "Lanzallamas" && ataqueEnemigo[index] == "Tetratemblor"){
            indexBothPlayers(index, index)
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }else if(ataqueJugador[index] == "Tetrateblor" && ataqueEnemigo[index] == "Hidropulso"){
            indexBothPlayers(index, index)
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }else if(ataqueJugador[index] == "Hidropulso" && ataqueEnemigo[index] == "Lanzallamas"){
            indexBothPlayers(index, index)
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }else{
            indexBothPlayers(index, index)
            crearMensaje("EMPATE")
        }
        
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
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaueEnemigo

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
