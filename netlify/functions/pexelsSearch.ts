import type { HandlerEvent } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler = async (event: HandlerEvent) => {
  const query = event.queryStringParameters?.q || 'nature'
  const perPage = event.queryStringParameters?.per_page || 10
  const apiKey = process.env.PEXELS_API_KEY

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: true, message: 'API key missing' }) }
  }

  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`, {
    headers: { Authorization: apiKey }
  })

  const data = await res.json()
  return { statusCode: 200, body: JSON.stringify(data) }
}
