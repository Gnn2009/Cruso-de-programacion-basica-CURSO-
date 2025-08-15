var express = require('express');

var app= express()

app.get("/", (req, res) => {
    res.send("Hola")
})

app.listen(8080, () =>{
    console.log("Servidor corriendo en el puerto 8080")
})
app.use(express.static(__dirname + '/public'));