export const useSearchItem = () => {
  return {
    mapTrack(track: ITrack): TSearchItem {
      return {   
        id: track.id,
        label: track.title, 
        picture: {
          src: track.album.cover_small,
          alt: `track ${track.title}`,
        },
        describe: track.type,
        redirect: `/${track.type}/${track.id}`
      }
    },
    mapArtist(artist: IArtist): TSearchItem {
      return {   
        id: artist.id,
        label: artist.name, 
        picture: {
          src: artist.picture_small,
          alt: `artist ${artist.name}`,
        },
        describe: artist.type,
        redirect: `/${artist.type}/${artist.id}`
      }
    },

    fromTracks(tracks: ITrack[]): TSearchItem[] {
      if(!tracks) return []
      return tracks.map(this.mapTrack)
    },
    fromArtists(artist: IArtist[]): TSearchItem[] { 
      if(!artist) return []
      return artist.map(this.mapArtist)
    }
  }
}
