import { fetchDeezer } from "./fetchDeezer"

export const deezerArtist = () => {
  return {
    getById: (artistId: number) => fetchDeezer(`/artist/${artistId}`).fetchData(),
    getTopTracks: (artistId: number, limit = 10) => fetchDeezer(`/artist/${artistId}/top`, { limit }).fetchData(),
    getAlbums: (artistId: number) => fetchDeezer(`/artist/${artistId}/albums`).fetchData(),
    getAllByGenreId: (genreId: number) => fetchDeezer(`/genre/${genreId}/artists`).fetchData(),
    getRelated: (artistId: number) => fetchDeezer(`/artist/${artistId}/related`).fetchData()
  }
}