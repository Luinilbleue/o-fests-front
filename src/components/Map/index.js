/* eslint-disable react/prefer-stateless-function */
// == Import : npm
import React from 'react';
import GoogleMapReact from 'google-map-react';

// == Import : local
import Marker from './Marker';
import './map.scss';

// == Composant
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 46.22,
        lng: 2.21,
      },
      zoom: 4,
    };
  }

  render() {
    const { fests } = this.props;
    const { zoom, center } = this.state;
    return (
      <div className="map">
        <GoogleMapReact
          // bootstrapURLKeys={{ key: 'API KEY HERE' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {fests.map((fest) => (
            <Marker
              lat={fest.lat}
              lng={fest.lng}
              name={fest.title}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

// == Export
export default Map;
