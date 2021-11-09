

const {response, json}=require('express');
const pool = require('../postgresql/postgresql');




const directorio= async(req,res=response)=>{
    
    let query;
    let {anio,curso,seccion}= req.params
    try {
        
        query = await pool.query('SELECT * FROM FN_DIRECTORIO_TELEFONOS($1,$2,$3)',[anio,curso,seccion])

        if (query.rowCount==0) {
            return res.status(400).json({
                ok:true,
                msg:'No hay datos para esta consulta'
            });    
        }

        return res.status(200).json({
            ok:true,
            data:query.rows
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo cargar los datos'
        })
    }
}

const matriculaDiaria = async(req,res=response)=>{

    let anio = req.params.anio
    let query;
    try {
        query =await pool.query('SELECT * FROM FN_REPORTE_MATRICULA_DIARIA($1)',[anio])

        if (query.rowCount==0) {
            return res.status(400).json({
                ok:true,
                msg:'No hay datos para esta consulta'
            });    
        }

        return res.status(200).json({
            ok:true,
            data:query.rows
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se cargaron los datos de matricula'
        })
    }
}

module.exports ={directorio,matriculaDiaria}