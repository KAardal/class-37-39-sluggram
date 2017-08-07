import * as util from './util.js'

export default store => next => action => {
  util.log('ACTION: ', action)
  try {
    let result = next(action)
    util.log('STATE: ', store.getState())
    return result
  } catch (err) {
    err.action = action
    util.logError('ERROR: ', err)
    return err
  }
}
