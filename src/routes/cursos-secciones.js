
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
    buscarCurso, 
    listaSecciones,
    nuevaSeccion,
    actualizarSeccion,
    unirSecciones}= require('../controllers/cursos-secciones');
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


router.get('/secciones/:curso/:anio',validarToken,listaSecciones);

router.post('/nueva-seccion',[
    check('cod_curso','cod_curso es requerido').not().isEmpty(),
    check('nombre','nombre es requerido').not().isEmpty(),
    check('cupos','cupos es requerido').not().isEmpty(),
    check('estado','estado es requerido').not().isEmpty(),
    check('anio','anio es requerido').not().isEmpty(),
    validarCampos,
    validarToken
],nuevaSeccion);

router.patch('/actualizar-seccion',[
    check('cod_seccion','cod_seccion es requerido').not().isEmpty(),
    check('nombre','nombre es requerido').not().isEmpty(),
    check('cupos','cupos es requerido').not().isEmpty(),
    check('anio','anio es requerido').not().isEmpty(),
    check('estado','estado es requerido').not().isEmpty(),
validarCampos,validarToken],actualizarSeccion);

router.post('/unir-secciones',[
    check('nombre','nombre es requerido').not().isEmpty(),
    check('anio','anio es requerido').not().isEmpty(),
    check('seccion1','seccion1 es requerido').not().isEmpty(),
    check('seccion2','seccion2 es requerido').not().isEmpty(),
    validarCampos,
    validarToken
],unirSecciones)

module.exports= router;


