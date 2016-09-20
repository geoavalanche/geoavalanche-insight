import React from 'react';
import MapTemplate from '../../components/mapTemplate';


export default class Layout extends React.Component {
  render () {
    return <MapTemplate page={this.props.route.page} />;
  }
}


Layout.propTypes = {
  route: React.PropTypes.object,
};