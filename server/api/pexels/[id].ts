// ~/server/api/pexels/[id].ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing photo id' })
  }

  const config = useRuntimeConfig()
  const res = await $fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: config.pexelsApiKey
    }
  })

  return res
})
