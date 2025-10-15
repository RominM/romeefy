export { }
declare global {
  interface IArtist {
    id: number
    link: string
    name: string
    picture: string
    picture_big: string
    picture_medium: string
    picture_small: string
    picture_xl: string
    position: number
    nb_fan: number
    nb_album: number
    radio: boolean
    tracklist: string
    type: string
  }
}