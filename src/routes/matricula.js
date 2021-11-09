
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
const { tiposMatricula, cursos, datosAlumno, datosParentesco, nuevaMatricula, metricasMatricula, actualizarDoc, docDni } = require('../controllers/matricula');
const router = Router();
const validarToken = require('../helpers/validar-jwt');




router.get('/tipos-matricula',tiposMatricula);

router.get('/cursos',cursos);

router.get('/datos-alumno/:dni',validarToken,datosAlumno)

router.get('/datos-parentesco/:dni',validarToken,datosParentesco)

router.post('/nueva-matricula',validarToken,nuevaMatricula);

router.get('/metricas/:anio/:cod_tipo/:offset',metricasMatricula);

router.get('/doc-dni/:anio/:cod_tipo/:dni',docDni);

router.patch('/actualizar-datos',validarToken,actualizarDoc)



module.exports=router;





