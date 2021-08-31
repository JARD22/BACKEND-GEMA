/*
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com


                HISTORIAL DE CAMBIBO

Programador                      Cambio                     Fecha
*/


const {response}=require('express');
const JSONArray = require('../helpers/arreglo-telefonos');
const pool = require('../postgresql/postgresql');
const {v4}= require('uuid')


const tipoPersona = async(req,res=response)=>{

        let query;
        let tipo_personas

    try {
        
        query = await pool.query('SELECT * FROM FN_LISTA_TIPO_PERSONA()')
        tipo_personas= query.rows

        return res.status(200).json({
            ok:true,
            tipo_personas
        });


    } catch (error) {
        
        return res.status(500).json({
            ok:false,
            error
        });
    }
}


const getPersonas= async(req,res=response)=>{

    let offset= req.params.offset
    let personas;
    let query;
   
    try {

        query= await pool.query('SELECT * FROM FN_LISTA_PERSONAS($1)',[offset])
        personas = query.rows

        return res.status(200).json({
            ok: true,
            personas
        })

    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:error
        });
    }

}


const registroPersonaUsuario = async(req,res=response)=>{

    let{
        cod_tipo_persona,dni,primer_nombre,primer_apellido,nacionalidad,segundo_nombre,segundo_apellido,
        sexo,fecha_nacimiento,correo,direccion,telefonos
        }=req.body

    try {
                   
   
                await pool.query('CALL SP_PERSONA_USUARIO($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',[
                    cod_tipo_persona,dni,primer_nombre,primer_apellido,nacionalidad,sexo,fecha_nacimiento,req.correo,
                    correo,direccion,telefonos,v4(),segundo_nombre,segundo_apellido
                ]);
                

        return res.status(200).json({
            ok:true,
            msg:'Usuario registrado',
            
        });
    } catch (error) {
        
        return res.status(500).json({
            ok:false,
            msg:error.hint
        });
    }
}

const registroPersonaAlumno = async(req,res=response)=>{

    let{
        cod_tipo_persona,dni,primer_nombre,primer_apellido,nacionalidad,segundo_nombre,segundo_apellido,
        sexo,fecha_nacimiento,direccion,grupo,enfermedad,vive_con
        }=req.body

    try {                           
            await pool.query('CALL SP_PERSONA_ALUMNO($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',[
                    cod_tipo_persona,dni,primer_nombre,primer_apellido,nacionalidad,sexo,fecha_nacimiento,req.correo,direccion,
                    enfermedad,vive_con,v4(),grupo,segundo_nombre,segundo_apellido
                ]);

        return res.status(200).json({
            ok:true,
            msg:'Persona registrada'
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error.hint
        });
    }

}
const registroPersonaFamiliar = async(req,res=response)=>{


    let{
        cod_tipo_persona,dni,primer_nombre,primer_apellido,nacionalidad,segundo_nombre,segundo_apellido,
        sexo,fecha_nacimiento,direccion,telefonos,crear_grupo,grupo,lugar_trabajo,
        ocupacion,encargado,escolaridad}=req.body

    try {
  
                
    await pool.query('CALL SP_PERSONA_FAMILIAR($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)',[
                    cod_tipo_persona,dni,primer_nombre,primer_apellido,nacionalidad,sexo,fecha_nacimiento,req.correo,direccion,
                    telefonos,lugar_trabajo,ocupacion,encargado,escolaridad,v4(),crear_grupo,grupo,segundo_nombre,segundo_apellido
                ]);   

        return res.status(200).json({
            ok:true,
            msg:'Persona registrada'
        });
    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:error.hint
        });
    }
}


module.exports= {
    getPersonas,
    tipoPersona,
    registroPersonaUsuario,
    registroPersonaAlumno,
    registroPersonaFamiliar
}