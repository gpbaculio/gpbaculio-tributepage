import React, { Component } 
  from 'react'
import { QueryRenderer, graphql } 
  from 'react-relay';

import Header from './Header';
import environment  from '../environment';


const HeaderRendererQuery = graphql` 
  query HeaderRendererQuery {
    viewer { 
      ...Header_viewer 
    }
  }
`;

class HeaderRenderer extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={HeaderRendererQuery}
        render={({error, props}) => {
          if (error) {
            console.log(error)
            return <div>{error.message}</div> 
          } else if (props) { // props is destructured from the default function argument above 
            return <Header viewer={props.viewer} />
          }
          return <div style={{visibility: 'hidden'}} >Loading... </div>
        }}
      />
    )
  }

}

export default HeaderRenderer