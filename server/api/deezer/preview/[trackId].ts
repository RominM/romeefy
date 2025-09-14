import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const params = event.context?.params
  const trackUrl = params ? decodeURIComponent(params.trackId || '') : ''
  
  if (!trackUrl) {
    event.res.statusCode = 400
    return { error: 'No track URL provided' }
  }

  try {
    const res = await fetch(trackUrl)
    if (!res.ok) {
      event.res.statusCode = res.status
      return { error: 'Failed to fetch track' }
    }

    const buffer = await res.arrayBuffer()
    event.res.setHeader('Content-Type', 'audio/mpeg')
    event.res.setHeader('Content-Length', buffer.byteLength.toString())
    event.res.end(Buffer.from(buffer))
  } catch (e) {
    event.res.statusCode = 500
    return { error: 'Server error fetching track' }
  }
})
