import { connect } from 'react-redux'
// import {Map, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'

class MapContainer extends Component {  
    constructor() {
        super()
        this.loading = true
        this.map = {}
        this.initMap = this.initMap.bind(this)
    }

    // componentDidMount() {
    //     const script = document.createElement('script')
    //     script.async = true;
    //     script.defer = true;
    //     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBz7fOQpPA70ewMAtpQPIXjYxDq40fdTro&callback=initMap"
    //     document.getElementById('map').appendChild(script)
    //     this.loading = false;
    // }

    initMap(bounds) {
        const {lat, lng, zoom} = this.props.position
        const north = bounds.ne.lat;
        const east = bounds.ne.lon;
        const south = bounds.sw.lat;
        const west = bounds.sw.lon;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: ( (north+south) / 2 ),
                lng: ( (east+west) / 2 ),
            },
            zoom,
            disableDefaultUI: true,
            styles: [
                {
                  "stylers": [
                    {
                      "saturation": -17
                    },
                    {
                      "gamma": 0.36
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "landscape",
                  "stylers": [
                    {
                      "visibility": "simplified"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi.business",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "visibility": "on"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#3f518c"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "stylers": [
                    {
                      "color": "#84afa3"
                    },
                    {
                      "lightness": 52
                    }
                  ]
                }
              ]
          });
        
        var marker = new google.maps.Marker({
            position: {lat, lng},
            map: this.map,
            title: 'YOU'
        });
        
        var rectangle = new google.maps.Rectangle({
            strokeColor: '#FF8C00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FFFF33',
            fillOpacity: 0.35,
            map: this.map,
            bounds: {
            north,
            east,
            south,
            west
            }
        });
        
    }
    
    render() {
        // this.initMap()
        let isLoading = this.loading
        return(
            // <div id='map'>
            //     {isLoading
            //     ? 'Loading' 
            //     : this.initMap()}
            // </div>
            <React.Fragment>{this.initMap(this.props.position.bounds)}</React.Fragment>
            
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
    }
}

export default connect(mapState)(MapContainer)    