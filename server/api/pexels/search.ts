export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()

  const res = await $fetch('https://api.pexels.com/v1/search', {
    headers: {
      Authorization: config.pexelsApiKey
    },
    params: {
      query: query.q ?? 'nature',
      per_page: query.per_page ?? 10
    }
  })

  return res
})
