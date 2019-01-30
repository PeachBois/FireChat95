import history from '../history'

/**
 * ACTION TYPES
 */
const GET_POST = 'GET_POST'
const SET_HASH = 'SET_HASH'
const SET_RADIUS = 'SET_RADIUS'

/**
 * INITIAL STATE
 */
const defaultPosts = {}

/**
 * ACTION CREATORS
 */
const gotPost = post => ({ type: GET_POST, post })

export const setHash = hash => ({ type: SET_HASH, hash })
export const setRadius = radius => ({ type: SET_RADIUS, radius })

/**
 * THUNK CREATORS
 */
let post = ''

export const getPost = () => async dispatch => {
  try {
    console.log(post)
    dispatch(gotPost(post))
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
}

/**
 * REDUCER
 */

export default function (state = defaultPosts, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, posts: action.post }
    case SET_HASH:
      return { ...state, hash: action.hash }
    case SET_RADIUS:
      return { ...state, radius: action.radius }

    default:
      return state
  }
}
