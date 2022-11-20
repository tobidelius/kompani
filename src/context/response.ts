import { ServerResponse } from 'http'

/**
 * Represents a Response.
 *
 * This class comes with a simple API for delivering responses to the client. For
 * more advanced usage you have access to `.native: ServerResponse`. Do NOT use both
 * `.send` and `.native.end`.
 */
export default class Response {
  /**
   * Node's native response object.
   */
  public readonly native: ServerResponse

  /**
   * Keeps track if the response has been sent.
   */
  private _sent: boolean = false

  /**
   * Constructs a new response.
   */
  constructor (res: ServerResponse) {
    this.native = res
  }

  /**
   * Sets the status code.
   */
  set status (status: number) {
    this.native.statusCode = status
  }

  /**
   * Sets the status code.
   */
  get status (): number {
    return this.native.statusCode
  }

  /**
   * Sends the response to the client.
   *
   * @throws {Error} if response already been sent.
   */
  send (body: any): this {
    if (this._sent) {
      throw new Error('response has alreay been sent')
    }

    this.native.end(body)
    this._sent = true
    return this
  }

  /**
   * Sets a response header.
   *
   * @note all header keys are lower cased when set.
   */
  set (key: string, value: string | number | readonly string[]): this {
    this.native.setHeader(key, value)
    return this
  }

  /**
   * Gets a response header.
   */
  get (key: string): string | number | string[] | undefined {
    return this.native.getHeader(key)
  }

  /**
   * Check if a response header exist.
   */
  has (key: string): boolean {
    return this.native.hasHeader(key)
  }
}
