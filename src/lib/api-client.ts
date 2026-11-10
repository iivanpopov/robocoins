export type SuccessStatusCode =
  | '200'
  | '201'
  | '202'
  | '203'
  | '204'
  | '205'
  | '206'
  | '207'
  | '208'
  | '226'

export type SuccessOf<TResponses> = TResponses[Extract<keyof TResponses, SuccessStatusCode>]

export type ErrorOf<TResponses> = TResponses[Exclude<keyof TResponses, SuccessStatusCode>]

export type DataShape = {
  body?: unknown
  cookies?: unknown
  headers?: unknown
  path?: unknown
  query?: unknown
}

export type RequestResult<TResponses, ThrowOnError extends boolean = true> = {
  status: number
  data: ThrowOnError extends true ? SuccessOf<TResponses> : SuccessOf<TResponses> | undefined
  error: ThrowOnError extends true ? undefined : ErrorOf<TResponses> | undefined
  contentType: string | undefined
  request: Request
  response: Response
}

export type Unwrappable<T extends { data: unknown; error: unknown }> = Promise<T> & {
  unwrap: () => Promise<T['data']>
}

export function withUnwrap<T extends { data: unknown; error: unknown }>(
  promise: Promise<T>,
): Unwrappable<T> {
  const unwrappable = promise as Unwrappable<T>
  unwrappable.unwrap = () =>
    promise.then((result) => {
      if (result.error !== undefined) throw result.error
      return result.data
    })
  return unwrappable
}

export class ResponseError<TError = unknown> extends Error {
  data: TError
  status: number
  statusText: string
  contentType: string | undefined
  request: Request
  response: Response

  constructor(config: {
    data: TError
    status: number
    statusText: string
    contentType?: string
    request: Request
    response: Response
    method?: string
    url?: string
  }) {
    const cleanUrl = config.url?.split(/[?#]/)[0]
    const target = [config.method, cleanUrl].filter(Boolean).join(' ')
    const statusText = config.statusText?.trim()
    super(
      `${target ? `${target} failed` : 'Request failed'} with status ${config.status}${statusText ? ` ${statusText}` : ''}`,
    )
    this.name = 'ResponseError'
    this.data = config.data
    this.status = config.status
    this.statusText = config.statusText
    this.contentType = config.contentType
    this.request = config.request
    this.response = config.response
  }

  static is(error: unknown): error is ResponseError<unknown> {
    return error instanceof Error && error.name === 'ResponseError'
  }
}

export type ResponseErrorConfig<TError = unknown> = ResponseError<TError>

export type ClientConfig = {
  baseURL?: string
  headers?: Record<string, string>
  credentials?: RequestCredentials
  options?: RequestInit
  throwOnError?: boolean
}

export type ResolvedRequest = {
  url: string
  method: string
  headers: Record<string, string>
  body?: BodyInit
  signal?: AbortSignal
  credentials?: RequestCredentials
  options?: RequestInit
}

export type RequestInterceptor = (
  request: ResolvedRequest,
) => ResolvedRequest | Promise<ResolvedRequest>

export type CallResult = {
  status: number
  data: unknown
  error: unknown
  contentType: string | undefined
  request: Request
  response: Response
}

export type ClientInstance = {
  (config: RequestConfig): Promise<CallResult>
  getConfig: () => ClientConfig
  setConfig: (config: ClientConfig) => ClientConfig
  interceptors: { request: { use: (interceptor: RequestInterceptor) => number } }
  createClient: (config?: ClientConfig) => ClientInstance
}

export type RequestConfig<TBody = unknown> = {
  baseURL?: string
  url?: string
  method?: string
  path?: unknown
  query?: unknown
  body?: TBody
  headers?: unknown
  signal?: AbortSignal
  credentials?: RequestCredentials
  options?: RequestInit
  throwOnError?: boolean
  client?: ClientInstance
}

export type Options<TData extends DataShape, ThrowOnError extends boolean = true> = Omit<
  RequestConfig,
  keyof DataShape | 'url'
> &
  TData & {
    client?: ClientInstance
    throwOnError?: ThrowOnError
  }

function isFormBody(body: unknown): boolean {
  return (
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body) ||
    typeof body === 'string'
  )
}

function serializeBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) return undefined
  if (isFormBody(body)) return body as BodyInit
  return JSON.stringify(body)
}

function serializeUrl(config: RequestConfig, baseURL: string | undefined): string {
  let url = `${config.baseURL ?? baseURL ?? ''}${config.url ?? ''}`
  url = url.replace(/\{([^{}]+)\}/g, (_, key: string) => {
    const value = (config.path as Record<string, unknown> | undefined)?.[key]
    return value === undefined || value === null ? '' : encodeURIComponent(String(value))
  })
  const query = config.query as Record<string, unknown> | undefined
  if (query) {
    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue
      if (Array.isArray(value)) {
        for (const item of value) search.append(key, String(item))
        continue
      }
      search.set(key, String(value))
    }
    const queryString = search.toString()
    if (queryString) url += `${url.includes('?') ? '&' : '?'}${queryString}`
  }
  return url
}

async function parseResponse(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205 || response.status === 304)
    return undefined
  const text = await response.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export function createClientCore(initialConfig: ClientConfig): ClientInstance {
  let config: ClientConfig = { ...initialConfig }
  const interceptors: Array<RequestInterceptor> = []
  let interceptorId = 0

  const client = (async (requestConfig: RequestConfig): Promise<CallResult> => {
    const url = serializeUrl(requestConfig, config.baseURL)
    const headers: Record<string, string> = {}
    for (const [key, value] of Object.entries(config.headers ?? {})) {
      if (value !== undefined && value !== null) headers[key] = String(value)
    }
    for (const [key, value] of Object.entries(
      (requestConfig.headers as Record<string, unknown>) ?? {},
    )) {
      if (value !== undefined && value !== null) headers[key] = String(value)
    }

    const body = serializeBody(requestConfig.body)
    if (
      requestConfig.body !== undefined &&
      requestConfig.body !== null &&
      !isFormBody(requestConfig.body) &&
      headers['Content-Type'] === undefined
    ) {
      headers['Content-Type'] = 'application/json'
    }

    let resolved: ResolvedRequest = {
      url,
      method: (requestConfig.method ?? 'GET').toUpperCase(),
      headers,
      body,
      signal: requestConfig.signal,
      credentials: requestConfig.credentials ?? config.credentials,
      options: { ...config.options, ...requestConfig.options },
    }

    for (const interceptor of interceptors) {
      resolved = await interceptor(resolved)
    }

    const init: RequestInit = {
      ...resolved.options,
      method: resolved.method,
      headers: resolved.headers,
      body: resolved.body,
      signal: resolved.signal,
    }
    if (resolved.credentials) init.credentials = resolved.credentials

    const request = new Request(resolved.url, init)
    const response = await fetch(request)
    const data = await parseResponse(response)
    const contentType = response.headers.get('Content-Type') ?? undefined
    const throwOnError = requestConfig.throwOnError ?? config.throwOnError ?? true

    if (!response.ok && throwOnError) {
      throw new ResponseError({
        data,
        status: response.status,
        statusText: response.statusText,
        contentType,
        request,
        response,
        method: resolved.method,
        url: resolved.url,
      })
    }

    return {
      status: response.status,
      data: response.ok ? data : undefined,
      error: response.ok ? undefined : data,
      contentType,
      request,
      response,
    }
  }) as ClientInstance

  client.getConfig = () => config
  client.setConfig = (next) => {
    config = { ...config, ...next }
    return config
  }
  client.interceptors = {
    request: {
      use: (interceptor) => {
        interceptors.push(interceptor)
        return ++interceptorId
      },
    },
  }
  client.createClient = (next) => createClientCore({ ...config, ...next })

  return client
}

export const client = createClientCore({ baseURL: '/api' })

export const createClient = (config?: ClientConfig) => client.createClient(config ?? {})
