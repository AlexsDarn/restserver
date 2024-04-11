const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-JWT')

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //Verify if the email exists
        const user = await User.findOne({email});
        if( !user ){
            return res.status(400).json({
                msg: 'User / Password is incorrect'
            });
        }

        //if the user is active
        if( !user.status ){
            return res.status(400).json({
                msg: 'User is not active'
            });
        }

        //Verify the password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Password is incorrect'
            });
        }

        //Generate jwt
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk with the admin',
        });
    }
}

module.exports = {
        login,
}