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


module.exports=login;