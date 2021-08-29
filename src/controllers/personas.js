const {response}=require('express');
const pool = require('../postgresql/postgresql');

const getPersonas= (req,res=response)=>{

    res.json({
        ok:true,
        msg:'Este es el backend de GEMA'
    });

}

const registroPersona = async(req,res=response)=>{


    try {


//SWITCH PARA 4 TIPOS DE PERSONA Y LLAMAR A VARIOS SP

        return res.status(200).json({
            ok:true,
            msg:'Persona registrada'
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al registrar a la persona'
        });
    }
}


module.exports= {
    getPersonas,
    registroPersona
}