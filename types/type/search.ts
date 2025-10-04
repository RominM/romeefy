export { }

declare global {
  type TSearchItem = {
    id: number
    picture: TPicture
    label: string
    describe: string
    redirect: string
  }
}
  