
/*
                    api/colegios
*/




const {Router}= require('express');
const router = Router();
const validarToken = require('../helpers/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { listaColegios, nuevoColegio, actualizarColegio } = require('../controllers/colegios');



router.get('/lista-colegios/:offset',validarToken,listaColegios);
router.post('/nuevo-colegio',[
    check('nombre','nombre es requerido').not().isEmpty(),
    check('estado','estado es requerido').not().isEmpty(),
    validarCampos,
    validarToken
],nuevoColegio)

router.patch('/actualizar-colegio',[
check('nombre','nombre es requerido').not().isEmpty(),
check('estado','estado es requerido').not().isEmpty(),
check('cod_colegio','estado es requerido').not().isEmpty(),
validarCampos,
validarToken
],actualizarColegio)



module.exports=router;