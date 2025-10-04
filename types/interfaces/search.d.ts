
export { };

declare global {
  interface ISearchResult {
    albums?: IAlbum[],
    tracks?: ITrack[],
    artists?: IArtist[],
    playlists?: IPlaylist[]
  }
}