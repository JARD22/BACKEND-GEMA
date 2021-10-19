/*  api/matricula
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com
*/



const {response}=require('express');
const { query } = require('express-validator');
const pool = require('../postgresql/postgresql');



const tiposMatricula = async(req,res=response)=>{

    let query;

    try {
        
      query= await pool.query('SELECT * FROM FN_TIPOS_MATRICULA()')

        return res.status(200).json({
            ok:true,
            tipos:query.rows
        });


    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'error al cargar los tipos de matricula'
        })
    }
}

const cursos = async(req,res=response)=>{
    
    let query;

    try {
        query = await pool.query('SELECT * FROM FN_CURSOS()');

        return res.status(200).json({
            ok:true,
            cursos:query.rows
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al cargar la lista de cursos'
        });
    }
}


module.exports={
    tiposMatricula,
    cursos
}