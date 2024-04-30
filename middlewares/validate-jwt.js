const { request, response } = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'Missing token in request'
        });
    }

    try {
        const {uid} = jwt.verify( token, process.env.SECRECTORPRIVATEKEY );

        const user = await User.findById( uid );

        if( !user ){
            return res.status(401).json({
                msg: 'The user doesn´t exists'
            });
        }

        //Check if uid has true state
        if( !user.status ){
            return res.status(401).json({
                msg: 'The user has the status false'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'The token is not valid'
        })
    }
}

module.exports = {
    validateJWT
}