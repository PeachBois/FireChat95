import Geohash from 'latlon-geohash'
import axios from 'axios'

export const getUserLocation = () => {
  const geolocation = navigator.geolocation

  let location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'))
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      () => {
        resolve('failed')
      },
      { maximumAge: 0, timeout: 5000, enableHighAccuracy: true }
    )
  })
  return location
}

export const getGeoHash = async (coordinates, radius) => {
  const { lat, lng } = coordinates
  console.log(lat, lng, radius)
  const hash = Geohash.encode(lat, lng, radius)
  return hash
}
export const getGif = async (string = 'win95') => {
  string = string.split(' ').join('+')

  const gif = await axios.get(
    '//api.giphy.com/v1/gifs/search?q=' +
      string +
      '&api_key=hFS7FeDrqNadCFmst13zxWWIETMiEjiZ'
  )
  console.log(gif)
  return gif.data.data[0].images.downsized_medium.url
}

export const getBounds = async geohash => {
  const bounds = await Geohash.bounds(geohash)
  console.log(bounds)
  return bounds
}

export const getMapApi = () => {
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBz7fOQpPA70ewMAtpQPIXjYxDq40fdTro&callback=initMap'
  document.getElementById('map').appendChild(script)
}
