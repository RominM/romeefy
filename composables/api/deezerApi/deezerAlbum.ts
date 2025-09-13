import { fetchDeezer } from "./fetchDeezer"

export const deezerAlbum = () => {
  return {
    getById: (id: number) => fetchDeezer(`/album/${id}`).fetchData(),
    getTracks: (id: number) => fetchDeezer(`/album/${id}/tracks`).fetchData()
  }
}