import type { ENavAction } from "../enum/global/nav"

export { }

declare global {
  type TSideNav = {
    icon: IconSvgObject,
    label: string,
    link?: string,
    action?: ENavAction
  } 
}