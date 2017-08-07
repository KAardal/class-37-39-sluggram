import superagent from 'superagent'

//sync
export const photosSet = photos => ({
  type: 'PHOTOS_SET',
  payload: photos,
})

export const photoSubmit = photo => ({
  type: 'PHOTO_SUBMIT',
  payload: photo,
})

export const photoUpdate = photo => ({
  type: 'PHOTO_UPDATE',
  payload: photo,
})

export const photoDelete = photo => ({
  type: 'PHOTO_DELETE',
  payload: photo,
})

//async
export const photoSubmitRequest = photo => (dispatch, getState) => {
  let { auth, profile } = getState()
  console.log('photoSubmitRequest', photo)
  return superagent
    .post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.url)
    .then(res => {
      console.log('photoSubmitResponse', res)
      dispatch(photoSubmit(res.body))
      return res
    })
}

export const photosFetchRequest = phoro => (dispatch, getState) => {
  let { auth } = getState()
  return superagent
    .get(`${__API_URL__}/photos/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(photosSet(res.body.data))
      return res
    })
}

export const photoDeleteRequest = photo => (dispatch, getState) => {
  let { auth } = getState()
  return superagent
    .delete(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(photoDelete(photo))
      return res
    })
}

export const photoUpdateRequest = photo => (dispatch, getState) => {
  let { auth } = getState()
  return superagent
    .put(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.url)
    .then(res => {
      dispatch(photoUpdate(res.body))
      return res
    })
}
