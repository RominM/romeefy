import { fetchDeezer } from "./fetchDeezer"

export const deezerPlaylist = () =>{
  return {
    getById: (id: number) => fetchDeezer(`/playlist/${id}`).fetchData(),
    getTracks: (id: number) => fetchDeezer(`/playlist/${id}/tracks`).fetchData()
  }
}
