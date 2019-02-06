export const makeMap = (position, bounds) => {
  const { lat, lng, zoom } = position
  if (bounds !== 'failed') {
    const north = bounds.ne.lat
    const east = bounds.ne.lon
    const south = bounds.sw.lat
    const west = bounds.sw.lon
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: (north + south) / 2,
        lng: (east + west) / 2
      },
      zoom,
      disableDefaultUI: true,
      styles: [
        {
          stylers: [
            {
              saturation: -17
            },
            {
              gamma: 0.36
            }
          ]
        },
        {
          featureType: 'administrative',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'landscape',
          stylers: [
            {
              visibility: 'simplified'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            {
              color: '#3f518c'
            }
          ]
        },
        {
          featureType: 'water',
          stylers: [
            {
              color: '#84afa3'
            },
            {
              lightness: 52
            }
          ]
        }
      ]
    })
    var image = {
      url: 'marker.png',
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 32)
    }
    var marker = new google.maps.Marker({
      icon: image,
      position: { lat, lng },
      map,
      title: 'YOU'
    })

    if (bounds) {
      var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF8C00',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFFF33',
        fillOpacity: 0.35,
        map,
        bounds: {
          north,
          east,
          south,
          west
        }
      })
    }
  }
  return map
}
