import { mockRequest } from '../../support/context.support'

describe('Request', () => {
  const testUrl = 'http://test.example.com:8080/path/to?page=2'

  describe('.domain', () => {
    it('returns the extracted domain', () => {
      const req = mockRequest(testUrl)
      expect(req.domain).toEqual('example.com')
    })

    it('supports different tld lengths', () => {
      const req = mockRequest('http://test.example.co.uk')
      req.tldLength = 2
      expect(req.domain).toEqual('example.co.uk')
    })

    it('extracts connected subdomains', () => {
      const req = mockRequest('http://test.sub.sub.example.com')
      expect(req.domain).toEqual('example.com')
    })
  })

  describe('.subdomain', () => {
    it('returns the extracted domain', () => {
      const req = mockRequest(testUrl)
      expect(req.subdomain).toEqual('test')
    })

    it('supports different tld lengths', () => {
      const req = mockRequest('http://test.example.co.uk')
      req.tldLength = 2
      expect(req.subdomain).toEqual('test')
    })

    it('returns connected subdomains', () => {
      const req = mockRequest('http://test.sub.example.com')
      expect(req.subdomain).toEqual('test.sub')
    })
  })

  describe('.params', () => {
    it('includes the query params', () => {
      const req = mockRequest(testUrl)
      expect(req.params.page).toEqual('2')
    })
  })

  describe('.url', () => {
    it('returns the host', async () => {
      const req = mockRequest(testUrl)
      expect(req.url).toEqual(testUrl)
    })
  })

  describe('.protocol', () => {
    it('returns http for non connections', async () => {
      const req = mockRequest(testUrl)
      expect(req.protocol).toEqual('http')
    })

    it('returns https for secure connections', async () => {
      const req = mockRequest('https://test.example.com')
      expect(req.protocol).toEqual('https')
    })
  })

  describe('.host', () => {
    it('returns the full host', async () => {
      const req = mockRequest(testUrl)
      expect(req.host).toEqual('test.example.com:8080')
    })
  })

  describe('.hostname', () => {
    it('returns the full host without port', async () => {
      const req = mockRequest(testUrl)
      expect(req.hostname).toEqual('test.example.com')
    })
  })

  describe('.path', () => {
    it('returns the pathname', async () => {
      const req = mockRequest(testUrl)
      expect(req.path).toEqual('/path/to')
    })
  })

  describe('.query', () => {
    it('returns the query search string', async () => {
      const req = mockRequest(testUrl)
      expect(req.query).toEqual('?page=2')
    })
  })
})
