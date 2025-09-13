import { fetchDeezer } from "./fetchDeezer"

export const deezerArtist = () => {
  return {
    getById: (id: number) => fetchDeezer(`/artist/${id}`).fetchData(),
    getTopTracks: (id: number, limit = 10) => fetchDeezer(`/artist/${id}/top`, { limit }).fetchData(),
    getAlbums: (id: number) => fetchDeezer(`/artist/${id}/albums`).fetchData(),
    getAllByGenreId: (id: number) => fetchDeezer(`/genre/${id}/artists`).fetchData(),
    getRelated: (id: number) => fetchDeezer(`/artist/${id}/related`).fetchData()
  }
}