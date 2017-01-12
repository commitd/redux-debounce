# redux-middleware-debounce

[![Build Status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

> FSA-compliant middleware for Redux to debounce actions. Based on [redux-debounce](https://github.com/wyze/redux-debounce)

## Installation

```sh
$ npm install --save redux-middleware-debounce
```

## Usage

Simply add a debounce property to any Flux Standard Action (or any object-based action) like so:

```javascript
// Store setup
import { applyMiddleware, createStore } from 'redux'
import debounce from 'redux-middleware-debounce'
import createLogger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

const logger = createLogger()
const createMiddleware = applyMiddleware(debounce)
const store = createMiddleware(createStore)(reducer)

const debounceAction = () => ({
  type: 'TEST',
  debounce: {
    wait: 100
  },
})
```

Debounce middleware **should be** placed near the top of the chain, that way the debounce property will be stripped in time for other middlewares that validate, such as redux-api-middleware


### Options

All Lodash debounce() options are supported:

See [lodash][lodash-url]

```
const debounceAction = () => ({
  type: 'TEST',
  debounce: {
    key: 'uniqueKey',    
    wait: 100,
    options: {
      maxWait: 1000
    }
  },
})
```

## License

Copyright © 2016 [Committed Software](http://committed.software)

Original examples and test code Copyright © 2015-2016 [Neil Kistner](//github.com/wyze). Released under the MIT license. See [license](license) for details.

[lodash-url]: https://lodash.com/docs#debounce

[travis-image]: https://img.shields.io/travis/commitd/redux-middleware-debounce.svg?style=flat-square
[travis-url]: https://travis-ci.org/commitd/redux-middleware-debounce

[npm-image]: https://img.shields.io/npm/v/redux-middleware-debounce.svg?style=flat-square
[npm-url]: https://npmjs.com/package/redux-middleware-debounce
