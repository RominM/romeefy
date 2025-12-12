export const useDate = () => {
  return {
    getYearFromStr(dateStr: string): string {
      if (!dateStr) return ''
      const year = dateStr.split('-')[0]
      return year
    },
    getPrettyStrFromDate(date: Date, options?: { short?: boolean; time?: boolean }) {
      const { short = false, time = false } = options || {}
        
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: short ? "short" : "long",
        year: "numeric",
      }
    
      if (time) {
        dateOptions.hour = "2-digit"
        dateOptions.minute = "2-digit"
      }
    
      return new Intl.DateTimeFormat("fr-FR", dateOptions).format(date)
}

  }
}
