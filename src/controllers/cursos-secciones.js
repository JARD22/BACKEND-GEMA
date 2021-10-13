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


const nuevaSeccion = async(req,res=response)=>{

let {cod_curso,nombre,cupos,estado,anio}= req.body;
let usr_registro= req.correo;

try {
        
    await pool.query('CALL SP_NUEVA_SECCION($1,$2,$3,$4,$5,$6)',[cod_curso,nombre,anio,cupos,estado,usr_registro])

        return res.status(201).json({
            ok:true,
            msg:'Seccion creada'
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:`error: ${error.code}`
        })
    }
}

const actualizarSeccion = async(req,res= response)=>{
    
    let {cod_seccion,nombre,cupos,estado,anio}= req.body;

    try {
        
        await pool.query('CALL SP_ACTUALIZAR_SECCION($1,$2,$3,$4,$5)',[cod_seccion,nombre,cupos,estado,anio])

        return res.status(201).json({
            ok:true,
            msg:'Sección actualizada'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Error al actualizar el registro'
        })
    }
}


const listaSecciones = async(req,res=response)=>{

    let query;
    let {curso,anio}=req.params

    try {
       
        query= await pool.query('SELECT * FROM FN_LISTA_SECCIONES($1,$2)',[curso,anio])

        return res.status(200).json({
            ok:true,
            secciones:query.rows
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Erros al cargar la lista de secciones'
        })
    }
}

const unirSecciones = async(req,res=response)=>{
    
    // (IN_NOMBRE VARCHAR,IN_SECCION1 INT,IN_SECCION2 INT,IN_ANIO VARCHAR,IN_USR_REGISTRO VARCHAR)
    let{nombre,anio,seccion1,seccion2}=req.body;

    let usr_registro = req.correo;
    try {
        
        await pool.query('CALL SP_UNIR_SECCIONES($1,$2,$3,$4,$5)',[nombre,seccion1,seccion2,anio,usr_registro])

        return res.status(201).json({
            ok:true,
            msg:'Secciones actualizadas'
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error.hint
        })
    }
}

module.exports={
    actualizarCurso,
    actualizarSeccion,
    buscarCurso,
    nuevoCurso,
    nuevaSeccion,
    listaCursos,
    listaSecciones,
    unirSecciones    
}
