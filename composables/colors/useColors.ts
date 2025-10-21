export const useColors = () => {
  return {
    hexToRgb(hex: string): [number, number, number] {
      let c = hex.replace('#', '')
      if (c.length === 3) c = c.split('').map(ch => ch + ch).join('')
      const num = parseInt(c, 16)
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
    },

    async extractTopColors(
      imgUrl: string,
      topN = 5
    ): Promise<{ rgb: string; r: number; g: number; b: number }[]> {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = imgUrl

        img.onload = () => {
          const canvas = document.createElement('canvas')
          const maxDim = 200
          const scale = Math.min(maxDim / img.width, maxDim / img.height, 1)
          canvas.width = Math.floor(img.width * scale)
          canvas.height = Math.floor(img.height * scale)

          const ctx = canvas.getContext('2d')
          if (!ctx) return reject('Impossible de récupérer le context')

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

          const colorCount: Record<string, number> = {}
          let totalPixels = 0

          for (let i = 0; i < data.length; i += 4) {
            let r = data[i]
            let g = data[i + 1]
            let b = data[i + 2]

            const brightness = (r * 299 + g * 587 + b * 114) / 1000
            if (brightness > 250) continue 

            r = Math.round(r / 10) * 10
            g = Math.round(g / 10) * 10
            b = Math.round(b / 10) * 10

            const key = `${r},${g},${b}`
            colorCount[key] = (colorCount[key] || 0) + 1
            totalPixels++
          }

          if (Object.keys(colorCount).length === 0) {
            resolve([{ r: 0, g: 0, b: 0, rgb: 'rgb(0,0,0)' }])
            return
          }

          const sortedColors = Object.entries(colorCount)
            .map(([k, count]) => {
              const [r, g, b] = k.split(',').map(Number)
              return { r, g, b, count }
            })
            .sort((a, b) => b.count - a.count)

          const dominant = sortedColors[0]
          const dominance = dominant.count / totalPixels

          const isBlack = dominant.r < 40 && dominant.g < 40 && dominant.b < 40
          const isWhite = dominant.r > 220 && dominant.g > 220 && dominant.b > 220

          let filteredColors = sortedColors

          if ((isBlack || isWhite) && dominance < 0.9) {
            filteredColors = sortedColors.filter(c => {
              const brightness = (c.r * 299 + c.g * 587 + c.b * 114) / 1000
              return brightness > 30 && brightness < 240 
            })
          }

          const withSaturation = filteredColors.map(c => {
            const max = Math.max(c.r, c.g, c.b)
            const min = Math.min(c.r, c.g, c.b)
            const s = max === 0 ? 0 : (max - min) / max
            return { ...c, s, rgb: `rgb(${c.r},${c.g},${c.b})` }
          })

          const topColors = withSaturation
            .sort((a, b) => b.count * b.s - a.count * a.s)
            .slice(0, topN)
            .map(c => ({ r: c.r, g: c.g, b: c.b, rgb: c.rgb }))

          resolve(topColors.length ? topColors : [{
            r: dominant.r,
            g: dominant.g,
            b: dominant.b,
            rgb: `rgb(${dominant.r},${dominant.g},${dominant.b})`
          }])
        }

        img.onerror = reject
      })
    },

    rgbStringToArray(rgb: string): [number, number, number] {
      const match = rgb.match(/\d+/g)
      if (!match) return [0, 0, 0]
      return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])]
    }
  }
}
