/*
                    api/personas
*/

const {Router}= require('express');
const router = Router();

const {getPersonas}= require('../controllers/personas')

router.get('/',getPersonas);





module.exports= router;