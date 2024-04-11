const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

  constructor(){
    this.app  = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    //DB
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  async connectDB(){
    await dbConnection();
  }

  middlewares(){

    //CORS
    this.app.use( cors() );

    //Parsing and Reading the request body
    this.app.use( express.json( ));

    //Public Directory
    this.app.use( express.static('public') );
  }

  routes(){
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/users.routes'));
  }

  listen(){
    this.app.listen( this.port, () => {
      console.log('Server running in port: ', this.port);
    });    
  }
}

module.exports = Server;
