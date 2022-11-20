import { mockResponse } from '../../support/context.support'

describe('Contect', () => {
  describe('.set & get', () => {
    it('sets and gets response headers', () => {
      const res = mockResponse()

      expect(res.has('content-type')).toEqual(false)
      res.set('Content-Type', 'text/html')
      expect(res.has('content-type')).toEqual(true)
      expect(res.get('content-type')).toEqual('text/html')
      expect(res.native.getHeader('content-type')).toEqual('text/html')
    })
  })

  describe('.status', () => {
    it('sets the status code', () => {
      const res = mockResponse()

      res.status = 503
      expect(res.status).toEqual(503)
      expect(res.native.statusCode).toEqual(503)
    })
  })

  describe('.send', () => {
    it('sets the status code', () => {
      const res = mockResponse()
      const native = res.native as any

      res.send('Hello World')

      expect(native._getData()).toEqual('Hello World')
    })

    it('throws an error if trying to send multiple times', () => {
      const res = mockResponse()
      res.send('Hello World')

      expect(() => res.send('Hello World'))
        .toThrowError('response has alreay been sent')
    })
  })
})
