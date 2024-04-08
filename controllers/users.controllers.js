const { response } = require('express');

const usersGet = (req, res = response) => {
    const { q, name = 'No name', apikey } = req.query;

    res.json({
      "msg": "get API - controller",
      q,
      name,
      apikey
    });
}

const usersPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
      "msg": "post API - controller",
      nombre,
      edad
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
      "msg": "put API - controller",
      id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
      "msg": "patch API - controller"
    });
}

const usersDelete = (req, res = response) => {
    res.json({
      "msg": "delete API - controller"
    });
}

module.exports = {
    usersGet, 
    usersPost, 
    usersPut, 
    usersPatch, 
    usersDelete
}