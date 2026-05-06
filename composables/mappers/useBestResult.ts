export const useBestResult = () => {
  return {
    fromTrack(track: ITrack): TBestResult {
      return {
        id: track.id,
        name: track.title,
        type: track.type,
        picture: track.album.cover_medium,
        trackId: track.id
      }
    },
    fromArtist(artist: IArtist): TBestResult {
      return {
        id: artist.id,
        name: artist.name,
        type: artist.type,
        picture: artist.picture_medium,
        trackId: artist.id
      }
    }
  }
}