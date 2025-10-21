import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '' as string,
    searchResults: {} as ISearchResult | undefined,
    isLoading: false as boolean,
    isActive: false as boolean,
    history: [] as TSearchItem[]
  }),

  actions: {
    setQuery(query: string) {
      this.searchQuery = query
    },

    setResults(results: ISearchResult | undefined) {
      this.searchResults = results
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setActive(active: boolean) {
      this.isActive = active
    },

    clearResults() {
      this.searchResults = undefined
      this.searchQuery = ''
      this.isActive = false
      this.isLoading = false
    },

    addToHistory(lastResult: TSearchItem) {
      const exists = this.history.some(item => item.id === lastResult.id)
      if (!exists) {
        this.history.unshift(lastResult)
        if (this.history.length > 10) this.history.pop()
      }
      localStorage.setItem('history', JSON.stringify(this.history))
    },

    loadHistory() {
      const data = localStorage.getItem('history')
      this.history = data ? JSON.parse(data) : []
    },

    clearHistory() {
      this.history = []
      localStorage.removeItem('history')
    },

    deleteFromHistory(item: TSearchItem) {
      this.history = this.history.filter(i => i.id !== item.id)
      localStorage.setItem('history', JSON.stringify(this.history))
    }
  },

  getters: {
    getResults: (state) => state.searchResults,
    getLoadingState: (state) => state.isLoading,
    getActiveState: (state) => state.isActive,
    getHistory: (state) => {
      if (state.history.length) return state.history
      const data = localStorage.getItem('history')
      return data ? JSON.parse(data) : []
    }
  }
})
