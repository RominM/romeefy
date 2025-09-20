import { fetchDeezer } from "./fetchDeezer"

export const deezerAlbum = () => {
  const _path = '/album' 
  return {
    getById: (id: number) => fetchDeezer(_path + `/${id}`).fetchData(),
    getTracks: (id: number) => fetchDeezer(_path + `/${id}/tracks`).fetchData()
  }
}