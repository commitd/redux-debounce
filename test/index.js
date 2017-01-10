import { CALL_API } from 'redux-api-middleware'
import { spy } from 'sinon'
import { debounceMiddleware } from '../src'
import test from 'ava'

const wait = 1000

test('returns a function to handle next', t => {
  t.is(typeof debounceMiddleware(), 'function')
  t.is(debounceMiddleware().length, 1)
})

test('handle next returns function to handle action', t => {
  const middleware = debounceMiddleware()
  const actionHandler = middleware(spy())

  t.is(typeof actionHandler, 'function')
  t.is(actionHandler.length, 1)
})

test('calls next when not flux standard action', t => {
  const next = spy()
  const middleware = debounceMiddleware()
  const actionHandler = middleware(next)
  const action = { id: 1 }

  actionHandler(action)

  t.truthy(next.called)
  t.truthy(next.calledWith({ id: 1 }))
})

test.cb('only calls debounced function once', t => {
  const next = spy()
  const middleware = debounceMiddleware()
  const actionHandler = middleware(next)
  const action = {
    type: 'TEST',
    debounce: {
      key: 'debounceKey1',
      wait
    }
  }

  actionHandler(action)
  actionHandler(action)
  actionHandler(action)

  setTimeout(() => {
    t.is(next.callCount, 1)
    t.end()
  }, wait*2)
})

test.cb('supports other lodash.debounce maxWait option', t => {
  const next = spy()
  const middleware = debounceMiddleware()
  const actionHandler = middleware(next)
  const action = {
    type: 'TEST_MAX_WAIT',
    debounce: {
      key: 'debounceKey2',
      wait: 500,
      options: {
        maxWait: 1000
      }
    }
  }

  actionHandler(action)

  setTimeout(() => {
    actionHandler(action)
  }, 100)

  setTimeout(() => {
    actionHandler(action)
  }, 200)

  setTimeout(() => {
    actionHandler(action)
  }, 300)

  setTimeout(() => {
    actionHandler(action)
  }, 400)

  setTimeout(() => {
    t.falsy(next.called)
  }, 500)

  setTimeout(() => {
    t.truthy(next.called)
    t.end()
  }, 10000)
})

test.cb('debounces api middleware', t => {
  const next = spy()
  const middleware = debounceMiddleware()
  const actionHandler = middleware(next)

  const apiAction = {
    [CALL_API]: {
      endpoint: '/api/to/call',
      method: 'POST',
      types: [ 'Request', 'Set', 'Error' ],
    },
    debounce: {
      key: 'debounceKey3',
      wait
    }
  }

  actionHandler(apiAction)

  setTimeout(() => {
    t.falsy(next.called)
    t.end()
  }, 75)
})

test.cb('supports string constant actions', t => {
  const next = spy()
  const actionHandler = debounceMiddleware()(next)
  const action = 'STRINGY'

  actionHandler(action)

  setTimeout(() => {
    t.is(next.callCount, 1)
    t.true(next.calledWith(action))
    t.end()
  }, 50)
})
