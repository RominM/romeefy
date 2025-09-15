export {}

declare global {
  type ChartMeta = {
    describe: string
    img: string
    alt?: string
  }
  
  type ChartId = 'tracks' | 'artists' | 'albums' | 'playlists' | 'podcasts'
}