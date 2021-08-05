/*
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com




*/


const express = require('express');
require('dotenv').config();
const app= express();
const cors= require('cors');


app.use(cors());

app.use('/api/login', require('./routes/login'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/personas', require('./routes/personas'));
// app.use('/api/expedientes', require('./routes/personas'));
// app.use('/api/reportes', require('./routes/personas'));
// app.use('/api/sidebar', require('./routes/personas'));



app.listen(process.env.PORT, ()=>console.log(`Escuchando peticiones en http://localhost:${process.env.PORT}`))