import { fetchDeezer } from "./fetchDeezer"

export const deezerGenre = () => {
  return {
    getAll: () => fetchDeezer('/genre').fetchData(),
    getById: (id: number) => fetchDeezer(`/genre/${id}`).fetchData(),
    getArtists: (id: number) => fetchDeezer(`/genre/${id}/artists`).fetchData()
  }
}