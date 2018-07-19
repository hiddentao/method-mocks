import { setupMethodMocks } from './'

describe('.setupMethodMocks()', () => {
  it('adds the methods to the object', () => {
    const obj = {}

    setupMethodMocks(obj)

    expect(obj.setMethodMock).toBeInstanceOf(Function)
    expect(obj.clearMethodMock).toBeInstanceOf(Function)
    expect(obj.clearAllMethodMocks).toBeInstanceOf(Function)
  })

  it('adds the methods to empty object', () => {
    const obj = setupMethodMocks()

    expect(obj.setMethodMock).toBeInstanceOf(Function)
    expect(obj.clearMethodMock).toBeInstanceOf(Function)
    expect(obj.clearAllMethodMocks).toBeInstanceOf(Function)
  })

  describe('sets up an object', () => {
    it('which can have a mockable method', () => {
      const obj = setupMethodMocks({
        DUMMY: 1
      })

      expect(obj.DUMMY).toEqual(1)

      const spy = jest.fn()

      obj.setMethodMock('alert', spy)

      obj.alert('test')

      expect(spy).toHaveBeenCalledWith('test')
    })

    it('which can have an original method overridden by a mock', () => {
      const obj = setupMethodMocks({
        DUMMY: 1,
        alert: () => 234
      })

      obj.setMethodMock('alert', () => 567)

      expect(obj.alert()).toEqual(567)

      obj.clearMethodMock('alert')

      expect(obj.alert()).toEqual(234)
    })

    it('which can easily have its mocks removed', () => {
      const obj = setupMethodMocks({
        alert: () => 234
      })

      obj.setMethodMock('alert', () => 567)
      obj.setMethodMock('alert2', () => 789)

      expect(obj.alert()).toEqual(567)
      expect(obj.alert2()).toEqual(789)

      obj.clearAllMethodMocks()

      expect(obj.alert()).toEqual(234)
      expect(obj.alert2).toBeUndefined()
    })
  })
})
