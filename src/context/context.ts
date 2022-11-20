import { IncomingMessage, ServerResponse } from 'http'
import Request from './request'
import Response from './response'

/**
 * Common interface for per request state.
 */
export interface ContextState {
  [key: string]: unknown
}

/**
 * Represents a per request context.
 */
export default class Context {
  /**
   * Per request state.
   */
  public readonly state: ContextState

  /**
   * The request.
   */
  public readonly request: Request

  /**
   * The response.
   */
  public readonly response: Response

  /**
   * Constructs a new context.
   */
  constructor (req: IncomingMessage, res: ServerResponse) {
    this.state = {}
    this.request = new Request(req)
    this.response = new Response(res)
  }
}
