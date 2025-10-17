export const useSearchItem = () => {
  return {
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

    fromArtists(artist: IArtist[]): TSearchItem[] {  
      return artist.map(this.mapArtist)
    }
  }
}
