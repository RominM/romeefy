import type { IPexelsPhoto, IPexelsResponse } from "~/types/interfaces/pexels"

export const usePexels = () => {
  return {
    async search(query: string, perPage = 10, page = 1): Promise<IPexelsResponse> {
      return await $fetch<IPexelsResponse>('/api/pexels/search', {
        params: { q: query, per_page: perPage, page }
      })
    },

    async getPhotoById(id: number): Promise<IPexelsPhoto> {
      return await $fetch<IPexelsPhoto>(`/api/pexels/${id}`)
    }
  }
}
