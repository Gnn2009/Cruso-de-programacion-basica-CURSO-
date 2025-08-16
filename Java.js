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

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

var mokepones = []

var ataqueJugador = []
var ataqueEnemigo= []

var opcionDeMokepones
var inputGreninja 
var inputCharizard
var inputVenusaur

var mascotaJugador
var mascotaJugadorObjeto
var ataquesMokepon
var ataquesMokeponEnemigo

var botonFuego 
var botonAgua 
var botonTierra 
var botones = []

var indexAtaqueJugador
var indexAtaueEnemigo

var victoriasJugador = 0
var victoriasEnemigo = 0
var vidasJugador = 3
var vidasEnemigo = 3

var lienzo = mapa.getContext("2d")
var intervalo
var mapabkg = new Image()
mapabkg.src = "mokemap.png"

var alturaBuscada
var anchoDelMappa = window.innerWidth - 50
var anchoMaximoDelMapa = 750
if(anchoDelMappa > anchoMaximoDelMapa){
    anchoDelMappa = anchoMaximoDelMapa - 50
}
alturaBuscada = anchoDelMappa * 600 / 800   
mapa.width = anchoDelMappa
mapa.height = alturaBuscada

var anchoMokepones = anchoDelMappa / 8
var altoMokepones = alturaBuscada / 7

class Mokepon{
    constructor(nombre, foto, vida,fotoMapa, ){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = anchoMokepones
        this.alto = altoMokepones
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Greninja = new Mokepon("Greninja", "Greninja.png", 5, "Greninja.png")
let Charizard = new Mokepon("Charizard", "Charizard.png", 5,"Charizard.png")
let Venusaur = new Mokepon("Venuzaur", "Venuzaur.png", 5, "Venuzaur.png")

let GreninjaEnemigo = new Mokepon("Greninja", "Greninja.png", 5, "Greninja.png",)
let CharizardEnemigo = new Mokepon("Charizard", "Charizard.png", 5,"Charizard.png",)
let VenusaurEnemigo = new Mokepon("Venuzaur", "Venuzaur.png", 5, "Venuzaur.png",)


Greninja.ataques.push(
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Lanzallamas", id:"boton-fuego"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
)
GreninjaEnemigo.ataques.push(
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
CharizardEnemigo.ataques.push(
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
VenusaurEnemigo .ataques.push(
    {nombre: "Tetratemblor", id:"boton-tierra"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
    {nombre: "Tetratemblor", id:"boton-tierra"},
    {nombre: "Hidropulso", id:"boton-agua"},
    {nombre: "Lanzallamas", id:"boton-fuego"},
)
mokepones.push(Greninja,Charizard,Venusaur  )

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = "none"

    mokepones.forEach(Mokepon => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre} />
            <label class="tarjeta-mascota" for=${Mokepon.nombre}>
                <p>${Mokepon.nombre}</p>
                <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputGreninja = document.getElementById('Greninja')
        inputCharizard = document.getElementById('Charizard')
        inputVenusaur = document.getElementById('Venuzaur')
    });

    sectionReiniciar.style.display = 'none'
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', ()=>{
        location.reload()
    })

    unirseAlJuego()
}

function unirseAlJuego(){
        fetch("http://localhost:8080/unirse")
            .then((res) => {
                if (res.ok) {
                    res.text()
                        .then((res) => {
                            console.log(res)
                            jugadorId = res
                        })
                }
            })
}

function seleccionarMascotaJugador() {
    if (!inputGreninja.checked && !inputCharizard.checked && !inputVenusaur.checked) {
        alert('Selecciona una mascota')
        return
    }     
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = "flex"

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
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    iniciarMapa()
}

var jugadorId = null
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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
    contenedorAtaques.innerHTML = ""; // Limpia antes de agregar
    ataques.forEach(ataque => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-ataques Bataque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.Bataque');
    secuenciaDeAtaque(); // Solo aquí
}
function secuenciaDeAtaque(){
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent == 'Hidropulso'){
                ataqueJugador.push('Hidropulso')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent == 'Lanzallamas'){
                ataqueJugador.push('Lanzallamas')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent == 'Tetratemblor'){
                ataqueJugador.push('Tetratemblor')
                console.log(ataqueJugador)
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })


}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    let ataqueSeleccionado = ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)[0]
    ataqueEnemigo.push(ataqueSeleccionado.nombre)
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
            if (ataqueJugador[index] == ataqueEnemigo[index]) {
            indexBothPlayers(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] == "Lanzallamas" && ataqueEnemigo[index] == "Tetratemblor") {
            indexBothPlayers(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == "Tetratemblor" && ataqueEnemigo[index] == "Hidropulso") {
            indexBothPlayers(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == "Hidropulso" && ataqueEnemigo[index] == "Lanzallamas") {
            indexBothPlayers(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexBothPlayers(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }else {
        crearMensajeFinal("Esto fue un empate")
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
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY   
    lienzo.clearRect(0, 0,mapa.width,mapa.height)
    lienzo.drawImage(
    mapabkg,
    0,
    0,
    mapa.width,
    mapa.height

    )
    mascotaJugadorObjeto.pintarMokepon()
    GreninjaEnemigo.pintarMokepon()
    CharizardEnemigo.pintarMokepon()
    VenusaurEnemigo.pintarMokepon()
    if(mascotaJugadorObjeto.x !== 0 || mascotaJugadorObjeto !== 0){
        revisarColision(GreninjaEnemigo)
        revisarColision(CharizardEnemigo)
        revisarColision(VenusaurEnemigo)
    }
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5 
    pintarCanvas()
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
    pintarCanvas()
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
    pintarCanvas()
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
    pintarCanvas()
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function presionarTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 100)
    window.addEventListener('keydown', presionarTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

var colisionDetectada = false

function revisarColision(enemigo){
if(colisionDetectada) {
    return
}

let arribaEnemigo = enemigo.y
let abajoEnemigo = enemigo.y + enemigo.alto
let derechaEnemigo = enemigo.x + enemigo.ancho
let izquierdaEnemigo = enemigo.x

let arribaMascota = mascotaJugadorObjeto.y
let abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
let derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
let izquierdaMascota = mascotaJugadorObjeto.x

    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||            
        izquierdaMascota > derechaEnemigo){
            return
        }
    colisionDetectada = true
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)