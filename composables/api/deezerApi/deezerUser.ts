import { fetchDeezer } from "./fetchDeezer"

export const deezerUser = () => {
  return {
    me: () => fetchDeezer('/user/me').fetchData(),
    playlists: () => fetchDeezer('/user/me/playlists').fetchData(),
    favorites: () => fetchDeezer('/user/me/favorites/tracks').fetchData()
  }
}
