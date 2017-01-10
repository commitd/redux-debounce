/* eslint-disable global-require */
import { CALL_API } from 'redux-api-middleware'
import { isFSA } from 'flux-standard-action'
import debounce from 'lodash.debounce'

let isRSAA

try {
  const reduxApiMiddleware = require('redux-api-middleware')

  isRSAA = reduxApiMiddleware.isRSAA
} catch (requireError) {
  isRSAA = null
}

const debouncers = new Map()

function getDebouncer(key, options, next) {
  let debouncer = debouncers.get(key)

  if ( !debouncer ) {
    debouncer = debounce(next, options.wait || 0, options)
    debouncers.set(key, debouncer)
  }

  return debouncer
}

const debounceMiddleware = () => next => action => {
  let debouncer
  let nextAction = action

  if ( isRSAA && isRSAA(action)
      && action[CALL_API].meta
      && action[CALL_API].meta.debounce ) {
    debouncer = getDebouncer(
      action[CALL_API].endpoint,
      action[CALL_API].meta.debounce, next)
    nextAction = Object.assign({}, action)
    delete nextAction[CALL_API].meta
  } else if ( isFSA(action) && action.meta && action.meta.debounce ) {
    debouncer = getDebouncer(action.type, action.meta.debounce, next)
  }

  let result

  if ( debouncer ) {
    result = debouncer(nextAction)
  } else {
    result = next(nextAction)
  }

  return result
}


export default debounceMiddleware
