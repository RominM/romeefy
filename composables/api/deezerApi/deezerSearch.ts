import { fetchDeezer } from "./fetchDeezer"

export const deezerSearch = () => {
  return {
    artist: (q: string) => fetchDeezer(`/search/artist`, { q }).fetchData(),
    album: (q: string) => fetchDeezer(`/search/album`, { q }).fetchData(),
    track: (q: string) => fetchDeezer(`/search/track`, { q }).fetchData(),
    playlist: (q: string) => fetchDeezer(`/search/playlist`, { q }).fetchData()
  }
}
