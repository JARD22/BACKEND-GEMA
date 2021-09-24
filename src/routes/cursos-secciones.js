
/*
                    api/cursos
*/

/*
            GESTOR EDUCATIVO DE MATRICULA Y ADMINISTRACIÓN


Porgramador: Jorge Aguilera
Correo: jorge.aguilera.duron@gmail.com


                HISTORIAL DE CAMBIBO

Programador                      Cambio                     Fecha
*/

const {Router}= require('express');
const router = Router();
const validarToken = require('../helpers/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');

const{ nuevoCurso,
    listaCursos,
    actualizarCurso,
    buscarCurso }= require('../controllers/cursos-secciones');
const { check } = require('express-validator');


router.post('/nuevo-curso',[
    check('nombre','nombre es requerido').not().isEmpty(),
    check('descripcion','descripcion es requerido').not().isEmpty(),
    check('estado','estado es requerido').not().isEmpty(),
    validarCampos,
    validarToken
],nuevoCurso);

router.get('/lista-cursos/:offset',validarToken,listaCursos);

router.patch('/actualizar-curso',[
    check('cod_curso','cod_curso es requerido').not().isEmpty(),
    check('nombre','nombre es requerido').not().isEmpty(),
    check('descripcion','descripcion es requerido').not().isEmpty(),
    check('estado','estado es requerido').not().isEmpty(),
    validarCampos,
    validarToken
],actualizarCurso);


router.get('/buscar-curso/:termino',buscarCurso);

module.exports= router;


