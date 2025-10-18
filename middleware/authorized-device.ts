import { EDeviceBreakpoint } from "~/composables/device/useDevice"

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.client) return

 const width = window.innerWidth

  const isMobile = width <= EDeviceBreakpoint.MOBILE
  const isTablet = width > EDeviceBreakpoint.MOBILE && width <= EDeviceBreakpoint.TABLET

  if (!isMobile && !isTablet) {
    return navigateTo('/')
  }
})
