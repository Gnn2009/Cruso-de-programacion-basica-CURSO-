var express = require('express');
var cors = require('cors');

var app= express()
hhtp://gddell-Thin-15-B12VE:8080
app.use (express.static('public'));
app.use(cors());
app.use(express.json());

var jugadoresArray = []

class jugadores {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class mokepon {
    constructor(nombre){
        this.nombre = nombre
    } 
}

app.get("/unirse", (req, res) => {
    const id = Math.random().toString().substring(2)
    const jugador = new jugadores(id)
    jugadoresArray.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokeponnew = new mokepon(nombre)
    
    const jugadorIndex = jugadoresArray.findIndex((jugador) => jugador.id === jugadorId)

    if(jugadorIndex >= 0){
        jugadoresArray[jugadorIndex].asignarMokepon(mokeponnew)
    }
        console.log(jugadoresArray)

    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req,res) => {
    const jugadorId = req.params.jugadorId || ""
    const x =req.body.x || 0
    const y =req.body.y || 0

    const jugadorIndex = jugadoresArray.findIndex((jugador) => jugador.id === jugadorId)
    if(jugadorIndex >= 0){
        jugadoresArray[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadoresArray.filter((jugador) => jugadorId !== jugador.id)
    res.send({enemigos})
    res.end()
})

app.post("/mokepon/:jugadorId/ataques", (req,res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadoresArray.findIndex((jugador) => jugador.id === jugadorId)
    if(jugadorIndex >= 0){
        jugadoresArray[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req,res) => {
    const JugadorId = req.params.jugadorId || ""
    const jugador = jugadoresArray.find((jugador) => jugador.id === JugadorId)
    
    // Agrega esta validación para evitar el error
    if (jugador) {
        res.send({
            ataques: jugador.ataques || []
        })
    } else {
        res.status(404).send('Jugador no encontrado');
    }
})

app.listen(8080, () =>{
    console.log("Servidor corriendo en el puerto 8080")
})

