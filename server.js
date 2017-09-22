<<<<<<< HEAD
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


=======
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var express = require('express');
var graphQLHTTP = require('express-graphql');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var {schema} = require('./data/schema')

const PORT = (process.env.PORT || 3080)
const GRAPHQL_PORT = 8080;
const indexPath = path.join(__dirname, './public/index.html')
const publicPath = express.static(path.join(__dirname, './public'))



const app = express();
      app.use('/public', publicPath)
      app.use('/graphql', graphQLHTTP({graphiql: true, schema, pretty: true})); // graphql endpoint
      app.get('/', function (_, res) { res.sendFile(indexPath) });

      app.listen(PORT)
      console.log(`Listening at http://localhost:${PORT}`)
>>>>>>> 14ee168bfe1a5dd21a766568cd371a8a4c6e95d1
