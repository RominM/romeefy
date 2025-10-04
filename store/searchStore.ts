import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '' as string,
    searchResults: {} as ISearchResult | undefined,
    isLoading: false as boolean,
    isActive: false as boolean,
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
    }
  },

  getters: {
    hasResults(state): boolean {
      return state.searchResults !== undefined && Object.keys(state.searchResults).length > 0
    },
    isLoadingState(state): boolean {
      return state.isLoading
    },
    isActive(state): boolean {
      return state.isActive
    }
  }
})
