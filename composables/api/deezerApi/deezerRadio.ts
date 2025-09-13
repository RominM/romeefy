import { fetchDeezer } from "./fetchDeezer"

export const deezerRadio = () => {
  return {
    getById: (id: number) => fetchDeezer(`/radio/${id}`).fetchData(),
    getTracks: (id: number) => fetchDeezer(`/radio/${id}/tracks`).fetchData()
  }
}
