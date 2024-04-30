const { response } = require("express");
const { Category } = require('../models');

//get Categories - paginated - total - populate
const getCategories = async(req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = {status: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({ 
        total,
        categories
    });
}

//get Category - populate
const getCategoriesById = async(req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById( id )
    .populate('user')
    .exec();

    res.json({ 
        category
    });
}


//UpdateCategory

//DeleteCategory - Status: False


const createCategory = async(req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});
    
    if( categoryDB){
        return res.status(400).json({
            msg: `The category ${categoryDB.name}, is already exists!`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    //save in db
    await category.save();

    res.status(201).json(category)
}

module.exports = {
    getCategories,
    getCategoriesById,
    createCategory,
}