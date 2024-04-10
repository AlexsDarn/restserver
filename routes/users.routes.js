const { check } = require('express-validator');
const { 
  usersGet, 
  usersPost, 
  usersPut, 
  usersPatch, 
  usersDelete} 
  = require('../controllers/users.controllers');
const { Router } = require('express');

const { isRoleValid, isEmailValid, existsUserById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);

router.post('/', [
  check('name', 'Name is require').not().isEmpty(),
  check('email', 'The email is not valid').isEmail().custom(isEmailValid),
  check('password', 'Password is require and must be more than 6 letters').isLength({min: 6}),
  check('role').custom( isRoleValid ), 
  validateFields
], usersPost);

router.put('/:id',[
  check('id', 'Is not a valid id').isMongoId().custom( existsUserById ),
  check('role').custom( isRoleValid ), 
  validateFields
], usersPut);

router.patch('/', usersPatch)

router.delete('/:id', [ 
  check('id', 'Is not a valid id').isMongoId().custom( existsUserById ), 
  validateFields,
],  usersDelete);

module.exports = router;