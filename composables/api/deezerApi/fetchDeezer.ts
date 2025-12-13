import { useRequest } from "../useRequest";

export function fetchDeezer<T = any>(path: string, params: Record<string, any> = {}) {
  const { get } = useRequest()

  const fetchData = async (): Promise<{ data: T | null; error: any | null }> => {
    try {
      const res = await get<any>(`/deezer${path}`, { params })

      if ('error' in res && res.error) {
        console.error('Deezer API error:', res.error)
        return { data: null, error: res.error }
      }

      if ('data' in res) {
        return { data: res.data as T, error: null }
      }

      return { data: res as T, error: null }
    } catch (err) {
      console.error('Fetch Deezer failed:', err)
      return { data: null, error: err }
    }
  }

  return { fetchData }
}
