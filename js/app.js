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
import './style.css'
import React from 'react';
import ReactDOM from 'react-dom';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import environment from './environment'

import TributeApp from './components/TributeApp';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
      query appQuery(
        $count: Int!
        $cursor: String
      ) {
        viewer {
          ...TributeApp_viewer
        }
      }
    `}
    variables={{ count: 5, cursor: '' }}
    render={({error, props}) => {
      if (props) {
        return <TributeApp viewer={props.viewer} />;
      } else {
        return <div style={{fontSize: '40px', position: 'absolute', top: '38%', left: '45%'}} >Loading...</div>;
      }
    }}
  />,
  mountNode
);
