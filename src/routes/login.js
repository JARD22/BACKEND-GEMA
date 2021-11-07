const {Router}= require('express');
const {login,renovar, envPassProvisional} = require('../controllers/auth');
const router = Router();
const validarToken = require('../helpers/validar-jwt')

router.post('/',login)

router.get('/renovar',validarToken,renovar)

router.post('/contrasena-provisional/:correo',envPassProvisional)

module.exports=router;