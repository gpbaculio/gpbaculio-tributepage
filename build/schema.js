'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
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

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId),
      type = _fromGlobalId.type,
      id = _fromGlobalId.id;

  if (type === 'User') {
    return (0, _database.getUser)(id);
  }
  return null;
}, function (obj) {
  if (obj instanceof _database.User) {
    return GraphQLUser;
  }
  return null;
}),
    nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;

var GraphQLAchievement = new _graphql.GraphQLObjectType({
  name: 'Achievement',
  fields: {
    id: (0, _graphqlRelay.globalIdField)('Achievement'),
    text: {
      type: _graphql.GraphQLString,
      resolve: function resolve(root) {
        return root.text;
      }
    },
    year: {
      type: _graphql.GraphQLInt,
      resolve: function resolve(root) {
        return root.year;
      }
    }
  },
  interfaces: [nodeInterface]
});

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Achievement',
  nodeType: GraphQLAchievement
}),
    AchievementsConnection = _connectionDefinition.connectionType,
    GraphQLAchievementEdge = _connectionDefinition.edgeType;

var GraphQLUser = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: (0, _graphqlRelay.globalIdField)('User'),
    momName: {
      type: _graphql.GraphQLString,
      resolve: function resolve() {
        return 'Filomena Bangalao Baculio';
      }
    },
    momImageLink: {
      type: _graphql.GraphQLString,
      resolve: function resolve() {
        return (0, _database.getMomImageLink)();
      }
    },
    momAchievements: {
      type: AchievementsConnection,
      args: _extends({}, _graphqlRelay.connectionArgs),
      resolve: function resolve(obj, _ref) {
        var args = _objectWithoutProperties(_ref, []);

        return (0, _graphqlRelay.connectionFromArray)((0, _database.getAchievements)(), args);
      }
    }
  },
  interfaces: [nodeInterface]
});

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: function resolve() {
        return (0, _database.getViewer)();
      }
    },
    node: nodeField
  }
});

var schema = exports.schema = new _graphql.GraphQLSchema({
  query: Query
});