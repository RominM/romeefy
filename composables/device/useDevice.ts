import { useWindowSize } from "./useWindowsSize"

export enum EDeviceBreakpoint {
  MOBILE = 540,
  TABLET = 870,
  DESKTOP = 1280
}

export function useDevice() {
  const windowSize = useWindowSize()

  const isReady = computed(() => windowSize.width > 0)
  const isMobile = computed(() => windowSize.width > 0 && windowSize.width <= EDeviceBreakpoint.MOBILE)
  const isTablet = computed(
    () => windowSize.width > EDeviceBreakpoint.MOBILE && windowSize.width <= EDeviceBreakpoint.TABLET
  )
  const isDesktop = computed(() => windowSize.width > EDeviceBreakpoint.TABLET)

  const deviceType = computed(() => {
    if (!isReady.value) return 'unknown'
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  return {
    width: windowSize.width,
    isReady,
    isMobile,
    isTablet,
    isDesktop,
    deviceType
  }
}
