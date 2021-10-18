const {response}=require('express');
const pool = require('../postgresql/postgresql');



const listaColegios= async(req,res= response)=>{

    let offset=req.params.offset
    let query;

    try {
        query= await pool.query('SELECT * FROM FN_LISTA_COLEGIOS($1)',[offset]);

        return res.status(200).json({
            ok:true,
            colegios:query.rows
        });

    } catch (error) {
        return res.status(500).json({
            ok:true,
            msg:'Error al cargar la lista de colegios'
        })
    }
}

const nuevoColegio = async(req,res=response)=>{
    
    let {nombre,estado}= req.body
    let usr_registro = req.correo

    try {
        
        await pool.query('CALL SP_NUEVO_COLEGIO($1,$2,$3)',[nombre,estado,usr_registro])

        return res.status(201).json({
            ok:true,
            msg:'Colegio registrado'
        })

    } catch (error) {
        return res.status(200).json({
            ok:false,
            msg:error.hint
        })
    }
}

const actualizarColegio=async(req,res=response)=>{

    let {nombre,estado,cod_colegio}= req.body;

    let  usr_registro = req.correo

    try {
        
        await pool.query('CALL SP_ACTUALIZAR_COLEGIO($1,$2,$3,$4)',[cod_colegio,nombre,estado,usr_registro]);

        return res.status(200).json({
            ok:true,
            msg:'Colegio actualizado'
        });

    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            ok:false,
            msg:error.code
        })
    }



}

const buscarColegio = async(req,res= response)=>{

    let termino = req.params.termino;
    let query;

    try {
        
       query= await pool.query(`SELECT * FROM FN_BUSCAR_COLEGIO('%${termino}%')`);

        return res.status(200).json({
            ok:true,
            colegios: query.rows
        });


    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error.code
        });
    }
}

module.exports={
    listaColegios,
    nuevoColegio,
    actualizarColegio,
    buscarColegio
}