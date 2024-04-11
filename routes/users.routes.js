const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields, validateJWT, haveRole } = require('../middlewares')

const { isRoleValid, isEmailValid, existsUserById } = require('../helpers/db-validators');

const { 
  usersGet, 
  usersPost, 
  usersPut, 
  usersDelete} 
  = require('../controllers/users.controllers');

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
  check('id', 'Is not a valid id').isMongoId(),
  check('id').custom( existsUserById ),
  check('role').custom( isRoleValid ), 
  validateFields
], usersPut);

router.delete('/:id', [ 
  validateJWT,
  //isAdmin,
  haveRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'Is not a valid id').isMongoId(),
  check('id').custom(existsUserById),
  validateFields,
],  usersDelete);

module.exports = router;