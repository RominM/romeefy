import { fetchDeezer } from "./fetchDeezer";

export const deezerChart = () => {
  return {
    getGlobal: () => fetchDeezer('/chart').fetchData(),
    getByGenre: (genreId: number) => fetchDeezer(`/chart/${genreId}`).fetchData(),
    getArtists: (genreId: number) => fetchDeezer(`/chart/${genreId}/artists`).fetchData(),
    getAlbums: (genreId: number) => fetchDeezer(`/chart/${genreId}/albums`).fetchData(),
    getTracks: (genreId: number) => fetchDeezer(`/chart/${genreId}/tracks`).fetchData()
  }
}
