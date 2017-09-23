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

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  User,
  getAchievements,
  getUser,
  getMomImageLink,
  getViewer,
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
   if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

const GraphQLAchievement = new GraphQLObjectType({
  name: 'Achievement',
  fields: {
    id: globalIdField('Achievement'),
    text: {
      type: GraphQLString,
      resolve: (root) => root.text,
    },
    year: {
      type: GraphQLInt,
      resolve: (root) => root.year,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: AchievementsConnection,
  edgeType: GraphQLAchievementEdge,
} = connectionDefinitions({
  name: 'Achievement',
  nodeType: GraphQLAchievement,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    momName: {
      type: GraphQLString,
      resolve: () => 'Filomena Bangalao Baculio'
    },
    momImageLink: {
      type: GraphQLString,
      resolve: () => getMomImageLink()
    },
    momAchievements: {
      type: AchievementsConnection,
      args: {
        ...connectionArgs,
      },
      resolve: (obj, {...args}) =>
        connectionFromArray(getAchievements(), args),
    },
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
