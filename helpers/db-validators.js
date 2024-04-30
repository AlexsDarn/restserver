const { Category, Role, User } = require('../models');

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
    throw new Error(`The user id: ${id} doesn't exist!`);
  }
}

const existsCategoryById = async(id) => {
  const existsCategory = await Category.findById(id);
  if( !existsCategory ){
    throw new Error(`The category id: ${id} doesn't exist!`);
  }
}

module.exports = {
    isRoleValid,
    isEmailValid,
    existsUserById,
    existsCategoryById
}