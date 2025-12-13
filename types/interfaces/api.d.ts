export { }

declare global {
  interface DeezerPaginatedResponse<T> {
    data: T
    total?: number
    next?: string
    error?: {
      message: string
      code?: number
    }
  }

  interface FetchResult<T> {
    data: T
    error: any
    next?: string | null
    total?: number
  }
}