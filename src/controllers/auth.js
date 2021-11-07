/*
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com
*/


/**
 *  Ruta: api/login
 */

const response = require('express');
const pool = require('../postgresql/postgresql');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const passProvisional = require('../helpers/correoPassProvisional');

const login = async(req,res=response)=>{

    let {usuario,contrasena} =req.body;
    

    try {
        const usuarioDB= await pool.query('SELECT * FROM FN_LOGIN($1)',[usuario]);

        if (usuarioDB.rowCount === 0) {
            return res.status(403).json({
                ok: false,
                msg: 'Correo o contraseña no válido'
            });
        }

    let userObj ={
                id:usuarioDB.rows[0].out_id,
                correo: usuarioDB.rows[0].out_usuario,
                nombre: usuarioDB.rows[0].out_nombre,
                rol: usuarioDB.rows[0].out_rol,
                intentos:usuarioDB.rows[0].out_intentos

    }
    const contrasenaValida = bcrypt.compareSync(contrasena,usuarioDB.rows[0].out_contrasena)

    if (userObj.correo && contrasenaValida) {

        const token = await generarJWT(userObj.correo);
        
        return res.status(200).json({
            ok:true,
            userObj,
            token
        })
    } else {
        return res.status(403).json({
            ok: false,
            msg: 'Correo o contraseña no válido'
        });
    }

    }catch(error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al iniciar sesión'
        });
    }
    }

const renovar= async(req,res=response)=>{
    
 let correo = req.correo

 try {
    const usuarioDB= await pool.query('SELECT * FROM FN_LOGIN($1)',[correo]);

   let userObj ={
            id:usuarioDB.rows[0].out_id,
            correo: usuarioDB.rows[0].out_usuario,
            nombre: usuarioDB.rows[0].out_nombre,
            rol: usuarioDB.rows[0].out_rol,
            intentos:usuarioDB.rows[0].out_intentos

}

    const token = await generarJWT(userObj.correo);
    
    return res.status(200).json({
        ok:true,
        userObj,
        token
    })


}catch(error) {
    return res.status(500).json({
        ok:false,
        msg:'Error al renovar el token'
    });
}
}

const envPassProvisional=async(req,res=response)=>{
   
   let correo = req.params.correo
   
    try {
        let provisional = await contrasenaProvisional(8) 
        passProvisional(provisional,correo);

        return res.status(200).json({
            ok:true,
            msg:'Revisa tu bandeja de entrada'
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo enviar el correo al destinatario'
        })
    }

}

const contrasenaProvisional = async(longitud)=>{
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';
    let charactersLength = characters.length;
    let result = ''
    for ( var i = 0; i < longitud; i++ ) {
      result +=  characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports={login,renovar,envPassProvisional};