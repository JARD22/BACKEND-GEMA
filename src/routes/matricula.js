
/*
                    api/matricula
*/

/*
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com


                HISTORIAL DE CAMBIBO

Programador                      Cambio                     Fecha
*/

const {Router}= require('express');
const { tiposMatricula, cursos } = require('../controllers/matricula');
const router = Router();
const validarToken = require('../helpers/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');



router.get('/tipos-matricula',tiposMatricula);

router.get('/cursos',cursos);


module.exports=router;





