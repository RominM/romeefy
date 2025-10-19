export const useBestResult = () => {
  return {
    fromTrack(track: ITrack): TBestResult {
      return {
        id: track.id,
        name: track.title,
        type: track.type,
        picture: track.album.cover_medium,
        trackId: 1
      }
    },
    fromArtist(artist: IArtist): TBestResult {
      return {
        id: artist.id,
        name: artist.name,
        type: artist.type,
        picture: artist.picture_medium,
        trackId: 1
      }
    },
    fromArtists(artists: IArtist[]): TBestResult[] {
      return artists.map(this.fromArtist)
    },
    fromTracks(tracks: ITrack[]): TBestResult[] {
      return tracks.map(this.fromTrack)
    }
  }
}