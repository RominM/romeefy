import { fetchDeezer } from "./fetchDeezer"

export const deezerArtist = () => {
  const _path = '/artist'
  return {
    getById: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(_path + `/${artistId}`, params).fetchData(),

    getTopTracks: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(_path + `/${artistId}/top`, params).fetchData(),

    getAlbums: (artistId: number, params: Record<string, any> = {}): Promise<FetchResult<IAlbum[]>> =>
      fetchDeezer(_path + `/${artistId}/albums`, params).fetchData(),

    getAllByGenreId: (genreId: number, params: Record<string, any> = {}) =>
      fetchDeezer(`/genre/${genreId}/artists`, params).fetchData(),

    getRelated: (artistId: number, params: Record<string, any> = {}) =>
      fetchDeezer(_path +`/${artistId}/related`, params).fetchData()
  }
}
