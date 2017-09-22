const path    = require('path');
const express = require('express');
var graphQLHTTP = require('express-graphql');
import {schema} from './data/schema'
module.exports = {
  app: function () {
    const APP_PORT = 3000;
    const app = express();
    const indexPath = path.join(__dirname, './public/index.html')
    const publicPath = express.static(path.join(__dirname, './public'))

    app.use('/public', publicPath)
    app.use('/graphql', graphQLHTTP({graphiql: true, schema, pretty: true})); // graphql endpoint
    app.get('/', function (_, res) { res.sendFile(indexPath) });
    return app;
  }
}


