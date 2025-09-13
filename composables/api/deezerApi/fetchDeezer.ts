import { useRequest } from "../useRequest"

export function fetchDeezer<T = any>(path: string, params: Record<string, any> = {}) {
  const { get } = useRequest()

  const fetchData = async (): Promise<T | null> => {
    const res = await get<any>(`/deezer${path}`, { params })
    if ('error' in res && res.error) {
      console.error('Deezer API error:', res.error)
      return null
    }

    if ('data' in res && res.data !== undefined) {
      return res.data as T
    }

    return res as T
  }

  return { fetchData }
}
