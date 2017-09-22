
import React from 'react';
import HeaderRenderer from './HeaderRenderer'
import {
  graphql,
  createPaginationContainer
} from 'react-relay';


class TributeApp extends React.Component {

  _loadMore() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(
      5, // Fetch the next 10 feed items
      e => {
        console.log(e);
      },
    );
  }

  render() {
    return (<div><span className="title"> Reactjs + Relay Modern + GraphQL Tribute  Page  </span>
            <div className="container">
            <HeaderRenderer />
            <p style={{margin:'20px', fontSize: '17.5px'}} >My Moms' awesome timeline</p>
            <ul>
              {this.props.viewer.momAchievements.edges.map(
                edge => <li style={{margin: '15px 0 0 0', backgroundColor: '#E9EBEE', padding: '12px'}} key={edge.node.id}> <p style={{ width: '100%', fontWeight: 'bold'}}> {edge.node.year}</p> - <p style={{width: '100%', textAlign: 'left', padding:'0 2px 2px 2px'}} >{edge.node.text}</p> </li>
              )}
            </ul>
        <button
        style={{ cursor: 'pointer', backgroundColor:'#E9EBEE', marginTop: '20px', padding: '12px 24px 12px 24px', fontWeight: '600'}}
          onClick={() => this._loadMore()}
        > Load More </button>
              <div style={{marginTop: '40px'}}>
                  <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-tributeapp.herokuapp.com/" target="_blank" > link </a> </span>
                  <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-tributepage" target="_blank" > link </a> </span>
              </div>
            </div>
           <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>);
  }
}


module.exports = createPaginationContainer(
  TributeApp,
  {
    viewer: graphql`
      fragment TributeApp_viewer on User {
        momAchievements(
          first: $count
          after: $cursor
        ) @connection(key: "TributeApp_momAchievements") {
          edges {
            node {
              id,
              year, 
              text
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.momAchievements;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {
        count,
        cursor,
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        // orderBy: fragmentVariables.orderBy,
      };
    },
    query: graphql`
      query TributeAppPaginationQuery(
        $count: Int!
        $cursor: String
      ) {
        viewer {
          # You could reference the fragment defined previously.
          ...TributeApp_viewer
        }
      }
    `
  }
);