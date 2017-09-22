const path    = require('path');
const express = require('express');
var graphQLHTTP = require('express-graphql');
import {schema} from './data/schema'
module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, './public/index.html')
    const publicPath = express.static(path.join(__dirname, './public'))

    app.use('/public', publicPath)
    app.use('/graphql', graphQLHTTP({graphiql: true, schema, pretty: true})); // graphql endpoint
    app.get('/', function (_, res) { res.sendFile(indexPath) });
    app.set('port', 4000);
	let http = require('http');
	let server = http.createServer(app);
	server.listen(4000);
    return app;
  }
}

