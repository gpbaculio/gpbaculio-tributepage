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
import { schema } from './schema';
const port = (process.env.PORT || 8080)
  var app = express();
const indexPath = path.join(__dirname, '../public/index.html')
const publicPath = express.static(path.join(__dirname, '../public'))

    app.use('/public', publicPath)
    app.use('/graphql', graphQLHTTP({graphiql: true, schema, pretty: true})); // graphql endpoint
    app.get('/', function (_, res) { res.sendFile(indexPath) });
  let http = require('http');
  let server = http.createServer(app);
  app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });

