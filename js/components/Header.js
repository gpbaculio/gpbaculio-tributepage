
import React from 'react';
import {
  graphql,
  createFragmentContainer 
} from 'react-relay';

class Header extends React.Component {
	render() {
		return(<div>
			<p style={{fontSize: '24px', marginBottom: '12px'}} > {this.props.viewer.momName} </p>
			<img src={this.props.viewer.momImageLink} alt="Mountain View" style={{width: '300px', height: '300px', border: 'solid #333 0.5px'}}/>
		</div>)
	}
}

export default createFragmentContainer(Header, {
  viewer: graphql`
    fragment Header_viewer on User {
      id,
      momImageLink,
      momName
    }
  `,
});
