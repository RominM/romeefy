import { fetchDeezer } from "./fetchDeezer"

export const deezerSearch = () => {
  return {
    artist: (artistId: string) => fetchDeezer(`/search/artist`, { artistId }).fetchData(),
    album: (artistId: string) => fetchDeezer(`/search/album`, { artistId }).fetchData(),
    track: (artistId: string) => fetchDeezer(`/search/track`, { artistId }).fetchData(),
    playlist: (artistId: string) => fetchDeezer(`/search/playlist`, { artistId }).fetchData(),
    global: async (query: string) => {
      const searchParams = { q: query, limit: 5 }
      try {
        const [tracksRes, albumsRes, artistsRes, playlistsRes] = await Promise.all([
          fetchDeezer('/search/track', searchParams).fetchData(),
          fetchDeezer('/search/album', searchParams).fetchData(),
          fetchDeezer('/search/artist', searchParams).fetchData(),
          fetchDeezer('/search/playlist', searchParams).fetchData(),
        ])
      
        const errors = [tracksRes.error, albumsRes.error, artistsRes.error, playlistsRes.error].filter(Boolean)
        if (errors.length) {
          console.error('Une ou plusieurs erreurs Deezer:', errors)
          return { data: null, error: errors }
        }
      
        return {
          data: {
            tracks: tracksRes.data as ITrack[],
            albums: albumsRes.data as IAlbum[],
            artists: artistsRes.data as IArtist[],
            playlists: playlistsRes.data as IPlaylist[]
          },
          error: null
        }
      } catch (err) {
        console.error('Erreur inattendue lors du fetch global Deezer:', err)
        return { data: null, error: err }
      }
    }
  }
}
