/* eslint-disable react/prefer-stateless-function */
// == Import : npm
import React from 'react';
import GoogleMapReact from 'google-map-react';

// == Import : local
import Marker from './Marker';
import './map.scss';

// == Composant

class MapDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
    };
  }

  render() {
    const { lat, lng, title } = this.props;
    const { zoom } = this.state;
    const center = { lat, lng };
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCeeXTygGEzEuebpQ_H81r3FkCjiDumIPA' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
            name={title}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

// == Export
export default MapDetail;
