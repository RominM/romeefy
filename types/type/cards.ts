export { }

declare global {
  type TCoverCard = {
    id: number | string
    coverMedium: string
    alt: string
    title: string
    describe?: string
  }

  type TBestResult = {
    id: number,
    name: string,
    type: string,
    picture: string,
    trackId: number
  }
}