export const useDate = () => {
  return {
    getYearFromStr(dateStr: string): string {
      if (!dateStr) return ''
      const year = dateStr.split('-')[0]
      return year
    }
  }
}
