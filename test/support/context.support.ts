import { Request, Context } from '../../src'
import { IncomingMessage } from 'http'
import { URL } from 'url'
import { createRequest, RequestOptions } from 'node-mocks-http'

declare module 'node-mocks-http' {
  interface RequestOptions {
    secure?: true
    socket?: { encrypted?: boolean }
  }
}

export function mockRequest (url: string, opts: RequestOptions = {}): Request {
  const req = createIncomingMessage(url, opts)
  return new Request(req)
}

export function mockContext (url: string, opts: RequestOptions = {}): Context {
  const req = createIncomingMessage(url, opts)
  return new Context(req)
}

function createIncomingMessage (url: string, opts: RequestOptions = {}) {
  const _url = new URL(url)

  const options = Object.assign({
    url: `${_url.pathname}${_url.search}`,
    method: 'GET',
    headers: {},
    socket: {}
  }, opts)

  options.headers.host = _url.host

  if (url.includes('https://')) {
    options.socket.encrypted = true
  }

  return createRequest(options)
}
