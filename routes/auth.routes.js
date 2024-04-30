const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'The email is require!').isEmail(),
    check('password', 'Password is require!').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'Google token is require!').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;