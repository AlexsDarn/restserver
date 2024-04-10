const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.MONGODB );

        console.log('Database is started!');

    }catch(error){
        console.log(error);
        throw new Error('Error in database');
    }
}

module.exports = {
    dbConnection
}