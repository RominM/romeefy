import { useSearchStore } from "~/store/searchStore"

export default defineNuxtPlugin((nuxtApp) => {
  const searchStore = useSearchStore()
  const router = useRouter()

  router.afterEach(() => {
    searchStore.setActive(false)
    searchStore.clearResults()
  })
})
