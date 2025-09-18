import { fetchDeezer } from "./fetchDeezer"

export const deezerArtist = () => {
  return {
    getById: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(`/artist/${artistId}`, params).fetchData(),

    getTopTracks: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(`/artist/${artistId}/top`, params).fetchData(),

    getAlbums: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(`/artist/${artistId}/albums`, params).fetchData(),

    getAllByGenreId: (genreId: number, params: Record<string, any> = {}) =>
      fetchDeezer(`/genre/${genreId}/artists`, params).fetchData(),

    getRelated: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(`/artist/${artistId}/related`, params).fetchData()
  }
}
