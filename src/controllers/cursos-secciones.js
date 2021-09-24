/*
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com
*/



const {response}=require('express');
const pool = require('../postgresql/postgresql');


const nuevoCurso=async(req,res=response)=>{

    let {nombre,descripcion,estado}=req.body
    let usr_registro = req.correo;

    try {
        
await pool.query('CALL SP_NUEVO_CURSO($1,$2,$3,$4)',[nombre,descripcion,estado,usr_registro]);

        return res.status(201).json({
            ok:true,
            msg:'Curso reado'
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error.hint
        })
    }
}

const listaCursos = async(req,res=response)=>{
    
    let offset = req.params.offset;
    let query
    try {
        
        query= await pool.query('SELECT * FROM FN_LISTA_CURSOS($1)',[offset])

        return res.status(200).json({
            ok:true,
            cursos:query.rows
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al cargar la lista de cursos'
        })
    }
}


const actualizarCurso = async(req,res=response)=>{
    let {cod_curso,nombre,descripcion,estado}=req.body
    let usr_registro = req.correo;

    try {
        
        await pool.query('CALL SP_ACTUALIZAR_CURSO($1,$2,$3,$4,$5)',[cod_curso,nombre,descripcion,estado,usr_registro])

        return res.status(201).json({
            ok:true,
            msg:'Registro actualizado'
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se puedo actualizar el registro'
        });
    }
}


const buscarCurso = async(req,res=response)=>{
    
    let termino = req.params.termino;
    let query;
    
    try {

      
     query= await pool.query(`SELECT * FROM FN_BUSCAR_CURSO('%${termino}%')`)

        return res.status(200).json({
            ok:true,
            cursos:query.rows
        });
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo cargar los cursos'
        })
    }
}


module.exports={
    nuevoCurso,
    listaCursos,
    actualizarCurso,
    buscarCurso    
}
