import { fetchDeezer } from "./fetchDeezer"

export const deezerSearch = () => {
  return {
    artist: (artistId: string) => fetchDeezer(`/search/artist`, { artistId }).fetchData(),
    album: (artistId: string) => fetchDeezer(`/search/album`, { artistId }).fetchData(),
    track: (artistId: string) => fetchDeezer(`/search/track`, { artistId }).fetchData(),
    playlist: (artistId: string) => fetchDeezer(`/search/playlist`, { artistId }).fetchData()
  }
}
