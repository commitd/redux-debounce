import { spy } from 'sinon'
import debounceMiddleware from '../src'
import test from 'ava'

const config = {
  wait: 100,
}

const configMaxWait = {
  wait: 100,
  maxWait: 150,
}

const nextHandler = debounceMiddleware()

test('returns a function to handle next', t => {
  t.is(typeof nextHandler, 'function')
  t.is(nextHandler.length, 1)
})

test('handle next returns function to handle action', t => {
  const actionHandler = nextHandler(spy())

  t.is(typeof actionHandler, 'function')
  t.is(actionHandler.length, 1)
})

test('calls next when not flux standard action', t => {
  const next = spy()
  const actionHandler = nextHandler(next)
  const action = { id: 1 }

  actionHandler(action)

  t.truthy(next.called)
  t.truthy(next.calledWith({ id: 1 }))
})

test.cb('only calls debounced function once', t => {
  const next = spy()
  const actionHandler = nextHandler(next)
  const action = { type: 'TEST', meta: { debounce: config } }

  actionHandler(action)
  actionHandler(action)
  actionHandler(action)

  setTimeout(() => {
    t.is(next.callCount, 1)
    t.end()
  }, 200)
})

test.cb('supports other lodash.debounce options', t => {
  const next = spy()
  const actionHandler = nextHandler(next)
  const action = { type: 'TEST_MAX_WAIT', meta: { debounce: configMaxWait } }

  actionHandler(action)

  setTimeout(() => {
    actionHandler(action)
  }, 75)

  setTimeout(() => {
    t.falsy(next.called)
  }, 100)

  setTimeout(() => {
    t.truthy(next.called)
    t.end()
  }, 200)
})
