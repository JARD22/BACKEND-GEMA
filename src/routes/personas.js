
/*
                    api/personas
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

const {getPersonas,tipoPersona, registroPersonaUsuario, registroPersonaAlumno, 
       registroPersonaFamiliar,
       personaPorID,alumnoPorID,
       actualizarFamiliar,actualizarAlumno,
       eliminarTelefono,
       busquedaPorTermnino}= require('../controllers/personas');

const { check } = require('express-validator');

const validarCampos = require('../middlewares/validar-campos');

router.get('/tipo-persona',validarToken,tipoPersona);
router.get('/:offset',validarToken,getPersonas);
router.get('/busqueda/:termino',busquedaPorTermnino);

router.post('/usuario',[
    check('cod_tipo_persona','cod_tipo_persona es obligatorio').not().isEmpty(),
    check('dni','dni es obligatorio').not().isEmpty(),
    check('primer_nombre','primer_nombre es obligatorio').not().isEmpty(),
    check('primer_apellido','primer_apellido es obligatorio').not().isEmpty(),
    check('nacionalidad','nacionalidad es obligatorio').not().isEmpty(),
    check('sexo','sexo es obligatorio').not().isEmpty(),
    check('fecha_nacimiento','fecha_nacimiento es obligatorio').not().isEmpty(),
    check('correo','correo es obligatorio').not().isEmpty(),
    check('direccion','direccion es obligatorio').not().isEmpty(),
    check('telefonosUsuario','telefonos es obligatorio').not().isEmpty(),
    validarCampos,
    validarToken
],registroPersonaUsuario);

router.post('/alumno',[
check('cod_tipo_persona','cod_tipo_persona es obligatorio').not().isEmpty(),
check('dni','dni es obligatorio').not().isEmpty(),
check('primer_nombre','rimer_nombre es obligatorio').not().isEmpty(),
check('primer_apellido','rimer_apellido es obligatorio').not().isEmpty(),
check('nacionalidad','nacionalidad es obligatorio').not().isEmpty(),
check('sexo','sexo es obligatorio').not().isEmpty(),
check('fecha_nacimiento','fecha_nacimiento es obligatorio').not().isEmpty(),
check('direccion','direccion es obligatorio').not().isEmpty(),
check('grupo','rupo es obligatorio').not().isEmpty(),
check('enfermedad','enfermedad es obligatorio').not().isEmpty(),
check('vive_con','vive_con es obligatorio').not().isEmpty(),
validarCampos,
validarToken
],registroPersonaAlumno);

router.post('/familiar',[
    check('cod_tipo_persona','cod_tipo_persona es obligatorio').not().isEmpty(),
    check('dni','dni es obligatorio').not().isEmpty(),
    check('primer_nombre','primer_nombre es obligatorio').not().isEmpty(),
    check('primer_apellido','primer_apellido es obligatorio').not().isEmpty(),
    check('nacionalidad','nacionalidad es obligatorio').not().isEmpty(),
    check('sexo','sexo es obligatorio').not().isEmpty(),
    check('fecha_nacimiento','fecha_nacimiento es obligatorio').not().isEmpty(),
    check('direccion','direccion es obligatorio').not().isEmpty(),
    check('telefonosFamiliar','telefonos es obligatorio').not().isEmpty(),
    check('lugar_trabajo','lugar_trabajo es obligatorio').not().isEmpty(),
    check('ocupacion','ocupacion es obligatorio').not().isEmpty(),
    check('escolaridad','escolaridad es obligatorio').not().isEmpty(),
    validarCampos,
    validarToken
],registroPersonaFamiliar);

router.get('/persona-id/:uid',validarToken,personaPorID);

router.get('/alumno-id/:uid',validarToken,alumnoPorID)

router.patch('/actualizar-familiar',[
    check('dni','dni es obligatorio').not().isEmpty(),
    check('primer_nombre','primer_nombre es obligatorio').not().isEmpty(),
    check('primer_apellido','primer_apellido es obligatorio').not().isEmpty(),
    check('nacionalidad','nacionalidad es obligatorio').not().isEmpty(),
    check('sexo','sexo es obligatorio').not().isEmpty(),
    check('fecha_nacimiento','fecha_nacimiento es obligatorio').not().isEmpty(),
    check('direccion','direccion es obligatorio').not().isEmpty(),
    check('telefonosFamiliar','telefonosFamiliar es obligatorio').not().isEmpty(),
    check('lugar_trabajo','lugar_trabajo es obligatorio').not().isEmpty(),
    check('ocupacion','ocupacion es obligatorio').not().isEmpty(),
    check('encargado','encargado es obligatorio').not().isEmpty(),
    check('escolaridad','escolaridad es obligatorio').not().isEmpty(),
    check('uid','uid es obligatorio').not().isEmpty(),
    validarCampos,
    validarToken
],actualizarFamiliar);

router.patch('/actualizar-alumno',[
check('uid','uid es obligatorio').not().isEmpty(),
check('cod_tipo_persona','cod_tipo_persona es obligatorio').not().isEmpty(),
check('dni','dni es obligatorio').not().isEmpty(),
check('fecha_nacimiento','fecha_nacimiento es obligatorio').not().isEmpty(),
check('primer_nombre','primer_nombre es obligatorio').not().isEmpty(),
check('primer_apellido','primer_apellido es obligatorio').not().isEmpty(),
check('nacionalidad','nacionalidad es obligatorio').not().isEmpty(),
check('direccion','direccion es obligatorio').not().isEmpty(),
check('enfermedad','enfermedad es obligatorio').not().isEmpty(),
check('vive_con','vive_con es obligatorio').not().isEmpty(),
check('sexo','sexo es obligatorio').not().isEmpty(),
check('estado','estado es obligatorio').not().isEmpty(),

validarCampos,
validarToken],actualizarAlumno)

router.delete('/eliminar-telefono/:id',validarToken,eliminarTelefono)



module.exports= router;