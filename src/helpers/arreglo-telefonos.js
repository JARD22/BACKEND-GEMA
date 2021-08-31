// let telefonos= '[{"telefono":"9999999","cod_tipo_telefono":"1"},{"telefono":"9999992","cod_tipo_telefono":"2"}]'

const JSONArray = (telefonos)=>{

return new Promise((resolve,reject)=>{

    if (!telefonos) {
        reject('No hay telefonos')
    }

    let telefonos1= telefonos.replace('[',`'[`);
    let telefonos2= telefonos1.replace(']',`]'`) 

    resolve(telefonos2)
});

}


module.exports=JSONArray;