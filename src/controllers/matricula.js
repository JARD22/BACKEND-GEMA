/*  api/matricula
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com
*/



const {response, json}=require('express');

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
    let cod_tipo = req.params.cod_tipo
    let offset = req.params.offset
    let query1;
    let query2;

   
    try {
        
        query1 = await pool.query('SELECT * FROM FN_METRICAS_MATRICULA($1)',[anio]);
        query2 = await pool.query('SELECT * FROM FN_LISTA_DOC_PENDIENTE($1,$2,$3)',[anio,cod_tipo,offset]);



        if (query1.rowCount==0) {
            return res.status(400).json({
                ok:false,
                msg:`No hay metricas para el anio ${anio}`
            });
        }

        return res.status(200).json({
            ok:true,
            metricas:query1.rows,
            data:query2.rows
            
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se han podido cargar los datos'
        })
    }
}

const actualizarDoc = async(req,res=response)=>{


    let {cod_matricula,doc_pendiente, desc_doc}= req.body;

    try {
        

        await pool.query('CALL SP_ACTUALIZAR_DOC($1,$2,$3)',[doc_pendiente,cod_matricula,desc_doc]);

        return res.status(200).json({
            ok:true,
            msg:'Datos actualizados'
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo actualizar la documentación'
        })
    }
}

const docDni= async(req,res= response)=>{

    let anio = req.params.anio
    let cod_tipo = req.params.cod_tipo
    let dni = req.params.dni
    let query;
    try {
        
       query= await pool.query('SELECT * FROM FN_DOC_PENDIENTE_DNI($1,$2,$3)',[anio,cod_tipo,dni]);

        if (query.rowCount===0) {
            return res.status(400).json({
                ok:true,
                msg:`No hay datos para ${dni}`
            });
        }
      
       return res.status(200).json({
           ok:true,
           data:query.rows
       });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo cargar la información'
        })
    }
}

module.exports={
    tiposMatricula,
    cursos,
    datosAlumno,
    datosParentesco,
    nuevaMatricula,
    metricasMatricula,
    actualizarDoc,
    docDni
}