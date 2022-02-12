const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controller/dbAuth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', login);


module.exports = router;