import { connect } from 'react-redux'
// import {Map, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'

class MapContainer extends Component {  
    constructor() {
        super()
        this.loading = true
        this.map = {}
    }

    componentDidMount() {
        const script = document.createElement('script')
        script.async = true;
        script.defer = true;
        script.body = 'hello'
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBz7fOQpPA70ewMAtpQPIXjYxDq40fdTro&callback=initMap"
        document.getElementById('map').appendChild(script)
        this.loading = false;
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
    }
    
    render() {
        // this.initMap()
        let isLoading = this.loading
        return(
            <div id='map'>
                {isLoading
                ? 'Loading' 
                : this.initMap()}
            </div>
            
        )
    // const {lat, lng, zoom, bounds} = this.props.position
    // return (
    //     // <div className="box">
    //         <div id="map">
    //             <Map google={this.props.google}
    //                 zoom={zoom} 
    //                 center={{lat, lng}}
    //                 initialCenter={{lat, lng}}
    //                 zoomControl={false}
    //                 scaleControl={false}
    //                 streetViewControl={false}
    //                 mapTypeControl={false}
    //                 rotateControl={false}
    //                 fullscreenControl={false}
    //                 gestureHandling={'none'}
    //                >
    //                {/* <OverlayView bounds={this.props.bounds}>
    //                    <p>hello</p>
    //                </OverlayView> */}
    //                </Map>
    //         </div>
    //     // </div> 
    // );
  }
}
 
// const wrappedMapContainer =  GoogleApiWrapper({
//   apiKey: 'AIzaSyBz7fOQpPA70ewMAtpQPIXjYxDq40fdTro'
// })(MapContainer)

const mapState = (state) => {
    return {
        position: state.position,
        zoom: state.position.zoom,
        bounds: state.position.bounds
    }
}

export default connect(mapState)(MapContainer)    