export const useColors = () => {
  return {
    hexToRgb(hex: string): [number, number, number] {
      let c = hex.replace('#', '')
      if (c.length === 3) c = c.split('').map(ch => ch + ch).join('')
      const num = parseInt(c, 16)
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
    }
  }
}