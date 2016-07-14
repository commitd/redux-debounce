# redux-middleware-debounce

[![Build Status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

> FSA-compliant middleware for Redux to debounce actions. Based on [redux-debounce](https://github.com/wyze/redux-debounce) with added support for [RSAAs (Redux Standard Api Actions)](https://www.npmjs.com/package/redux-api-middleware#redux-standard-api-calling-actions) and fine-grained configuration.

## Installation

```sh
$ npm install --save-dev redux-middleware-debounce
```

## Usage

```javascript
// Store setup
import { applyMiddleware, createStore } from 'redux'
import createDebounce from 'redux-middleware-debounce'
import createLogger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

const debouncer = createDebounce()
const logger = createLogger()
const createMiddleware = applyMiddleware(thunk, debouncer, promise, thunk)
const store = createMiddleware(createStore)(reducer)

const debounceAction = () => ({
  meta: {
    debounce: {
      wait: 100
    },
  },
  type: 'TEST',
})
```

Debounce middleware **should be** placed near the top of the chain.

### Example

See the example directory.

```sh
$ cd example
$ npm install
$ npm start
```

## API

`redux-middleware-debounce` exposes single constructor function for creating debounce middleware.

> createDebounce()

To actually debounce an action, supply meta.debounce to an FSA:

```javascript
var MY_ACTION = {
  type: 'MINE',
  meta : {
    debounce : {
      wait: 100
    }
  }
}
```

Or to a [RSAA (Redux Standard Api Action)](https://www.npmjs.com/package/redux-api-middleware#redux-standard-api-calling-actions):

```javascript
var MY_API_ACTION = {
  [CALL_API]: {
    endpoint: '/api/mine',
    method 'GET':
    types:['REQUEST', 'SET', 'GET']
    meta : {
      debounce : {
        wait: 100
      }
    }
  }
}
```

### Options

> **Each option is a property to setup different debounces for different actions.**

#### action.meta.debounce (Object)

##### wait (Number)

Number of milliseconds to debounce the action for.

##### maxWait (Number)

Maximum number of milliseconds before the action is called.

See [lodash][lodash-url] for the rest of the supported options.

## License

Copyright © 2016 [Committed Software](http://committed.software)

Original examples and test code Copyright © 2015-2016 [Neil Kistner](//github.com/wyze). Released under the MIT license. See [license](license) for details.

[lodash-url]: https://lodash.com/docs#debounce

[travis-image]: https://img.shields.io/travis/commitd/redux-middleware-debounce.svg?style=flat-square
[travis-url]: https://travis-ci.org/commitd/redux-middleware-debounce

[npm-image]: https://img.shields.io/npm/v/redux-middleware-debounce.svg?style=flat-square
[npm-url]: https://npmjs.com/package/redux-middleware-debounce
