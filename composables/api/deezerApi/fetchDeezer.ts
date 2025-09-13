import { useRequest } from "../useRequest"

export function fetchDeezer<T = any>(path: string, params: Record<string, any> = {}) {
  const { get } = useRequest()

  const fetchData = async (): Promise<T | null> => {
    const { data, error } = await get<T>(`/deezer${path}`, { params })
    if (error) {
      console.error('Deezer API error:', error)
      return null
    }
    return data ?? null
  }

  return { fetchData }
}
