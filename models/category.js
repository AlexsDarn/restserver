const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        require: [true, 'Category name is require'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorySchema.methods.toJSON = function(){
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema);