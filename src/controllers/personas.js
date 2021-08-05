const {response}=require('express')


const getPersonas= (req,res=response)=>{

    res.json({
        ok:true,
        msg:'Este es el backend de GEMA'
    });

}


module.exports= {
    getPersonas
}