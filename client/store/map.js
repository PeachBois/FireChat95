import { getUserLocation, getGeoHash, getBounds } from '../components/utils'

const SET_LOCATION = 'SET_LOCATION'
const SET_ZOOM = 'SET_ZOOM'
const SET_BOUNDS = 'SET_BOUNDS'

const initialLocation = {
  lat: 41.895266,
  lng: -87.639035,
  zoom: 10,
  bounds: {
    ne: {},
    sw: {}
  }
}

const setLocation = coordinates => ({ type: SET_LOCATION, coordinates })
export const setZoom = value => {
  return { type: SET_ZOOM, value }
}
export const setBounds = bounds => ({ type: SET_BOUNDS, bounds })

export const loadLocation = (precision = 4) => async dispatch => {
  try {
    const location = await getUserLocation()
    const coordinates = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }
    const geohash = await getGeoHash(coordinates, precision)
    const bounds = await getBounds(geohash)
    dispatch(setBounds(bounds))
    dispatch(setLocation(coordinates))
  } catch (err) {
    dispatch(setBounds('failed'))
    dispatch(setLocation('failed'))
  }
}

export default function (state = initialLocation, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, ...action.coordinates }
    case SET_ZOOM: {
      return { ...state, zoom: action.value }
    }
    case SET_BOUNDS:
      return { ...state, bounds: action.bounds }
    default:
      return state
  }
}
