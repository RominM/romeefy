import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const path = event.node.req.url!.replace(/^\/api\/deezer/, '')
  const query = getQuery(event)
  const url = new URL(`https://api.deezer.com${path}`)
  Object.entries(query).forEach(([k,v]) => url.searchParams.set(k, v as string))

  const res = await fetch(url.toString())
  return res.json()
})
