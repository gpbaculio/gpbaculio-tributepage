<<<<<<< HEAD
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

import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {schema} from './data/schema';
  var app = express();
const indexPath = path.join(__dirname, './public/index.html')
const publicPath = express.static(path.join(__dirname, './public'))
=======
const path    = require('path');
const express = require('express');
var graphQLHTTP = require('express-graphql');
import {schema} from './data/schema'
module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, './public/index.html')
    const publicPath = express.static(path.join(__dirname, './public'))
>>>>>>> 986123cadb8d3cee76a008c90a6b7245b77a5d33

    app.use('/public', publicPath)
    app.use('/graphql', graphQLHTTP({graphiql: true, schema, pretty: true})); // graphql endpoint
    app.get('/', function (_, res) { res.sendFile(indexPath) });
<<<<<<< HEAD
  let http = require('http');
  let server = http.createServer(app);
  server.listen(4000, () => console.log("app in 4000"));
=======
    app.set('port', 4000);
	let http = require('http');
	let server = http.createServer(app);
	server.listen(4000);
    return app;
  }
}
>>>>>>> 986123cadb8d3cee76a008c90a6b7245b77a5d33

