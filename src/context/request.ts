import { IncomingMessage, IncomingHttpHeaders } from 'http'
import { URL } from 'url'

/**
 * Represents a request.
 */
export default class Request {
  /**
   * Node's default request object.
   */
  public readonly native: IncomingMessage

  /**
   * TLD (top level domain) length. .com = 1, .co.uk = 2.
   */
  public tldLength: number

  /**
   * Full URL including protocol and host.
   */
  public readonly url: string

  /**
   * Request params is an object containing route, query and body params.
   */
  public readonly params: Record<string, any>

  /**
   * URL meta information.
   */
  private readonly _urlObject: URL

  /**
   * Constructs a new request.
   *
   * @private
   */
  constructor (req: IncomingMessage, tldLength: number = 1) {
    this.native = req
    this.tldLength = tldLength
    this.url = `${this.protocol}://${this.host}${req.url ?? ''}`
    this._urlObject = new URL(this.url)
    this.params = Object.fromEntries(this._urlObject.searchParams)
  }

  /**
   * Get URL protocol: http(s).
   */
  get protocol (): string {
    return this.secure ? 'https' : 'http'
  }

  /**
   * Request headers.
   */
  get headers (): IncomingHttpHeaders {
    return this.native.headers
  }

  /**
   * Gets the requested host.
   */
  get host (): string {
    return this.headers.host ?? ''
  }

  /**
   * Gets the requested host, without port.
   */
  get hostname (): string {
    return this._urlObject.hostname
  }

  /**
   * Gets the requested path without search query.
   */
  get path (): string {
    return this._urlObject.pathname
  }

  /**
   * Gets the search query string
   */
  get query (): string {
    return this._urlObject.search
  }

  /**
   * Checks if the connection is secure (https).
   */
  get secure (): boolean {
    if (this._secure === undefined) {
      this._secure = Object.prototype.hasOwnProperty.call(this.native.socket, 'encrypted')
    }

    return this._secure
  }

  private _secure?: boolean

  /**
   * Gets the extracted domain.
   */
  get domain (): string {
    if (this._domain === undefined) {
      this._domain = this.hostname.split('.').slice(-(this.tldLength + 1)).join('.')
    }
    return this._domain
  }

  private _domain?: string

  /**
   * Gets the extracted subdomain(s).
   */
  get subdomain (): string {
    if (this._subdomain === undefined) {
      this._subdomain = this.hostname.split('.').slice(0, -(this.tldLength + 1)).join('.')
    }
    return this._subdomain
  }

  private _subdomain?: string
}
