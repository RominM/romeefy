import { defineStore } from 'pinia';

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
      console.log(this.searchResults);
      
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
