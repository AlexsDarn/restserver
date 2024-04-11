const { check } = require('express-validator');
const { Router } = require('express');

const { login } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'The email is require!').isEmail(),
    check('password', 'Password is require!').not().isEmpty(),
    validateFields
], login);

module.exports = router;