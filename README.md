# method-mocks

[![Build Status](https://secure.travis-ci.org/hiddentao/method-mocks.svg?branch=master)](http://travis-ci.org/hiddentao/method-mocks)
[![codecov](https://codecov.io/gh/hiddentao/method-mocks/branch/master/graph/badge.svg)](https://codecov.io/gh/hiddentao/method-mocks)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/hiddentao)

Works with existing mocking and testing frameworks (e.g. Jest) to make method mocking easier.

Example (testing a [React Native](https://facebook.github.io/react-native/docs/getting-started.html) API):

```js
// App.js

import { Alert } from 'react-native'

export const alertUser = msg => Alert.alert(msg)
```

```js
// App.test.js

import { alertUser } from './App'

// This will get hoisted to the top at runtime by Jest
jest.mock('react-native', () => ({
  Alert: require('method-mocks').setupMethodMocks({
    SOME_KEY: 1
  })
}))

describe('.alertUser()', () => {
  let mock

  beforeEach(() => {
    mock = jest.fn()

    /* Even though we're mocking an external module we're able to set the
    mock for a given method on each iteration */
    Alert.setMethodMock('alert', mock)
  })

  afterEach(() => {
    /* clean-up! */
    Alert.clearAllMethodMocks()
  })

  it('calls through to native alert', () => {
    alertUser('test')

    expect(mock).toHaveBeenCalledWith('test')
  })
})
```

## Installation

```shell
npm i method-mocks
```

## API/Usage

**setupMethodMocks(obj)**

This will add the following methods to the passed-in object:

```js
{
  /**
   * Create a method of the given name and set it to be the given mock function.
   *
   * If method already exists then it's existing value will be saved prior to
   * being overwritten with the given mock.
   *
   * @param {String} methodName The name of the method to mock.
   * @param {Function} mockFn The mock function.
   *
   * @return the object
   */
  setMethodMock: (methodName, mockFn),

  /**
   * Remove mocked method of the given name.
   *
   * If the method had already existed prior to getting mocked then this
   * original implementation will be restored, else the method will be deleted.
   *
   * @param {String} methodName The name of the method.
   *
   * @return the object
   */
  clearMethodMock: (methodName),

  /**
   * Remove all mocked methods.
   *
   * This is equivalent to calling `clearMethodMock()` for each mocked method,
   * one-by-one.
   *
   * @return the object
   */
  clearAllMethodMocks: ()
}
```

The return value will be the original object itself.


## Development

* Lint: `yarn lint`
* Test: `yarn test`
* Build: `yarn build`

## Contributors

All contributions welcome. Please see [CONTRIBUTING.md](https://github.com/hiddentao/method-mocks/raw/master/CCONTRIBUTING.md)

## License

[MIT](https://github.com/hiddentao/method-mocks/raw/master/LICENSE.md)
