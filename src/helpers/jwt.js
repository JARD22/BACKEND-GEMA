const jwt= require('jsonwebtoken');

const generarJWT= (correo)=>{

    const payload= {
        correo
    };

    return new Promise((resolve,reject)=>{

        jwt.sign(payload,process.env.SEED,{
            expiresIn:'7h'
        },(err,token)=>{
            if (err) {
                reject('No se pudo generar el token de sesión')
            }else{
                resolve(token) 
            }
        })
    });
  
}

module.exports=generarJWT;