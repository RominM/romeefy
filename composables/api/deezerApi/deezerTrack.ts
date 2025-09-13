import { fetchDeezer } from "./fetchDeezer"

export const deezerTrack = () => {
  return {
    getById: (id: number) => fetchDeezer(`/track/${id}`).fetchData(),
    getRelated: (id: number) => fetchDeezer(`/track/${id}/related`).fetchData()
  }
}
