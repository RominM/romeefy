import { fetchDeezer } from "./fetchDeezer"

export const deezerEditorial = () => {
  return {
    getById: (id: number) => fetchDeezer(`/editorial/${id}`).fetchData()
  }
}
