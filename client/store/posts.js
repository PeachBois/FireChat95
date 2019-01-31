const GET_POST = 'GET_POST'
const SET_HASH = 'SET_HASH'
const SET_RADIUS = 'SET_RADIUS'
const SET_CAP = 'SET_CAP'

const defaultPosts = {}

export const setHash = hash => ({ type: SET_HASH, hash })
export const setRadius = radius => ({ type: SET_RADIUS, radius })
export const setCap = roomCap => ({ type: SET_CAP, roomCap })

export default function (state = defaultPosts, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, posts: action.post }
    case SET_HASH:
      return { ...state, hash: action.hash }
    case SET_RADIUS:
      return { ...state, radius: action.radius }
    case SET_CAP:
      return { ...state, roomCap: action.roomCap }

    default:
      return state
  }
}
