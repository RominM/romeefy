export const useBestResult = () => {
  return {
    fromArtist(artist: IArtist): TBestResult {
      return {
        id: artist.id,
        name: artist.name,
        type: artist.type,
        picture: artist.picture_medium,
        trackId: 1
      }
    }
  }
}