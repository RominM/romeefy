export { }

declare global {
  type TCoverCard = {
    id: number | string
    coverMedium: string
    alt: string
    title: string
    type: string
    describe?: string
  }

  type TBestResult = {
    id: number,
    name: string,
    type: string,
    picture: string,
    trackId: number
  }

  type TSearchCard = {
    title: string,
    picture: string,
    color: string,
    redirect: string,
    small: boolean
  }
}