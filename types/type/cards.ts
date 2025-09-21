export { }

declare global {
  type TCoverCard = {
    id: number | string
    coverMedium: string
    alt: string
    title: string
    describe?: string
  }
}