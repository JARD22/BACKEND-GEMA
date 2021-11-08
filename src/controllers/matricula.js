/*  api/matricula
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com
*/



const {response, json}=require('express');
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

const datosAlumno =async(req, res= response)=>{
    
    let dni = req.params.dni
    let query;
    try {
        
        query = await pool.query('SELECT * FROM FN_DATOS_ALUMNO($1)',[dni])
        return res.status(200).json({
            ok:true,
            data:query.rows
        });

    } catch (error) {

        if (error.hint) {
            return res.status(400).json({
                ok:false,
                msg:error.hint
            })
        }

        return res.status(500).json({
            ok:false,
            msg:'Error al traer los datos del alumno'
        })
    }
}

const datosParentesco = async(req,res=response)=>{

    let dni = req.params.dni;
    let query;
    try {

        query = await pool.query('SELECT * FROM FN_PARENTESCO($1)',[dni])
        
        return res.status(200).json({
            ok:true,
            data:query.rows
        })


    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al cargar los datos de parentesco'
        })
    }
}

const nuevaMatricula= async(req,res=response)=>{

 
    let {cod_tipo_matricula,
        anio,curso,cod_alumno,cod_grupo,seccion,doc_pendiente,desc_doc,condicionado,motivo,materia_retrasada_chk,
        materia_retrasada,curso_retrasada,colegio_procedencia,curso_procedencia,fecha_procedencia}= req.body

        let usr_registro= req.correo;
    try {
        
        await pool.query('CALL SP_NUEVA_MATRICULA($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)',[
            cod_tipo_matricula,
            cod_alumno,
            curso,
            seccion,
            cod_grupo,
            anio,
            colegio_procedencia,
            fecha_procedencia,
            usr_registro,
            doc_pendiente,
            desc_doc,
            condicionado,
            motivo,
            materia_retrasada_chk,
            materia_retrasada,
            curso_retrasada
        ]);


        return res.status(201).json({
            ok:true,
            msg:'Alumno matriculado'
        });

    } catch (error) {
    
        return res.status(500).json({
            ok:false,
            msg:error.hint
        });
    }
}


const metricasMatricula = async(req,res=response)=>{
    
    let anio = req.params.anio
    let query;
    try {
        
        query = await pool.query('SELECT * FROM FN_METRICAS_MATRICULA($1)',[anio]);

        return res.status(200).json({
            ok:true,
            metricas:query.rows
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se han podido cargar los datos'
        })
    }
}

module.exports={
    tiposMatricula,
    cursos,
    datosAlumno,
    datosParentesco,
    nuevaMatricula,
    metricasMatricula
}