import fetch from 'node-fetch'

export const handler = async (event) => {
  const id = event.queryStringParameters?.id
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: true, message: 'Missing photo id' }) }
  }

  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: true, message: 'API key missing' }) }
  }

  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: { Authorization: apiKey }
  })

  const data = await res.json()
  return { statusCode: 200, body: JSON.stringify(data) }
}
