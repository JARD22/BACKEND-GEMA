

const {response, json}=require('express');
const pool = require('../postgresql/postgresql');




const directorio= async(req,res=response)=>{
    
    
    let nombres;
    let numeros;
    let {anio,curso,seccion}= req.params
    try {
        
        nombres = await pool.query('SELECT * FROM FN_NOMBRES_ALUMNO_DIRECTORIO($1,$2,$3)',[anio,curso,seccion])
        numeros = await pool.query('SELECT * FROM FN_TELEFONOS_DIRECTORIO($1,$2,$3)',[anio,curso,seccion])
    

        if (nombres.rowCount==0 ||numeros.rowCount==0 ) {
            return res.status(400).json({
                ok:true,
                msg:'No hay datos para esta consulta'
            });    
        }

        return res.status(200).json({
            ok:true,
           nombres:nombres.rows,
           numeros:numeros.rows

        });
    } catch (error) {
        
        return res.status(500).json({
            ok:false,
            msg:'No se pudo cargar los datos'
        })
    }
}

const matriculaDiaria = async(req,res=response)=>{

    let fi = req.params.fi
    let ff = req.params.ff
let query;
    try {
        query =await pool.query('SELECT * FROM FN_REPORTE_MATRICULA_DIARIA_R($1,$2)',[fi,ff])
 
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