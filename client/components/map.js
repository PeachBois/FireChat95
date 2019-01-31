import { connect } from 'react-redux'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'

export class MapContainer extends Component {  

   

    render() {
    const {lat, lng, zoom} = this.props.position

    return (
        // <div className="box">
            <div id="map">
                <Map google={this.props.google}
                    zoom={zoom} 
                    center={{lat, lng}}
                    initialCenter={{lat, lng}}
                    zoomControl={false}
                    scaleControl={false}
                    streetViewControl={false}
                    mapTypeControl={false}
                    rotateControl={false}
                    fullscreenControl={false}
                    gestureHandling={'none'}
                   />
            </div>
        // </div> 
    );
  }
}
 
const wrappedMapContainer =  GoogleApiWrapper({
  apiKey: 'AIzaSyBz7fOQpPA70ewMAtpQPIXjYxDq40fdTro'
})(MapContainer)

const mapState = (state) => {
    return {
        position: state.position,
        zoom: state.zoom
    }
}

export default connect(mapState)(wrappedMapContainer)    