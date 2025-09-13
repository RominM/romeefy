import { loginAdmin } from '../endpoints/loginAdmin'
import { deezerAlbum } from './deezerApi/deezerAlbum'
import { deezerArtist } from './deezerApi/deezerArtist'
import { deezerChart } from './deezerApi/deezerChart'
import { deezerEditorial } from './deezerApi/deezerEditorial'
import { deezerGenre } from './deezerApi/deezerGenre'
import { deezerPlaylist } from './deezerApi/deezerPlaylist'
import { deezerRadio } from './deezerApi/deezerRadio'
import { deezerSearch } from './deezerApi/deezerSearch'
import { deezerTrack } from './deezerApi/deezerTrack'
import { deezerUser } from './deezerApi/deezerUser'

export const useAPI = () => ({
  adminAuth: loginAdmin(),
  genre: deezerGenre(),
  artist: deezerArtist(),
  album: deezerAlbum(),
  track: deezerTrack(),
  playlist: deezerPlaylist(),
  chart: deezerChart(),
  editorial: deezerEditorial(),
  user: deezerUser(), // need OAuth for most
  radio: deezerRadio(),
  search: deezerSearch()
})
