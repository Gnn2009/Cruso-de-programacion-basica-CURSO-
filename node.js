var express = require('express');

var app= express()

var jugadoresArray = []

class jugadores {
    constructor(id){
        this.id = id
    } 
}

app.get("/unirse", (req, res) => {
    const id = Math.random().toString().substring(2)
    const jugador = new jugadores(id)
    jugadoresArray.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(id)
})

app.listen(8080, () =>{
    console.log("Servidor corriendo en el puerto 8080")
})
app.use(express.static(__dirname + '/public'));