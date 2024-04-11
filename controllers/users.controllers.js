const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = {status: true}

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(since))
      .limit(Number(limit))
  ]);

    res.json({
      total,
      users
    });
}

const usersPost = async(req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({name, email, password, role});

  //encrypt password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync( password, salt);

  //save in DB
  await user.save();
  res.json({
    user
  });
}

const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body;

    if( password ){
        //encrypt password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest)
    res.json(user);
}

const usersDelete = async (req, res = response) => {
  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json(user);
}

module.exports = {
    usersGet, 
    usersPost, 
    usersPut, 
    usersDelete
}