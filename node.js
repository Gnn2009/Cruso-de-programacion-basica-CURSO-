var express = require('express');

var app= express()

var jugadores = []
class Jugador {
    constructor(id){
        this.id = id
    } 
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(id)
})

app.listen(8080, () =>{
    console.log("Servidor corriendo en el puerto 8080")
})
app.use(express.static(__dirname + '/public'));