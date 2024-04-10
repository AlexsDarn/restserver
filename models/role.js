
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'Role is require']
    }
});

module.exports = model('Role', RoleSchema);