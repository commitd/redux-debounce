import debounce from 'lodash.debounce'

const debouncers = {}

function getDebouncer(key, wait, options, func) {
  let debouncer
  if(debouncers.hasOwnProperty(key)){
    debouncer = debouncers[key]
  } else {
    debouncer = debounce(func, wait, options)
    debouncers[key] = debouncer
  }
  return debouncer
}

function validate(key, wait){
  if(key == null){
    throw new Error('action.debounce missing key property')
  }
  if(wait == null){
    throw new Error('action.debounce missing wait property')
  }
}

export const debounceMiddleware = store => next => action => {
  if(!action.debounce){
    return next(action)
  }

  const { key, wait, options } = action.debounce
  validate(key, wait)
  const debouncer = getDebouncer(key, wait, options, next)

  const newAction = Object.assign({}, action)
  delete newAction.debounce
  return debouncer(newAction)
}
