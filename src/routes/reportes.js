const {Router}= require('express');
const { directorio, matriculaDiaria } = require('../controllers/reportes');
const router = Router();
const validarToken = require('../helpers/validar-jwt');



router.get('/directorio/:anio/:curso/:seccion',directorio);
router.get('/matricula-diaria/:fi/:ff',matriculaDiaria)


module.exports=router