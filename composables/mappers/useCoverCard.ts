export const useCoverCard = () => {
  return {
    mapAlbum(album: IAlbum): TCoverCard {
      return {   
        id: album.id,
        title: album.title, 
        coverMedium: album.cover_medium,
        alt: `album ${album.title}`,
      }
    },

    mapArtist(artist: IArtist): TCoverCard {
      return {   
        id: artist.id,
        title: artist.name, 
        coverMedium: artist.picture_medium,
        alt: `artist ${artist.name}`,
      }
    },

    mapPlaylist(playlist: IPlaylist): TCoverCard {
      return {   
        id: playlist.id,
        title: playlist.title, 
        coverMedium: playlist.picture_medium,
        alt: `playlist ${playlist.title}`,
        describe: `${playlist.nb_tracks} titres`,
      }
    },

    mapTrack(track: ITrack): TCoverCard {
      return {
        id: track.id,
        title: track.title,
        coverMedium: track.album.cover_medium,
        alt: `titre ${track.title}`,
        describe: track.artist.name
      }
    },
    
    mapPodcast(podcast: IPodcast): TCoverCard {
      return {
        id: podcast.id,
        coverMedium: podcast.picture_medium,
        alt: podcast.title,
        title: podcast.description,
        describe: podcast.title
      }
    },

    mapGenre(genre: IGenre): TCoverCard {
      return {
        id: genre.id,
        coverMedium: genre.picture_medium,
        alt: genre.name,
        title: genre.name,
      }
    },

    fromAlbum(albums: IAlbum[]): TCoverCard[] {  
      return albums.map(this.mapAlbum)
    },

    fromArtist(artists: IArtist[]): TCoverCard[] {  
      return artists.map(this.mapArtist)
    },

    fromPlaylist(playlists: IPlaylist[]): TCoverCard[] {
      return playlists.map(this.mapPlaylist)
    },

    fromTracks(tracks: ITrack[]): TCoverCard[] {
      return tracks.map(this.mapTrack)
    },
  
    fromPodcast(podcasts: IPodcast[]): TCoverCard[] {
      return podcasts.map(this.mapPodcast)
    },

    fromGenre(genre: IGenre): TCoverCard {
      return this.mapGenre(genre)
    }
  }
}
