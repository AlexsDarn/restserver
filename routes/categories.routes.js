const { check } = require('express-validator');
const { Router } = require('express');

const { validateJWT, validateFields } = require('../middlewares');
const { createCategory, getCategories, getCategoriesById } = require('../controllers/categories.controllers');
const { existsCategoryById } = require('../helpers/db-validators');

const router = Router();

//Get all Categories - public
router.get('/', getCategories);

//Get one category - public
router.get('/:id', [
    check('id').custom(existsCategoryById)
], (req, res) => {
    res.json(getCategoriesById);
});

//Create new category - private
router.post('/', 
[validateJWT,
check('name', 'Name is require').not().isEmpty(), 
validateFields],
createCategory);

//Update register by id - private
router.put('/:id', (req, res) => {
    res.json('put');
});

//Delete category - admin 
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports = router;