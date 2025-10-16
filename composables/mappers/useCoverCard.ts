export const useCoverCard = () => {
  return {
    fromAlbum(album: IAlbum[]): TCoverCard[] {  
      return album.map((album: IAlbum) => {
        return {   
          id: album.id,
          title: album.title, 
          coverMedium: album.cover_medium,
          alt: `playlist ${album.title}`,
        }
      })
    },

    fromArtist(artists: IArtist[]): TCoverCard[] {  
      return artists.map((artist: IArtist) => {
        return {   
          id: artist.id,
          title: artist.name, 
          coverMedium: artist.picture_medium,
          alt: `playlist ${artist.name}`,
        }
      })
    },

    fromPlaylist(playlists: IPlaylist[]): TCoverCard[] {
      return playlists.map((playlist: IPlaylist) => {
        return {   
          id: playlist.id,
          title: playlist.title, 
          coverMedium: playlist.picture_medium,
          alt: `playlist ${playlist.title}`,
          describe: `${playlist.nb_tracks} titres`,
        }
      })
    },

    fromTracks(tracks: ITrack[]): TCoverCard[] {
      return tracks.map((track: ITrack) => {
        return {
          id: track.id,
          title: track.title,
          coverMedium: track.album.cover_medium,
          alt: `titre ${track.title}`,
          describe: track.artist.name
        }
      })
    },
    
    fromPodcast(podcasts: IPodcast[]): TCoverCard[] {
      return podcasts.map((podcast: IPodcast) => {
        return {
          id: podcast.id,
          coverMedium: podcast.picture_medium,
          alt: podcast.title,
          title: podcast.description,
          describe: podcast.title
        }
      })
    }
  }
}
