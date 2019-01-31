import Geohash from 'latlon-geohash'

export const getUserLocation = () => {
  const geolocation = navigator.geolocation

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'))
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      () => {
        reject(new Error('Permission denied'))
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000
      }
    )
  })

  return location
}

export const getGeoHash = async coordinates => {
  const { latitude, longitude } = coordinates.coords
  const hash = Geohash.encode(latitude, longitude, 4)
  return hash
}
