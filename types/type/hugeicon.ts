export { }

declare global {
  type IconSvgObject =
    | [
        string,
        {
          [key: string]: string | number
        }
      ][]
    | readonly (readonly [
        string,
        {
          readonly [key: string]: string | number
        }
  ])[]
}