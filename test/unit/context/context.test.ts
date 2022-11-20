import { mockContext } from '../../support/context.support'

describe('Contect', () => {
  const testUrl = 'http://test.example.com:8080/path/to?page=2'

  describe('.state', () => {
    it('empty object for per request state', () => {
      const ctx = mockContext(testUrl)
      expect(ctx.state).toEqual({})
    })
  })
})
