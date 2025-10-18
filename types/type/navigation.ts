import type { ESideAction } from "../enum/global/button"

export { }

declare global {
  type TSideNav = {
    icon: IconSvgObject,
    label: string,
    link?: string,
    action?: ESideAction
  } 
}