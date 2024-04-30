const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-JWT');
const { googleVerify } = require("../helpers/google-verify");

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


const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const {name, email, img } = await googleVerify( id_token );
        
        let user = await User.findOne({email});

        if(!user){
            //Create user
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            }

            user = new User(data);
            await user.save();
        }

        //If the user is disable
        if(!user.status){
            return res.status(401).json({
                msg: 'Talk with the admin, user blocked'
            });
        }

        //Generate jwt
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        })
    }
}


module.exports = {
        login,
        googleSignIn
}