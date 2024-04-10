const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async(role = '') => {
    const existsRole = await Role.findOne({role});
    if( !existsRole ){
      throw new Error(`${role} is not registered in BD`);
    }
}

//check if the email exists
const isEmailValid = async(email = '') => {
  const existsEmail = await User.findOne({email});
  if( existsEmail ){
    throw new Error(`${email} already exists!`);
  }
}

const existsUserById = async(id) => {
  const existsUser = await User.findById(id);
  if( !existsUser ){
    throw new Error(`The id: ${id} doesn't exist!`);
  }
}


module.exports = {
    isRoleValid,
    isEmailValid,
    existsUserById
}



/* return res.status(400).json({
  msg: 'The email already exists'
}); */