const jwt = require('jsonwebtoken');
const {response}= require('express');


const validarToken = (req,res=response,next)=>{

    const token = req.header('x-token')

    if (!token) {
        return  res.status(401).json({
            ok:false,
            msg:'No hay token en los headers de la petición'
        })
    } else {
        try {
            
            const {correo} = jwt.verify(token,process.env.SEED)

            req.correo = correo;
            next()
        } catch (error) {
            return res.status(401).json({
                ok:false,
                msg:'Token incorrecto'
            })
        }
    }
}

module.exports = validarToken;