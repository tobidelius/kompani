import { IncomingMessage } from 'http'
import Request from './request'

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
   * Constructs a new context.
   */
  constructor (req: IncomingMessage) {
    this.state = {}
    this.request = new Request(req)
  }
}
