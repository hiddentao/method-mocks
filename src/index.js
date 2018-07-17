export const setupMethodMocks = obj => {
  obj.__methodMocks = {}

  obj.setMethodMock = (methodName, mockFn) => {
    const pkg = {}

    if (obj[methodName]) {
      pkg.original = obj[methodName]
    }

    obj.__methodMocks[methodName] = pkg

    obj[methodName] = mockFn.bind(obj)

    return obj
  }

  obj.clearMethodMock = methodName => {
    const pkg = obj.__methodMocks[methodName]

    if (pkg) {
      obj[methodName] = pkg.original

      delete obj.__methodMocks[methodName]
    }

    return obj
  }

  obj.clearAllMethodMocks = () => {
    Object.keys(obj.__methodMocks).forEach(methodName => {
      obj.clearMethodMock(methodName)
    })

    return obj
  }

  return obj
}
