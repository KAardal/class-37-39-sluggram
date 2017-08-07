export default (state = [], action) => {
  let { type, payload } = action

  switch (type) {
  case 'PHOTOS_SET':
    return payload

  case 'PHOTO_SUBMIT':
    return [...state, payload]

  case 'PHOTO_UPDATE':
    return state.map(item => (item._id === payload._id ? payload : item))

  case 'PHOTO_DELETE':
    return state.filter(item => item._id !== payload._id)

  case 'LOGOUT':
    return []

  default:
    return state
  }
}
