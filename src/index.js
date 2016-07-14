import { debounce } from 'lodash'
import { isFSA } from 'flux-standard-action'

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
  const nextAction = Object.assign({}, action)

  if ( isFSA(action) && action.meta && action.meta.debounce ) {
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
