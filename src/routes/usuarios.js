
const {Router}= require('express');
const { check } = require('express-validator');
const { listaUsuarios, listaEstados, activarUsuario, recuperarPass, actualizarContrasena } = require('../controllers/usuarios');
const router = Router();
const validarToken = require('../helpers/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');



router.get('/lista/:offset',validarToken,listaUsuarios);

router.get('/estados',listaEstados);

router.post('/activar-usuario',[check('cod_usuario','correo es requerido'),
                                check('correo','correo es requerido'),
                                validarCampos,validarToken],activarUsuario);
router.post('/recuperar-contrasena',[check('correo','correo es requerido'),
validarCampos],recuperarPass)                                

router.post('/actualizar-contrasena',[check('contrasenaNueva','contrasenaNueva es requerido'),
                                     check('contrasenaAnterior','contrasenaAnterior es requerido'),
                                     validarCampos,validarToken],actualizarContrasena)
module.exports=router;