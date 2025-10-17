import { defineStore } from 'pinia';

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
    }

  },

  getters: {
    getResults(state) {
      return state.searchResults
    },
    getLoadingState(state): boolean {
      return state.isLoading
    },
    getActiveState(state): boolean {
      return state.isActive
    }
  }
})
