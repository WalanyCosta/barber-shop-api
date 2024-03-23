import { type HttpRequest, type HttpResponse } from './http'

export interface Middleware {
  handle: (HttpRequest: HttpRequest) => Promise<HttpResponse>
}
