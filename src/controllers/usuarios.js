const pool = require('../postgresql/postgresql');
const {response}= require('express');
const passProvisional = require('../helpers/correoPassProvisional');
const contrasenaCorreo=require('../helpers/correoCambiarPass')
const bcrypt = require('bcryptjs');


const listaUsuarios=async(req,res=response)=>{
   
   let offset = req.params.offset;
   let query;
   
    try {

        query = await pool.query(`SELECT * FROM FN_LISTA_USUARIOS(${offset})`)

        return res.status(200).json({
            ok:true,
            usuarios:query.rows
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al cargar la lista de usuarios'
        })
    }
}

const listaEstados = async(req,res=response)=>{
    
    let query;
    try {
        query = await pool.query('SELECT * FROM FN_LISTA_ESTADOS()');

        return res.status(200).json({
            ok:true,
            estados:query.rows
        })


    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'No se pudo cargar la lista de estados'
        })
    }
}

const activarUsuario=async(req,res=respose)=>{

    let {correo,cod_usuario}=req.body

    try {

        let provisional = await contrasenaProvisional(8) 
        let hash= bcrypt.genSaltSync(5)
        let passEncrypt = bcrypt.hashSync(provisional,hash)
      

        passProvisional(provisional,correo);

        await pool.query('CALL SP_ACTIVAR_USUARIO($1,$2)',[cod_usuario,passEncrypt])
        
        return res.status(200).json({
            ok:true,
            msg: `Usuario ${correo} activado`
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:`Error al activar el usuario ${correo}`
        })
    }
}

const recuperarPass = async(req,res=response)=>{

    
    let {correo}=req.body

    try {

        let provisional = await contrasenaProvisional(8) 
        let hash= bcrypt.genSaltSync(5)
        let passEncrypt = bcrypt.hashSync(provisional,hash)
      
        contrasenaCorreo(provisional,correo);
        

        await pool.query('CALL SP_CAMBIAR_CONTRASENA($1,$2)',[correo,passEncrypt])
        
        return res.status(200).json({
            ok:true,
            msg: `Revisa tu bandeja de entrada  `
        });
        
    } catch (error) {
        if (error.hint) {
            return res.status(500).json({
                ok:false,
                msg:error.hint
            });    
        }

        return res.status(500).json({
            ok:false,
            msg:`No se pudo recuperar la contraseña`
        });
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


 const actualizarContrasena = async(req,res=response)=>{

    let {contrasenaNueva,
        contrasenaAnterior} =req.body

     let correo = req.correo;   
     let query;
try {
    
     query = await pool.query('SELECT * FROM FN_CONTRASENA_USUARIO($1)',[correo]);
     let contrasena = query.rows[0].out_contrasena;   

     let contrasenaValida = bcrypt.compareSync(contrasenaAnterior,contrasena);
     let seed = bcrypt.genSaltSync(5)
     let passEncrypt = bcrypt.hashSync(contrasenaNueva,seed)

     if (contrasenaValida) {
         await pool.query('CALL SP_ACTUALIZAR_CONTRASENA($1,$2)',[passEncrypt,correo]);

         return res.status(200).json({
            ok:true,
            msg:'Cotraseña actualizada'
        });
     } else {
        return res.status(400).json({
            ok:false,
            msg:'Contraseña incorrecta'
        });         
     }
    

} catch (error) {
    console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'No se pudo actualizar la contraseña'
        });
   
}

 }
module.exports={
    listaUsuarios,
    listaEstados,
    activarUsuario,
    recuperarPass,
    actualizarContrasena
}